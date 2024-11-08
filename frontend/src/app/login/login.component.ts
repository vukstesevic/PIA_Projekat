import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servis:UserService, private router: Router) { }

  korisnicko_ime: string=""
  lozinka: string=""
  poruka: string=""

  hash(lozinka: string): string {
    return CryptoJS.SHA256(lozinka).toString(CryptoJS.enc.Hex);
  }

  login(){
    if(this.korisnicko_ime=="" || this.lozinka=="") {this.poruka="Niste uneli korisničko ime ili lozinku."; return}
    let sifra= this.hash(this.lozinka)
    this.servis.login(this.korisnicko_ime, sifra).subscribe(data => {
      if(data==null) {this.poruka="Ne postoji korisnik sa tim korisničkim imenom i lozinkom."; return}
      else{
        this.poruka="";
        if(data.tip=="gost") {
          localStorage.setItem('korisnik', JSON.stringify(data));
          this.router.navigate(['gost']);}
        else if(data.tip=="konobar"){
          localStorage.setItem('korisnik', JSON.stringify(data));
          this.router.navigate(['konobar']);}
        this.poruka="Došloje do greške."
      }

    });
  }

  zaboravljenaLozinka(){
    this.router.navigate(['lozinka']);
  }

}
