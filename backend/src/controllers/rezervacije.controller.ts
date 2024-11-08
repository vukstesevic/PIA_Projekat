import Rezervacija from '../models/rezervacija';
import Korisnik from '../models/korisnik';
import { Request, Response } from 'express';

export class RezervacijeController{

    getRezervacijeGost=(req: Request, res: Response)=>{
        Rezervacija.find({korisnik: req.body.gost}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getRezervacijeRestoran=(req: Request, res: Response)=>{
        Rezervacija.find({idR: req.body.restoran}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    dodajRezervaciju=(req: Request, res: Response)=>{
        
        Rezervacija.find().then((data) => {
            let maxId = 0;
            data.forEach(element => {
                if(element.id > maxId){
                    maxId = element.id;
                }
            });
            maxId=maxId+1;
            let rezervacija={
                id: maxId,
                korisnik: req.body.korisnik,
                idR: req.body.idR,
                restoran: req.body.restoran,
                vreme: req.body.datum,
                brStola: 0,
                brOsoba: req.body.brojOsoba,
                zahtev: req.body.zahtev,
                status:"poslata",
                produzena: false,
                zaduzenje:"",
                komentarOdbijanje:"",
                preko:"forma",
                bio: null
            }
            new Rezervacija(rezervacija).save().then((data) => {
                res.json({poruka: "ok"});
            }).catch((err) => {
                res.json({poruka: err});
            });
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    oceniRezervaciju=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {ocena: req.body.ocena, komentar: req.body.komentar, ocenjen: true}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    otkaziRezervaciju=(req: Request, res: Response)=>{
        Rezervacija.findOneAndDelete({id: req.body.id}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    oceniRezervacijuRestoran=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {ocena: req.body.ocena, komentar: req.body.komentar, ocenjen: true}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    dosao=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {bio: true}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    nijeDosao=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {bio: false}}).then((data) => {
            if(data!=null){
                Korisnik.findOneAndUpdate({korisnickoIme: req.body.korisnik}, {$inc: {bodovi: 1}}).then((korisnik) => {
                    if(korisnik!=null){
                        if(korisnik.bodovi==3){
                            Korisnik.findOneAndUpdate({korisnickoIme: req.body.korisnik}, {$set: {blokiran: true}}).then((data) => {
                                res.json({poruka: "ok"});
                            }).catch((err) => {res.json({poruka: err})});
                }}
        }).catch((err) => {
            res.json({poruka: err});
        })
    }}).catch((err) => {
            res.json({poruka: err});
        })
    }

    produzi=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {produzena: true}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getAllRezervacije=(req: Request, res: Response)=>{
        Rezervacija.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    prihvati=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {status: "prihvacena", brStola: req.body.brStola, zaduzenje: req.body.korisnik}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    odbij=(req: Request, res: Response)=>{
        Rezervacija.findOneAndUpdate({id: req.body.id}, {$set: {status: "odbijena", komentarOdbijanje: req.body.komentar}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

}