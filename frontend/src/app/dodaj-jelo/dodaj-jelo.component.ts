import { Component, ElementRef, ViewChild } from '@angular/core';
import { RestoraniService } from '../services/restorani.service';
import { Router } from '@angular/router';
import { Restoran } from '../models/restorani';

@Component({
  selector: 'app-dodaj-jelo',
  templateUrl: './dodaj-jelo.component.html',
  styleUrls: ['./dodaj-jelo.component.css']
})
export class DodajJeloComponent {

  constructor(private servis:RestoraniService, private router: Router) { }

  restoran: Restoran= new Restoran()
  naziv: string = ""
  cena: number = 0
  opis: string = ""
  izabranaSlika: File = new File([], "");

  ngOnInit(){
    let x= localStorage.getItem("restoran")
    if(x!=null){
      this.restoran = JSON.parse(x)
    }
  }

  nazad(){
    this.router.navigate(['admin'])
  }


  proukaSlika: string=""

  @ViewChild('fileInput') fileInput!: ElementRef;

  onFileSelected(event: any) {
    const fajl = event.target.files[0];
    if (fajl) {
      const validniFormati = ['image/jpeg', 'image/png'];
      if (!validniFormati.includes(fajl.type)) {
        this.proukaSlika='Nedozvoljen format slike. Dozvoljeni su samo JPG i PNG formati.'
        if (this.fileInput && this.fileInput.nativeElement) {
          this.fileInput.nativeElement.value = ''; // Resetovanje input polja
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
              const width = img.width;
              const height = img.height;
              if (width < 100 || height < 100 || width > 300 || height > 300) {
                  this.proukaSlika='Dimenzije slike nisu dozvoljene.';
                  return;
              }
              this.izabranaSlika = fajl;
          };
          img.src = e.target.result;
      };
      reader.readAsDataURL(fajl);
    }
  }

  dodaj(){
    if(this.naziv=="" || this.cena==0 || this.opis==""){
      alert("Morate popuniti sva polja!")
      return
    }
    this.servis.dodajJelo(this.naziv, this.cena, this.opis, this.izabranaSlika, this.restoran.id ).subscribe(data=>{
      if(data.poruka=="ok"){
        alert("Jelo je uspešno dodato.")
        this.router.navigate(['admin'])
      }
      else{
        alert("Došlo je do greške prilikom dodavanja jela.")
      }
    })

  }

}
