import { Component } from '@angular/core';
import { PorudzbineService } from '../services/porudzbine.service';
import { Korisnik } from '../models/korisnik';
import { Porudzbina } from '../models/porudzbina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-konobar-dostave',
  templateUrl: './konobar-dostave.component.html',
  styleUrls: ['./konobar-dostave.component.css']
})
export class KonobarDostaveComponent {

  constructor(private zaDostave: PorudzbineService, private router: Router){}

  konobar: Korisnik=new Korisnik();
  porudzbine: Porudzbina[]=[];

  ngOnInit(): void {
    this.vremeDostave=0
    let x=localStorage.getItem('korisnik');
    if(x!=null){
      this.konobar=JSON.parse(x);
      this.zaDostave.getPoslate(this.konobar.idRestorana).subscribe((data: any) => {
        this.porudzbine= data
    })
  }
}

  vremeDostave: number=0
  vremeDostaveString: string=""

  potvrdi(id: number){
    if(this.vremeDostave==30) this.vremeDostaveString="20-30 minuta"
    else if(this.vremeDostave=40) this.vremeDostaveString="30-40 minuta"
    else if(this.vremeDostave=60) this.vremeDostaveString="50-60 minuta"
    this.zaDostave.potvrdi(id, this.vremeDostaveString, this.vremeDostave).subscribe((data: any) => {
      this.ngOnInit()
    })
  }

  odbij(id: number){
    this.zaDostave.odbij(id).subscribe((data: any) => {
      this.ngOnInit()
    })
  }

  nazad(){
    this.router.navigate(['konobar'])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }


}
