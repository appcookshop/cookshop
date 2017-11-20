import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReciPage } from "../index.paginas";

import { Receta } from "../../recipes/recipes.interface";
import { RECIPES } from "../../recipes/recipes.data";

//FIREBASE
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

//infiniteScroll
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  //firebase
  adultomayor: Observable<any[]>;
  basico: Observable<any[]>;
  medio: Observable<any[]>;
  platino: Observable<any[]>;
  gold: Observable<any[]>;
  vegano: Observable<any[]>;
  nutricional: Observable<any[]>;
  //  fitness: Observable<any[]>;
  recetas: Receta[] = [];

  displayName: any = "No logueado";
  photoURL: any = "";

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
    });
    this.recetas = RECIPES.slice(0);

    //FIREBASE
    this.adultomayor = afDB.list('Planes/adultomayor').valueChanges();
    this.basico = afDB.list('Planes/basico/').valueChanges();
    this.medio = afDB.list('Planes/medio/').valueChanges();
    this.platino = afDB.list('Planes/Platino/').valueChanges();
    this.gold = afDB.list('Planes/gold/').valueChanges();
    this.vegano = afDB.list('Planes/vegano/').valueChanges();
    this.nutricional = afDB.list('Planes/nutricional/').valueChanges();
  }//close constructos


  viewRecipe(recipe: any) {
    console.log(recipe);
    this.navCtrl.push(ReciPage, { 'recipe': recipe })
  }

}
