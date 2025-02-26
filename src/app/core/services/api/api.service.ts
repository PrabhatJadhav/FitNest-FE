import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOCALSTORAGE_CONSTANTS } from '../../constants/local-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basePath = environment.apiHost;

  constructor(private http: HttpClient) {}

  public get(path?: string, options?: any, responseType?: any): Observable<any> {
    const token: any = localStorage.getItem(LOCALSTORAGE_CONSTANTS.TOKEN);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (token ?? ''),
    });

    return this.http
      .get(this.basePath + path, {
        headers: headers,
        params: options,
        responseType: responseType,
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
          try {
            if (options?.responseType == 'string') {
              return JSON.parse(response ?? '{}');
            }
            return response;
          } catch (e) {
            return e;
          }
        }),
      );
  }

  public post(path?: string, data?: any, options?: any) {
    const token: any = localStorage.getItem(LOCALSTORAGE_CONSTANTS.TOKEN);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    options = { ...options, headers: headers };
    if (data) {
      return this.http.post(this.basePath + path, data, options).pipe(
        map((response: any) => {
          try {
            if (options?.responseType == 'string') {
              return JSON.parse(response ?? '{}');
            }

            return response;
          } catch (e) {
            return e;
          }
        }),
      );

      // return this.http.post(this.basePath + path, data, options);
    } else {
      return this.http.post(this.basePath + path, options);
    }
  }
}
