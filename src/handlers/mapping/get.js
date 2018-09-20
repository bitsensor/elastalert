import { getClient } from '../../common/elasticsearch_client';

var client = getClient();

export default function metadataHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  
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
