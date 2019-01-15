import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseProvider {
  cliente: Observable<any>;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  chaveCliente: string = "";
  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    //console.log('Hello FirebaseProvider Provider');
   
  }

  getPedidos() {
    return this.afd.list('/pedidos/');
  }


  getChaveClienteByEmail(mail) {
    console.log("pegando chave cliente pelo email " + mail );

    // this.itemsRef = this.afd.list('clientes');
    this.itemsRef =  this.afd.list('/clientes/', ref => ref.orderByChild('email').equalTo(mail));
    console.log(this.itemsRef);
    
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    console.log("FORRRR");
    
    this.items.forEach(element => {
        element.forEach(e => {
            this.chaveCliente = e.key;
        });
    });
        
        
  }
  getClienteByEmail(mail) {

    return this.afd.list('/clientes/', ref => ref.orderByChild('email').equalTo(mail))
      .snapshotChanges()
      .map(res => {

        console.log('getClienteById');
        console.log(res.map(c => ({ key: c.payload.key, ...c.payload.val() })));
        return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));

      })
  }

  addUser(user) {
    this.afd.list('/clientes/').push(user);
  }

  updateUser(user: any): void {
    console.log('UpdateUSER');
    const itemsRef = this.afd.list('clientes');
    console.log("chave cliente antes de atualizar no metodo updateUser " + this.chaveCliente);
    
    itemsRef.update(this.chaveCliente, { bairro: user.bairro, endereco: user.endereco, numero: user.numero  });
  }

  addPedido(name) {
    this.afd.list('/pedidos/').push(name);
  }

  removePedido(id) {
    this.afd.list('/pedidos/').remove(id);
  }

}
