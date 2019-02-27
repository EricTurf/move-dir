import { Observable } from 'rxjs';
import moveDir from './move-dir';

type Options = {
  asPromise: boolean;
};

export default (
  inputDir: string,
  outputDir: string,
  options: Options = { asPromise: false }
): Observable<any> | Promise<any> => {
  const { asPromise } = options;
  console.log(inputDir, outputDir);
  const moveDir$ = moveDir({ inputDir, outputDir });

  return asPromise ? moveDir$.toPromise() : moveDir$;
};
