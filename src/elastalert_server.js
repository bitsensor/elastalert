import express from 'express';
import bodyParser from 'body-parser';
import Logger from './common/logger';
import config from './common/config';
import path from 'path';
import FileSystem from './common/file_system';
import setupRouter from './routes/route_setup';
import ProcessController from './controllers/process';
import RulesController from './controllers/rules';
import TemplatesController from './controllers/templates';
import TestController from './controllers/test';
import cors from 'cors';

let logger = new Logger('Server');

export default class ElastalertServer {
  constructor() {
    this._express = express();
    this._runningTimeouts = [];
    this._processController = null;
    this._rulesController = null;
    this._templatesController = null;

    // Set listener on process exit (SIGINT == ^C)
    process.on('SIGINT', () => {
      process.exit(0);
    });

    process.on('exit', () => {
      logger.info('Stopping server');
      this.stop();
      logger.info('Server stopped. Bye!');
    });
  }

  get express() {
    return this._express;
  }

  get processController() {
    return this._processController;
  }

  get rulesController() {
    return this._rulesController;
  }

  get templatesController() {
    return this._templatesController;
  }

  get testController() {
    return this._testController;
  }

  start() {
    const self = this;

    // Start the server when the config is loaded
    config.ready(function () {
      try {
        self._express.use(cors());
        self._express.use(bodyParser.json());
        self._express.use(bodyParser.urlencoded({ extended: true }));
        self._setupRouter();
        self._runningServer = self.express.listen(config.get('port'), self._serverController);
        self._express.set('server', self);

        self._fileSystemController = new FileSystem();
        self._processController = new ProcessController();
        self._processController.start();

        self._rulesController = new RulesController();
        self._templatesController = new TemplatesController();
        self._testController = new TestController(self);

        self._fileSystemController.createDirectoryIfNotExists(self.getDataFolder()).catch(function (error) {
          logger.error('Error creating data folder with error:', error);
        });

        logger.info('Server listening on port ' + config.get('port'));
      } catch (error) {
        logger.error('Starting server failed with error:', error);
        process.exit(1);
      }
    });
  }

  stop() {
    this._processController.stop();
    this._runningServer ? this._runningServer.close() : null;
    this._runningTimeouts.forEach((timeout) => clearTimeout(timeout));
  }

  getDataFolder() {
    const dataFolderSettings = config.get('dataPath');

    if (dataFolderSettings.relative) {
      return path.join(config.get('elastalertPath'), dataFolderSettings.path);
    } else {
      return dataFolderSettings.path;
    }
  }

  _setupRouter() {
    setupRouter(this._express);
  }

  _serverController() {
    logger.info('Server started');
  }
}
