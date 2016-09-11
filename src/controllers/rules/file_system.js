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

  createDirectory(path, directoryName) {

  }

  deleteDirectory(path) {

  }

  fileExists(path) {

  }

  createFile(path, fileName, content = '') {

  }

  readFile(path) {

  }

  writeFile(path, content) {

  }

  deleteFile(path) {

  }
}
