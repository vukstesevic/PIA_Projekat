import express from "express";
import { RezervacijeController } from "../controllers/rezervacije.controller";
import rezervacija from "../models/rezervacija";

const rezervacijeRouter = express.Router();

rezervacijeRouter.route('/getRezervacijeGost').post((req, res) => {
    new RezervacijeController().getRezervacijeGost(req, res);
})

rezervacijeRouter.route('/getRezervacijeRestoran').post((req, res) => {
    new RezervacijeController().getRezervacijeRestoran(req, res);
})

rezervacijeRouter.route('/dodajRezervaciju').post((req, res) => {
    new RezervacijeController().dodajRezervaciju(req, res);
})

rezervacijeRouter.route('/oceniRezervaciju').post((req, res) => {
    new RezervacijeController().oceniRezervaciju(req, res);
})

rezervacijeRouter.route('/dosao').post((req, res) => {
    new RezervacijeController().dosao(req, res);
});

rezervacijeRouter.route('/nijedosao').post((req, res) => {
    new RezervacijeController().nijeDosao(req, res);
});

rezervacijeRouter.route('/produzi').post((req, res) => {
    new RezervacijeController().produzi(req, res);
});

rezervacijeRouter.route('/getAllRezervacije').get((req, res) => {
    new RezervacijeController().getAllRezervacije(req, res);
})

rezervacijeRouter.route('/prihvati').post((req, res) => {
    new RezervacijeController().prihvati(req, res);
})

rezervacijeRouter.route('/odbij').post((req, res) => {
    new RezervacijeController().odbij(req, res);
})

export default rezervacijeRouter;