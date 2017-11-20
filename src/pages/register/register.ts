import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers/user';
import { HomePage } from "../index.paginas";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  click: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
   private alertCtrl: AlertController) {
      // se removio   private loadingCtrl: LoadingController,
  }

  async regis(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      await this.afAuth.auth.currentUser.sendEmailVerification();
      if (result) {
        this.afDatabase.database.ref('/Usuarios/' + result.uid).child("name").set(user.name);
        this.afDatabase.database.ref('/Usuarios/' + result.uid).child("email").set(result.email);
        this.afDatabase.database.ref('/Usuarios/' + result.uid).child("lastname").set(user.lastname);

      }
      this.navCtrl.push(HomePage);

    }
    catch (e) {
      console.log(e);
    }
    this.noVerifi();

  }
  cancel() {
    this.navCtrl.push(HomePage);
  }

  noVerifi() {
    let confirm = this.alertCtrl.create({
      title: 'Verificación',
      message: 'Se ha enviado un correo de verificación al dirección ' + this.user.email + '. Favor verificar para poder utilizar la aplicación.',
      buttons: [{ text: 'Ok', handler: () => { this.navCtrl.push(HomePage) } }]
    }); confirm.present();
  }

}
