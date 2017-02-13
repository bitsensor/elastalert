import RouteLogger from '../routes/route_logger';
import npm from '../../package.json';
import config from '../common/config';

let logger = new RouteLogger('/');

export default function indexHandler(request, response) {
  let info = {
    name: config.get('appName'),
    port: config.get('port'),
    version: npm.version
  };

  response.send(info);
  logger.sendSuccessful();
}
