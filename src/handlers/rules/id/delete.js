import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/rules/:id', 'DELETE');

export default function ruleDeleteHandler(request, result) {
  result.send({
    path: '/rules/:id',
    method: 'DELETE',
    status: 'ruleDeleteHandler',
    id: request.params.id
  });

  logger.sendSuccessful();
}
