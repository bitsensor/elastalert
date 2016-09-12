import RouteLogger from 'src/routes/route_logger';
import {sendRequestError} from 'src/common/errors/utils';

let logger = new RouteLogger('/rules/:id', 'POST');

export default function rulePostHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  server.rulesController.rule(request.params.id)
    .then(function (rule) {
      rule.edit(request.body.yaml)
        .then(function (rule) {
          result.send(rule);
          logger.sendSuccessful();
        })
        .catch(function (error) {
          sendRequestError(request, error);
          logger.sendFailed(error);
        });
    })
    .catch(function (error) {
      sendRequestError(request, error);
    });
}
