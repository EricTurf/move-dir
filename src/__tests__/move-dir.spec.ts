import moveDir from '../move-dir';
import { Observable } from 'rxjs';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

/* 
Create the following structure to copy over
├── input
|   ├── folder1
|   |   └── file
|   ├── folder2
|   |   └── folder3
|   |        └── file
    |──file
 */

const inputDir = path.join(__dirname, 'input');
const folder1Path = path.join(__dirname, 'input', 'folder1');
const folder2Path = path.join(__dirname, 'input', 'folder2');
const folder3Path = path.join(__dirname, 'input', 'folder2', 'folder3');
const outputDir = path.join(__dirname, 'moved');
const rootFilePath = path.join(inputDir, 'root.txt');
const lol1FilePath = path.join(folder1Path, 'lol.txt');
const lol2FilePath = path.join(folder2Path, 'lol2.txt');
const lol3FilePath = path.join(folder3Path, 'lol3.txt');

//An array of all paths used to create folder structure to test
const paths = [
  inputDir,
  folder1Path,
  folder2Path,
  folder3Path,
  outputDir,
  rootFilePath,
  lol1FilePath,
  lol2FilePath,
  lol3FilePath,
];

const createFileStructure = () => {
  fs.mkdirSync(inputDir);
  fs.mkdirSync(folder1Path);
  fs.mkdirSync(folder2Path);
  fs.mkdirSync(folder3Path);

  fs.writeFileSync(rootFilePath, JSON.stringify({}));
  fs.writeFileSync(lol1FilePath, JSON.stringify({}));
  fs.writeFileSync(lol2FilePath, JSON.stringify({}));
  fs.writeFileSync(lol3FilePath, JSON.stringify({}));
};

const removeCreatedDirectories = () => {
  rimraf.sync(inputDir);
  rimraf.sync(outputDir);
};

describe('moveDir', () => {
  beforeAll(createFileStructure);

  afterAll(removeCreatedDirectories);

  it('should be a function of arity 1', () => {
    //Assert
    expect(moveDir).toHaveLength(1);
  });

  it('should return an Observable', () => {
    //Act + Assert
    expect(moveDir({ inputDir: '', outputDir: '' })).toBeInstanceOf(Observable);
  });

  it('should be able to copy over a recursive directory structure', async () => {
    //Act
    await moveDir({ inputDir, outputDir }).toPromise();

    paths.forEach(p => {
      //Assert
      try {
        //If it throws an error, it did not get created
        fs.existsSync(
          path.join(__dirname, 'moved', path.relative(__dirname, p))
        );
      } catch (e) {
        fail('something was not created');
      }
    });
  });
});
