import korisnik from "../models/korisnik"
import express from "express";

export class AdminController{

    login=(req: express.Request, res: express.Response)=>{

        korisnik.findOne({korisnicko_ime:req.body.username, lozinka:req.body.password, tip:"admin"}).then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json({poruka:err});
        })
    }
}