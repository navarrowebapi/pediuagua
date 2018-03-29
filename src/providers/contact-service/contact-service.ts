import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ContactService {

  constructor( private angularFireAuth: AngularFireAuth, private fb: FirebaseApp, private toastCtrl: ToastController) {

    var secondaryAppConfig = {
      apiKey: "AIzaSyAeqBtmbaWwivwzfIGmFalFmkFZ9A-YJSk",
      authDomain: "pediuaguadistribuidormanager.firebaseapp.com",
      databaseURL: "https://pediuaguadistribuidormanager.firebaseio.com",
      storageBucket: "pediuaguadistribuidormanager.appspot.com"
    };

    // Initialize another app with a different config
    var secondary = firebase.initializeApp(secondaryAppConfig, "secondary");

    // Retrieve the database.
    var secondaryDatabase = secondary.database();

    // var teste3 = secondaryDatabase.ref().child("distribuidor").child("VRRsIl2VhBeQZ6fJ4Smv");
    // console.log(teste3)

    var teste = secondaryDatabase.ref('distribuidor/VRRsIl2VhBeQZ6fJ4Smv');
    teste.on('value', function (snapshot) {
      this.toastCtrl.create({ duration: 3000, position: 'bottom', message: snapshot.val() })
        .present();
      // console.log(snapshot.val());
    });


    // // Initialize another app
    // var otherApp = firebase.initializeApp({
    //   databaseURL: "https://pediuaguadistribuidormanager.firebaseio.com",
    //   storageBucket: "pediuaguadistribuidormanager.appspot.com"
    // }, "otherApp");
    // var otherDatabase = firebase.database(otherApp);

    // var teste = otherApp.database().ref("/distribuidor");
    // console.log(teste)
    // this.items = db.list("/distribuidor",
    //   {
    //     query: { orderByChild: 'Nome' }
    //   });
  }

  public uploadAndSave(item: any) {
    //   let contact = { $key: item.key, name: item.name, url: '', fullPath: '' };

    //   if (contact.$key) {
    //     this.save(contact);
    //   } else {
    //     let storageRef = this.fb.storage().ref();
    //     let basePath = '/contacts/' + this.angularFireAuth.auth.currentUser.uid;
    //     contact.fullPath = basePath + '/' + contact.name + '.png';
    //     let uploadTask = storageRef.child(contact.fullPath).putString(item.fileToUpload, 'base64');

    //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //     (snapshot) => {
    //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log(progress + "% done");
    //     },
    //     (error) => {
    //       console.error(error);
    //     },
    //     () => {
    //       contact.url = uploadTask.snapshot.downloadURL;
    //       this.save(contact);
    //     });
    //   }
  }


}
