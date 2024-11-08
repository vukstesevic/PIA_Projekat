import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { GostComponent } from './gost/gost.component';
import { AdminComponent } from './admin/admin.component';
import { KonobarComponent } from './konobar/konobar.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { GostRestoraniComponent } from './gost-restorani/gost-restorani.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { KorpaComponent } from './korpa/korpa.component';
import { GostRezervacijeComponent } from './gost-rezervacije/gost-rezervacije.component';
import { StarRatingModule } from 'angular-star-rating';
import { GostDostaveComponent } from './gost-dostave/gost-dostave.component';
import { KonobarDostaveComponent } from './konobar-dostave/konobar-dostave.component';
import { KonobarRezervacijeComponent } from './konobar-rezervacije/konobar-rezervacije.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { KreiranjeKonobaraComponent } from './kreiranje-konobara/kreiranje-konobara.component';
import { KreiranjeRestoranaComponent } from './kreiranje-restorana/kreiranje-restorana.component';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika/izmeni-korisnika.component';
import { DodajJeloComponent } from './dodaj-jelo/dodaj-jelo.component';
import { StatistikaComponent } from './statistika/statistika.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PocetnaComponent,
    GostComponent,
    AdminComponent,
    KonobarComponent,
    LozinkaComponent,
    GostRestoraniComponent,
    RestoraniComponent,
    KorpaComponent,
    GostRezervacijeComponent,
    GostDostaveComponent,
    KonobarDostaveComponent,
    KonobarRezervacijeComponent,
    AdminLoginComponent,
    KreiranjeKonobaraComponent,
    KreiranjeRestoranaComponent,
    IzmeniKorisnikaComponent,
    DodajJeloComponent,
    StatistikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
