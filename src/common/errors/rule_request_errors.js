import RequestError from 'src/common/errors/request_error';

export class RuleNotFoundError extends RequestError {
  constructor(ruleID) {
    super('ruleNotFound', `The requested rule with id: '${ruleID}' couldn't be found.`, 404);
  }
}

export class RuleNotReadableError extends RequestError {
  constructor(ruleID) {
    super('ruleNotReadable', `The requested rule with id: '${ruleID}' isn't readable by the file system.`, 403);
  }
}

export class RuleNotWritableError extends RequestError {
  constructor(ruleID) {
    super('ruleNotWritable', `The requested rule with id: '${ruleID}' isn't writable by the file system.`, 403);
  }
}
