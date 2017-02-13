import RouteLogger from '../../../routes/route_logger';
import {sendRequestError} from '../../../common/errors/utils';

let logger = new RouteLogger('/rules/:id');

export default function ruleGetHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.get()
        .then(function (rule) {
          response.send(rule);
          logger.sendSuccessful();
        })
        .catch(function (error) {
          logger.sendFailed(error);
          sendRequestError(response, error);
        });
    })
    .catch(function (error) {
      logger.sendFailed(error);
      sendRequestError(response, error);
    });
}
