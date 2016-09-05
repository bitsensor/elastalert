import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/config');

export default function configPostHandler(request, result) {
  result.send({
    path: '/config',
    method: 'POST',
    status: 'configPostHandler'
  });

  logger.sendSuccessful();
}
