import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose"
import {router} from './router/addMatch.js'
import { authRouters } from './router/authRouter.js';
import { userRoute } from './router/userData.js';

dotenv.config();
const port=process.env.PORT || 4000;
const dbUrl = process.env.DB_URL;


const app=express();
app.use(express.json({limit:"20MB"}));
app.use(cors({}));
app.use("/api", router);
app.use("/api/auth", authRouters);
app.use("/api/user", userRoute);



mongoose.connect(dbUrl).then(()=>{
    app.listen(port, () => {
      console.log(`database connect and listening on port ${port}`);
    });
}).catch((err)=>{
    console.log('db connection fails',err);
})

