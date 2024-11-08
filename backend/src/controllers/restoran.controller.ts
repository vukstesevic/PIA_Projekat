import Restoran from '../models/restoran';
import { Request, Response } from 'express';
import path from 'path'
import fs from 'fs'

export class RestoranController{

    getAllRestorani=(req: Request, res: Response)=>{
        Restoran.find({}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    getRestoran=(req: Request, res: Response)=>{
        Restoran.findOne({id: req.body.id}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    dodajRestoran=(req: Request, res: Response)=>{
        Restoran.findOne().sort({ id: -1 }).then((data) => {
            let najveciId = data ? data.id : 0;
            let noviId = najveciId + 1;

            let restoran = {
                id: noviId,
                naziv: req.body.naziv,
                adresa: req.body.adresa,
                tip: req.body.tip,
                opis: req.body.opis,
                telefon: req.body.telefon,
                radnoVreme: req.body.radnoVreme,
                plan: req.body.plan,
                brStolova: req.body.brStola,
                meni: []
            }
            new Restoran(restoran).save().then((restoran) => {
                res.json({poruka: "ok"})
            }).catch((err) => {
                res.json({poruka: err});
            });
            })
        }

    dodajJelo=(req: Request, res: Response)=>{
        let naziv=req.body.naziv
        let cena=req.body.cena
        let opis=req.body.opis
        let slika=req.file
        if(!slika){
            return res.json({poruka: "greska"});
        }
        let restoran=Number(req.body.restoran)

        let jelo = {
            naziv: naziv,
            cena: Number(cena),
            opis: opis,
            slika: slika.filename
        }
        console.log(jelo)
        Restoran.updateOne({id: restoran}, {$push: {'meni': jelo}}).then((data) => {
            res.json({poruka: "ok"})
        }).catch((err) => {
            res.json({poruka: err});
        });
    }

    dohvatiSliku= (req: Request, res: Response) => {
        let slika = req.params.slika
        let putanja = path.resolve(__dirname + "/../../slike/" + slika)
        fs.access(putanja, fs.constants.F_OK, (err) => {
            if(err){
                res.json({poruka: err});
            }
            res.sendFile(putanja)
        })
    }

  
}