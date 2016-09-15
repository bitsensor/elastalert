import RouteLogger from 'src/routes/route_logger';
import sendRequestError from 'src/common/errors/utils';

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
      sendRequestError(error);
    });
}
