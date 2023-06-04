import mongoose from "mongoose";
import express from 'express';
import validationErrors from '../MiddleWares/validation/validatorErrors.js'
import { signUp, logIn } from '../MiddleWares/validation/userValidation.js'
import { register, login ,verifyEmail } from "../Controllers/authenticationController.js";
import { uploadFile } from "../utilities/uploadFiles.js";
import bodyParser from 'body-parser'

let router = express.Router()

router.route("/signup").post(uploadFile('imageProfile'), signUp, validationErrors, register);

router.route("/login").post(logIn, validationErrors, login);

router.get("/verify/:token", verifyEmail);


export default router

