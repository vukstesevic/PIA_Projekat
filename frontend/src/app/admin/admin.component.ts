import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RestoraniService } from '../services/restorani.service';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restorani';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private service: AdminService, private zaKorisnike: UserService,private zaRestorane: RestoraniService ,private router: Router) { }

  zahtevi: Korisnik[] = []
  gosti: Korisnik[] = []
  restorani: Restoran[] = []
  konobari: Korisnik[] = []

  ngOnInit(): void {
    let x= localStorage.getItem("admin")
    if(x!=null){
    this.zaKorisnike.getZahtevi().subscribe((data) => {
      this.zahtevi = data
    })

    this.zaKorisnike.getAllRegGosti().subscribe((data) => {
      this.gosti = data
    })

    this.zaKorisnike.getAllKonobari().subscribe((data) => {
      this.konobari = data
    })

    this.zaRestorane.getAllRestorani().subscribe((data) => {
      this.restorani = data
    })}
  }

  prikazZahteva: boolean = false
  prikazGostiju: boolean = false
  prikazRestorana: boolean = false
  prikazKonobara: boolean = false

  prikaziZahteve(){
    this.prikazZahteva = !this.prikazZahteva
  }

  prikaziGoste(){
    this.prikazGostiju = !this.prikazGostiju
  }

  prikaziRestorane(){
    this.prikazRestorana = !this.prikazRestorana
  }

  prikaziKonobare(){
    this.prikazKonobara = !this.prikazKonobara
  }

  odobriZahtev(korisnik: Korisnik){
    this.zaKorisnike.odobri(korisnik.korisnicko_ime).subscribe((data) => {
      if(data.poruka == "ok"){
        this.ngOnInit()
      }
    })
  }

  odbijZahtev(korisnik: Korisnik){
    this.zaKorisnike.nemojOdobriti(korisnik.korisnicko_ime).subscribe((data) => {
      if(data.poruka == "ok"){
        this.ngOnInit()
      }
    })
  }

  blokiraj(korisnik: Korisnik){
    this.zaKorisnike.deaktiviraj(korisnik.korisnicko_ime).subscribe((data) => {
      if(data.poruka == "ok"){
        this.ngOnInit()
      }
    })
  }

  aktiviraj(korisnik: Korisnik){
    this.zaKorisnike.aktiviraj(korisnik.korisnicko_ime).subscribe((data) => {
      if(data.poruka == "ok"){
        this.ngOnInit()
      }
    })

  }

  zaKonobara(){
    this.router.navigate(["kreirajKonobara"])
  }

  zaRestoran(){
    this.router.navigate(["kreirajRestoran"])

  }

  izmeni(Korisnik: Korisnik){
    localStorage.setItem("korisnik", JSON.stringify(Korisnik))
    this.router.navigate(["izmeniKorisnika"])
  }

  dodajJelo(r: Restoran){
    localStorage.setItem("restoran", JSON.stringify(r))
    this.router.navigate(["dodajJelo"])
  }

}
