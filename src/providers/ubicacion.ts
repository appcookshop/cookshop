import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class UbicacionService {

  constructor(private geolocation: Geolocation, public afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) { }//fin construncior



  iniciar_localization() {
    let watch = this.geolocation.watchPosition();

    watch.subscribe((data) => {
      this.afAuth.authState.subscribe((auth) => {
        console.log(data);
        if (auth) {
          this.afDatabase.database.ref('Usuarios/' + auth.uid).child("lat").set(data.coords.latitude);
          this.afDatabase.database.ref('Usuarios/' + auth.uid).child("lng").set(data.coords.longitude);

        }
      })

    });
  }

}
