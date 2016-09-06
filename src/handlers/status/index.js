import {Status} from '../../common/status';

export default function statusHandler(request, result) {
  /**
   * @type {ElastalertServer}
   */
  var server = request.app.get('server');
  var status = server.processController.status;

  result.send({
    path: '/status',
    method: 'GET',
    status: Status(status)
  });
}
