import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { FirebaseProvider } from './../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-confirmacao',
  templateUrl: 'confirmacao.html',
})
export class ConfirmacaoPage {
  pedidos: any;
  dados = {
    qtde20: 0,
    qtde10: 0
    }

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public database : AngularFireDatabase, public navParams: NavParams, public modalCtrl: ModalController) {
      this.dados = this.navParams.data;
      this.pedidos= this.firebaseProvider.getPedidos();
  }

  ionViewDidLoad() {
      // alert(this.navParams.get('qtde10'));
  }

  pedidoConfirmado(){
    //Enviar pedido - firebase;

    this.firebaseProvider.addPedido(this.dados);
    console.log('OK pedido salvo')
    // let confirmModal = this.modalCtrl.create('ModalConfirmacaoPage', { data: '' }, { showBackdrop: true, enableBackdropDismiss: false });
    // confirmModal.present();
  }

}


