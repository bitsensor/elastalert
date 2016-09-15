export default class RequestError {
  constructor(errorType, message = '', statusCode = 500, data) {
    this.error = errorType;
    this.message = message;
    this.statusCode = statusCode;

    if (typeof data !== 'undefined') {
      this.data = data;
    }
  }
}
