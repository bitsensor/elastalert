// Defines the config's Joi schema
import Joi from 'joi';

const schema = Joi.object().keys({
  'appName': Joi.string().default('elastalert-server'),
  'es_host': Joi.string().default('elastalert'),
  'es_port': Joi.number().default(9200),
  'writeback_index': Joi.string().default('elastalert_status'),
  'port': Joi.number().default(3030),
  'elastalertPath': Joi.string().default('/opt/elastalert'),
  'rulesPath': Joi.object().keys({
    'relative': Joi.boolean().default(true),
    'path': Joi.string().default('/rules')
  }).default(),
  'templatesPath': Joi.object().keys({
    'relative': Joi.boolean().default(true),
    'path': Joi.string().default('/rule_templates')
  }).default(),
  'dataPath': Joi.object().keys({
    'relative': Joi.boolean().default(true),
    'path': Joi.string().default('/server_data')
  }).default()
}).default();

export default schema;
