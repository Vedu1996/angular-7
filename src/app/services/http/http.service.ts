import { Injectable } from '@angular/core';
import { AppConstants } from '../../constants/app.constants';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  config;
  serverUrl;

  constructor(
    private http: HttpClient
  ) {
    this.config = AppConstants.SERVER_CONFIG;
    this.serverUrl = this.config[this.config.USE_URL];
  }

  post(url: string, body = <any>{}, {params = <any>{}, headers = <any>{}}): Promise<any> {
    return this.http
      .post(this.serverUrl + url, body, {params, headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete(url: string, {params = <any>{}, headers = <any>{}}) {
    return this.http
      .delete(this.serverUrl + url, {params, headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get(url: string, {params = <any>{}, headers = <any>{}}) {
    return this.http
      .get(this.serverUrl + url, {params, headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  put(url: string, body = <any>{}, {params = <any>{}, headers = <any>{}}) {
    return this.http
      .put(this.serverUrl + url, body, {params, headers} )
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any) {
    const body = res;
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error || error);
  }

}
