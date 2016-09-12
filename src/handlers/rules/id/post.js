import RouteLogger from 'src/routes/route_logger';
import {sendRequestError} from 'src/common/errors/utils';

let logger = new RouteLogger('/rules/:id', 'POST');

export default function rulePostHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  console.log('body', request.body);
  let server = request.app.get('server');
  let body = request.body ? request.body.yaml : undefined;

  console.log('body', request.body);

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.edit(body)
        .then(function () {
          result.send({
            created: true,
            id: request.params.id
          });
          logger.sendSuccessful();
        })
        .catch(function (error) {
          sendRequestError(result, error);
          logger.sendFailed(error);
        });
    })
    .catch(function (error) {
      if (error.type === 'ruleNotFound') {
        server.rulesController.createRule(request.params.id, body)
          .then(function () {
            logger.sendSuccessful();
            result.send({
              created: true,
              id: request.params.id
            });
          })
          .catch(function (error) {
            logger.sendFailed(error);
            sendRequestError(result, error);
          });
      } else {
        logger.sendFailed(error);
        sendRequestError(result, error);
      }
    });
}
