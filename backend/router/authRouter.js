import express from 'express'
import { signup } from '../controllers/auth/signup.js';
import { otpVerification } from '../controllers/auth/otpVerification.js';


const authRouters=express.Router();
authRouters.post("/signup", signup);

authRouters.post("/otpVerification", otpVerification);

export { authRouters };