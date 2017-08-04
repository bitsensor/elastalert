import fs from 'fs';
import { join as joinPath } from 'path';
import mkdirp from 'mkdirp';

export default class FileSystem {
  constructor() { }

  readDirectory(path) {
    const self = this;
    return new Promise(function (resolve, reject) {
      try {
        fs.readdir(path, function (error, elements) {
          if (error) {
            reject(error);
          } else {
            let statCount = 0;
            let directoryIndex = self.getEmptyDirectoryIndex();

            if (elements.length == 0) {
              resolve(directoryIndex);
            }

            elements.forEach(function (element) {
              fs.stat(joinPath(path, element), function (error, stats) {
                if (stats.isDirectory()) {
                  directoryIndex.directories.push(element);
                } else if (stats.isFile()) {
                  directoryIndex.files.push(element);
                }

                statCount++;
                if (statCount === elements.length) {
                  resolve(directoryIndex);
                }
              });
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  directoryExists(path) {
    return this._exists(path);
  }

  createDirectoryIfNotExists(pathToFolder) {
    let self = this;

    return new Promise(function (resolve, reject) {
      self.directoryExists(pathToFolder).then(function (exists) {
        if (!exists) {
          mkdirp(pathToFolder, function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  }

  /*deleteDirectory(path) {

  }*/

  fileExists(path) {
    return this._exists(path);
  }

  readFile(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (error, content) {
        error ? reject(error) : resolve(content);
      });
    });
  }

  writeFile(path, content = '') {
    return new Promise(function (resolve, reject) {
      try {
        fs.writeFile(path, content, function (error) {
          error ? reject(error) : resolve();
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  deleteFile(path) {
    return new Promise(function (resolve, reject) {
      fs.unlink(path, function (error) {
        error ? reject(error) : resolve();
      });
    });
  }

  getEmptyDirectoryIndex() {
    return {
      directories: [],
      files: []
    };
  }

  _exists(path) {
    return new Promise(function (resolve, reject) {
      try {
        fs.access(path, fs.F_OK, function (error) {
          error ? resolve(false) : resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
