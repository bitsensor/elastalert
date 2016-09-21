export default function controlHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  var server = request.app.get('server');

  var success = false;

  switch (request.params.action) {
    case 'start':
      server.processController.start();
      success = true;
      break;
    case 'stop':
      server.processController.stop();
      success = true;
      break;
    default:
      success = false;
      break;
  }

  response.send({
    success: success,
  });
}
