import fs from 'fs';
import {join as joinPath} from 'path';

export default class FileSystemController {
  constructor() {

  }

  readDirectory(path) {
    return new Promise(function (resolve, reject) {
      try {
        fs.readdir(path, function (error, elements) {
          if (error) {
            reject(error);
          } else {
            let statCount = 0;
            let directoryIndex = {
              directories: [],
              files: []
            };

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

  /*createDirectory(path, directoryName) {

  }*/

  /*deleteDirectory(path) {

  }*/

  fileExists(path) {
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

  /*createFile(path, fileName, content = '') {

  }*/

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
}
