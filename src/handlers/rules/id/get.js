import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/rules/:id');

export default function ruleGetHandler(request, result) {
  result.send({
    path: '/rules/:id',
    method: 'GET',
    status: 'ruleGetHandler',
    id: request.params.id
  });

  logger.sendSuccessful();
}
