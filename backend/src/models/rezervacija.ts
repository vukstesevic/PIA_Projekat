import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    id:Number,
    idR: Number,
    restoran: String,
    korisnik: String,
    vreme: Date,
    brOsoba: Number,
    brStola: Number,
    zahtev: String,
    status: String,
    bio: Boolean,
    ocenjen: Boolean,
    ocena: Number,
    komentar: String,
    produzena: Boolean,
    zaduzenje: String,
    komentarOdbijanje: String,
    preko: String
},{
    versionKey: false
});

export default mongoose.model('Rezervacija', Schema,'rezervacija');