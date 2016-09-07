import lodash from 'lodash';
import Logger from '../common/logger';
import routes from './routes';

let logger = new Logger('Router');

export default function setupRouter(express) {
  routes.forEach(function (route) {

    if (lodash.isArray(route.method)) {
      route.method.forEach(function (method, index) {
        _setupRoute(
          lodash.merge(
            lodash.cloneDeep(route), {
              method: method,
              handler: route.handler[index]
            }));
      });
    } else {
      _setupRoute(route);
    }
  });

  function _setupRoute(route) {
    let methodFunctionName = route.method.toLowerCase();
    express[methodFunctionName]('/' + route.path, route.handler);
    logger.info('Listening for ' + route.method + ' request on /' + route.path + '.');
  }
}
