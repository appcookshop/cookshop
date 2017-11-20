import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { firebaseConfig } from "../config/firebase.config";

//import { Firebase } from '@ionic-native/firebase';

import { MyApp } from './app.component';
import { HomePage, TabsPage, RecipesPage, ShopPage, ReciPage, InfoPage, RegisterPage } from '../pages/index.paginas';

//coneccion a firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProvidersService } from '../providers/providers';
// import { RecetasProvider } from '../providers/recetas/recetas';

import { UbicacionService } from '../providers/ubicacion';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    RecipesPage,
    ShopPage,
    ReciPage,
    InfoPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGQAXMXTihRPgfxS5UGVPFZuWg15AcU8M'
    }),
    AgmSnazzyInfoWindowModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    RecipesPage,
    ShopPage,
    ReciPage,
    InfoPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireDatabase,
    AngularFireAuthModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersService,
    UbicacionService,
    Geolocation,
    // RecetasProvider
  ]
})
export class AppModule {}
