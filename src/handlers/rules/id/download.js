import RouteLogger from '../../../routes/route_logger';
import { sendRequestError } from '../../../common/errors/utils';
import { URLNotSentError, URLNotPointingTar } from '../../../common/errors/rule_request_errors';
import path from 'path';

let logger = new RouteLogger('/download');


export default function downloadRulesHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');
  let body = request.body;


  function _test_body(body) {
    if (!body || !body.url) {
      return new URLNotSentError();
    }
    let filename = path.basename(body.url);
    if (!filename.endsWith('.tar')) {
      return new URLNotPointingTar();
    }
    return body;
  }

  body = _test_body(body);
  if (body.error) {
    logger.sendFailed(body.error);
    sendRequestError(response, body.error);
    return;
  }


  server.rulesController.downloadRules(body.url)
    .then(() => {
      logger.sendSuccessful();
      return response.send({
        downloaded: true,
        extracted: true,
        url: body.url
      });
    })
    .catch((error) => {
      logger.sendFailed(error);
      sendRequestError(response, error);
    });

}
