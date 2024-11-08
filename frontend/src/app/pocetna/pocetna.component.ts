import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../services/user.service';
import { RestoraniService } from '../services/restorani.service';
import { Restoran } from '../models/restorani';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {

  gosti: Korisnik[]=[]
  konobari: Korisnik[]=[]
  restorani: Restoran[]=[]
  sort: boolean = true;
  rezervacije: Rezervacija[] = [];
  brU24: number = 0;
  brUnedelju: number = 0;
  brUmesecu: number = 0;

  constructor(private servisRezervacije: RezervacijeService,private servisrestorani:RestoraniService ,private servis:UserService ,private router: Router) { }

  ngOnInit(): void {
    this.servis.getAllRegGosti().subscribe((data: Korisnik[]) => {
      if(data!=null)
      this.gosti = data;
    })
    this.servis.getAllKonobari().subscribe((data: Korisnik[]) => {
      if(data!=null)
      this.konobari = data;
    })

    this.servisrestorani.getAllRestorani().subscribe((data) => {
      this.restorani = data;
      this.restorani.forEach(restoran=>{
        this.servis.getKonobariRestoran(restoran.id).subscribe(konobari=>{
          restoran.konobari=konobari
        })
      })

    })
    this.servisRezervacije.getAllRezervacije().subscribe((data: Rezervacija[]) => {
      this.rezervacije = data;
      this.rezervacije.forEach(rezervacija => {
        if(rezervacija.status=="odobrena"){
        let datum = new Date(rezervacija.vreme);
        let danas = new Date();
        let razlika = danas.getTime() - datum.getTime();
        let dani = Math.floor(razlika / (1000 * 3600 * 24));
        if(dani <= 1){
          this.brU24++;
        }
        if(dani <= 7){
          this.brUnedelju++;
        }
        if(dani <= 30){
          this.brUmesecu++;
        }}
      });
    })
  }

  login(){
    this.router.navigate(['login']);
  }

  register(){
    this.router.navigate(['register']);
  }

  naziv(){
    if(this.sort){
    this.restorani.sort((a, b) => (a.naziv > b.naziv) ? 1 : -1)}
    else{
      this.restorani.sort((a, b) => (a.naziv < b.naziv) ? 1 : -1)
    }
  }

  adresa(){
    if(this.sort){
    this.restorani.sort((a, b) => (a.adresa > b.adresa) ? 1 : -1)}
    else{
      this.restorani.sort((a, b) => (a.adresa < b.adresa) ? 1 : -1)

    }
  }

  tip(){
    if(this.sort){
    this.restorani.sort((a, b) => (a.tip > b.tip) ? 1 : -1)}
    else{
      this.restorani.sort((a, b) => (a.tip < b.tip) ? 1 : -1)
    }
  }

  // Dodajte promenljive za pretragu
pretragaIme: string = '';
pretragaAdresa: string = '';
pretragaTip: string = '';
filtriraniRestorani: Restoran[] = [];

// Metoda za pretragu
pretraziRestorane() {
  this.filtriraniRestorani = this.restorani.filter(restoran => {
    const odgovaraImenu = this.pretragaIme ? restoran.naziv.toLowerCase().includes(this.pretragaIme.toLowerCase()) : true;
    const odgovaraAdresi = this.pretragaAdresa ? restoran.adresa.toLowerCase().includes(this.pretragaAdresa.toLowerCase()) : true;
    const odgovaraTipu = this.pretragaTip ? restoran.tip.toLowerCase().includes(this.pretragaTip.toLowerCase()) : true;
    return odgovaraImenu && odgovaraAdresi && odgovaraTipu;
  });
}

}
