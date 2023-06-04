import mongoose from 'mongoose';
import '../../Models/userModel.js'
const userSchema = mongoose.model('users')
import { body, param } from 'express-validator';
let signUp = [
    body('userName').isString().withMessage('name must be string'),
    body('email').isEmail().withMessage("Invalid email").custom(async (email) => {
        try {
            let result = await userSchema.findOne({ email });
            if (result) {
                return Promise.reject("Email already in use");
            }
        } catch {
            throw new Error(error)
        }
    })
    ,
    body('password').isStrongPassword().withMessage("password must be strong Password"),
    body('age').isNumeric().withMessage("age must be intger "),
]
let logIn = [
    body('email').isEmail().withMessage("Invalid email").custom(async (email) => {
        try {
            let result = await userSchema.findOne({ email });
            if (!result) {
                return Promise.reject("Email not founded");
            }
        } catch {
            throw new Error(error)
        }
    })
    ,
    body('password').isStrongPassword().withMessage("password must be strong Password")
   
]

export  {signUp,logIn}