import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/Clases/Usuario/usuario';
import { UserService } from '../Servicio/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = ["id", "name", "email", "action"];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userS:UserService,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.CargarPagina();
  }

  CargarPagina():void{
    this._userS.TodosUsuarios().subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  openDialog(accion:string, rowData: Usuario | null):void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        accion:accion,
        rowData
      },
      minWidth:"40%"
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!==""){
        this.CargarPagina();
        this.MensajeRespuesta("background-color: #3f51b5; border: solid 1px darkblue; border-radius: 4px; color: white; padding: 1%;", "large", result);
      }
    });
  }

  MensajeRespuesta(estilos: string, tamanoLetra: string, mensaje: string):void{
    const mensajeRespuesta=document.getElementById("mensajeRespuesta");
    const idUnico = Date.now().toString() + Math.random().toString();
    const contenedor = document.createElement("div");
    contenedor.style.marginTop="1%";
    contenedor.style.marginBottom="1%";
    contenedor.innerHTML = [
      `<div style="${estilos}" id="${idUnico}">
        <div style="font-size: ${tamanoLetra}; text-align: center;">${mensaje}</div>
      </div>`
    ].join("");
    mensajeRespuesta?.append(contenedor);
    setTimeout(()=>{
      document.getElementById(idUnico)?.remove();
    }, 8000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
