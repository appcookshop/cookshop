import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-reci',
  templateUrl: 'reci.html',
})
export class ReciPage {
  recipe:any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    console.log(navParams);

    this.recipe = this.navParams.get("recipe");
  }



}
