export type Directories = {
  inputDir: string;
  outputDir: string;
};

import fs, { Stats } from 'fs';
import path from 'path';
import { Observable, bindNodeCallback, of } from 'rxjs';
import { concatMap, switchAll } from 'rxjs/operators';

import makeDirP from './operators/make-dir-p';
import copyFile from './operators/copy-file';

const readDir = bindNodeCallback(fs.readdir);
const lstat = bindNodeCallback(fs.lstat);

const moveDir = (directories: Directories): Observable<any> => {
  const { inputDir, outputDir } = directories;

  //Ensures the output directory actually exists
  return of({ inputDir: '', outputDir }).pipe(
    makeDirP(),
    concatMap(() => {
      return lstat(inputDir).pipe(
        concatMap(
          (stat: Stats): Observable<any> => {
            if (stat.isDirectory()) {
              return of(directories).pipe(
                makeDirP(),
                moveContent()
              );
            } else {
              return of(directories).pipe(
                copyFile(inputDir.split('/')[inputDir.length - 1])
              );
            }
          }
        )
      );
    })
  );
};

const moveContent = () => (
  source$: Observable<Directories>
): Observable<Directories> => {
  return source$.pipe(
    concatMap((directories: Directories) => {
      const { inputDir, outputDir } = directories;

      return readDir(inputDir).pipe(
        switchAll(),
        concatMap((dirContent: string) =>
          lstat(`${inputDir}/${dirContent}`).pipe(
            concatMap((stat: Stats) => {
              if (stat.isDirectory()) {
                //If it is a directory, recursively call yourself
                return moveDir({
                  inputDir: `${inputDir}/${dirContent}`,
                  outputDir: `${outputDir}/${path.basename(inputDir)}`,
                });
              } else {
                //Not a directory so just transfer over the file
                return of(directories).pipe(copyFile(dirContent));
              }
            })
          )
        )
      );
    })
  );
};

export default moveDir;
