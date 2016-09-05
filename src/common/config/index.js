import Joi from 'joi';
import jsonServerConfig from 'config/server';
import schema from './schema';
import resolvePath from 'object-resolve-path';

class ServerConfig {
  constructor() {
    /**
     * Validate the JSON config
     */
    try {
      this._jsonConfig = Joi.validate(jsonServerConfig, schema).value;
    } catch (e) {
      console.error('The config in \'config/server.json\' is not a valid config configuration. Error: ', e);
    }
  }

  get(value) {
    return resolvePath(this._jsonConfig, value);
  }
}

export default new ServerConfig();
