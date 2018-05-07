import RequestError from './request_error';

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

export class RulesFolderNotFoundError extends RequestError {
  constructor(path) {
    super('rulesFolderNotFound', `The requested folder with path: '${path}' couldn't be found.`, 404);
  }
}

export class RulesFolderNotReadableError extends RequestError {
  constructor(path) {
    super('rulesFolderNotReadable', `The requested folder with path: '${path}' isn't readable by the file system.`, 403);
  }
}

export class RulesFolderNotWritableError extends RequestError {
  constructor(path) {
    super('rulesFolderNotWritable', `The requested folder with path: '${path}' isn't writable by the file system.`, 403);
  }
}

export class RulesRootFolderNotCreatableError extends RequestError {
  constructor() {
    super('rulesRootFolderNotCreatable', 'The rules folder wasn\'t found and couldn\'t be created by the file system.', 403);
  }
}
export class URLNotSentError extends RequestError {
  constructor() {
    super('URLNotSentError', 'URL is missing in the body', 400);
  }
}
export class URLNotPointingTar extends RequestError {
  constructor() {
    super('URLNotPointingTar', 'URL is not pointing to .tar file', 400);
  }
}
