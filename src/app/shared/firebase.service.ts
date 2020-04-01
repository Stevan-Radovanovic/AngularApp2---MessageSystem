import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Response } from './response.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  logedInUser = new BehaviorSubject<User>(null);

  signUp(user: User) {
    return this.http.post<Response>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.authKey,
      {
        email: user.getEmail(),
        password: user.getPassword(),
        returnSecureToken: true
      }
    );
  }

  logIn(user: User) {
    return this.http
      .post<Response>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.authKey,
        {
          email: user.getEmail(),
          password: user.getPassword(),
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resData => {
          const u = new User(
            user.getEmail(),
            user.getPassword(),
            resData.idToken,
            new Date(new Date().getTime() + +resData.expiresIn * 1000)
          );
          this.logedInUser.next(u);
          console.log(u);
        })
      );
  }

  submitMessage(message: Message) {
    return this.http.post<Message>(
      'https://app3-78f92.firebaseio.com/messages.json',
      message
    );
  }

  fetchMessages() {
    return this.http.get<Message[]>(
      'https://app3-78f92.firebaseio.com/messages.json'
    );
  }

  deleteMessages() {
    return this.http.delete('https://app3-78f92.firebaseio.com/messages.json');
  }
}
