import Joi from 'joi';
import fs from 'fs';
import path from 'path';
import schema from './schema';
import resolvePath from 'object-resolve-path';
import Logger from '../logger';

// Config file relative from project root
const configFile = 'config/config.json';

const configPath = path.join(process.cwd(), configFile);
const logger = new Logger('Config');

export default class ServerConfig {
  constructor() {
    // ready() callbacks
    this._waitList = [];

    // Actual config
    this._jsonConfig = null;
  }

  /**
   * Get a value from the config.
   *
   * @param {String} key The key to load the value from.
   * @returns {*}
   */
  get(key) {
    return resolvePath(this._jsonConfig, key);
  }

  /**
   * Register a callback to call when the config is ready loading.
   *
   * @param {Function} callback The callback to register.
   */
  ready(callback) {
    this._waitList.push(callback);
  }

  /**
   * Loads the config by reading the config file or falling back to defaults.
   *
   * @returns {Promise} Returns a promise which resolves when everything is done (as a promise would).
   */
  load() {

    //TODO: Watch config file for changes and reload
    const self = this;
    return new Promise(function (resolve) {
      self._hasConfig().then(function (configFound) {
        if (configFound) {
          self._readConfig()
            .then(function (config) {
              self._validate(config);
              resolve();
            })
            .catch(function () {
              // Validating with an empty object will cause the default config to return
              self._validate({});
              resolve();
            });
        } else {
          self._validate({});
          resolve();
        }
      });
    }).then(function () {
      self._waitList.forEach(function (callback) {
        callback();
      });
    });
  }

  /**
   * Checks if the config file exists and we have reading permissions
   *
   * @returns {Promise} Promise returning true if the file was found and false otherwise.
   * @private
   */
  _hasConfig() {
    return new Promise(function (resolve) {
      // Check if the config file exists and has reading permissions
      try {
        fs.access(configPath, fs.F_OK | fs.R_OK, function (error) {
          if (error) {
            if (error.errno ===  -2) {
              logger.info(`No ${path.basename(configPath)} file was found in ${configPath}. Using default configuration.`);
            } else {
              logger.warn(`${configPath} can't be read because of reading permission problems. Falling back to default configuration.`);
            }
            resolve(false);
          } else {
            logger.info(`A config file was found in ${configPath}. Using that config.`);
            resolve(true);
          }
        });
      } catch(error) {
        logger.error('Error getting access information with fs using `fs.access`. Error:', error);
      }
    });
  }

  /**
   * Reads the config file.
   *
   * @returns {Promise} Promise returning the config if successfully read. Rejects if reading the config failed.
   * @private
   */
  _readConfig() {
    return new Promise(function (resolve, reject) {
      fs.readFile(configPath, 'utf8', function (error, config) {
        if (error) {
          logger.warn(`Unable to read config file in (${configPath}). Using default configuration. Error: `, error);
          reject();
        } else {
          resolve(config);
        }
      });
    });
  }

  /**
   * Validate the config using the Joi schema.
   *
   * @param {Object} jsonConfig The config to validate.
   * @private
   */
  _validate(jsonConfig) {
    // Validate the JSON config
    try {
      this._jsonConfig = Joi.validate(jsonConfig, schema).value;
    } catch (error) {
      logger.error('The config in \'config/config.json\' is not a valid config configuration. Error: ', error);
    }
  }
}
