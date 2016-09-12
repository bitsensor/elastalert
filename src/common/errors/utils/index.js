export function sendRequestError(result, error) {
  result.status(error.code || 500).send(error);
}
