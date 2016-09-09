import FileSystemController from './file_system';

export default class RulesController {
  constructor() {
    this._fileSystemController = new FileSystemController();
  }

  getRules(path) {
    return new Promise(function (resolve, reject) {
      this._fileSystemController.readDirectory(path)
        .then(function (directoryIndex) {
          resolve(directoryIndex);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  rule(id) {
    return {
      get: function () {
        return _getRule(id);
      },
      edit: function (body) {
        return _editRule(id, body);
      },
      delete: function () {
        return _deleteRule(id)
      }
    };
  }

  _getRule(id) {

  }

  _editRule(id, body) {

  }

  _deleteRule(id) {

  }
}
