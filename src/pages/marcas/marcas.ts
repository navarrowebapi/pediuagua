import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContatosPage } from '../contatos/contatos';
import { CONFIG } from '../..//providers/app-config'

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

  empresaescolhida = {
    idEmpresa:0,
    favoritada:false 
  }
  dados = {
    idDistribuidor:CONFIG.distribuidor,
    idCliente:CONFIG.cliente,
    nome:"",
    celular:"",
    email:"",
    endereco:"",
    numero:"",
    bairro:"",
    qtde20: 0,
    qtde10: 0,
    atendido: false,
    marcaEscolhida:0,
    empresaEscolhida:{},
    timeStamp: Date.now() 
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.empresaescolhida = this.navParams.data;
    this.dados.empresaEscolhida = this.empresaescolhida;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MarcasPage');
    // console.log(this.empresaescolhida);
    // console.log(this.dados);
  }


  escolherMarca(){
    let marca = this.marca;
    this.navCtrl.push(ContatosPage, marca)
  }


  ibira() {
    //let marca = this.marca;
    //this.marca.idMarca = 1;
    this.dados.marcaEscolhida = 1;
    //this.navCtrl.push(ContatosPage, marca)
    this.navCtrl.push(ContatosPage, this.dados)
  }

  bonafont() {
    let marca = this.marca;
    this.marca.idMarca = 2;
    this.navCtrl.push(ContatosPage, marca)
  }

  aguaboa() {
    let marca = this.marca;
    this.marca.idMarca = 3;
    this.navCtrl.push(ContatosPage, marca)
  }
  
  indaia() {
    let marca = this.marca;
    this.marca.idMarca = 4;
    this.navCtrl.push(ContatosPage, marca)
  }

  prata() {
    let marca = this.marca;
    this.marca.idMarca = 5;
    this.navCtrl.push(ContatosPage, marca)
  }

}
