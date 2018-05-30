import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { UsuarioPage } from '../usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-confirmacao',
  templateUrl: 'confirmacao.html',
})
export class ConfirmacaoPage {
  pedidos: any;
  dados = {
    idDistribuidor:0,
    idCliente:0,
    qtde20: 0,
    qtde10: 0,
    timeStamp:''
    }

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public database : AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
      this.dados = this.navParams.data;
      this.pedidos= this.firebaseProvider.getPedidos();
  }

  ionViewDidLoad() {
      // alert(this.navParams.get('qtde10'));
  }

  pedidoConfirmado(){
    this.firebaseProvider.addPedido(this.dados);
    this.navCtrl.push(UsuarioPage)
  }

}


