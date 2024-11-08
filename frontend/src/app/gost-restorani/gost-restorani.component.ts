import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restorani';
import { RestoraniService } from '../services/restorani.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RezervacijeService } from '../services/rezervacije.service';

@Component({
  selector: 'app-gost-restorani',
  templateUrl: './gost-restorani.component.html',
  styleUrls: ['./gost-restorani.component.css']
})
export class GostRestoraniComponent {

  korisnik: Korisnik= new Korisnik()
  restorani: Restoran[]=[]
  sort: boolean = true;
  filtriraniRestorani: Restoran[]=[]

  constructor(private servisrestorani:RestoraniService ,private servis:UserService ,private router: Router, private zaRezervacije: RezervacijeService) { }

  ngOnInit(): void {
    let x= localStorage.getItem("korisnik")
    if(x!=null){
      this.korisnik= JSON.parse(x)
      this.servisrestorani.getAllRestorani().subscribe((data) => {
        this.restorani = data;
        this.restorani.forEach(restoran=>{
          this.servis.getKonobariRestoran(restoran.id).subscribe(konobari=>{
            restoran.konobari=konobari
          })
          restoran.prosecnaOcena=0
          this.zaRezervacije.getRezervacijeRestoran(restoran.id).subscribe(data=>{
            let br=0
            data.forEach(ocena=>{
              if(ocena.ocenjen==true){
                restoran.prosecnaOcena+=ocena.ocena
                br++
              }
            })
            if(br!=0) restoran.prosecnaOcena=restoran.prosecnaOcena/br
          })
        })
      })
    }
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


pretragaIme: string = '';
pretragaAdresa: string = '';
pretragaTip: string = '';



pretraziRestorane() {
  this.filtriraniRestorani = this.restorani.filter(restoran => {
    const odgovaraImenu = this.pretragaIme ? restoran.naziv.toLowerCase().includes(this.pretragaIme.toLowerCase()) : true;
    const odgovaraAdresi = this.pretragaAdresa ? restoran.adresa.toLowerCase().includes(this.pretragaAdresa.toLowerCase()) : true;
    const odgovaraTipu = this.pretragaTip ? restoran.tip.toLowerCase().includes(this.pretragaTip.toLowerCase()) : true;
    return odgovaraImenu && odgovaraAdresi && odgovaraTipu;
  });
}

idiNaRestoran(r: Restoran){
  localStorage.setItem("restoran", JSON.stringify(r))
  this.router.navigate(['restoran'])
}

nazad(){
  this.router.navigate(['gost'])
}

odjava(){
  localStorage.clear()
  this.router.navigate([''])
}

}
