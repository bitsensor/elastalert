import express from 'express';
import Logger from './common/logger';
import config from './common/config';
import setupRouter from './routes/route_setup';

let logger = new Logger('Server');

export default class ElastalertServer {
  constructor() {
    this._express = express();
    this._runningTimeouts = [];

    this._setupRouter();
  }

  get express() {
    return this._express;
  };

  start() {
    try {
      this._runningServer = this.express.listen(config.get('port'), this._serverController);
      logger.info('Server listening on port ' + config.get('port'));
    } catch (e) {
      logger.warn('Starting server failed with error:', e);
    }
  }

  stop() {
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
