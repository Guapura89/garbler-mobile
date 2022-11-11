import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { LoggedInService } from '../services/logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private loggedInService: LoggedInService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onSignin() {
    if (this.formLogin.invalid) {
      this.presentError('Failed', 'Fill all the inputs');
    } else {
      this.firebaseService
        .signin(this.formLogin.value)
        .then((res) => {
          console.log(res);

          if (res.user) {
            this.loggedInService.setCurrentUser(res.user.email || '');
          } else {
            console.log('not response');
          }

          this.router.navigate(['/']);
        })
        .catch((err) => {
          console.log('1 ' + err);
          console.log('2 ' + err.code);

          if (err.code === 'auth/user-not-found') {
            this.formLogin.get('email')?.setErrors({
              formLoginUserNotFound: true,
            });
            this.presentError('Failed', 'User not found');
          } else if (err.code === 'auth/wrong-password') {
            this.formLogin.get('password')?.setErrors({
              formLoginUserIncorrectPassword: true,
            });
            this.presentError('Failed', 'Password incorrect');
          } else if (err.code === 'auth/invalid-email') {
            this.formLogin.get('email')?.setErrors({
              formLoginUserNotFound: true,
            });
            this.presentError('Failed', 'Invalid email');
          }
        });
    }
  }

  async presentError(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
      backdropDismiss: false,
    });

    await alert.present();
    return;
  }

  onSigninWithGoogle() {
    this.firebaseService
      .signinGoogle()
      .then((res) => {
        console.log(res);

        if (res.user) {
          this.loggedInService.setCurrentUser(res.user.email || '');
        } else {
          console.log('not response');
        }

        this.router.navigate(['/dashboard']);
      })
      .catch((err) => console.log(err));
  }
}
