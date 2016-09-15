import RouteLogger from 'src/routes/route_logger';
import {sendRequestError} from 'src/common/errors/utils';

let logger = new RouteLogger('/rules/:id');

export default function ruleGetHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.get()
        .then(function (rule) {
          result.send(rule);
          logger.sendSuccessful();
        })
        .catch(function (error) {
          logger.sendFailed(error);
          sendRequestError(result, error);
        });
    })
    .catch(function (error) {
      logger.sendFailed(error);
      sendRequestError(result, error);
    });
}
