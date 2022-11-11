import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-loggedin',
  templateUrl: './layout-loggedin.component.html',
  styleUrls: ['./layout-loggedin.component.scss'],
})
export class LayoutLoggedinComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  logout() {
    this.firebaseService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => console.log(err));
  }

  ngOnInit() {}
}
