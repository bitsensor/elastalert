import {joinPath} from 'path';
import FileSystemController from './file_system';
import config from 'src/common/config';
import {RuleNotFoundError, RuleNotReadableError, RuleNotWritableError} from 'src/common/errors/rule_request_errors';

export default class RulesController {
  constructor() {
    this._fileSystemController = new FileSystemController();
    this.rulesFolder = this._getRulesFolder();
  }

  getRules(path) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._fileSystemController.readDirectory(joinPath(self.rulesFolder, path))
        .then(function (directoryIndex) {
          resolve(directoryIndex);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  rule(id) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._findRule(id)
        .then(function (access) {
          resolve({
            get: function () {
              if (access.read) {
                return self._getRule(id);
              }
              return self._getErrorPromise(new RuleNotReadableError(id));
            },
            edit: function (body) {
              if (access.write) {
                return self._editRule(id, body);
              }
              return self._getErrorPromise(new RuleNotWritableError(id));
            },
            delete: function () {
              return self._deleteRule(id);
            }
          });
        })
        .catch(function () {
          reject(new RuleNotFoundError(id));
        });
    });
  }

  _findRule(id) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._fileSystemController.fileExists(joinPath(self.rulesFolder, id))
        .then(function (exists, access) {
          if (!exists) {
            reject();
          } else {
            resolve(access);
          }
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  _getRule(id) {
    const path = joinPath(this.rulesFolder, id);
    return this._fileSystemController.readFile(path);
  }

  _editRule(id, body) {
    const path = joinPath(this.rulesFolder, id);
    return this._fileSystemController.writeFile(path, body);
  }

  _deleteRule(id) {
    const path = joinPath(this.rulesFolder, id);
    return this._fileSystemController.deleteFile(path);
  }

  _getErrorPromise(error) {
    return new Promise(function (resolve, reject) {
      reject(error);
    });
  }

  _getRulesFolder() {
    const ruleFolderSettings = config.get('rulesPath');

    if (ruleFolderSettings.relative) {
      return joinPath(config.get('elastalertPath'), ruleFolderSettings.path);
    } else {
      return ruleFolderSettings.path;
    }
  }
}
