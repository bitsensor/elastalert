/**
 * Defines the config's Joi schema
 */
import Joi from 'joi';

const schema = Joi.object().keys({
  'appName': Joi.string().default('elastalert-server'),
  'port': Joi.number().default(3030)
});

export default schema;
