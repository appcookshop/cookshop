
import { Component } from '@angular/core';
// import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  slides = [
    {
      title: "Bienvenidos a la AppCookShop!",
      description: "Podes encontrar <b>nuestra App en las siguientes Plataformas</b>.",
      image: "../assets/imgs/logoCookShopSinFondo.png",
    },
    {
      title: "Quienes Somos ?",
      description: "Somos <b>una empresa que surge de la necesidad actual de querer cocinar</b> en poco tiempo, sin contar con todos los productos necesarios en nuestraos hogares.",
      image: "../assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "Nunca fue tan facil!",
      description: "Ahora <b>podes hacer tus recetas de una manera intuitiva y podes compartir tu creación </b>, recuerda que si no cuentas con todos los productos <b>podes entrar desde nuestra App y pedirlos desde tu hogar</b>",
      image: "assets/imgs/ica-slidebox-img-3.png",
    }
  ];
}
