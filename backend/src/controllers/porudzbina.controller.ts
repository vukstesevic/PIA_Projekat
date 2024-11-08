import { Request, Response } from 'express';
import Porudzbina from '../models/porudzbina';
export class PorudzbinaController{
    dodajPorudzbinu=(req: Request, res: Response)=>{

        Porudzbina.findOne().sort({ id: -1 }).then((data) => {
            let najveciId = data ? data.id : 0;
            let noviId = najveciId + 1;

            let porudzbina = {
                id: noviId,
                idR: req.body.idR,
                korisnik: req.body.korisnik,
                cena: req.body.cena,
                jela: req.body.jela,
               vreme: req.body.datum,
                restoran: req.body.restoran,
                status: "poslato",
                vremeDostave:0,
                vremeDostaveString:""
            }
            new Porudzbina(porudzbina).save().then((porudzbina) => {
                res.status(200).json({poruka: "ok"});
            }).catch((err) => {
                res.status(400).json({poruka: err});
            })
        }).catch((err) => {
            res.status(400).json({poruka: err});
        });

       
    }


    getPorudzbineGost=(req: Request, res: Response)=>{
        Porudzbina.find({korisnik: req.body.korisnik}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    getPorudzbineRestoran=(req: Request, res: Response)=>{
        Porudzbina.find({idR: req.body.idR}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    getPoslate=(req: Request, res: Response) =>{
        Porudzbina.find({status: "poslato", idR: req.body.idR}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        })
    }

    potvrdi=(req: Request, res: Response)=>{
        Porudzbina.updateOne({id: req.body.idP}, {$set:{status: "prihvaceno", vremeDostave: req.body.vremeDostave, vremeDostaveString:req.body.vremeDostaveString}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    odbij=(req: Request, res: Response)=>{
        Porudzbina.updateOne({id: req.body.idP}, {$set:{status: "odbijeno"}}).then((data) => {
            res.json({poruka: "ok"});
        }).catch((err) => {
            res.json({poruka: err});
        });
    }
}