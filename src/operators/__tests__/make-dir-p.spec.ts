import makeDirP from '../make-dir-p';
import { of } from 'rxjs';
import { promisify } from 'util';
import fs from 'fs';
import rimraf from 'rimraf';

const exists = promisify(fs.exists);

describe('makeDirP', () => {
  //Arrange
  const inputDir = './';
  const outputDir = './test';

  beforeAll(() => {
    rimraf.sync(outputDir);
  });

  afterAll(() => {
    rimraf.sync(outputDir);
  });

  it('should be a function of arity 0', () => {
    //Assert
    expect(makeDirP).toBeInstanceOf(Function);
    expect(makeDirP).toHaveLength(0);
  });

  it('should create a directory if it does not exists', async () => {
    //Act
    await of({ inputDir, outputDir })
      .pipe(makeDirP())
      .toPromise();

    //Assert
    expect(await exists(outputDir)).toBeTruthy();
  });
});
