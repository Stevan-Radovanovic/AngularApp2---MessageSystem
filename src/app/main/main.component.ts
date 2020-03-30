import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { Message } from '../shared/message.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  reactiveForm: FormGroup;

  messages: Message[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.reactiveForm = new FormGroup({
      formName: new FormControl('', Validators.required),
      formEmail: new FormControl('', [Validators.required, Validators.email]),
      formMessage: new FormControl('', Validators.required),
      formTerms: new FormControl(null, Validators.requiredTrue)
    });
  }

  onSubmit() {
    const message = new Message(
      this.reactiveForm.controls.formName.value,
      this.reactiveForm.controls.formEmail.value,
      this.reactiveForm.controls.formMessage.value
    );
    this.firebase.submitMessage(message).subscribe();
    this.reactiveForm.reset();
  }

  onFetch() {
    this.firebase.fetchMessages().subscribe(response => {
      this.messages = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.messages.push(response[key]);
        }
      }
      console.log(this.messages);
    });
  }

  onDelete() {
    this.firebase.deleteMessages().subscribe();
    this.messages = [];
  }
}
