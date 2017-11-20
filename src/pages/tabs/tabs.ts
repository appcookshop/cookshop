import { Component } from '@angular/core';;
import { RecipesPage, ShopPage, InfoPage } from "../index.paginas";
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any = RecipesPage;
  tab2:any = ShopPage;
  tab3:any = InfoPage;

  constructor() {}

}
