import { AfterViewInit, Component } from '@angular/core';
import { RestoraniService } from '../services/restorani.service';
import { Router } from '@angular/router';
import { Plan } from '../models/plan';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-kreiranje-restorana',
  templateUrl: './kreiranje-restorana.component.html',
  styleUrls: ['./kreiranje-restorana.component.css']
})
export class KreiranjeRestoranaComponent implements AfterViewInit{
  @ViewChild('canvas',{static: true}) canvas!: ElementRef<HTMLCanvasElement>;
  crc!: CanvasRenderingContext2D;

  ngAfterViewInit(){
    this.crc = this.canvas.nativeElement.getContext('2d')!;
  }

  drawOnCanvas(){
    this.crc.clearRect(0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.plan.forEach(element => {
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
        this.crc.beginPath();
        this.crc.arc(element.x, element.y, 25, 0, 2 * Math.PI);
        this.crc.fillStyle = 'white';
        this.crc.fill();
        this.crc.stroke();
        this.crc.closePath();
        this.crc.fillStyle = 'black'
        this.crc.fillText(element.brOsoba.toString() , element.x, element.y)
      }
    });
  }


  constructor(private zaRestoran: RestoraniService, private router: Router) { }

  tipPlan: string=""
  naziv: string = ""
  opis: string = ""
  tip: string = ""
  adresa: string = ""
  telefon: string = ""
  radnoVreme: number[] = []
  poruka: string = ""
  plan: Plan[]=[]
  objekat: Plan = new Plan()
  brKujni: number = 0
  brWc: number = 0
  brStolova: number = 0
  porukaPlan: string = ""

  tipRestorana: string=""

  koordinate(event: MouseEvent){
    let pom= this.canvas.nativeElement.getBoundingClientRect()
    this.objekat.x= event.clientX - pom.left
    this.objekat.y= event.clientY - pom.top
    if(this.objekat.tip=="sto"){
      let br=0
      this.plan.forEach(element => {
        if(element.tip=="sto"){br++}
      })
      this.objekat.redniBr=br+1
    }
  }

  dodajElement(){
    if(this.objekat.x==0 || this.objekat.y==0){
      this.porukaPlan="Morate uneti koordinate"
      this.objekat= new Plan()
      return
    }
    this.porukaPlan=""
    if(this.objekat.tip=="kuhinja"){this.brKujni++}
    if(this.objekat.tip=="toalet"){this.brWc++}
    if(this.objekat.tip=="sto"){this.brStolova++}
    this.plan.push(this.objekat)
    if(this.proveriPreklapanje()){
      this.porukaPlan="Elementi se preklapaju"
      this.plan.pop()
      this.objekat= new Plan()
      return
    }
    this.drawOnCanvas()
    this.objekat= new Plan()
  }

  proveriPreklapanje() {
    for (let i = 0; i < this.plan.length; i++) {
      for (let j = i + 1; j < this.plan.length; j++) {
        const element1 = this.plan[i];
        const element2 = this.plan[j];
        if (
          element1.x < element2.x + 50 &&
          element1.x + 50 > element2.x &&
          element1.y < element2.y + 50 &&
          element1.y + 50 > element2.y
        ) {
          return true;
        }
      }
    }
    return false;
  }


  dodaj(){
    if(this.naziv=="" || this.opis=="" || this.tip=="" || this.adresa=="" || this.telefon=="" || this.radnoVreme.length==0 || this.plan.length==0){
      this.poruka="Morate uneti sva polja"
      return
    }
    if(this.brKujni<1 || this.brWc<1 || this.brStolova<2){this.poruka="Morate uneti bar jednu kuhinju, wc i tri stola"; return}
    this.poruka=""
    this.zaRestoran.dodajRestoran(this.naziv, this.adresa, this.tip, this.opis, this.telefon, this.radnoVreme, this.plan, this.brStolova).subscribe((data) => {
      if(data.poruka=="ok"){
        this.router.navigate(['/admin'])
      }
    })
  }

  JSONporuka: string=""
  @ViewChild('fileInput') fileInput!: ElementRef;

  onFileChange(event: any){
    let fajl: File = event.target.files[0]
    const validniFormati = ['application/json'];
    if (!validniFormati.includes(fajl.type)) {
      this.JSONporuka='Nedozvoljen format fajla. Dozvoljeni su samo JSON formati.'
      if (this.fileInput && this.fileInput.nativeElement) {
        this.fileInput.nativeElement.value = ''; // Resetovanje input polja
      }
    return;}
    let reader: FileReader = new FileReader()
    reader.onload = (e: any) => {
      let plan= e.target.result
      try{
        let niz: Plan[] = JSON.parse(plan)
        this.plan=niz.map(x =>{
          let p: Plan = new Plan()
          p.x=x.x
          p.y=x.y
          p.tip=x.tip
          p.redniBr=x.redniBr
          p.brOsoba=x.brOsoba
          if(p.tip=="kuhinja"){this.brKujni++}
          if(p.tip=="toalet"){this.brWc++}
          if(p.tip=="sto"){this.brStolova++}
          return p
        })
      } catch(e){
        this.JSONporuka="Neuspesno ucitavanje fajla"
      }
    }
    reader.readAsText(fajl)
  }

  nazad(){
    this.router.navigate(['/admin'])
  }


}
