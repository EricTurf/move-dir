import { Observable, bindNodeCallback } from 'rxjs';
import fs from 'fs';
import path from 'path';

import { Directories } from '../move-dir';
import { concatMap, catchError, mapTo } from 'rxjs/operators';

const access = bindNodeCallback(fs.access);
const mkDir = bindNodeCallback(fs.mkdir);

export default () => (
  source$: Observable<Directories>
): Observable<Directories> => {
  return source$.pipe(
    concatMap((directories: Directories) => {
      const { outputDir, inputDir } = directories;

      const newDirectory = path.join(
        outputDir,
        inputDir.split('/')[inputDir.split('/').length - 1]
      );

      return access(newDirectory).pipe(
        //If directory exists return directories
        mapTo(directories),
        //If directory does not exist, create it and return directories
        catchError(() => {
          return mkDir(newDirectory).pipe(mapTo(directories));
        })
      );
    })
  );
};
