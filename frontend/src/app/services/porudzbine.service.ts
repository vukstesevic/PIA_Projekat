import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class PorudzbineService {

  constructor(private http: HttpClient) { }

  getPorudzbineGost(k : string){
    const data={
      korisnik :k
    }

    return this.http.post<Porudzbina[]>("http://localhost:4000/porudzbine/gost",data)
  }

  getPoslate(r : number){
    const data={
      idR :r
    }
    return this.http.post<Porudzbina[]>("http://localhost:4000/porudzbine/poslate",data)
  }

  getPorudzbineRestoran(r : number){
    const data={
      idR :r
    }
    return this.http.post<Porudzbina[]>("http://localhost:4000/porudzbine/restoran",data)
  }

  dodajPorudzbinu(k: string, r: string,id: number,  j: string, c: number, d: Date){
    const p={
      korisnik: k,
      restoran: r,
      idR: id,
      jela: j,
      cena: c,
      datum: d
    }
    return this.http.post<Poruka>("http://localhost:4000/porudzbine/dodajPorudzbinu",p)
  }

  potvrdi(id: number, vreme: string, vremeDostave: number){
    const data={
      idP :id,
      vremeDostave: vremeDostave,
      vreme: vreme
    }
    return this.http.post<Poruka>("http://localhost:4000/porudzbine/potvrdi",data)
  }

  odbij(id: number){
    const data={
      idP :id
    }
    return this.http.post<Poruka>("http://localhost:4000/porudzbine/odbij",data)
  }
}
