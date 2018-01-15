import { Camera } from '@ionic-native/camera';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { AvisosServicesProvider } from '../providers/avisos-services/avisos-services';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Sim } from '@ionic-native/sim';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

export const firebaseConfig = {
  // api juan
   apiKey: "AIzaSyCnL8JbpBHqOm6u36u4h8KjnMgxUkscVK4",
   authDomain: "inmobiliariavirtual-42c8e.firebaseapp.com",
   databaseURL: "https://inmobiliariavirtual-42c8e.firebaseio.com",
   projectId: "inmobiliariavirtual-42c8e",
   storageBucket: "inmobiliariavirtual-42c8e.appspot.com",
   messagingSenderId: "977567910476"

  // api Nelson
  // apiKey: "AIzaSyC8G1aiGA8DZc7Dv_2U0tJDeaV4S-i3pF0",
  // authDomain: "inmobiliariavirtual-cd089.firebaseapp.com",
  // databaseURL: "https://inmobiliariavirtual-cd089.firebaseio.com",
  // projectId: "inmobiliariavirtual-cd089",
  // storageBucket: "inmobiliariavirtual-cd089.appspot.com",
  // messagingSenderId: "742028901543"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AvisosServicesProvider,
    HttpClient,
    Camera,
    AngularFireDatabase,
    AngularFireAuth,
    GoogleMaps,
    Sim,
    CallNumber,
    SocialSharing
  ]
})
export class AppModule {}
