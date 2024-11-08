import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent {

  constructor(private servis:UserService, private router: Router) { }

  stara: boolean= false
  korisnicko_ime: string=""
  lozinka: string=""
  nova1: string=""
  nova2: string=""
  odgovor: string=""
  poruka: string=""
  poruka2: string=""
  korisnik: Korisnik= new Korisnik()
  krsnk: boolean=false
  poruka3: string=""
  odgovorio: boolean=false
  poruka4: string=""

  validirajLozinku() {
    const lozinkaRegex = /^(?=[A-Za-z])(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
    if (!lozinkaRegex.test(this.nova1)) {
      return false;
    }
    return true;
  }



  hash(lozinka: string): string {
    return CryptoJS.SHA256(lozinka).toString(CryptoJS.enc.Hex);
  }

  promeni(){
    if(this.korisnicko_ime==""){this.poruka="Unesite korisničko ime!"; return;}
    if(this.lozinka==""){this.poruka="Unesite lozinku!"; return;}
    if(this.nova1==""){this.poruka="Unesite novu lozinku!"; return;}
    if(this.nova1!=this.nova2){this.poruka="Nove lozinke se ne poklapaju!"; return;}
    if(!this.validirajLozinku()) {this.poruka="Lozinka nije u dobrom formatu!"; return;}
    let sifra= this.hash(this.nova1)
    this.servis.getKorisnikUsername(this.korisnicko_ime).subscribe((data: Korisnik)=>{
      if(data==null){this.poruka="Korisnik ne postoji!"; return;}
      this.korisnik=data
      if(this.korisnik.lozinka!=this.lozinka){this.poruka="Lozinka nije tačna!"; return;}
      this.servis.promemeniLozinku(this.korisnicko_ime, sifra).subscribe((data)=>{
        if(data['poruka']){
          alert("Uspešno ste promenili lozinku!")
          this.router.navigate(['login'])
        }
      })
    })
  }

  prikaz(){
    if(this.korisnicko_ime==""){this.poruka2="Unesite korisničko ime!"; return;}
    this.poruka2=""
    this.servis.getKorisnikUsername(this.korisnicko_ime).subscribe((data: Korisnik)=>{
      if(data==null){this.poruka2="Korisnik ne postoji!"; return;}
      this.korisnik=data
      this.krsnk= true
    })
  }

  odgovori(){
    if(this.odgovor!=this.korisnik.odgovor_na_bezbednosno_pitanje){this.poruka4="Odgovor nije tačan!"; return;}
    else{
      this.odgovorio=true
    }
  }

  promenaPitanje(){
    if(this.nova1==""){this.poruka3="Unesite novu lozinku!"; return;}
    if(this.nova1!=this.nova2){this.poruka3="Nove lozinke se ne poklapaju!"; return;}
    if(!this.validirajLozinku()) {this.poruka3="Lozinka nije u dobrom formatu!"; return;}
    let sifra= this.hash(this.nova1)
    this.servis.promemeniLozinku(this.korisnicko_ime, sifra).subscribe((data)=>{
      if(data['poruka']){
        alert("Uspešno ste promenili lozinku!")
        this.router.navigate(['login'])
      }
    })
  }


}
