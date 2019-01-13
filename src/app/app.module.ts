import { FavoumarcasPageModule } from './../pages/favoumarcas/favoumarcas.module';
import { FavoumarcasPage } from './../pages/favoumarcas/favoumarcas';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http'; 
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { EditContatosPage } from '../pages/edit-contatos/edit-contatos';
import { ConfirmacaoPage } from "../pages/confirmacao/confirmacao";
import { UsuarioPage } from '../pages/usuario/usuario';
import { AuthService } from '../providers/auth/auth-service';
import { ContactService } from '../providers/contact-service/contact-service';

// import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { MarcasPageModule } from '../pages/marcas/marcas.module';
import { DistribuidoresPageModule } from "../pages/distribuidores/distribuidores.module";
import { ContatosPage } from '../pages/contatos/contatos';
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
    ContatosPage,
    UsuarioPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    EditContatosPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MarcasPageModule,
    FavoumarcasPageModule,
    DistribuidoresPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ContatosPage,
    ConfirmacaoPage,
    UsuarioPage,
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
    NativeStorage,
    FirebaseProvider,
    AngularFireAuth,
    Facebook,
    // GooglePlus,
    // TwitterConnect,
    // ImagePicker
  ]
})
export class AppModule {}
