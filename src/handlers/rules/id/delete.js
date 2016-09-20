import RouteLogger from '../../../routes/route_logger';
import {sendRequestError} from '../../../common/errors/utils';

let logger = new RouteLogger('/rules/:id', 'DELETE');

export default function ruleDeleteHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.delete()
        .then(function (rule) {
          result.send(rule);
          logger.sendSuccessful({
            deleted: true,
            id: request.params.id
          });
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
