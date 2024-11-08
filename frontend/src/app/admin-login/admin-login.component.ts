import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private service: AdminService, private router: Router) { }

  username: string = ""
  password: string = ""
  poruka: string = ""

  hash(lozinka: string): string {
    return CryptoJS.SHA256(lozinka).toString(CryptoJS.enc.Hex);
  }

  login(){
    if(this.username=="" || this.password==""){
      this.poruka="Niste uneli podatke"
    }
    let sifra= this.hash(this.password)
    this.service.login(this.username, sifra).subscribe((data)=>{
      if(data!=null){
        this.poruka=""
        localStorage.setItem("admin", JSON.stringify(data))
        this.router.navigate(['admin'])
      }
      else{
        this.poruka="Pogrešni podaci"
      }
    })
  }
}
