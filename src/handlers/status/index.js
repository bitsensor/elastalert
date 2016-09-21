import {Status} from '../../common/status';

export default function statusHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  var server = request.app.get('server');
  var status = server.processController.status;

  response.send({
    status: Status(status)
  });
}
