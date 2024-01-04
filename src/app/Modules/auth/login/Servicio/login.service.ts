import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'environment';
import axios from "axios";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = enviroment.apiUrl;

  constructor() { }

    // Método para hacer la petición al backend NestJs enviando el email y el password para validar si son correctos o no
    Login(body:{email: string, password: string}): Observable<any>{
      return new Observable((observer)=>{
        axios.post(`${this.apiUrl}/auth/login`, body)
        .then((response)=>{
          observer.next(response.data);
          observer.complete();
        })
        .catch((error)=>{
          observer.error(error);
        });
      });
    }

}
