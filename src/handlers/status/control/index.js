import RouteLogger from 'src/routes/route_logger';

let logger = new RouteLogger('/status/control');

export default function controlHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  var server = request.app.get('server');
  switch (request.params.action) {
    case 'start':
      server.processController.start();
      break;
    case 'stop':
      server.processController.stop();
      break;
  }

  result.send({
    path: '/status/control',
    method: 'GET',
    status: 'controlHandler',
    action: request.params.action,
  });
}
