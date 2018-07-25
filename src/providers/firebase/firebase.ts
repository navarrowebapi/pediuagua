import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  cliente : Observable<any>;


  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    //console.log('Hello FirebaseProvider Provider');
  }

  getPedidos() {
    return this.afd.list('/pedidos/');
  }

  getClienteById(id) {

    console.log('teste');
    return this.afd.list('/clientes/', ref => ref.orderByChild('email').equalTo('fpnav@yahoo.com.br'))
        .snapshotChanges()
        .map(res => {
            return res.map(c => ({key: c.payload.key, ...c.payload.val()}));
        })
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
