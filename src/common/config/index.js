import ServerConfig from './server_config';

let config = new ServerConfig();
console.log('doing loading config');
config.load();

export default config;
