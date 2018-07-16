import fs from 'fs';
import { of, bindNodeCallback } from 'rxjs';
import { promisify } from 'util';
import rimraf from 'rimraf';
import path from 'path';

import copyFile from '../copy-file';
import { concatMap } from '../../../node_modules/rxjs/operators';

const mkdir = bindNodeCallback(fs.mkdir);
const writeFile = bindNodeCallback(fs.writeFile);
const unlink = promisify(fs.unlink);
const exists = promisify(fs.exists);

describe('copyFile', () => {
  const inputDir = './';
  const outputDir = './test/';
  const file = 'lol.txt';

  const inputFileLocation = path.join(inputDir, file);

  it('should be a function of arity 1', () => {
    //Assert
    expect(copyFile).toBeInstanceOf(Function);
    expect(copyFile).toHaveLength(1);
  });

  it('should copy the file from the initial location to the destination ', async () => {
    //Arrange
    const inputDir = './';
    const outputDir = path.join(__dirname, 'test');

    !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
    fs.writeFileSync(inputFileLocation, JSON.stringify({}));

    //Act
    await of({ inputDir, outputDir })
      .pipe(copyFile(file))
      .toPromise();

    //Assert

    try {
      //This will not throw if it exists
      fs.accessSync(path.join(outputDir, file));

      //Cleanup
      fs.unlinkSync(inputFileLocation);
      rimraf.sync(outputDir);
    } catch (e) {
      fail('The file was not copied over');
    }
  });
});
