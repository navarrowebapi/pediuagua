import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { HomePage } from '../home/home';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-signin-with-email',
  templateUrl: 'signinwithemail.html',
})
export class SigninWithEmailPage {
  user: User = new User();

  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService) {
      //this.user.email = "navarro.fabio@gmail.com";
      //this.user.password = "123123";
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.push(HomePage);
        })
        .catch((error: any) => {
          console.log(error);
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          } else if (error.code == 'auth/network-request-failed') {
            toast.setMessage('Você deve estar sem conexão, verifique.');
          }
          toast.present();
        });
    }
  }
}
