import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { EditContatosPage } from '../edit-contatos/edit-contatos';
import { ContactService } from '../../providers/contact-service/contact-service';
//import { FirebaseListObservable } from 'angularfire2/database';
import { ConfirmacaoPage } from '../confirmacao/confirmacao';
import * as moment from 'moment';
// import 'moment/locale/pt-br';
import { CONFIG } from '../..//providers/app-config'


@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  marca = {
    idMarca:0 
  }

  dados = {
    idDistribuidor:CONFIG.distribuidor,
    idCliente:CONFIG.cliente,
    qtde20: 0,
    qtde10: 0,
    atendido: false,
    marcaEscolhida:0,
    timeStamp: Date.now() 
  }

  constructor(private navCtrl: NavController, private navParams: NavParams, private contactService: ContactService) {
    this.marca = this.navParams.data;
    this.dados.marcaEscolhida = this.marca.idMarca;
    //this.items = this.contactService.getAll();
    //console.log("From contatos.ts " + JSON.stringify(this.items));
    //console.log(CONFIG);
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
