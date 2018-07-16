import fs from 'fs';
import { of } from 'rxjs';

import rimraf from 'rimraf';
import path from 'path';

import copyFile from '../copy-file';

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
