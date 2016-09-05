import config from './../../common/config';
import {spawn} from 'child_process';
import Logger from './../../common/logger';
import {Status} from '../../common/status';

let logger = new Logger('ProcessController');

export default class ProcessController {

  constructor() {
    this._elastAlertPath = config.get('elastAlertPath');
    this._status = Status.IDLE;

    /**
     * @type {ChildProcess}
     * @private
     */
    this._process = null;
  }

  get status() {
    return this._status;
  }

  /**
   * Start ElastAlert if it isn't already running.
   */
  start() {
    // Do not do anything if ElastAlert is already running
    if (this._process !== null) {
      logger.warn('ElastAlert is already running!');
      return;
    }

    // Start ElastAlert from the directory specified in the config
    logger.info('Starting ElastAlert');
    this._status = Status.STARTING;
    this._process = spawn('python', ['elastalert/elastalert.py'], {
      cwd: this._elastAlertPath
    });

    logger.info('Started Elastalert (PID: ' + this._process.pid + ')');
    this._status = Status.READY;

    // Redirect stdin/stderr to logger
    this._process.stdout.on('data', (data) => {
      logger.info(data.toString());
    });
    this._process.stderr.on('data', (data) => {
      logger.error(data.toString());
    });

    // Set listeners for ElastAlert exit
    this._process.on('exit', (code, signal) => {
      if (code === 0) {
        logger.info('ElastAlert exited with code ' + code);
        this._status = Status.IDLE;
      } else {
        logger.error('ElastAlert exited with code ' + code);
        this._status = Status.ERROR;
      }
      this._process = null;
    });

    // Set listener for ElastAlert error
    this._process.on('error', (err) => {
      logger.error('ElastAlert error: ' + err.toString());
      this._status = Status.ERROR;
      this._process = null;
    });
  }

  /**
   * Stop ElastAlert if it is running.
   */
  stop() {
    if (this._process !== null) {
      // Stop ElastAlert
      logger.info('Stopping ElastAlert (PID: ' + this._process.pid + ')');
      this._status = Status.CLOSING;
      this._process.kill('SIGINT');
    } else {
      // Do not do anything if ElastAlert is not running
      logger.info('ElastAlert is not running')
    }
  }
}
