import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private servis: UserService, private router: Router) { }

  korisnicko_ime: string=""
  lozinka: string=""
  bezbednosno_pitanje: string=""
  odgovor_na_bezbednosno_pitanje: string=""
  ime: string=""
  prezime: string=""
  pol: string="M"
  adresa: string=""
  kontakt_telefon: string=""
  email: string=""
  profilna_slika: string=""
  broj_kreditne_kartice: string=""
  izabranaSlika: File = new File([], "");
  prethodni: Korisnik[] = []

  proukaSlika: string=""

  poruka: string=""

  hash(lozinka: string): string {
    return CryptoJS.SHA256(lozinka).toString(CryptoJS.enc.Hex);
  }

  ngOnInit(): void {
    this.servis.getAllKorisnici().subscribe((data: Korisnik[]) => {
      if(data!=null)
      this.prethodni = data;
    })
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  naPromenuFajla(event: any) {
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
              // Ako su dimenzije validne, setuj izabranu sliku
              this.izabranaSlika = fajl;
          };
          img.src = e.target.result;
      };
      reader.readAsDataURL(fajl);
    }
  }


  validirajKorisnickoIme() {
    if(this.korisnicko_ime=="") {
      this.poruka = "Niste uneli korisničko ime.";
      return false;
    }
    let bool: boolean = false;
    this.prethodni.forEach((korisnik) => {
      if(korisnik.korisnicko_ime == this.korisnicko_ime) {
        this.poruka = "Korisničko ime već postoji.";
        bool = true;
      }
    })
    if(bool) return false;
    return true;
  }

  validirajLozinku() {
    const lozinkaRegex = /^(?=[A-Za-z])(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
    if (!lozinkaRegex.test(this.lozinka)) {
      this.poruka = "Lozinka ne zadovoljava kriterijume.";
      return false;
    }
    return true;
  }

  validirajPitanje() {
    if(this.bezbednosno_pitanje=="") {
      this.poruka = "Niste izabrali pitanje.";
      return false;
    }
    return true;
  }

  validirajOdgovor() {
    if(this.odgovor_na_bezbednosno_pitanje=="") {
      this.poruka = "Niste uneli odgovor na pitanje.";
      return false;
    }
    return true;
  }

  validirajIme() {
    if(this.ime=="") {
      this.poruka = "Niste uneli ime.";
      return false;
    }
    return true;
  }

  validirajPrezime() {
    if(this.prezime=="") {
      this.poruka = "Niste uneli prezime.";
      return false;
    }
    return true;
  }

  validirajAdresu() {
    if(this.adresa=="") {
      this.poruka = "Niste uneli adresu.";
      return false;
    }
    return true;
  }

  validirajEmail() {
    //da li je jedinstven email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.poruka = "Email adresa nije u validnom formatu.";
      return false;
    }
    let bool= false
    this.prethodni.forEach((korisnik) => {
      if(korisnik.email == this.email) {
        this.poruka = "Email adresa već postoji.";
        bool= true
      }
    })
    if(bool) return false;
    return true;
  }

  validirajTelefon() {
    const telefonRegex =  /^06[0-9]{7,8}$/;
    if (!telefonRegex.test(this.kontakt_telefon)) {
      this.poruka = "Broj telefona nije u validnom formatu.";
      return false;
    }
    return true;
  }

  validirajKarticu() {
    const karticaRegex =/^\d{16}$/;
    if (!karticaRegex.test(this.broj_kreditne_kartice)) {
      this.poruka = "Broj kartice nije u validnom formatu.";
      return false;
    }
    return true;
  }

  registruj() {
    if(!this.validirajKorisnickoIme() || !this.validirajLozinku() || !this.validirajPitanje() || !this.validirajOdgovor() || !this.validirajIme() || !this.validirajPrezime() || !this.validirajAdresu() || !this.validirajTelefon() || !this.validirajEmail() || !this.validirajKarticu()) return;
    let sifra=this.hash(this.lozinka)
    this.poruka = "";
    this.servis.register(this.korisnicko_ime, sifra, this.bezbednosno_pitanje, this.odgovor_na_bezbednosno_pitanje, this.ime, this.prezime, this.pol, this.adresa, this.kontakt_telefon, this.email, this.profilna_slika, this.broj_kreditne_kartice,"gost").subscribe((data: any) => {
      if(data['poruka']) {
        if (this.izabranaSlika.size == 0) {
          alert("Uspešno ste se registrovali, sačekajte odobrenje administratora.")
          this.router.navigate([''])
        }
        this.servis.uploadSliku(this.izabranaSlika, this.korisnicko_ime).subscribe(data => {
          if(data['poruka']) {
            alert("Slika uploadovana")
            alert("Uspešno ste se registrovali, sačekajte odobrenje administratora.")
            this.router.navigate([''])
          }
        });

      }
    })
  }

  nazad(){
    this.router.navigate([''])
  }

}
