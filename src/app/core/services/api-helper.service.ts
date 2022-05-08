import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  of as _observableOf,
  throwError as _observableThrow,
} from 'rxjs';
import {
  catchError as _observableCatch,
  mergeMap as _observableMergeMap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface IParam {
  key: string;
  value: string | number;
  prefixParam?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  private http: HttpClient;
  private baseUrl!: string;
  private userId!: string;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
    this.baseUrl = environment.baseUrl;
  }

  get<T>(url: string, hasUserId?: boolean): Observable<T> {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) this.userId = user.id;
    let url_: string;
    if (hasUserId) url_ = `${url}/${this.userId}`;
    else url_ = url;

    return this.http
      .request('get', url_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return _observableOf<T>(<any>response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return _observableOf<T>(<any>response_);
            } catch (e) {
              return <Observable<T>>(<any>_observableThrow(e));
            }
          } else return <Observable<T>>(<any>_observableThrow(response_));
        })
      );
  }

  private removeNullValuesFromQueryParams(params: HttpParams): HttpParams {
    const paramsKeysAux = params.keys();
    paramsKeysAux.forEach(key => {
      const value = params.get(key);
      if (value === null || value === undefined || value === '') {
        params['map'].delete(key);
      }
    });

    return params;
  }

  post<T>(body: T, url: string): Observable<T> {
    let url_ = url;
    let options_: any = {
      body: body,
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return _observableOf<T>(<any>response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return _observableOf<T>(<any>response_);
            } catch (e) {
              return <Observable<T>>(<any>_observableThrow(e));
            }
          } else return <Observable<T>>(<any>_observableThrow(response_));
        })
      );
  }

  put<T>(body: T, url: string, id: string): Observable<T> {
    let url_ = `${url}/${id}`;
    let options_: any = {
      body: body,
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return _observableOf<T>(<any>response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return _observableOf<T>(<any>response_);
            } catch (e) {
              return <Observable<T>>(<any>_observableThrow(e));
            }
          } else return <Observable<T>>(<any>_observableThrow(response_));
        })
      );
  }

  delete<T>(url: string, id: string): Observable<T> {
    let url_ = `${url}/${id}`;

    return this.http
      .request('delete', url_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return _observableOf<T>(<any>response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return _observableOf<T>(<any>response_);
            } catch (e) {
              return <Observable<T>>(<any>_observableThrow(e));
            }
          } else return <Observable<T>>(<any>_observableThrow(response_));
        })
      );
  }

  uploadFile(body: { file: File }): Observable<any> {
    let url_ = `${this.baseUrl}/file-uploader`;
    let options_: any = {
      body: body,
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return _observableOf<string>(<any>response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return _observableOf<string>(<any>response_);
            } catch (e) {
              return _observableOf<string>(<any>_observableThrow(e));
            }
          } else return _observableOf<string>(<any>_observableOf(response_));
        })
      );
  }
}
