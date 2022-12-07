import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-layout-loggedin',
  templateUrl: './layout-loggedin.component.html',
  styleUrls: ['./layout-loggedin.component.scss'],
})
export class LayoutLoggedinComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  logout() {
    this.firebaseService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => console.log(err));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Logged out succesfully',
      duration: 1500,
      position: 'top',
      icon: 'close-circle',
      color: 'danger',
    });

    await toast.present();
  }

  ngOnInit() {}
}
