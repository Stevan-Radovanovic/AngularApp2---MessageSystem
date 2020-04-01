import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../shared/firebase.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private firebase: FirebaseService, private route: Router) {}

  loginForm: FormGroup;
  errorMessage: string = null;

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const user = new User(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
    this.firebase.logIn(user).subscribe(
      response => {
        console.log(response);
        this.errorMessage = null;
        this.route.navigate(['./messages']);
      },
      errorRes => {
        console.log(errorRes);
        switch (errorRes.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            this.errorMessage = 'Email not found!';
            break;
          case 'INVALID_PASSWORD':
            this.errorMessage = 'Incorrect password';
            break;
          default:
            this.errorMessage = 'An error occured';
        }
      }
    );
  }
}
