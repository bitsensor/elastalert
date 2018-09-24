import { getClient } from '../../common/elasticsearch_client';

export default function metadataHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  
  var client = getClient();

  client.indices.getMapping({
    index: request.params.index
  }).then(function(resp) {
    response.send(resp);
  }, function(err) {
    response.send({
      error: err
    });
  });

}
