import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

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
