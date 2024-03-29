import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(
    private router: Router
  ){}
  // Método para validar en que ruta vamos a estar para así manejar que elementos se mostrarán en el html de cada componente
  ValidarOpciones():boolean{
    if(this.router.url!=="/auth/login" && this.router.url!=="/"){
      return true;
    }else{
      return false;
    }
  }
}
