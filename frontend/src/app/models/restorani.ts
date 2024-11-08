import { Time } from "@angular/common"
import { Jelo } from "./jela"
import { Korisnik } from "./korisnik"
import { Plan } from "./plan"

export class  Restoran{
  id: number=0
  naziv: string=""
  adresa: string=""
  tip: string=""
  opis: string=""
  prosecnaOcena: number=0
  konobari: Korisnik[]=[]
  telefon: string=""
  komentari: string[]=[]
  brStolova: number=0
  radnoVreme: Time[]=[]
  plan: Plan[]=[]
  meni: Jelo[]=[]
}
