import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Restoran } from '../models/restorani';
import { RestoraniService } from '../services/restorani.service';
import { RezervacijeService } from '../services/rezervacije.service';


@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent {
  constructor(private router: Router, private servis: UserService, private zaRestoran: RestoraniService, private zaRezervacije: RezervacijeService){ }

  konobar: Korisnik = new Korisnik()
  restoran: Restoran = new Restoran()
  zaduzenja: Rezervacija[] = []
  rezervacije: Rezervacija[] = []
  konobari: Korisnik[] = []
  brOsobaDanDatum: { [datum: string]: number } = {}
  brOsobaKonobar: { [imeKonobara: string]: number } = {}
  rezervacijeDani: { [danUNedelji: string]: Rezervacija[] } = {}
  prosekDani: { [danUNedelji: string]: number } = {};


  ngOnInit(): void {
    this.brOsobaDanDatum={}
    this.brOsobaKonobar={}
    this.rezervacijeDani= {'PON':[], 'UTO':[], 'SRE':[], 'CET':[], 'PET':[], 'SUB':[], 'NED':[]}
    this.prosekDani={'PON':0, 'UTO':0, 'SRE':0, 'CET':0, 'PET':0, 'SUB':0, 'NED':0}

    let x= localStorage.getItem('korisnik')
    if(x!=null){
      this.konobar=JSON.parse(x)
      this.zaRestoran.getRestoran(this.konobar.idRestorana).subscribe((data: any) => {
        this.restoran = data
      })
      this.servis.getKonobariRestoran(this.konobar.idRestorana).subscribe((data: any) => {
        this.konobari = data
      })
      this.zaRezervacije.getRezervacijeRestoran(this.konobar.idRestorana).subscribe((data: any) => {
        for (let rezervacija of data) {
          if (rezervacija.status=="prihvacena") {
            this.rezervacije.push(rezervacija)
          }
        }
        this.rezervacije.forEach((rezervacija: Rezervacija) => {
          if (rezervacija.zaduzenje == this.konobar.korisnicko_ime) {
            this.zaduzenja.push(rezervacija)
          }
        })
        let danas = new Date();
    let pre24Meseca = new Date();
    pre24Meseca.setFullYear(danas.getFullYear() - 2);
    for (let rezervacija of this.rezervacije) {
      let datum = new Date(rezervacija.vreme);
      if (datum >= pre24Meseca) {
        let danUNedelji = datum.getDay()
        switch (danUNedelji) {
          case 0:
            this.rezervacijeDani['NED'].push(rezervacija)
            break
          case 1:
            this.rezervacijeDani['PON'].push(rezervacija)
            break
          case 2:
            this.rezervacijeDani['UTO'].push(rezervacija)
            break
          case 3:
            this.rezervacijeDani['SRE'].push(rezervacija)
            break
          case 4:
            this.rezervacijeDani['CET'].push(rezervacija)
            break
          case 5:
            this.rezervacijeDani['PET'].push(rezervacija)
            break
          case 6:
            this.rezervacijeDani['SUB'].push(rezervacija)
            break
        }
      }
    }
      })
     this.crtaj()
    }
  }


  ngAfterViewInit(): void {
    this.crtaj()
  }

  crtaj() {
    setTimeout(() => {
        this.Bar()
        this.Pita()
        this.Histogram()
    },500);
  }

  Bar() {
    for (let zaduzenje of this.zaduzenja) {
      let dan = new Date(zaduzenje.vreme).toLocaleDateString()
      if (!this.brOsobaDanDatum[dan]) this.brOsobaDanDatum[dan] = 0
      this.brOsobaDanDatum[dan] += zaduzenje.brOsoba
    }
    let ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d')
    if(!ctx) return
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.brOsobaDanDatum),
        datasets: [{
          label:'Broj gostiju po danima',
          data: Object.values(this.brOsobaDanDatum),
          borderColor: 'rgba(26, 24, 25, 1)',
          borderWidth: 0.5,
          backgroundColor: 'rgba(255, 206, 86, 0.9)'
        }]
      }
    });
  }


  Pita() {
    for (let rezervacija of this.rezervacije) {
      if (!this.brOsobaKonobar[rezervacija.zaduzenje])  this.brOsobaKonobar[rezervacija.zaduzenje] = 0
      this.brOsobaKonobar[rezervacija.zaduzenje] += rezervacija.brOsoba
    }
    let ctx = (document.getElementById('pieChart') as HTMLCanvasElement).getContext('2d')
    if(!ctx) return
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.brOsobaKonobar),
        datasets: [{
          label: 'Raspodela gostiju među konobarima',
          data: Object.values(this.brOsobaKonobar),
          borderColor:[
            'rgba(5, 177, 47, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(235, 54, 162, 1)',
            'rgba(176, 5, 170, 1)'
          ],
          borderWidth: 0.5,
          backgroundColor: [
            'rgba(5, 177, 47, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(235, 54, 162, 0.7)',
            'rgba(176, 5, 170, 0.85)'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }

  Histogram() {
    for (let dan in this.rezervacijeDani) {
      let suma = 0
      for (let rezervacija of this.rezervacijeDani[dan]) {
        suma += rezervacija.brOsoba
      }
      if(this.rezervacijeDani[dan].length!=0) this.prosekDani[dan] = suma / this.rezervacijeDani[dan].length
    }
    let ctx = (document.getElementById('histogramChart') as HTMLCanvasElement).getContext('2d');
    if(!ctx) return
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.prosekDani),
        datasets: [{
          label: 'Prosečan broj rezervacija za dane u nedelji',
          data: Object.values(this.prosekDani),
          borderColor: 'rgba(26, 24, 25, 1)',
          borderWidth: 0.5,
          backgroundColor: 'rgba(0, 93, 186, 0.8)'
        }]
      }
    });
  }


  nazad(){
    this.router.navigate(['konobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }


}
