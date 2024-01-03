import { Injectable } from '@angular/core';
import axios from 'axios';
import { enviroment } from 'environment';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Clases/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = enviroment.apiUrl;
  constructor() { }

  TodosUsuarios(): Observable<any[]> {
    return new Observable((observer)=>{
      axios.get(`${this.apiUrl}/users/todosUsuarios`)
      .then((response)=>{
        observer.next(response.data);
        observer.complete();
      })
      .catch((error)=>{
        observer.error(error);
      })
    })
  }

  RegistrarUsuario(usuario: Usuario):Observable<string>{
    return new Observable((observer)=>{
      axios.post(`${this.apiUrl}/users/registrarUsuario`, usuario)
      .then((response)=>{
        observer.next(response.data);
        observer.complete();
      })
      .catch((error)=>{
        observer.error(error);
      });
    });
  }

  ModificarUsuario(usuario:Usuario):Observable<string>{
    return new Observable((observer)=>{
      axios.put(`${this.apiUrl}/users/modificarUsuario/${usuario.id}`, usuario)
      .then((response)=>{
        observer.next(response.data);
        observer.complete();
      })
      .catch((error)=>{
        observer.error(error);
      })
    });
  }

  BorrarUsuario(id: string):Observable<string>{
    return new Observable((observer)=>{
      axios.delete(`${this.apiUrl}/users/borrarUsuario/${id}`)
      .then((response)=>{
        observer.next(response.data);
        observer.complete();
      })
      .catch((error)=>{
        observer.error(error);
      })
    })
  }

}
