import { Component, OnInit } from '@angular/core';
import '../../theme/variables.scss';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  constructor(private toastController: ToastController) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Changes saved',
      duration: 1500,
      position: 'top',
      icon: 'checkmark',
      color: 'primary',
    });

    await toast.present();
  }

  // hello() {
  //   const toggle = document.querySelector('#theme-toggle');
  //   toggle.addEventListener('ionChange', (ev) => {
  //     document.body.classList.toggle('dark', ev.detail.checked);
  //   });

  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addListener((e) => checkToggle(e.matches));

  //   // Called when the app loads
  //   this.loadApp();
  //   this.checkToggle();
  // }

  // loadApp() {
  //   checkToggle(prefersDark.matches);
  // }

  // // Called by the media query to check/uncheck the toggle
  // checkToggle(shouldCheck) {
  //   this.toggle.checked = shouldCheck;
  // }
}
