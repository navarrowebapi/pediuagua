import { FavoumarcasPage } from './../favoumarcas/favoumarcas';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

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
    public nativeStorage: NativeStorage,
    private toastCtrl: ToastController,
    public events:Events,
    private authService: AuthService) {
      
      //Verifica se já está logado.
      this.nativeStorage.getItem('usuario')
      .then(
        data => {
          if (data != null) {
            this.user.email = data.user;
            this.user.password = data.pass;
          }
        },
        error => console.error(error)
      );

      // //verifica se possui pedido favorito
      // this.nativeStorage.getItem('favorito')
      //   .then(
      //     data => {
      //       if (data != null) {
      //         this.user.email = data.user;
      //         this.user.password = data.pass;
      //       }
      //     },
      //     error => console.error(error)
      //   );


  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }


  persistUser(user) {
    this.nativeStorage.setItem('usuario', { user: user.email, pass: user.password })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.persistUser(this.user);
          this.events.publish('user:loggedin');
          this.navCtrl.push(FavoumarcasPage);
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
