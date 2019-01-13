import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfirmacaoPage } from '../confirmacao/confirmacao';
import { CONFIG } from '../..//providers/app-config'
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AuthService } from '../../providers/auth/auth-service';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  marca = {
    idMarca: 0
  }

  empresaescolhida = {
    idEmpresa: 0,
    favoritada: false
  }

  dados = {
    idDistribuidor: CONFIG.distribuidor,
    idCliente: CONFIG.cliente,
    nome: "",
    celular: "",
    email: "",
    endereco: "",
    numero: "",
    bairro: "",
    qtde20: 0,
    qtde10: 0,
    atendido: null,
    espera: null,
    marcaEscolhida: 0,
    empresaEscolhida: this.empresaescolhida,
    timeStamp: Date.now(),
    datahora: new Date().toISOString()
  }

  contato = {};

  constructor(private navCtrl: NavController, private navParams: NavParams,
    public firebaseProvider: FirebaseProvider, private toastCtrl: ToastController,
    private authService: AuthService) {
    console.log("chega assim em contatos");
    console.log(this.navParams.data);
    // this.marca = this.navParams.data;

    this.dados.empresaEscolhida = this.navParams.data.empresaEscolhida;
    this.dados.marcaEscolhida = this.navParams.data.marcaEscolhida;
    console.log("acabou de chegar em contatos e já coloquei marca e empresa em dados");
    console.log(this.dados);

    //this.items = this.contactService.getAll();
    //console.log("From contatos.ts " + JSON.stringify(this.items));
    console.log("vai");
    const subs = this.firebaseProvider.getClienteByEmail(CONFIG.email)
      .subscribe((c: any) => {
        subs.unsubscribe();
        this.contato = c;
        this.dados.bairro = c[0].bairro;
        this.dados.celular = c[0].celular;
        this.dados.email = c[0].email;
        this.dados.endereco = c[0].endereco;
        this.dados.nome = c[0].nome;
        this.dados.numero = c[0].numero;
        console.log(this.dados);
      })
  }



  pedir() {
    let checkDadosPedido = this.isEmptyObject(this.dados);
    console.log(checkDadosPedido);
    if (!checkDadosPedido) {
      let toast = this.toastCtrl.create({ duration: 4000, position: 'bottom' });
      toast.setMessage('Foi preciso fazer login novamente.');
      toast.present();
      this.sair();
    } else {
      let dados = this.dados;
      console.log("Saindo de contatos/pedidos");
      console.log(dados);
      this.navCtrl.push(ConfirmacaoPage, dados)
    }
  }

  isEmptyObject(obj) {
    console.log(obj);
    var state = true;
    for (var key in obj) {
      if ((obj[key] === "")) {
        console.log("valor "+obj[key] + " chave " +key);
        state = false;
        break;
      }
    }
    return state;
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

  sair() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.parent.parent.setRoot(SigninPage);
      })
      .catch((error) => {
        //console.error(error);
      });
  }

}
