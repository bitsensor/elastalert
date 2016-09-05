import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/rules/:id', 'POST');

export default function rulePostHandler(request, result) {
  result.send({
    path: '/rules/:id',
    method: 'POST',
    status: 'rulePostHandler',
    id: request.params.id
  });

  logger.sendSuccessful();
}
