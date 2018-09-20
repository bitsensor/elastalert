import { getConfig, getClient } from '../../common/elasticsearch_client';

var config = getConfig();
var client = getClient();

function getQueryString(request) {
  if (request.params.type === 'elastalert_error') {
    return '*:*';
  }
  else {
    return `rule_name:${request.query.rule_name || '*'}`;
  }
}

export default function metadataHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  client.search({
    index: config.writeback_index,
    type: request.params.type,
    body: {
      from : request.query.from || 0, 
      size : request.query.size || 100,
      query: {
        query_string: {
          query: getQueryString(request)
        }
      },
      sort: [{ '@timestamp': { order: 'desc' } }]
    }
  }).then(function(resp) {
    resp.hits.hits = resp.hits.hits.map(h => h._source);
    response.send(resp.hits);
  }, function(err) {
    response.send({
      error: err
    });
  });

}
