import RouteLogger from '../../routes/route_logger';

let logger = new RouteLogger('/config');

export default function configGetHandler(request, result) {
  result.send({
    path: '/config',
    method: 'GET',
    status: 'configGetHandler'
  });

  logger.sendSuccessful();
}
