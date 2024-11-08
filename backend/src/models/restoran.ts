import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    id: Number,
    naziv: String,
    adresa: String,
    tip: String,
    opis: String,
    prosecnaOcena: Number,
    konobari: Array,
    telefon: String,
    komentari: Array,
    brStolova: Number,
    radnoVreme: Array,
    plan: Array,
    meni: Array
}, {
    versionKey: false
});

export default mongoose.model('Restoran', Schema,'restoran');