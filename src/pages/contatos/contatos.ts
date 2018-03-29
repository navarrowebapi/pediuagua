import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditContatosPage } from '../edit-contatos/edit-contatos';
import { ContactService } from '../../providers/contact-service/contact-service';
//import { FirebaseListObservable } from 'angularfire2/database';
import { ConfirmacaoPage } from '../confirmacao/confirmacao';

@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  dados = {
    qtde20: 0,
    qtde10: 0
  }

  constructor(private navCtrl: NavController, private navParams: NavParams, private contactService: ContactService) {
   // this.items = this.contactService.getAll();
    //console.log("From contatos.ts " + JSON.stringify(this.items));
  }


  pedir(){
    let dados = this.dados;
    this.navCtrl.push(ConfirmacaoPage, dados)
    
  }

  decrease10() {
    this.dados.qtde10--
  }

  increase10() {
    this.dados.qtde10++
  }

  decrease20() {
    this.dados.qtde20--
  }

  increase20() {
    this.dados.qtde20++
  }

}
