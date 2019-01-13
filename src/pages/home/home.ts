import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { SigninPage } from '../signin/signin';
import { Events } from 'ionic-angular';
import { AddressPage } from '../address/address';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  contatosRoot = 'ContatosPage'
  usuarioRoot = 'UsuarioPage'
  marcasRoot = 'MarcasPage'
  favouMarcasRoot = 'FavoumarcasPage'
  distribuidoresRoot = 'DistribuidoresPage'

  constructor(public navCtrl: NavController, private authService: AuthService, private events: Events) {

    this.pages = [
      { title: 'Mudar endereço', component: AddressPage }
    ];

  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
  sair() {
    this.events.publish('user:loggedout');
    this.authService.signOut()
      .then(() => {
        this.navCtrl.parent.parent.setRoot(SigninPage);
      })
      .catch((error) => {
        //console.error(error);
      });
  }

}
