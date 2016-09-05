import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/status/errors');

export default function errorsHandler(request, result) {
  result.send({
    path: '/status/errors',
    method: 'GET',
    status: 'errorsHandler'
  });

  logger.sendSuccessful();
}
