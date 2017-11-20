import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage, RegisterPage } from "../index.paginas";
import { AngularFireDatabase } from "angularfire2/database";

//import { Firebase } from '@ionic-native/firebase';
// auth con facebook
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//importacion de la interfas usuario para la agragacion en la BD
import { User } from '../../providers/user';

//pruebas con Providers
// import { ProvidersService } from "../../providers/providers";


//ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="1978720358812324" --variable APP_NAME="CookShop"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user ={} as User;
  ver:any;

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth,
              private loadingCtrl:LoadingController, private afDatabase: AngularFireDatabase,
              private alertCtrl: AlertController) {
                // se removio private _us: ProvidersService,

     }


  recipe(){
    this.navCtrl.push(TabsPage);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewCanLeave(){
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present();

    let promesa = new Promise( ( resolve, reject )=>{

      setTimeout( ()=>{

        loading.dismiss();
        resolve(true)

      }, 2000 );

    })


    return promesa;

  }


  signInWithFacebook(res:any) {
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          console.log(res);
          this.navCtrl.push(TabsPage, res)}
      );
      this.afAuth.authState.subscribe(user => {
             this.afDatabase.database.ref('/Usuarios/'+user.uid).child("name").set(user.displayName);
             this.afDatabase.database.ref('/Usuarios/'+user.uid).child("email").set(user.email);
       });

}

  // log(){
  //     console.log("registrado");
  //     this.afAuth.authState.subscribe(auth =>{
  //       // this.afDatabase.list(`users/${auth.uid}`).push(auth.user);
  //       this.afDatabase.list('users/').push(auth.uid);
  //     });
  //   }

async login(user: User){
  try{
  const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  if(result.emailVerified == true){
    // console.log(result.emailVerified);
    this.navCtrl.push(TabsPage);
  }else{
    this.noVerifi();
  }
  // console.log(result);

  }
  catch (e){
    console.error(JSON.stringify(e));
    if(e){
      this.showConfirm();
    }
  }

}


showConfirm(){
    let confirm = this.alertCtrl.create({
      title: 'Error al Iniciar',
      message: 'El correo electronico o la contraseña no es el correcto.Por Favor verifique e intente de nuevo.',
      buttons:[{text:'Ok',handler:()=>{console.log('Agree clicked');}}]
    }); confirm.present();

  }

  noVerifi(){
    let confirm = this.alertCtrl.create({
      title: 'Error al Iniciar',
      message: 'El correo electronico no ha sido verificado. Por favor dirigirse a la bandeja de entrada y verificar su correo electronico.',
      buttons:[{text:'Ok',handler:()=>{console.log('Agree clicked');}}]
    }); confirm.present();
  }
}
