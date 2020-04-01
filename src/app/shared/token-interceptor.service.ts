import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpParams } from '@angular/common/http';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { take, exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private firebase: FirebaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newReq = null;

    return this.firebase.logedInUser.pipe(
      take(1),
      exhaustMap(logedInUser => {
        if (logedInUser === null) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', logedInUser.gettoken())
        });
        console.log(modifiedReq);
        return next.handle(modifiedReq);
      })
    );
  }
}
