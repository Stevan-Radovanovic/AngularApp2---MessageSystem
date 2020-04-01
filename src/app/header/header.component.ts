import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private firebase: FirebaseService, private router: Router) {}

  auth = false;
  subs: Subscription[] = [];

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subs.push(
      this.firebase.logedInUser.subscribe(user => {
        console.log(user);
        if (user == null) {
          this.auth = false;
        } else {
          this.auth = true;
        }
      })
    );
  }

  onLogOut() {
    this.firebase.logedInUser.next(null);
    this.router.navigate(['./login']);
  }
}
