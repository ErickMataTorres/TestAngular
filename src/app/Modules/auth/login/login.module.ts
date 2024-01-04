// Modulo login en el cual se hacen las importaciones necesarias que se van a utilizar en el componente de LoginComponent

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import  {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './Componente/login.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const materialModules=[
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule
];


@NgModule({
  declarations: [
    LoginComponent
    ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    materialModules,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
