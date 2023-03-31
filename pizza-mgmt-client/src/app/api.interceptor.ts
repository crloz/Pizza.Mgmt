import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { map, Observable, switchMap } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private config: AppConfigService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === AppConfigService.CONFIG_URL) {
      return next.handle(req);
    }
    return this.config.baseUrl.pipe(
      map(baseUrl =>
        req.clone({
          url: `${baseUrl}/${req.url}`,
          headers: req.headers
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Access-Control-Allow-Origin', '*'),
        })
      ),
      switchMap(apiReq => next.handle(apiReq))
    );
  }
}
