// # This is an example of a route handler

// Use the route logger for logging in route handlers
import RouteLogger from '../routes/route_logger';

// Use this class to create request errors
import RequestError from '../common/errors/request_error';

// Use the sendRequestError function to send RequestError instances.
import {sendRequestError} from '../common/errors/utils';

// Replace [route_path] with the route we're currently on
let logger = new RouteLogger('/[route_path]');

/* If only one method is used on this path you should name the handler [route_name]Handler, otherwise use [route_name][route_method]Handler.
 * If the name becomes too long (for example when having long paths like /the/immensely/very/long/path, which should become theImmenselyVeryLongPathGetHandler)
 * feel free to neglect the rule and come up with something else.
 *
 * Documentation about 'request' and 'response' can be found at the Express JS documentation (http://expressjs.com/en/4x/api.html#req).
 */
export default function exampleHandler(request, response) {

  // This gives you the running ElastalertServer instance
  let server = request.app.get('server');

  // This for example returns the Express instance used by the server
  server.express();

  let successful = true;

  if (successful) {

    // This is just an example response. You definitely don't have to send back what route was called with what method
    let data = {
      path: '/[route_path]',
      method: 'GET',
      status: 'errorsHandler'
    };

    // Sending the response
    response.send(data);

    // Logging a successful response
    logger.sendSuccessful(data);
  } else {

    // Create a request error by making an instance of RequestError. In this case, you're the teapot for changing 'successful' to false (https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol).
    let error = new RequestError('ExampleFailed', 'Someone changed \'successful\' in the example handler and thereby triggered an error.', 418, { property: 'value' });

    // Send the error using this function. It'll properly map the Request Error to readable HTTP errors.
    sendRequestError(response, error);

    // Logging a failed response
    logger.sendFailed(error);
  }
}
