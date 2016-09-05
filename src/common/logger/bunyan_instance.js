import bunyan from 'bunyan';
import serverConfig from '../config';

let logger = bunyan.createLogger({
  name: serverConfig.get('appName')
});

export default logger;
