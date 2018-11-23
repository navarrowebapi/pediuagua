import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarcasPage } from '../marcas/marcas';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DistribuidoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribuidores',
  templateUrl: 'distribuidores.html',
})
export class DistribuidoresPage {

  empresa1fav: boolean;
  empresas: any;
  empresaescolhida = {
    idEmpresa: 0,
    favoritada: false
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.storage.get('empresa1').then((val) => {
      console.log('favorita', val);
      if (val) {
        this.empresa1fav = true;
      }
    });

  }

  escolhaempresa1() {
    let empresaescolhida = this.empresaescolhida;
    this.empresaescolhida.idEmpresa = 1;
    this.empresaescolhida.favoritada = this.empresa1fav;
    this.navCtrl.push(MarcasPage, empresaescolhida)
  }


  favoritar() {
    console.log('favorita:' + this.empresa1fav);
    if (this.empresa1fav) {
      this.storage.set('empresa1', true);
    }else{
      this.storage.set('empresa1', false);
    }

  }

}
