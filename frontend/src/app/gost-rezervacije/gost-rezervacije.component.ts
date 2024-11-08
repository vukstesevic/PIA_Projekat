import { Component } from '@angular/core';
import { RezervacijeService } from '../services/rezervacije.service';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { RestoraniService } from '../services/restorani.service';
import { Restoran } from '../models/restorani';
import { RatingChangeEvent } from 'angular-star-rating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gost-rezervacije',
  templateUrl: './gost-rezervacije.component.html',
  styleUrls: ['./gost-rezervacije.component.css']
})
export class GostRezervacijeComponent {

  constructor(private zaRezervacije: RezervacijeService, private zaRestorane: RestoraniService, private router:Router){}

  korisnik: Korisnik= new Korisnik()
  rezervacije: Rezervacija[] = []
  aktuelne: Rezervacija[]=[]
  prosle: Rezervacija[]=[]

  ngOnInit(): void {
    this.aktuelne=[]
    this.prosle=[]
    let x = localStorage.getItem("korisnik")
    if(x!=null){
      this.korisnik= JSON.parse(x)
      this.zaRezervacije.getRezervacijeGost(this.korisnik.korisnicko_ime).subscribe((data: Rezervacija[])=>{
        this.rezervacije= data
        this.rezervacije.forEach(element => {
          let datum= new Date(element.vreme)
          let danas= new Date()
          if(datum>danas){
            this.aktuelne.push(element)
          }else{
            this.prosle.push(element)
          }
        })
        this.aktuelne.sort((a, b) => new Date(a.vreme).getTime() - new Date(b.vreme).getTime());
        this.prosle.sort((a, b) => new Date(b.vreme).getTime() - new Date(a.vreme).getTime());
        this.aktuelne.forEach(rezervacija => {
          this.zaRestorane.getRestoran(rezervacija.idR).subscribe((restoran: Restoran) => {
            rezervacija.adresa= restoran.adresa
          });
          rezervacija.mozeSeOtkazati = this.mozeSeOtkazati(rezervacija);
        });
      })
    }
  }

  id: number= 0
  bool: boolean= false

  oceni(id: number){
    this.id= id
    this.bool= true
  }

  ocena: number= 0
  komentar: string= ""

  ocenjivanje(event: RatingChangeEvent){
    this.ocena= event.rating
  }

  oceniRezervaciju(){
    this.zaRezervacije.oceniRezervaciju(this.id, this.ocena, this.komentar).subscribe((data)=>{
      this.bool= false
      this.ocena=0
      this.komentar=""
      this.ngOnInit()
    })
  }

  mozeSeOtkazati(rezervacija: Rezervacija): boolean {
    const sada = new Date();
    const rezervacijaVreme = new Date(rezervacija.vreme);
    const razlika = rezervacijaVreme.getTime() - sada.getTime();
    const minuta = 1000 * 60;
    return razlika >= 45 * minuta;
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }



}
