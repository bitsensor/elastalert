import RouteLogger from '../../../routes/route_logger';
import {sendRequestError} from '../../../common/errors/utils';

let logger = new RouteLogger('/rules/:id', 'POST');

export default function rulePostHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');
  let body = request.body ? request.body.yaml : undefined;

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.edit(body)
        .then(function () {
          response.send({
            created: true,
            id: request.params.id
          });
          logger.sendSuccessful();
        })
        .catch(function (error) {
          logger.sendFailed(error);
          sendRequestError(response, error);
        });
    })
    .catch(function (error) {
      if (error.error === 'ruleNotFound') {
        server.rulesController.createRule(request.params.id, body)
          .then(function () {
            logger.sendSuccessful();
            response.send({
              created: true,
              id: request.params.id
            });
          })
          .catch(function (error) {
            logger.sendFailed(error);
            sendRequestError(response, error);
          });
      } else {
        logger.sendFailed(error);
        sendRequestError(response, error);
      }
    });
}
