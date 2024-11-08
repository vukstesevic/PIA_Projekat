import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { GostRestoraniComponent } from './gost-restorani/gost-restorani.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { KorpaComponent } from './korpa/korpa.component';
import { GostRezervacijeComponent } from './gost-rezervacije/gost-rezervacije.component';
import { GostDostaveComponent } from './gost-dostave/gost-dostave.component';
import { KonobarDostaveComponent } from './konobar-dostave/konobar-dostave.component';
import { KonobarRezervacijeComponent } from './konobar-rezervacije/konobar-rezervacije.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { KreiranjeRestoranaComponent } from './kreiranje-restorana/kreiranje-restorana.component';
import { KreiranjeKonobaraComponent } from './kreiranje-konobara/kreiranje-konobara.component';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika/izmeni-korisnika.component';
import { DodajJeloComponent } from './dodaj-jelo/dodaj-jelo.component';
import { StatistikaComponent } from './statistika/statistika.component';

const routes: Routes = [{path: '',component: PocetnaComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'gost',component:GostComponent},
  {path:'konobar',component: KonobarComponent},
  {path:'lozinka', component:LozinkaComponent},
  {path:'gostRestorani', component:GostRestoraniComponent},
  {path:'restoran',component:RestoraniComponent},
  {path:'korpa',component:KorpaComponent},
  {path:'gostRezervacije',component:GostRezervacijeComponent},
  {path:'gostDostave',component:GostDostaveComponent},
  {path:'konobarDostave',component:KonobarDostaveComponent},
  {path:'konobarRezervacije',component:KonobarRezervacijeComponent},
  {path:'adminLogin', component: AdminLoginComponent},
  {path:'admin', component: AdminComponent},
  {path:'kreirajRestoran', component: KreiranjeRestoranaComponent},
  {path:'kreirajKonobara', component: KreiranjeKonobaraComponent},
  {path:'izmeniKorisnika', component: IzmeniKorisnikaComponent},
  {path:'dodajJelo', component: DodajJeloComponent},
  {path:'konobarStatistika', component: StatistikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
