export function sendRequestError(result, error) {
  result.status(error.statusCode || 500).send(error);
}
