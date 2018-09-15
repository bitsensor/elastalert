import yaml from 'js-yaml';
import fs from 'fs';
import process from 'process';
import elasticsearch from 'elasticsearch';

export function getConfig() {
  try {
    var appRoot = process.cwd();
    var config = yaml.safeLoad(fs.readFileSync(appRoot + '/config/elastalert.yaml', 'utf8'));
    return config;
  } catch (e) {
    console.error(e);
  }
}

export function getClient() {
  var config = getConfig();
  var client = new elasticsearch.Client({
    hosts: [ `http://${config.es_host}:${config.es_port}`]
  });
  return client;
}
