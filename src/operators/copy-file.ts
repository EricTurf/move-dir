import { Observable, bindNodeCallback } from 'rxjs';
import fs from 'fs';
import { concatMap, mapTo } from 'rxjs/operators';
import { Directories } from '../move-dir';

const copy = bindNodeCallback(fs.copyFile);

export default (file: string) => (
  source$: Observable<any>
): Observable<any> => {
  return source$.pipe(
    concatMap(
      (directories: Directories): Observable<Directories> => {
        const { inputDir, outputDir } = directories;
        const originalLocation = `${inputDir}/${file}`;
        const newLocation = `${outputDir}/${inputDir.split('/').pop()}/${file}`;

        return copy(originalLocation, newLocation).pipe(mapTo(directories));
      }
    )
  );
};
