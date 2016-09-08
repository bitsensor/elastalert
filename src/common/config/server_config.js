import Joi from 'joi';
import fs from 'fs';
import path from 'path';
import schema from './schema';
import resolvePath from 'object-resolve-path';
import Logger from '../logger';

// Config file relative from project root
const configFile = 'config/config.json';
const devConfigFile = 'config/config.dev.json';

const configPath = path.join(process.cwd(), configFile);
const devConfigPath = path.join(process.cwd(), devConfigFile);
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
      self._getConfig().then(function (config) {
        self._validate(config);
        resolve();
      });
    }).then(function () {
      self._waitList.forEach(function (callback) {
        callback();
      });
    });
  }

  _getConfig() {
    const self = this;

    return new Promise(function (resolve) {
      self._fileExists(devConfigPath).then(function (devConfigFound) {

        // If a dev config was found read it, otherwise check for normal config
        if (devConfigFound) {
          self._readFile(devConfigPath)
            .then(function (config) {
              resolve(config);
            })
            .catch(function () {
              resolve({});
            });
        } else {
          logger.info('Proceeding to look for normal config file.');
          self._fileExists(configPath).then(function (configFound) {
            if (configFound) {
              self._readFile(configPath)
                .then(function (config) {
                  resolve(config);
                })
                .catch(function () {
                  resolve({});
                });
            } else {
              logger.info('Using default config.');
              // If no config was found, return empty object to load defaults
              resolve({});
            }
          });
        }
      });
    });
  }

  /**
   * Checks if the config file exists and we have reading permissions
   *
   * @returns {Promise} Promise returning true if the file was found and false otherwise.
   * @private
   */
  _fileExists(filePath) {
    return new Promise(function (resolve) {
      // Check if the config file exists and has reading permissions
      try {
        fs.access(filePath, fs.F_OK | fs.R_OK, function (error) {
          if (error) {
            if (error.errno === -2) {
              logger.info(`No ${path.basename(filePath)} file was found in ${filePath}.`);
            } else {
              logger.warn(`${filePath} can't be read because of reading permission problems. Falling back to default configuration.`);
            }
            resolve(false);
          } else {
            logger.info(`A config file was found in ${filePath}. Using that config.`);
            resolve(true);
          }
        });
      } catch (error) {
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
  _readFile(file) {
    return new Promise(function (resolve, reject) {
      fs.readFile(file, 'utf8', function (error, config) {
        if (error) {
          logger.warn(`Unable to read config file in (${file}). Using default configuration. Error: `, error);
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
