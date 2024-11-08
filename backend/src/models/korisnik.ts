import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    korisnicko_ime: String,
    lozinka: String,
    bezbednosno_pitanje:  String,
    odgovor_na_bezbednosno_pitanje: String,
    ime: String, 
    prezime:  String,
    pol: String,
    adresa: String,
    kontakt_telefon:  String, 
    email: String, 
    profilna_slika:  String, 
    broj_kreditne_kartice: String,
    tip:  String,
    odobren: Boolean,
    restoran: String,
    idRestorana: Number,
    bodovi: Number,
    blokiran: Boolean,
    deaktiviran: Boolean,
    nijeOdobren: Boolean
}, {
    versionKey: false
});

export default mongoose.model('Korisnik', Schema,'korisnik');

