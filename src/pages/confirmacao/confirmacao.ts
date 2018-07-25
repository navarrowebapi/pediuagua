import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { UsuarioPage } from '../usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-confirmacao',
  templateUrl: 'confirmacao.html',
})
export class ConfirmacaoPage {
  dadosProdutoEscolhido = {
    imgMarca: "",
    preco: "",
    ph: ""
  };

  pedidos: any;
  dados = {
    idDistribuidor:"",
    idCliente:"",
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
    timeStamp: Date.now() 
  }

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public database: AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
    this.dados = this.navParams.data;
    this.pedidos = this.firebaseProvider.getPedidos();

    console.log(this.dados);

    if (this.dados.marcaEscolhida == 1) {
      this.dadosProdutoEscolhido.imgMarca = "img/ibira.png";
      this.dadosProdutoEscolhido.preco = "R$ 12,00";
      this.dadosProdutoEscolhido.ph = "PH 7,2"
    } else if (this.dados.marcaEscolhida == 2) {
      this.dadosProdutoEscolhido.imgMarca = "img/bonafont.png";
      this.dadosProdutoEscolhido.preco = "R$ 14,00";
      this.dadosProdutoEscolhido.ph = "PH 6,4"
    } else if (this.dados.marcaEscolhida == 3) {
      this.dadosProdutoEscolhido.imgMarca = "img/aguaboa.png";
      this.dadosProdutoEscolhido.preco = "R$ 13,00";
      this.dadosProdutoEscolhido.ph = "PH 7,1"
    } else if (this.dados.marcaEscolhida == 4) {
      this.dadosProdutoEscolhido.imgMarca = "img/indaia.png";
      this.dadosProdutoEscolhido.preco = "R$ 11,00";
      this.dadosProdutoEscolhido.ph = "PH 6,5"
    } else if (this.dados.marcaEscolhida == 5) {
      this.dadosProdutoEscolhido.imgMarca = "img/prata.png";
      this.dadosProdutoEscolhido.preco = "R$ 14,00";
      this.dadosProdutoEscolhido.ph = "PH 8,5"
    }

  }

  ionViewDidLoad() {
    // alert(this.navParams.get('qtde10'));
  }

  pedidoConfirmado() {
    this.firebaseProvider.addPedido(this.dados);
    this.navCtrl.push(UsuarioPage)
  }

}


