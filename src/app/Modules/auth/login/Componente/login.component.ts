import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../Servicio/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required])
  datosIncorrectos = false;
  hide = true;
  constructor(
    private _loginService:LoginService,
    private router: Router
  ){}

  // Validar que no se permitan espacion en el un input
  NoEspaciosEnBlanco(event: KeyboardEvent):void{
    if(event.code==="Space"){
      event.preventDefault();
    }
  }

  // Validación de inicio de sesión, mostrando los mensajes emergentes para cada situación
  IniciarSesion():void{
    if(this.emailFormControl.value==="" || this.passwordFormControl.value === ""){
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      return;
    }
    else{
      this._loginService.Login({email: this.emailFormControl.value!, password: this.passwordFormControl.value!}).subscribe(response=>{
        if(response.success){
          this.datosIncorrectos=false;
          this.router.navigate(["dashboard"]);
        }else{
          this.datosIncorrectos=true;
        }
      });
    }
  }



}
