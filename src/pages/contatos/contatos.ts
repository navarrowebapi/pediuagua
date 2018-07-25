import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmacaoPage } from '../confirmacao/confirmacao';
import { CONFIG } from '../..//providers/app-config'
import { FirebaseProvider } from './../../providers/firebase/firebase';


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

  contato = {};

  constructor(private navCtrl: NavController, private navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    this.marca = this.navParams.data;
    this.dados.marcaEscolhida = this.marca.idMarca;

    //this.items = this.contactService.getAll();
    //console.log("From contatos.ts " + JSON.stringify(this.items));
    console.log("vai");
      const subs = this.firebaseProvider.getClienteById(CONFIG.cliente)
        .subscribe((c: any) => {
          subs.unsubscribe();
          this.contato = c;
          this.dados.bairro = c[0].bairro;
          this.dados.celular = c[0].celular;
          this.dados.email = c[0].email;
          this.dados.endereco = c[0].endereco;
          this.dados.nome = c[0].nome;
          this.dados.numero = c[0].numero;
        })
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
