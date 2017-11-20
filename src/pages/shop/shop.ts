import { Component } from '@angular/core';
// , ViewChild, ElementRef
import { NavController} from 'ionic-angular';

import { Productos } from "../../products/products.interface";
import { PRODUCTOS } from "../../products/products.data";
import { Verduras } from "../../products/verduras.interface";
import { VERDURAS } from "../../products/verduras.data";

import { Ubicaciones } from "../../ubicaciones/ubicaciones.int";
import { UBICACIONES } from "../../ubicaciones/ubicaciones.data";

import { UbicacionService } from "../../providers/ubicacion";
// import { AgmCoreModule } from '@agm/core';
//FIREBASE
import { AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productos: Productos[]= [];
  verduras: Verduras[]= [];
  ubicaciones: Ubicaciones[]=[];

  userLat:number;
  userLng:number;
  userName:string;

  chofer:any = {};
  itemRef: AngularFireObject<any>;

  supermercados: Observable<any[]>;


  constructor( public navCtrl: NavController, private _ubicacion: UbicacionService,
              public afDB: AngularFireDatabase, private afAuth:AngularFireAuth) {
    this.productos = PRODUCTOS.slice(0);
    this.verduras = VERDURAS.slice(0);
    this.ubicaciones = UBICACIONES.slice(0);

    this._ubicacion.iniciar_localization(); 
    this.ubicacion_cliente();
    this.informacion_super();

}//constructor

  ubicacion_cliente(){
    this.afAuth.authState.subscribe((auth) =>{
      if(auth){
        this.itemRef = this.afDB.object('/Usuarios/'+ auth.uid);
        this.afDB.object('/Usuarios/'+ auth.uid).valueChanges().subscribe(data=>{
          this.chofer = data;
          this.userLat = this.chofer.lat;
          this.userLng = this.chofer.lng;
        });
      }
    })
  }

  informacion_super(){
    this.supermercados = this.afDB.list('Supermercado/').valueChanges();
    console.log(this.supermercados);
  }



}
