import RouteLogger from '../../routes/route_logger';
import sendRequestError from '../../common/errors/utils';

let logger = new RouteLogger('/templates');

export default function templatesHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');

  let path = request.query.path || '';

  server.templatesController.getTemplates(path)
    .then(function (templates) {
      response.send(templates);
      logger.sendSuccessful();
    })
    .catch(function (error) {
      sendRequestError(error);
    });
}
