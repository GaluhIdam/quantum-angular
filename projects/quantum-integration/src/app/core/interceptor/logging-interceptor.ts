import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request to ${req.url} with method ${req.method}`);

    const started = Date.now();

    return next.handle(req).pipe(
      tap(
        (event) => {
          console.log(
            `Response from ${req.url} took ${Date.now() - started} ms`
          );
        },
        (error) => {
          console.error(`Request to ${req.url} failed with error:`, error);
        }
      )
    );
  }
}
