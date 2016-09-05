import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/status');

export default function statusHandler(request, result) {
  result.send({
    path: '/status',
    method: 'GET',
    status: 'statusHandler'
  });

  logger.sendSuccessful();
}
