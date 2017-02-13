import RouteLogger from '../../routes/route_logger';

let logger = new RouteLogger('/config');

export default function configPostHandler(request, response) {
  response.send({
    path: '/config',
    method: 'POST',
    status: 'configPostHandler'
  });

  logger.sendSuccessful();
}
