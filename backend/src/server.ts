import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import restoranRouter from './routers/restoran.router';
import rezervacijeRouter from './routers/rezervacije.router';
import porudzbinaRouter from './routers/porudzbina.router';
import adminRouter from './routers/admin.router';

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const conn= mongoose.connection
conn.once('open', ()=>{
    console.log('db connected')
})

const router= express.Router()
router.use("/users", userRouter);
router.use("/restorani", restoranRouter);
router.use("/rezervacije", rezervacijeRouter);
router.use("/porudzbine", porudzbinaRouter);
router.use("/admin", adminRouter);



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));