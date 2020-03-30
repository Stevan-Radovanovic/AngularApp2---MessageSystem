import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  logIn(user: User) {
    return this.http.post<Message>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.authKey,
      {
        email: user.getEmail(),
        password: user.getPassword(),
        returnSecureToken: true
      }
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
