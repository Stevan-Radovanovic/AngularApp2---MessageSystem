import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogingInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('An interceptor interviened!');
    return next.handle(req);
  }
}
