import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  register(korisnicko_ime: string,
    lozinka: string,
    bezbednosno_pitanje: string,
    odgovor_na_bezbednosno_pitanje: string,
    ime: string,
    prezime: string,
    pol: string,
    adresa: string,
    kontakt_telefon: string,
    email: string,
    profilna_slika: string,
    broj_kreditne_kartice: string,
    tip: string){
      const data={
        korisnicko_ime: korisnicko_ime,
        lozinka: lozinka,
        bezbednosno_pitanje: bezbednosno_pitanje,
        odgovor_na_bezbednosno_pitanje: odgovor_na_bezbednosno_pitanje,
        ime: ime,
        prezime: prezime,
        pol: pol,
        adresa: adresa,
        kontakt_telefon: kontakt_telefon,
        email: email,
        profilna_slika: profilna_slika,
        broj_kreditne_kartice: broj_kreditne_kartice,
        tip: tip
      }
      return this.http.post<Poruka>("http://localhost:4000/users/register", data)
    }

    dodajKonobara(korisnicko_ime: string,
    lozinka: string,
    bezbednosno_pitanje: string,
    odgovor_na_bezbednosno_pitanje: string,
    ime: string,
    prezime: string,
    pol: string,
    adresa: string,
    kontakt_telefon: string,
    email: string,
    profilna_slika: string,
    broj_kreditne_kartice: string,
    tip: string,
    idr: number,
    restoran: string){
      const data={
        korisnicko_ime: korisnicko_ime,
        lozinka: lozinka,
        bezbednosno_pitanje: bezbednosno_pitanje,
        odgovor_na_bezbednosno_pitanje: odgovor_na_bezbednosno_pitanje,
        ime: ime,
        prezime: prezime,
        pol: pol,
        adresa: adresa,
        kontakt_telefon: kontakt_telefon,
        email: email,
        profilna_slika: profilna_slika,
        broj_kreditne_kartice: broj_kreditne_kartice,
        tip: tip,
        idRestorana: idr,
        restoran: restoran
      }
      return this.http.post<Poruka>("http://localhost:4000/users/dodajKonobara", data)

    }

    uploadSliku(slika: File, ime: string){
      const formData = new FormData();
      formData.append('slika', slika);
      formData.append('korisnicko_ime', ime);
      return this.http.post<Poruka>('http://localhost:4000/users/upload', formData)

    }

    login(username: string, password: string){
      const data = {
        korisnicko_ime: username,
        lozinka: password
      }
      return this.http.post<Korisnik>('http://localhost:4000/users/login', data)
    }

    getKorisnikUsername(username: string){
      return this.http.post<Korisnik>('http://localhost:4000/users/getKorisnikUsername', {korisnicko_ime: username})
    }

    promemeniLozinku(username: string, password: string){
      const data = {
        korisnicko_ime: username,
        lozinka: password
      }
      return this.http.post<Poruka>('http://localhost:4000/users/promeniLozinku', data)
    }

    getAllKorisnici(){
      return this.http.get<Korisnik[]>('http://localhost:4000/users/getAllKorisnici')
    }

    getZahtevi(){
      return this.http.get<Korisnik[]>('http://localhost:4000/users/getZahtevi')
    }

    getAllRegGosti(){
      return this.http.get<Korisnik[]>('http://localhost:4000/users/getAllRegGosti')
    }

    getAllKonobari(){
      return this.http.get<Korisnik[]>('http://localhost:4000/users/getAllKonobari')
    }

    dohvatiSliku(slika: string){
      return this.http.get('http://localhost:4000/users/slike/'+slika, {responseType: 'blob'})
    }

    azurirajSliku(slika: File, ime: string){
      const formData = new FormData();
      formData.append('slika', slika);
      formData.append('korisnicko_ime', ime);
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajSliku', formData)
    }

    azurirajIme(username: string, ime: string){
      const data = {
        korisnicko_ime: username,
        ime: ime
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajIme', data)
    }

    azurirajPrezime(username: string, prezime: string){
      const data = {
        korisnicko_ime: username,
        prezime: prezime
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajPrezime', data)
    }

    azurirajPol(username: string, pol: string){
      const data = {
        korisnicko_ime: username,
        pol: pol
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajPol', data)
    }


    azurirajMejl(username: string, email: string){
      const data = {
        korisnicko_ime: username,
        email: email
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajMail', data)
    }

    azurirajTelefon(username: string, telefon: string){
      const data = {
        korisnicko_ime: username,
        kontakt_telefon: telefon
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajTelefon', data)
    }

    azurirajAdresu(username: string, adresa: string){
      const data = {
        korisnicko_ime: username,
        adresa: adresa
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajAdresu', data)
    }

    azurirajKartica(username: string, kartica: string){
      const data = {
        korisnicko_ime: username,
        broj_kreditne_kartice: kartica
      }
      return this.http.post<Poruka>('http://localhost:4000/users/azurirajKartica', data)
    }

    odobri(username: string){
      const data={
        korisnicko_ime: username
      }

      return this.http.post<Poruka>('http://localhost:4000/users/odobri', data)
    }

    nemojOdobriti(username: string){
      const data={
        korisnicko_ime: username
      }
      return this.http.post<Poruka>('http://localhost:4000/users/odbij', data)
    }

    deaktiviraj(username: string){
      const data={
        korisnicko_ime: username
      }

      return this.http.post<Poruka>('http://localhost:4000/users/deaktiviraj', data)
    }

    getKonobariRestoran(idr: number){
      const data={
        restoran: idr
      }

      return this.http.post<Korisnik[]>('http://localhost:4000/users/getKonobariResotran',data)
    }

    aktiviraj(username: string){
      const data={
        korisnicko_ime: username
      }

      return this.http.post<Poruka>('http://localhost:4000/users/aktiviraj', data)
    }
}
