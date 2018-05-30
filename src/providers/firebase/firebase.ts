import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  getPedidos() {
    return this.afd.list('/pedidos/');
  }

  addUser(user) {
    this.afd.list('/clientes/').push(user);
  }
 
  addPedido(name) {
    this.afd.list('/pedidos/').push(name);
  }
 
  removePedido(id) {
    this.afd.list('/pedidos/').remove(id);
  }

}
