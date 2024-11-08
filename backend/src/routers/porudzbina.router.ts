import express from "express";
import { PorudzbinaController } from "../controllers/porudzbina.controller";

const porudzbinaRouter = express.Router();

porudzbinaRouter.route('/dodajPorudzbinu').post((req, res) => {
    new PorudzbinaController().dodajPorudzbinu(req, res);
})

porudzbinaRouter.route('/gost').post((req, res) => {
    new PorudzbinaController().getPorudzbineGost(req, res);
})

porudzbinaRouter.route('/restoran').post((req, res) => {
    new PorudzbinaController().getPorudzbineRestoran(req, res);
})

porudzbinaRouter.route('/poslate').post((req, res) => {
    new PorudzbinaController().getPoslate(req, res);
})

porudzbinaRouter.route('/potvrdi').post((req, res) => {
    new PorudzbinaController().potvrdi(req, res);
})

porudzbinaRouter.route('/odbij').post((req, res) => {
    new PorudzbinaController().odbij(req, res);
})



export default porudzbinaRouter;