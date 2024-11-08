import { Component, ElementRef, ViewChild } from '@angular/core';
import { RezervacijeService } from '../services/rezervacije.service';
import { RestoraniService } from '../services/restorani.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restorani';
import { Rezervacija } from '../models/rezervacija';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-konobar-rezervacije',
  templateUrl: './konobar-rezervacije.component.html',
  styleUrls: ['./konobar-rezervacije.component.css']
})
export class KonobarRezervacijeComponent {

    constructor(private zaRezervacije: RezervacijeService, private zaRestorane: RestoraniService, private router: Router) { }


    korisnik: Korisnik= new Korisnik()
    restoran: Restoran= new Restoran()
    rezervacije: Rezervacija[] = []
    zaduzenja: Rezervacija[] = []
    cekanje: Rezervacija[] = []
    potvrdi:boolean=false
    odbij: boolean=false
    rezervacija: Rezervacija= new Rezervacija()

    ngOnInit(): void {
      this.niz=[]
      this.trenutneRezervacije=[]
      this.cekanje=[]
      this.zaduzenja=[]
      this.potvrdi=false
      this.odbij=false
      let x= localStorage.getItem("korisnik")
      if(x!=null){
        this.korisnik= JSON.parse(x)
        this.zaRestorane.getRestoran(this.korisnik.idRestorana).subscribe((data) => {
          this.restoran= data
          this.zaRezervacije.getRezervacijeRestoran(this.restoran.id).subscribe((data) => {
            this.rezervacije= data
            this.rezervacije.forEach(rezervacija => {
              if(rezervacija.status=="poslata") this.cekanje.push(rezervacija)
              else if(rezervacija.zaduzenje==this.korisnik.korisnicko_ime)this.zaduzenja.push(rezervacija)
            })

            this.zaduzenja.forEach(rezervacija => {
              rezervacija.mozeSePotvrditi = this.mozeSePotvrditi(rezervacija);
              rezervacija.mozeSeProduziti = this.mozeSeProduziti(rezervacija);
            })

            this.cekanje.sort((a, b) => {
              const aVreme = new Date(a.vreme);
              const bVreme = new Date(b.vreme);
              return aVreme.getTime() - bVreme.getTime();
            });
          })
        })
      }
    }

  @ViewChild('canvas',{static: true}) canvas!: ElementRef<HTMLCanvasElement>;
  crc!: CanvasRenderingContext2D;

  ngAfterViewInit(){
    this.crc = this.canvas.nativeElement.getContext('2d')!;
  }

