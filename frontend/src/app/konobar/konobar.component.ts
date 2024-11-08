import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-konobar',
  templateUrl: './konobar.component.html',
  styleUrls: ['./konobar.component.css']
})
export class KonobarComponent {

  constructor(private service: UserService,private router: Router) { }

  konobar: Korisnik=new Korisnik();
  slika: string="";
  pocetna: boolean= true;
  zaslika: boolean= false;
  ime: boolean= false;
  prezime: boolean= false;
  mejl: boolean= false;
  adresa: boolean= false;
  telefon: boolean= false;

  ngOnInit(): void {
    this.porukaAzuriranje=""
    this.pocetna= true
    this.ime= false
    this.prezime= false
    this.zaslika= false
    this.adresa= false
    this.telefon= false
    this.mejl= false

    let x=localStorage.getItem('korisnik');
    if(x!=null){
      this.konobar=JSON.parse(x);
      this.service.dohvatiSliku(this.konobar.profilna_slika).subscribe((data: any) => {
        let file = new FileReader()
        file.onload=()=>{
          this.slika= file.result as string
        }
        file.readAsDataURL(data)})
    }
  }

  navigate(){
    this.ngOnInit();
    this.router.navigate(['/konobar']);
  }

  naSliku(){
    this.pocetna= false
    this.zaslika=true
  }

  naIme(){
    this.pocetna= false
    this.ime= true
  }

  naPrezime(){
    this.pocetna= false
    this.prezime= true
  }

  naMejl(){
    this.pocetna= false
    this.mejl= true
  }

  naAdresu(){
    this.pocetna= false
    this.adresa= true
  }

  naTelefon(){
    this.pocetna= false
    this.telefon= true
  }

  novoIme: string="";
  novoPrezime: string="";
  noviMail: string="";
  novaAdresa: string="";
  noviTelefon: string="";
  porukaAzuriranje: string="";
  izabranaSlika: File = new File([], "");

  dozvoli: boolean= true


  azurirajIme(){
    this.service.azurirajIme(this.konobar.korisnicko_ime, this.novoIme).subscribe((data) => {
      if(data.poruka=="ok"){
        this.konobar.ime= this.novoIme
        localStorage.setItem("korisnik", JSON.stringify(this.konobar))
        this.ngOnInit()
        this.ime= false
        this.pocetna= true
      }
    })
  }

  azurirajPrezime(){
    this.service.azurirajPrezime(this.konobar.korisnicko_ime, this.novoPrezime).subscribe((data) => {
      if(data.poruka=="ok"){
        this.konobar.prezime= this.novoPrezime
        localStorage.setItem("korisnik", JSON.stringify(this.konobar))
        this.ngOnInit()
        this.prezime= false
        this.pocetna= true
      }
    })
  }

  azurirajAdresu(){
    this.service.azurirajAdresu(this.konobar.korisnicko_ime, this.novaAdresa).subscribe((data) => {
      if(data.poruka=="ok"){
        this.konobar.adresa= this.novaAdresa
        localStorage.setItem("korisnik", JSON.stringify(this.konobar))
        this.ngOnInit()
        this.adresa= false
        this.pocetna= true
      }
    })
  }

  azurirajMejl(){
    let mejlovi:Korisnik[]=[]
    this.service.getAllKorisnici().subscribe((data: Korisnik[]) => {
      mejlovi= data
      mejlovi.forEach((korisnik) => {
        if(korisnik.email==this.noviMail){
          this.porukaAzuriranje="Email adresa već postoji."
          return
        }
      })
    })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.noviMail)) {
      this.porukaAzuriranje = "Email adresa nije u validnom formatu.";
    }
    this.service.azurirajMejl(this.konobar.korisnicko_ime, this.novoIme).subscribe((data) => {
      if(data.poruka=="ok"){
        this.konobar.email= this.novoIme
        localStorage.setItem("korisnik", JSON.stringify(this.konobar))
        this.ngOnInit()
        this.mejl= false
        this.pocetna= true
      }
    })
  }

  azurirajTelefon(){
    const telefonRegex =  /^06[0-9]{7,8}$/;
    if (!telefonRegex.test(this.noviTelefon)) {
      this.porukaAzuriranje = "Broj telefona nije u validnom formatu.";
    }
    else{
    this.service.azurirajTelefon(this.konobar.korisnicko_ime, this.noviTelefon).subscribe((data) => {
      if(data.poruka=="ok"){
        this.konobar.kontakt_telefon= this.noviTelefon
        localStorage.setItem("korisnik", JSON.stringify(this.konobar))
        this.ngOnInit()
        this.telefon= false
        this.pocetna= true
      }
    })}
  }



  azurirajSliku(){
    if(this.izabranaSlika.name!=""){
      this.service.uploadSliku(this.izabranaSlika, this.konobar.korisnicko_ime).subscribe((data) => {
        if(data.poruka=="ok"){
          this.konobar.profilna_slika= this.izabranaSlika.name
          localStorage.setItem("korisnik", JSON.stringify(this.konobar))
          this.ngOnInit()
          this.zaslika= false
          this.pocetna= true
        }
      })
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  naPromenuFajla(event: any) {
    const fajl = event.target.files[0];

    if (fajl) {
      const validniFormati = ['image/jpeg', 'image/png'];
      if (!validniFormati.includes(fajl.type)) {
        this.porukaAzuriranje='Nedozvoljen format slike. Dozvoljeni su samo JPG i PNG formati.';
        if (this.fileInput && this.fileInput.nativeElement) {
          this.fileInput.nativeElement.value = ''; // Resetovanje input polja
        }
        this.dozvoli= false
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
              const width = img.width;
              const height = img.height;
              if (width < 100 || height < 100 || width > 300 || height > 300) {
                  this.porukaAzuriranje='Dimenzije slike nisu dozvoljene.';
                  this.dozvoli= false
                  return;
              }
              // Ako su dimenzije validne, setuj izabranu sliku
              this.dozvoli= true
              this.porukaAzuriranje=""
              this.izabranaSlika = fajl;
          };
          img.src = e.target.result;
      };
      reader.readAsDataURL(fajl);
    }
  }

  naDostave(){
    this.ngOnInit();
    this.router.navigate(['/konobarDostave']);
  }

  naRezervacije(){
    this.ngOnInit();
    this.router.navigate(['/konobarRezervacije']);
  }



  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

  naStatistiku(){
    this.ngOnInit();
    this.router.navigate(['/konobarStatistika']);
  }




}
