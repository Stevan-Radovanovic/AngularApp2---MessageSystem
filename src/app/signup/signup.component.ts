import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}

  signupForm: FormGroup;
  errorMessage: string = null;

  private initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const user = new User(
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value
    );
    this.firebase.signUp(user).subscribe(
      response => {
        console.log(response);
        this.errorMessage = null;
      },
      errorRes => {
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            this.errorMessage = 'This email already has an account';
            break;
          default:
            this.errorMessage = 'An error occured';
        }
      }
    );
  }
}
