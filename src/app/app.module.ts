import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Imports de los modulos que se crearon
import { LoginModule } from './Modules/auth/login/login.module';
import { DashboardModule } from './Modules/dashboard/dashboard.module';
import { UsersModule } from './Modules/users/users.module';
import { HomeModule } from './Modules/home/home.module';

// Imports de angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Arreglo para agregar componentes de angular material en el principal componente que es AppComponent
const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Se agregaron tanto el arreglo de los componentes de angular material
    // así también como los modulos de Home, Login, Dashboard y Users
    materialModules,
    HomeModule,
    LoginModule,
    DashboardModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
