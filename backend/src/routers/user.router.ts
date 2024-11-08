import express from "express";
import { UserController } from '../controllers/user.controller'
import multer from "multer";

const userRouter = express.Router();

userRouter.route('/register').post(
    (req, res) => new UserController().registracija(req, res));


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

userRouter.post('/upload', upload.single('slika'), UserController.uploadSlika );

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res));

userRouter.route('/getKorisnikUsername').post(
    (req, res) => new UserController().getKorisnikUsername(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

userRouter.route('/getAllKorisnici').get(
    (req, res) => new UserController().getAllKorisnici(req, res)
)

userRouter.route('/getAllRegGosti').get(
    (req, res) => new UserController().getRegGost(req, res)
)

userRouter.route('/getAllKonobari').get(
    (req, res) => new UserController().getAllKonobari(req, res)
)

userRouter.route('/slike/:slika').get(
    (req, res) => new UserController().dohvatiSliku(req, res)
)

userRouter.route('/azurirajSliku').post(
    upload.single('slika'),
    (req, res) => new UserController().azurirajSliku(req, res)
)

userRouter.route('/azurirajIme').post(
    (req, res) => new UserController().azurirajIme(req, res)
)

userRouter.route('/azurirajPrezime').post( 
    (req, res) => new UserController().azurirajPrezime(req, res)
)

userRouter.route('/azurirajMail').post(
    (req, res) => new UserController().azurirajMejl(req, res)
)

userRouter.route('/azurirajAdresu').post(
    (req, res) => new UserController().azurirajAdresu(req, res)
)

userRouter.route('/azurirajTelefon').post(
    (req, res) => new UserController().azurirajTelefon(req, res)
)

userRouter.route('/azurirajKartica').post(
    (req, res) => new UserController().azurirajKartica(req, res)
)

userRouter.route('/getZahtevi').get(
    (req, res) => new UserController().getZahtevi(req, res)
)

userRouter.route('/odobri').post(
    (req, res) => new UserController().odobri(req, res)
)

userRouter.route('/odbij').post( 
    (req, res) => new UserController().nemojOdobriti(req, res)
)

userRouter.route('/deaktiviraj').post(
    (req, res) => new UserController().deaktiviraj(req, res)
)

userRouter.route('/azurirajPol').post(
    (req, res) => new UserController().azurirajPol(req, res)
)

userRouter.route('/dodajKonobara').post(
    (req, res) => new UserController().dodajKonobara(req, res)
)

userRouter.route('/getKonobariResotran').post(
    (req,res)=>new UserController().getKoboariRestoran(req, res)
)

userRouter.route('/aktiviraj').post(
    (req, res) => new UserController().aktiviraj(req, res)
)


export default userRouter;
