import FileSystemController from './file_system';

export default class RulesController {
  constructor() {
    this._fileSystemController = new FileSystemController();
  }

  getRules(path) {

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
