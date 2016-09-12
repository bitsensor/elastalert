import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import Logger from './common/logger';
import config from './common/config';
import setupRouter from './routes/route_setup';
import ProcessController from './controllers/process';
import RulesController from './controllers/rules';
import FileSystemController from './controllers/rules/file_system';

let logger = new Logger('Server');

export default class ElastalertServer {
  constructor() {
    this._express = express();
    this._runningTimeouts = [];
    this._processController = null;
    this._rulesController = null;

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

  start() {
    const self = this;

    // Start the server when the config is loaded
    config.ready(function () {
      try {
        self._express.use(bodyParser.json());
        self._express.use(bodyParser.urlencoded({ extended: true }));
        self._setupRouter();
        self._runningServer = self.express.listen(config.get('port'), self._serverController);
        self._express.set('server', self);

        self._fileSystemController = new FileSystemController();

        //TODO: This is making sure a dummy rule is available to run elastalert with. Should be fixed in ElastAlert repository.
        self._fileSystemController.readFile(path.join(__dirname, '../docker/rules/dummy.yaml'))
          .then(function (content) {
            self._fileSystemController.writeFile(path.join(config.get('elastalertPath'), config.get('rulesPath').path, 'dummy.yaml'), content)
              .then(function () {
                self._processController = new ProcessController();
                self._processController.start();
              })
              .catch(function (error) {
                logger.error('Writing to dummy.yaml failed with error', error);
              });
          })
          .catch(function (error) {
            logger.error('Reading dummy.yaml failed with error', error);
          });

        self._rulesController = new RulesController();

        logger.info('Server listening on port ' + config.get('port'));
      } catch (error) {
        logger.error('Starting server failed with error:', error);
      }
    });
  }

  stop() {
    this._processController.stop();
    this._runningServer ? this._runningServer.close() : null;
    this._runningTimeouts.forEach((timeout) => clearTimeout(timeout));
  }

  _setupRouter() {
    setupRouter(this._express);
  }

  _serverController() {
    logger.info('Server started');
  }
}
