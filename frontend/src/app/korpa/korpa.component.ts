import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restorani';
import { Jelo } from '../models/jela';
import { PorudzbineService } from '../services/porudzbine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent {

  constructor(private zaPorudz: PorudzbineService, private router:Router) { }

  korisnik: Korisnik= new Korisnik()
  restoran: Restoran= new Restoran()
  jela: Jelo[]=[]
  cena: number=0

  ngOnInit() {
    let x= localStorage.getItem("korisnik")
    let y= localStorage.getItem("restoran")
    let z= localStorage.getItem("korpa")
    if(x!=null && y!=null && z!=null){
      this.korisnik= JSON.parse(x)
      this.restoran= JSON.parse(y)
      this.jela= JSON.parse(z)
      this.jela.forEach(jelo => {
        this.cena+=jelo.cena*jelo.kolicina
      });
    }
  }

  izbaciIzKorpe(jelo: Jelo){
    this.jela=this.jela.filter(j=>j!=jelo)
    this.cena-=jelo.cena*jelo.kolicina
    localStorage.setItem("jela",JSON.stringify(this.jela))
  }

  naruci(){
    let jela: string=""
    let i: number=0
    this.jela.forEach(jelo => {
      if(i!=0){
        jela+=", "
      }
      jela+=(jelo.naziv)
      if(jelo.kolicina>1){
        jela+=" x"+jelo.kolicina
      }
    });
    this.zaPorudz.dodajPorudzbinu(this.korisnik.korisnicko_ime,this.restoran.naziv,this.restoran.id,jela.toString(),this.cena,new Date()).subscribe((data)=>{
      if(data['poruka']=="ok"){
        alert("Uspesno ste naručili")
        this.jela=[]
        this.cena=0
        localStorage.setItem("korpa",JSON.stringify(this.jela))
        this.ngOnInit()
      }
    })

  }

  nazad(){
    localStorage.setItem("korpa",JSON.stringify(this.jela))
    this.router.navigate(["/restoran"])
  }

}
