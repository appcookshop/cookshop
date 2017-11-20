import { Injectable } from '@angular/core';

// import { AngularFire } from "angularfire2";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProvidersService{

  items: Observable<any[]>;


  constructor(private af: AngularFireDatabase) {}

  verifica_usuario( clave:string ){
      clave = clave.toLowerCase();

      let promesa = new Promise( (resolve, reject)=>{
        this.af.list('/usuarios/'+clave).valueChanges().subscribe(data =>{
          console.log(data);
          resolve();
        })
      });
      return promesa;
  }

  ins_user(){


  }

}
