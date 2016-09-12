export default function controlHandler(request, result) {
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

  result.send({
    success: success,
  });
}
