import RouteLogger from '../../routes/route_logger';
import sendRequestError from '../../common/errors/utils';

let logger = new RouteLogger('/rules');

export default function rulesHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  let path = request.query.path || '';

  server.rulesController.getRules(path)
    .then(function (rules) {
      response.send(rules);
      logger.sendSuccessful();
    })
    .catch(function (error) {
      sendRequestError(error);
    });
}
