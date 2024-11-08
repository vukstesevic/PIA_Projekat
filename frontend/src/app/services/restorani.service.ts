import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restorani';
import { Plan } from '../models/plan';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class RestoraniService {

  constructor(private http:HttpClient) { }

  getAllRestorani(){
    return this.http.get<Restoran[]>("http://localhost:4000/restorani/getAllRestorani")
  }

  getRestoran(naziv: number){
    const data={
      id: naziv
    }
    return this.http.post<Restoran>("http://localhost:4000/restorani/getRestoran", data)
  }

  dodajRestoran(
    naziv: string,
    adresa: string,
    tip: string,
    opis: string,
    telefon: string,
    radnoVreme: number[],
    plan: Plan[],
    brStola: number
  ){
    const data={
      naziv: naziv,
      adresa: adresa,
      tip: tip,
      opis: opis,
      telefon: telefon,
      radnoVreme: radnoVreme,
      plan: plan,
      brStola: brStola
    }
    return this.http.post<Poruka>("http://localhost:4000/restorani/dodajRestoran", data)
  }

  dodajJelo(
    naziv: string,
    cena: number,
    opis: string,
    slika: File,
    restoran: number
  ){
    const data = new FormData();
    data.append('naziv', naziv);
    data.append('cena', cena.toString());
    data.append('opis', opis);
    data.append('slika', slika);
    data.append('restoran', restoran.toString());
    return this.http.post<Poruka>("http://localhost:4000/restorani/dodajJelo", data)
  }

  dohvatiSliku(slika: string){
    return this.http.get('http://localhost:4000/restorani/slike/'+slika, {responseType: 'blob'})
  }

}
