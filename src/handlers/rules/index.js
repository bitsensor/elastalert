import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/rules');

export default function rulesHandler(request, result) {
  result.send({
    path: '/rules',
    method: 'GET',
    status: 'rulesHandler'
  });

  logger.sendSuccessful();
}
