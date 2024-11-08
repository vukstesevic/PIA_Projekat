import { Component, ElementRef, ViewChild } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent {

  constructor(private servis: UserService, private router: Router) { }

  gost: Korisnik= new Korisnik()
  slika: string=""
  izabranaSlika: File = new File([], "");
  novoIme: string=""
  novoPrezime: string=""
  noviTelefon: string=""
  noviMejl: string=""
  novaAdresa: string=""
  novaKartica: string=""
  porukaAzuriranje: string=""
  noviPol: string=""

  dozvoli: boolean= true

  spol: boolean= false
  pocetna: boolean= true
  ime: boolean= false
  prezime: boolean= false
  zaslika: boolean= false
  adresa: boolean= false
  telefon: boolean= false
  mejl: boolean= false
  kartica: boolean= false


  ngOnInit(): void {
    this.porukaAzuriranje=""
    this.spol= false
    this.pocetna= true
    this.ime= false
    this.prezime= false
    this.zaslika= false
    this.adresa= false
    this.telefon= false
    this.mejl= false
    this.kartica= false

    let x= localStorage.getItem("korisnik")
    if(x!=null){
      this.gost= JSON.parse(x)
      this.servis.dohvatiSliku(this.gost.profilna_slika).subscribe((data: any) => {
        let file = new FileReader()
        file.onload=()=>{
          this.slika= file.result as string
        }
        file.readAsDataURL(data)
      })
    }
  }

  azurirajSliku(){
    if(this.izabranaSlika.name!=""){
      this.servis.uploadSliku(this.izabranaSlika, this.gost.korisnicko_ime).subscribe((data) => {
        if(data.poruka=="ok"){
          this.gost.profilna_slika= this.izabranaSlika.name
          localStorage.setItem("korisnik", JSON.stringify(this.gost))
          this.ngOnInit()
          this.zaslika= false
          this.pocetna= true
        }
      })
    }
  }

  azurirajIme(){
    this.servis.azurirajIme(this.gost.korisnicko_ime, this.novoIme).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.ime= this.novoIme
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.ime= false
        this.pocetna= true
      }
    })
  }

  azurirajPrezime(){
    this.servis.azurirajPrezime(this.gost.korisnicko_ime, this.novoPrezime).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.prezime= this.novoPrezime
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.prezime= false
        this.pocetna= true
      }
    })
  }

  azurirajMejl(){
    let mejlovi:Korisnik[]=[]
    this.servis.getAllKorisnici().subscribe((data: Korisnik[]) => {
      mejlovi= data
      mejlovi.forEach((korisnik) => {
        if(korisnik.email==this.noviMejl){
          this.porukaAzuriranje="Email adresa već postoji."
          return
        }
      })
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.noviMejl)) {
      this.porukaAzuriranje = "Email adresa nije u validnom formatu.";
    }
    else{
    this.servis.azurirajMejl(this.gost.korisnicko_ime, this.noviMejl).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.email= this.noviMejl
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.mejl= false
        this.pocetna= true
      }
    })}
  }

  azurirajTelefon(){
    const telefonRegex =  /^06[0-9]{7,8}$/;
    if (!telefonRegex.test(this.noviTelefon)) {
      this.porukaAzuriranje = "Broj telefona nije u validnom formatu.";
    }
    else{
    this.servis.azurirajTelefon(this.gost.korisnicko_ime, this.noviTelefon).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.kontakt_telefon= this.noviTelefon
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.telefon= false
        this.pocetna= true
      }
    })}
  }

  azurirajAdresu(){
    this.servis.azurirajAdresu(this.gost.korisnicko_ime, this.novaAdresa).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.adresa= this.novaAdresa
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.adresa= false
        this.pocetna= true
      }
    })
  }

  azurirajKarticu(){
    const karticaRegex =/^\d{16}$/;
    if (!karticaRegex.test(this.novaKartica)) {
      this.porukaAzuriranje = "Broj kartice nije u validnom formatu.";
    }{
    this.servis.azurirajKartica(this.gost.korisnicko_ime, this.novaKartica).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.broj_kreditne_kartice= this.novaKartica
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.kartica= false
        this.pocetna= true
      }
    })}
  }

  azurirajPol(){
    this.servis.azurirajPol(this.gost.korisnicko_ime, this.noviPol).subscribe((data) => {
      if(data.poruka=="ok"){
        this.gost.pol= this.noviPol
        localStorage.setItem("korisnik", JSON.stringify(this.gost))
        this.ngOnInit()
        this.spol= false
        this.pocetna= true
      }
    })
  }

  naPol(){
    this.pocetna= false
    this.spol= true
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

  naKarticu(){
    this.pocetna= false
    this.kartica= true
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

  navigate(){
    this.ngOnInit()
    this.router.navigate(['gost'])
  }

  navigateRestorani(){
    this.ngOnInit()
    this.router.navigate(['gostRestorani'])
  }

  navigateRezervacije(){
    this.ngOnInit()
    this.router.navigate(['gostRezervacije'])
  }

  navigateDostave(){
    this.ngOnInit()
    this.router.navigate(['gostDostave'])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
