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
  ValidarOpciones():boolean{
    if(this.router.url!=="/auth/login" && this.router.url!=="/"){
      return true;
    }else{
      return false;
    }
  }
}
