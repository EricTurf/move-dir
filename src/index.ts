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

  const moveDir$ = moveDir({ inputDir: './src', outputDir: './test' });

  return asPromise ? moveDir$.toPromise() : moveDir$;
};
