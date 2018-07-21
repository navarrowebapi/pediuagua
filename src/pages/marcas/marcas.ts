import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContatosPage } from '../contatos/contatos';

/**
 * Generated class for the MarcasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class MarcasPage {
  
  marca = {
    idMarca:0 
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MarcasPage');
  }


  escolherMarca(){
    let marca = this.marca;
    this.navCtrl.push(ContatosPage, marca)
    
  }


  ibira() {
    let marca = this.marca;
    this.marca.idMarca = 1;
    this.navCtrl.push(ContatosPage, marca)
  }

  bonafont() {
    this.marca.idMarca = 2;
  }

  aguaboa() {
    this.marca.idMarca = 3;
  }
  
  indaia() {
    this.marca.idMarca = 4;
  }

  prata() {
    this.marca.idMarca = 5;
  }

}
