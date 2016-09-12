export function sendRequestErorr(request, error) {
  request.status(error.code || 500).send(error);
}
