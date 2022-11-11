import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
}
