export class Rezervacija{
  id: number = 0
  korisnik: string=""
  idR: number = 0
  restoran: string=""
  vreme: Date = new Date();
  brOsoba: number = 0;
  brStola: number = 0;
  zahtev: string = "";
  status: string = "";
  adresa: string = "";
  bio: Boolean=false
  ocenjen: Boolean=false
  ocena: number=0
  komentar: String=""
  mozeSeOtkazati: Boolean=false
  sto: number=0
  produzena: Boolean=false
  zaduzenje: string=""
  komentarOdbijanje: string=""
  mozeSePotvrditi: Boolean=false
  mozeSeProduziti: Boolean=false
  preko: string=""
}
