import express from 'express';
import Logger from './common/logger';
import config from './common/config';
import setupRouter from './routes/route_setup';
import ProcessController from "./controllers/process/index";

let logger = new Logger('Server');

export default class ElastalertServer {
  constructor() {
    this._express = express();
    this._runningTimeouts = [];

    this._setupRouter();

    this._processController = new ProcessController();

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
  };

  get processController() {
    return this._processController;
  }

  start() {
    try {
      this._runningServer = this.express.listen(config.get('port'), this._serverController);
      logger.info('Server listening on port ' + config.get('port'));
      this._express.set('server', this);

      this._processController.start();
    } catch (e) {
      logger.warn('Starting server failed with error:', e);
    }
  }

  stop() {
    this._processController.stop();
    this._runningServer.close();
    this._runningTimeouts.forEach((timeout) => clearTimeout(timeout));
  }

  _setupRouter() {
    setupRouter(this._express);
  }

  static _serverController() {
    logger.info('Server started');
  }
}
