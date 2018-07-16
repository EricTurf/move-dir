import { Observable, bindNodeCallback } from 'rxjs';
import fs from 'fs';
import { concatMap, mapTo, catchError } from 'rxjs/operators';
import { Directories } from '../move-dir';
import path from 'path';

const copy = bindNodeCallback(fs.copyFile);

export default (file: string) => (
  source$: Observable<any>
): Observable<any> => {
  return source$.pipe(
    concatMap(
      (directories: Directories): Observable<Directories> => {
        const { inputDir, outputDir } = directories;

        const originalLocation = path.join(inputDir, file);

        const newLocation = path.join(
          outputDir,
          inputDir.split('/')[inputDir.split('/').length - 1],
          file
        );

        return copy(originalLocation, newLocation).pipe(mapTo(directories));
      }
    )
  );
};
