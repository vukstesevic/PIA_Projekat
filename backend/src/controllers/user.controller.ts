import express from "express";
import Korisnik from '../models/korisnik'
import fs from 'fs'
import path from 'path'
import rezervacija from "../models/rezervacija";

export class UserController{
    registracija = (req: express.Request, res: express.Response) => {
        let korisnik = {
            korisnicko_ime : req.body.korisnicko_ime,
            lozinka : req.body.lozinka,
            bezbednosno_pitanje : req.body.bezbednosno_pitanje,
            odgovor_na_bezbednosno_pitanje : req.body.odgovor_na_bezbednosno_pitanje,
            ime : req.body.ime,
            prezime : req.body.prezime,
            pol : req.body.pol,
            adresa: req.body.adresa,
            kontakt_telefon : req.body.kontakt_telefon,
            email : req.body.email,
            profilna_slika :"proxy-image.jpg",
            broj_kreditne_kartice : req.body.broj_kreditne_kartice,
            tip : req.body.tip,
            odobren : false,
            bodovi:0,
            blokiran: false,
            deaktiviran: false,
            nijeOdobren: false
        };
        new Korisnik(korisnik).save().then((korisnik) => {
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    dodajKonobara = (req: express.Request, res: express.Response) => {
        console.log("ee")
        let korisnik = {
            korisnicko_ime : req.body.korisnicko_ime,
            lozinka : req.body.lozinka,
            bezbednosno_pitanje : req.body.bezbednosno_pitanje,
            odgovor_na_bezbednosno_pitanje : req.body.odgovor_na_bezbednosno_pitanje,
            ime : req.body.ime,
            prezime : req.body.prezime,
            pol : req.body.pol,
            adresa: req.body.adresa,
            kontakt_telefon : req.body.kontakt_telefon,
            email : req.body.email,
            profilna_slika :"proxy-image.jpg",
            broj_kreditne_kartice : req.body.broj_kreditne_kartice,
            tip : req.body.tip,
            restoran: req.body.restoran,
            idRestorana: req.body.idRestorana,
            importdRestorana: req.body.idRestorana,
            odobren : true,
            bodovi:0,
            blokiran: false,
            deaktiviran: false,
            nijeOdobren: false
        };
        new Korisnik(korisnik).save().then((korisnik) => {
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    static uploadSlika = (req: express.Request, res: express.Response) => {
        let slika = req.file;
        if(!slika){
            return res.json({message: "greska"});
        }
        Korisnik.findOneAndUpdate({korisnicko_ime: req.body.korisnicko_ime}, {$set: {profilna_slika: slika.filename}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    login= (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        Korisnik.findOne({korisnicko_ime: korisnicko_ime, lozinka: lozinka, odobren: true, deaktiviran: false}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    };

    getKorisnikUsername = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        Korisnik.findOne({korisnicko_ime: korisnicko_ime}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {lozinka: lozinka}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getAllKorisnici= (req: express.Request, res: express.Response) => {
        Korisnik.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getRegGost= (req: express.Request, res: express.Response) => {
        Korisnik.find({tip: "gost", odobren: true}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getZahtevi= (req: express.Request, res: express.Response) => {
        Korisnik.find({odobren: false}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getAllKonobari= (req: express.Request, res: express.Response) => {
        Korisnik.find({tip: "konobar", deaktiviran:false }).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    dohvatiSliku= (req: express.Request, res: express.Response) => {
        let slika = req.params.slika

        let putanja = path.resolve(__dirname + "/../../slike/" + slika)
        fs.access(putanja, fs.constants.F_OK, (err) => {
            if(err){
                res.json({poruka: err});
            }
            res.sendFile(putanja)
        })
    }

    azurirajSliku= (req: express.Request, res: express.Response) => {
        let slika = req.file;
        if(!slika){
            return res.json({message: "greska"});
        }
        Korisnik.findOneAndUpdate({korisnicko_ime: req.body.korisnicko_ime}, {$set: {profilna_slika: slika.filename}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajIme= (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let ime = req.body.ime;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {ime: ime}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajPrezime= (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let prezime = req.body.prezime;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {prezime: prezime}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajMejl= (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let email = req.body.email;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {email: email}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajTelefon= (req: express.Request, res: express.Response) => { 
        let korisnicko_ime = req.body.korisnicko_ime;
        let kontakt_telefon = req.body.kontakt_telefon;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {kontakt_telefon: kontakt_telefon}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajAdresu= (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let adresa = req.body.adresa;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {adresa: adresa}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajKartica= (req: express.Request, res: express.Response) => { 
        let korisnicko_ime = req.body.korisnicko_ime;
        let broj_kreditne_kartice = req.body.broj_kreditne_kartice;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {broj_kreditne_kartice: broj_kreditne_kartice}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    deaktiviraj = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {deaktiviran: true}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    odobri = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {odobren: true}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    nemojOdobriti = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime},{$set: {nijeOdobren: true}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    azurirajPol = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let pol = req.body.pol
        Korisnik.findOneAndUpdate({korisnicko_ime: korisnicko_ime}, {$set: {pol: pol}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getKoboariRestoran = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran;
        Korisnik.find({idRestorana: restoran, tip: "konobar"}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    aktiviraj = (req: express.Request, res: express.Response) => {  
        Korisnik.findOneAndUpdate({korisnicko_ime: req.body.korisnicko_ime}, {$set: {deaktiviran: false, bodovi:0}}).then((data)=>{
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        })
    }
}