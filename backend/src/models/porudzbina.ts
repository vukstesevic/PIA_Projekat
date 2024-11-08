import mongoose from "mongoose";
import korisnik from "./korisnik";

const Schema = new mongoose.Schema({
    id: Number,
    korisnik: String,
    idR: Number,
    restoran: String,
    vreme: Date,
    jela: String,
    cena: Number,
    status: String,
    vremeDostave: Number,
    vremeDostaveString: String
},{
    versionKey: false
});

export default mongoose.model('Porudzbina', Schema,'porudzbina');