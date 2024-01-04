import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Usuario } from 'src/app/Clases/Usuario/usuario';
import { UserService } from '../../Servicio/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  
  idFormControl=new FormControl();
  nameFormControl=new FormControl("",[Validators.required]);
  emailFormControl = new FormControl("", [Validators.required, Validators.email]);
  passwordFormControl=new FormControl("", [Validators.required]);

  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {accion:string, rowData: Usuario},
    private _usersS: UserService,
    private dialogRef:MatDialogRef<DialogComponent>
  ){}

  ngOnInit():void{
    if(this.data.accion==="Registrar"){
      this.idFormControl.setValue("Nuevo");
    }else{
        this.idFormControl.setValue(this.data.rowData.id);    
        this.nameFormControl.setValue(this.data.rowData.name);
        this.emailFormControl.setValue(this.data.rowData.email);
        this.passwordFormControl.setValue(this.data.rowData.password);
    }
  }
  
  NoEspaciosPrimero(event: KeyboardEvent):void{
    if((event.target as HTMLInputElement).value===""){
      if(event.code==="Space"){
        event.preventDefault();
      }
    }
  }
  SoloLetras(event:KeyboardEvent):void{
    const soloLetras = /^[a-zA-ZñÑáéíóú]+$/;
    if ((event.target as HTMLInputElement).value === "") {
        if (event.code === "Space") {
            event.preventDefault();
            return;
        }
    }
    if (!soloLetras.test(event.key) && event.code !== "Space") {
        event.preventDefault();
    }
  }

  LlamarAccion():void{
    if(this.nameFormControl.value===""||this.emailFormControl.value===""||this.passwordFormControl.value===""||this.emailFormControl.invalid){
      this.nameFormControl.markAsTouched();
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      return;
    }
    const usuario: Usuario={
      id:this.idFormControl.value,
      name:this.nameFormControl.value!,
      email:this.emailFormControl.value!,
      password:this.passwordFormControl.value!
    };
    if(this.data.accion==="Registrar"){
      this._usersS.RegistrarUsuario(usuario).subscribe((response)=>{
        this.dialogRef.close(response);
      });
    }else{
      if(this.data.accion==="Modificar"){
        this._usersS.ModificarUsuario(usuario).subscribe((response)=>{
          this.dialogRef.close(response);
        })
      }else{
        this._usersS.BorrarUsuario(this.idFormControl.value).subscribe((response)=>{
          this.dialogRef.close(response);
        });
      }
    }
  }
}
