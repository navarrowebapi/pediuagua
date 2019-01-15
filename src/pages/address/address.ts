import { FavoumarcasPage } from './../favoumarcas/favoumarcas';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public nativeStorage: NativeStorage,
    public firebaseProvider: FirebaseProvider,
    public database: AngularFireDatabase) {

    this.nativeStorage.getItem('usuario')
      .then(
        data => {
          if (data != null) {
            console.log("Pegando dados/email do cliente que logou");
            this.firebaseProvider.getChaveClienteByEmail(data.user);
          }
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');

  }

  atualizaEndereco() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      try {
        console.log("email");
        console.log(this.user.email);

        console.log("usuario");
        console.log(this.user);
               
        
        this.firebaseProvider.updateUser(this.user);
        this.navCtrl.setRoot(FavoumarcasPage);
        toast.setMessage('Endereço atualizado com sucesso.');
        toast.present();

      } catch (error) {
        console.log(error);
        
        toast.setMessage('Houve um problema na atualização do endereço.');
        toast.present();
      }


    }
  }

}
