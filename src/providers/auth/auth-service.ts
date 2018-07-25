import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
// import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CONFIG } from '../..//providers/app-config'
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { MarcasPage } from '../../pages/marcas/marcas';
import {Nav} from 'ionic-angular';

@Injectable()
export class AuthService {
  @ViewChild(Nav) nav: Nav;

  // constructor(private angularFireAuth: AngularFireAuth, private googlePlus: GooglePlus, private facebook: Facebook, private twitter: TwitterConnect) { }
  
  constructor( private angularFireAuth: AngularFireAuth, private facebook: Facebook, private afDatabase : AngularFireDatabase) { }

  // createProfile(user: User) {
  //   this.angularFireAuth.authState.take(1).subscribe(auth => {
  //       this.afDatabase.object('profile/${auth.uid').set(user)
  //       .then(() => this.nav.push(MarcasPage))
  //   });
  // }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signIn(user: User) {
    //console.log("ok para sign in email");
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(function(firebaseUser){

        CONFIG.cliente = firebaseUser.uid;
        CONFIG.bairro = firebaseUser.bairro;
        CONFIG.celular = firebaseUser.celular;
        CONFIG.email = firebaseUser.email;
        CONFIG.endereco = firebaseUser.endereco;
        CONFIG.nome = firebaseUser.nome;
        CONFIG.numero = firebaseUser.numero;
        
        // console.log("DEPOIS LOGIN");
        console.log(firebaseUser);
        // console.log(CONFIG.cliente);
    });
  }

  // signInWithGoogle() {
  //   return this.googlePlus.login({
  //     'webClientId': '638933829742-i0av628updkc723cb3gnirhh3b0829up.apps.googleusercontent.com',
  //     'offline': true
  //   })
  //     .then(res => {
  //       return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
  //         .then((user: firebase.User) => {
  //           // atualizando o profile do usuario
  //           return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
  //         });
  //     });
  // }

  signInWithFacebook() {
    return this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        //https://developers.facebook.com/docs/graph-api/reference/user
        //Ao logar com o facebook o profile do usuario é automaticamente atualizado.
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      });
  }

  // signInWithTwitter() {
  //   return this.twitter.login()
  //     .then((res) => {
  //       return this.angularFireAuth.auth.signInWithCredential(firebase.auth.TwitterAuthProvider.credential(res.token, res.secret));
  //     });
  // }

  signOut() : Promise<any> {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];

        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) { // Se for o gooogle
          // o disconnect limpa o oAuth token e tambem esquece qual conta foi selecionada para o login
          // return this.googlePlus.disconnect()
          //   .then(() => {
          //     return this.signOutFirebase();
          //   });
        }
        
        else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // Se for facebook
          return this.facebook.logout()
            .then(() => {
              return this.signOutFirebase();
            })
        } else if (provider.providerId == firebase.auth.TwitterAuthProvider.PROVIDER_ID) { // Se for twitter
          // return this.twitter.logout()
          //   .then(() => {
          //     return this.signOutFirebase();
          //   })
        }
      }
    }

    return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
