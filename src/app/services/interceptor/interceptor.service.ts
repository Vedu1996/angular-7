import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConstants } from '../../constants/app.constants';
import { StorageService } from '../storage/storage.service';
import { catchError, finalize, tap } from 'rxjs/internal/operators';
import { ResponseHandlerService } from '../response-handler/response-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  excludeRoutes;
  config;

  constructor(
    private localStorage: StorageService,
    private responseHandler: ResponseHandlerService
  ) {
    this.config = AppConstants.INTERCEPTOR_CONFIG;
    this.excludeRoutes = this.config.EXCLUDE_ROUTES.slice();
  }

  startsWithAny(str: string, substrings: Array<any>): boolean {
    return substrings.some(function(v) { return str.startsWith(v); });
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req;
    const url = req.url.replace(this.config.URL, '');
    if (!this.startsWithAny(url, this.excludeRoutes)) {
      const httpHeader = new HttpHeaders()
        .set('x-user-token', this.localStorage.getItem('token'));
      clone = req.clone({headers: httpHeader});
    } else {
      const httpHeader = new HttpHeaders();
      clone = req.clone({headers : httpHeader});
    }
    return next.handle(clone).pipe(tap(evt => {
        if (evt instanceof HttpResponse) {
          // Handle response
          this.responseHandler.handleResponse(evt);
        }
      }), finalize(() => {
        setTimeout(() => {
          // this.turnOffModal();
        }, 200);
      }),
      catchError((error: any) => {
        return Promise.reject(error.message || error);
      }));

  }
}
