import {join as joinPath, normalize as normalizePath, extname as pathExtension} from 'path';
import mkdirp from 'mkdirp';
import FileSystemController from './file_system';
import config from 'src/common/config';
import Logger from 'src/common/logger';
import {RuleNotFoundError, RuleNotReadableError, RuleNotWritableError,
  RulesFolderNotFoundError, RulesRootFolderNotCreatableError} from 'src/common/errors/rule_request_errors';

let logger = new Logger('RulesController');

export default class RulesController {
  constructor() {
    this._fileSystemController = new FileSystemController();
    this.rulesFolder = this._getRulesFolder();
  }

  getRules(path) {
    const self = this;
    const fullPath = joinPath(self.rulesFolder, path);
    return new Promise(function (resolve, reject) {
      self._fileSystemController.readDirectory(fullPath)
        .then(function (directoryIndex) {

          directoryIndex.rules = directoryIndex.files.filter(function (fileName) {
            return pathExtension(fileName).toLowerCase() === '.yaml';
          }).map(function (fileName) {
            return fileName.slice(0, -5);
          });

          delete directoryIndex.files;
          resolve(directoryIndex);
        })
        .catch(function (error) {

          // Check if the requested folder is the rules root folder
          if (normalizePath(self.rulesFolder) === fullPath) {

            // Try to create the root folder
            mkdirp(fullPath, function (error) {
              if (error) {
                reject(new RulesRootFolderNotCreatableError());
                logger.warn(`The rules root folder (${fullPath}) couldn't be found nor could it be created by the file system.`);
              } else {
                resolve([]);
              }
            });
          } else {
            logger.warn(`The requested folder (${fullPath}) couldn't be found / read by the server. Error:`, error);
            reject(new RulesFolderNotFoundError(path));
          }
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
