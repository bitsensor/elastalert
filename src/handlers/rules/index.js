import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/rules');

export default function rulesHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  let path = request.query.path || '';

  server.rulesController.getRules(path)
    .then(function (rules) {
      result.send(rules);
      logger.sendSuccessful();
    })
    .catch(function (error) {
      console.log('Rejected in handler with', error);
      if (error.code) {
        result.status(error.code).send(error);
      } else {
        result.status(500).send(error);
      }
      logger.sendFailed(error);
    });
}
