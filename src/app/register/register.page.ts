import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInService } from 'src/app/services/logged-in.service';
import { FirebaseService } from '../services/firebase.service';
import { AlertController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formSignup: FormGroup;

  constructor(
    public fb: FormBuilder,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private loggedInService: LoggedInService,
    private router: Router
  ) {
    this.formSignup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  onSignup() {
    if (this.formSignup.invalid) {
      this.presentError('Failed', 'Fill correctly all the inputs');
    } else {
      this.firebaseService
        .signup(this.formSignup.value)
        .then((res) => {
          console.log(res);

          if (res.user) {
            this.loggedInService.setCurrentUser(res.user.email || '');
          } else {
            console.log('not response');
          }

          this.router.navigate(['/login']);
        })
        .catch((err) => {
          console.log('1 ' + err);
          console.log('2 ' + err.code);

          if (err.code === 'auth/invalid-email') {
            this.formSignup.get('email')?.setErrors({
              formSignupUserInvalidEmail: true,
            });
            this.presentError('Failed', 'Email invalid');
          } else if (err.code === 'auth/email-already-in-use') {
            this.formSignup.get('email')?.setErrors({
              formSignupUserAlreadyExists: true,
            });
            this.presentError('Failed', 'This email is alredy in use');
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
