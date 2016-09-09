export default class RequestError {
  constructor(type, message = '', code = 500) {
    this.type = type;
    this.message = message;
    this.code = code;
  }
}
