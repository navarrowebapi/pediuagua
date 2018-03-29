import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { EditContatosPage } from '../pages/edit-contatos/edit-contatos';
import { ConfirmacaoPage } from "../pages/confirmacao/confirmacao";

import { AuthService } from '../providers/auth/auth-service';
import { ContactService } from '../providers/contact-service/contact-service';

// import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
// import { TwitterConnect } from '@ionic-native/twitter-connect';
// import { ImagePicker } from '@ionic-native/image-picker';

const firebaseConfig = {
  apiKey: "AIzaSyALMI7pi-U_ZNxERQzwmuYi-oU7tELAl4c",
  authDomain: "pediuaguamobileapp.firebaseapp.com",
  databaseURL: "https://pediuaguamobileapp.firebaseio.com",
  projectId: "pediuaguamobileapp",
  storageBucket: "",
  messagingSenderId: "836786935618"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    ConfirmacaoPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    EditContatosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ConfirmacaoPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    EditContatosPage
  ],
  // providers: [AuthService,**AngularFireAuth, AngularFireDatabase**, AuthGuard, InventoryService]

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ContactService,
    FirebaseProvider,
    AngularFireAuth,
    Facebook,
    // GooglePlus,
    // TwitterConnect,
    // ImagePicker
  ]
})
export class AppModule {}