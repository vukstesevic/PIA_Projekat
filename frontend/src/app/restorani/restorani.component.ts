import { Component } from '@angular/core';
import { RestoraniService } from '../services/restorani.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restorani';
import * as L from 'leaflet';
import { KoordinateService } from '../services/koordinate.service';
import { RezervacijeService } from '../services/rezervacije.service';

import {ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Jelo } from '../models/jela';
import { Rezervacija } from '../models/rezervacija';



@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent {

  korisnik: Korisnik= new Korisnik()
  restoran: Restoran= new Restoran()
  rezervacije: Rezervacija[]=[]

  map: L.Map | undefined;

   initMap() {
    this.zaKoordinate.koordinate(this.restoran.adresa).subscribe((data) => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        this.map = L.map('map', {
          center: [lat, lon],
          zoom: 15
        });

       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        const marker = L.marker([lat, lon]).addTo(this.map)
          .bindPopup('<b>'+this.restoran.naziv+'</b><br>Adresa:'+this.restoran.adresa)
          .openPopup();
    }})


  }


  constructor(private zaRezervacije:RezervacijeService ,private zaKoordinate: KoordinateService ,private servisrestorani:RestoraniService ,private servis:UserService ,private router: Router) { }

  ngOnInit(): void {
    let k= localStorage.getItem("korpa")
    if(k!=null){
      this.korpa= JSON.parse(k)
    }
    let x = localStorage.getItem("korisnik")
    let y= localStorage.getItem("restoran")
    if(x!=null && y!=null){
      this.korisnik= JSON.parse(x)
      this.restoran= JSON.parse(y)
      this.zaRezervacije.getRezervacijeRestoran(this.restoran.id).subscribe(data=>{
        this.rezervacije=data
      })
    this.restoran.meni.forEach(element => {
      if(element.slika!="")
      this.servisrestorani.dohvatiSliku(element.slika).subscribe((data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => {
          element.slika = reader.result as string;
        };
      })
    });

    }
    this.initMap();
    this.setMinDateTime();
  }

  brojOsobaNiz= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  vreme: Date = new Date();
  brOsoba: number = 0;
  zahtev: string = "";
  minDateTime: string=""
  porukaRez: string=""


  padZero(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  setMinDateTime(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padZero(now.getMonth() + 1); // Meseci su indeksirani od 0
    const day = this.padZero(now.getDate());
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    this.minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  rezervisi(){
    let now= new Date()
    const rezervacijaVreme = new Date(this.vreme);
    if((rezervacijaVreme.getHours() < this.restoran.radnoVreme[0].hours ||(rezervacijaVreme.getHours() == this.restoran.radnoVreme[0].hours && rezervacijaVreme.getMinutes()< this.restoran.radnoVreme[0].minutes )) || (rezervacijaVreme.getHours()> this.restoran.radnoVreme[1].hours ||(rezervacijaVreme.getHours()==this.restoran.radnoVreme[1].hours && rezervacijaVreme.getMinutes()> this.restoran.radnoVreme[1].minutes))){this.porukaRez="Ne mozete rezervisati van radnog vremena"; return;}
    this.porukaRez=""
    this.zaRezervacije.dodajRezervaciju(this.korisnik.korisnicko_ime, this.restoran.naziv,this.restoran.id,this.vreme, this.brOsoba, this.zahtev).subscribe((data) => {
      if(data['poruka']=="ok"){
        alert("Uspesno ste rezervisali")
        this.brOsoba=0
        this.zahtev=""
        this.ngOnInit()
      }
    })
  }


  korpa: Jelo[]=[]
  kolicina: number=1

  dodajUKorpu(jelo: Jelo){
   let bilo=false
    this.korpa.forEach(element => {
      if(element.naziv==jelo.naziv){
        element.kolicina += this.kolicina
        alert(jelo.naziv+" dodato u korpu "+this.kolicina+" puta")
        bilo=true
        return
      }
    })
    if(bilo){
      return
    }
    alert(jelo.naziv+" dodato u korpu "+this.kolicina+" puta")
    jelo.kolicina= this.kolicina
    this.korpa.push(jelo)
  }

  idiNaKorpu(){
    localStorage.setItem("korpa", JSON.stringify(this.korpa))
    this.router.navigate(['/korpa'])
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }


}
