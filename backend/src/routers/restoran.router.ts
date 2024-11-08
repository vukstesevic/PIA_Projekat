import express from "express";
import { RestoranController } from "../controllers/restoran.controller";
import multer from "multer";

const restoranRouter = express.Router();

restoranRouter.route('/getAllRestorani').get(
    (req, res) => new RestoranController().getAllRestorani(req, res)
)

restoranRouter.route('/getRestoran').post(
    (req, res) => new RestoranController().getRestoran(req, res)
)

restoranRouter.route('/dodajRestoran').post(
    (req, res) => new RestoranController().dodajRestoran(req, res)
)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'slike/'); // Direktorijum gde se čuvaju slike
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Imenovanje fajlova
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    // Prihvata samo slike
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Nepodržan format slike'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

restoranRouter.route('/dodajJelo').post(
    upload.single('slika'),
    (req, res) => new RestoranController().dodajJelo(req, res)
)

restoranRouter.route('/slike/:slika').get(
    (req, res) => new RestoranController().dohvatiSliku(req, res)
)

export default restoranRouter;