  niz: number[] = []
  drawOnCanvas(){
    this.dohvatiRez(new Date(this.rezervacija.vreme))
    for(let i=0; i<this.restoran.brStolova; i++){
      this.niz[i]=0
    }
    for(let i=0; i<this.restoran.brStolova; i++){
      this.trenutneRezervacije.forEach(rezervacija => {
        if(rezervacija.brStola==i+1) this.niz[i]++
      })
    }

    this.crc.clearRect(0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.restoran.plan.forEach(element => {
      if(element.tip=="kuhinja"){
        this.crc.fillStyle = 'white'
        this.crc.fillRect(element.x, element.y, 50, 50)
        this.crc.strokeStyle = 'black'
        this.crc.strokeRect(element.x, element.y, 50, 50)
        this.crc.fillStyle = 'black'
        this.crc.fillText("Kuhinja", element.x, element.y)
      }
      if(element.tip=="toalet"){
        this.crc.fillStyle = 'white'
        this.crc.fillRect(element.x, element.y, 50, 50)
        this.crc.strokeStyle = 'black'
        this.crc.strokeRect(element.x, element.y, 50, 50)
        this.crc.fillStyle = 'black'
        this.crc.fillText("Toalet", element.x, element.y)
      }
      if(element.tip=="sto"){
        if(element.redniBr==this.brStola){
          this.crc.beginPath();
          this.crc.arc(element.x, element.y, 25, 0, 2 * Math.PI);
        this.crc.fillStyle = 'red';
        this.crc.fill();
        this.crc.stroke();
        this.crc.closePath();
        this.crc.fillStyle = 'black'
        this.crc.fillText(element.brOsoba.toString() , element.x, element.y)
        }else if(this.niz[element.redniBr-1]==1){
          this.crc.beginPath();
        this.crc.arc(element.x, element.y, 25, 0, 2 * Math.PI);
        this.crc.fillStyle = 'red';
        this.crc.fill();
        this.crc.stroke();
        this.crc.closePath();
        this.crc.fillStyle = 'black'
        this.crc.fillText(element.brOsoba.toString() , element.x, element.y)
        }else{
        this.crc.beginPath();
        this.crc.arc(element.x, element.y, 25, 0, 2 * Math.PI);
        this.crc.fillStyle = 'white';
        this.crc.fill();
        this.crc.stroke();
        this.crc.closePath();
        this.crc.fillStyle = 'black'
        this.crc.fillText(element.brOsoba.toString() , element.x, element.y)}
      }
    });
  }


    mozeSeProduziti(rezervacija: Rezervacija): boolean {
      const sada = new Date();
      const rezervacijaVreme = new Date(rezervacija.vreme);
      const razlika = sada.getTime()-rezervacijaVreme.getTime()
      const minuta = 1000 * 60;
      return razlika <= 3 * 60 * minuta && razlika >=0;
    }

    mozeSePotvrditi(rezervacija: Rezervacija): boolean {
      if(rezervacija.bio==true) return false
      let sada = new Date();
      let rezervacijaVreme = new Date(rezervacija.vreme);
      let razlika = sada.getTime()- rezervacijaVreme.getTime() ;
      let minuta = 1000 * 60;
      let dozvoljeno= 3*60+30
      if(rezervacija.produzena==true){dozvoljeno+=60}
      return razlika <= dozvoljeno * minuta && razlika >=0;
    }

    trenutneRezervacije: Rezervacija[] = [];

    dohvatiRez(zadatoVreme: Date){
      let pocetnoVreme = new Date(zadatoVreme.getTime() - 3 * 60 * 60 * 1000);
      let krajnjeVreme = new Date(zadatoVreme.getTime() + 3 * 60 * 60 * 1000);
      let pocetnoProduzeno = new Date(zadatoVreme.getTime() - 4 * 60 * 60 * 1000);
      let krajnjeProduzeno = new Date(zadatoVreme.getTime() + 4 * 60 * 60 * 1000);
      this.trenutneRezervacije = this.rezervacije.filter(rezervacija => {
        if(rezervacija.produzena){
          let rezervacijaVreme = new Date(rezervacija.vreme);
          return rezervacijaVreme.getTime() >= pocetnoProduzeno.getTime() && rezervacijaVreme.getTime() <= krajnjeProduzeno.getTime() && rezervacija.status=="prihvacena"
        }else{
        let rezervacijaVreme = new Date(rezervacija.vreme);
        return rezervacijaVreme.getTime() >= pocetnoVreme.getTime() && rezervacijaVreme.getTime() <= krajnjeVreme.getTime() && rezervacija.status=="prihvacena";}
      });
    }



    prihvati(r: Rezervacija){
      this.rezervacija=r
      this.potvrdi=true
      this.odbij=false
      this.drawOnCanvas()
    }

    odbaci(r: Rezervacija){
      this.rezervacija=r
      this.odbij=true
      this.potvrdi=false
    }


    brStola: number=0
    komentar: string=""

    prihvatiRezervaciju(){
      this.zaRezervacije.prihvati(this.rezervacija.id, this.brStola, this.korisnik.korisnicko_ime).subscribe((data) => {
        if(data.poruka=="ok"){
          this.ngOnInit()
        }
      })
    }

    odbijRezervaciju(){
      this.zaRezervacije.odbij(this.rezervacija.id, this.komentar).subscribe((data) => {
        if(data.poruka=="ok"){
          this.ngOnInit()
        }
      })
    }

    dosao(r: Rezervacija){
      this.zaRezervacije.dosao(r.id).subscribe((data) => {
        if(data.poruka=="ok") r.mozeSePotvrditi=false
      })
    }

    nijeDosao(r: Rezervacija){
      this.zaRezervacije.nijeDosao(r.id).subscribe((data) => {
        if(data.poruka=="ok")r.mozeSePotvrditi=false
      })
    }

    produzi(r: Rezervacija){
      this.zaRezervacije.produzi(r.id).subscribe((data) => {
        if(data.poruka=="ok") r.mozeSeProduziti=false
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
