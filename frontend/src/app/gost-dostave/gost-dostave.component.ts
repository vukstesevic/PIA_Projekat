import { Component } from '@angular/core';
import { PorudzbineService } from '../services/porudzbine.service';
import { Router } from '@angular/router';
import { Porudzbina } from '../models/porudzbina';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-gost-dostave',
  templateUrl: './gost-dostave.component.html',
  styleUrls: ['./gost-dostave.component.css']
})
export class GostDostaveComponent {

  constructor(private zaPorudzbine: PorudzbineService, private router: Router) { }

  porudzbine: Porudzbina[] = []
  korisnik: Korisnik= new Korisnik()
  aktuelne: Porudzbina[] = []
  arhiva: Porudzbina[] = []

  ngOnInit(): void {
    let x= localStorage.getItem("korisnik")
    if(x!=null){
      this.korisnik= JSON.parse(x)
      this.zaPorudzbine.getPorudzbineGost(this.korisnik.korisnicko_ime).subscribe((data) => {
        this.porudzbine = data
        this.porudzbine.forEach(porudzbina => {
          if(porudzbina.status!="odbijeno") {
          if(porudzbina.status=="poslato"){this.aktuelne.push(porudzbina)}
          else{
          let sada= new Date();
          const porucio= new Date(porudzbina.vreme)
          const razlika= sada.getTime()-porucio.getTime()
          const vremeDostave=parseInt(porudzbina.vremeDostave)*60000
          if (razlika>vremeDostave){
            this.arhiva.push(porudzbina)}
          else{
            this.aktuelne.push(porudzbina)
          }}}
        });
        this.arhiva.sort((a, b) => {
          let dateA = new Date(a.vreme);
          let dateB = new Date(b.vreme);
          return dateB.getTime() - dateA.getTime();
        });

      })
    }
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
