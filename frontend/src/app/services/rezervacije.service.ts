import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor(private http: HttpClient) { }

  getAllRezervacije(){
    return this.http.get<Rezervacija[]>("http://localhost:4000/rezervacije/getAllRezervacije")
  }

  getRezervacijeGost(gost : string){
    const data={
      gost: gost
    }
    return this.http.post<Rezervacija[]>("http://localhost:4000/rezervacije/getRezervacijeGost", data)
  }

  getRezervacijeRestoran(restoran : number){
    const data={
      restoran: restoran
    }
    return this.http.post<Rezervacija[]>("http://localhost:4000/rezervacije/getRezervacijeRestoran", data)
  }

  dodajRezervaciju(korisnik: string, restoran: string, IdR: number,datum: Date, brojOsoba: number, zahtev: string){
    const data={
      korisnik: korisnik,
      idR: IdR,
      restoran: restoran,
      datum: datum,
      brojOsoba: brojOsoba,
      zahtev: zahtev
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/dodajRezervaciju", data)
  }

  oceniRezervaciju(id: number, ocena: number, komentar: string){
    const data={
      id: id,
      ocena: ocena,
      komentar: komentar
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/oceniRezervaciju", data)
  }

  dosao(id: number){
    const data={
      id: id
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/dosao", data)
  }

  nijeDosao(id: number){
    const data={
      id: id
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/nijedosao", data)
  }

  produzi(id: number){
    const data={
      id: id
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/produzi", data)
  }

  prihvati(
    id: number,
    brStola: number,
    korisnik: string
  ){
    const data={
      id: id,
      brStola: brStola,
      korisnik: korisnik
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/prihvati", data)
  }

  odbij(
    id: number,
    komentar: string
  ){
    const data={
      id: id,
      komentar: komentar
    }
    return this.http.post<Poruka>("http://localhost:4000/rezervacije/odbij", data)
  }



}
