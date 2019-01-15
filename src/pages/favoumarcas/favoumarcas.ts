import { ConfirmacaoPage } from './../confirmacao/confirmacao';
import { MarcasPage } from './../marcas/marcas';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { UsuarioPage } from '../usuario/usuario';
import { CONFIG } from '../..//providers/app-config'

@IonicPage()
@Component({
  selector: 'page-favoumarcas',
  templateUrl: 'favoumarcas.html',
})
export class FavoumarcasPage {
  dadosProdutoFavorito = {
    marca: 0,
    qtde10: 0,
    qtde20: 0
  };

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
    empresaEscolhida: {},
    timeStamp: Date.now(),
    datahora: new Date().toISOString()
  }

  tituloFavorito: string = "teste";
  botaoFavorito: boolean = false;

  dadosProdutoEscolhido = {
    imgMarca: ""
  };

  contato = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public nativeStorage: NativeStorage) {

    this.nativeStorage.getItem('usuario')
      .then(
        data => {
          if (data != null) {
            const subs = this.firebaseProvider.getClienteByEmail(data.user)
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
        },
        error => console.error(error)
      );

    //verifica se possui pedido favorito
    this.nativeStorage.getItem('favorito')
      .then(
        data => {
          if (data != null) {
            this.dadosProdutoFavorito.marca = data.marca;
            this.dadosProdutoFavorito.qtde10 = data.qtde10;
            this.dadosProdutoFavorito.qtde20 = data.qtde20;
            this.botaoFavorito = false;
            this.tituloFavorito = "Você já possui um pedido favorito";
            console.log(JSON.stringify(this.dadosProdutoFavorito));
            if (this.dadosProdutoFavorito.marca == 1) {
              this.dadosProdutoEscolhido.imgMarca = "img/ibira.png";
            } else {

            }

            this.dados.marcaEscolhida = data.marca;
            this.dados.qtde10 = data.qtde10;
            this.dados.qtde20 = data.qtde20;

          } else {
            this.botaoFavorito = true;
            this.tituloFavorito = "Não há pedido favorito";
            this.dadosProdutoEscolhido.imgMarca = "img/selecticon.png";
          }
        },
        error => console.error(error)
      );



  }

  confirmarFavorito() {
    console.log("enviando para confirmação");
    console.log(this.dados);
    this.navCtrl.push(ConfirmacaoPage, this.dados)
  }

  escolherMarcas() {
    this.navCtrl.push(MarcasPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoumarcasPage');
  }

}
