import RouteLogger from '../../routes/route_logger';
import {sendRequestError} from '../../common/errors/utils';
import { RuleNotSendError, OptionsInvalidError} from '../../common/errors/test_request_errors';
import Joi from 'joi';

let logger = new RouteLogger('/test_stream', 'POST');

const optionsSchema = Joi.object().keys({
  testType: Joi.string().valid('all', 'schemaOnly', 'countOnly').default('all'),
  days: Joi.number().min(1).default(1),
  alert: Joi.boolean().default(false),
  format: Joi.string().default(''),
  maxResults: Joi.number().default(0)
}).default();

function analyzeRequest(request) {
  if (!request.query.rule) {
    return new RuleNotSendError();
  }

  const validationResult = Joi.validate(JSON.parse(request.query.options), optionsSchema);

  if (validationResult.error) {
    return new OptionsInvalidError(validationResult.error);
  }

  return request.body;
}

export default function testStreamGetHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');
  let body = analyzeRequest(request);

  try {
    var options = JSON.parse(request.query.options);  
  } catch (error) {
    response.status(500).send();
  }
  
  if (body.error) {
    logger.sendFailed(body.error);
    sendRequestError(response, body.error);
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  try {
    server.testController.testRule(request.query.rule, options, true, response);
  } catch (error) {
    response.status(500).send();
  }
}
