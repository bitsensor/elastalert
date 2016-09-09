import RequestError from 'src/common/errors/request_error';

export class RuleNotFoundError extends RequestError {
  constructor(ruleID) {
    super('ruleNotFound', `The requested rule with id: '${ruleID}' couldn't be found.`, 404);
  }
}
