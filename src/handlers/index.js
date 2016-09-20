import RouteLogger from '../routes/route_logger';
import npm from '../../package.json';
import config from '../common/config';

let logger = new RouteLogger('/');

export default function indexHandler(request, result) {
  let info = {
    name: config.get('appName'),
    port: config.get('port'),
    version: npm.version
  };

  result.send(info);
  logger.sendSuccessful();
}
