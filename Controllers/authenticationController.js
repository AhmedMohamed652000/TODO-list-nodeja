import mongoose from "mongoose";
import "../Models/userModel.js";
import { uploadFile } from '../utilities/uploadFiles.js'
import fs from 'fs';
import http from 'http';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../Emails/Emails.js";
import { thansksTemplate } from "../Emails/thanksTemplate.js";

const userSchema = mongoose.model("users");

let login = async (request, response, next) => {
  let { email, password } = request.body;
  let isFound = await userSchema.findOne({ email });
  if (isFound) {
    let check = await bcrypt.compare(password, isFound.password);
    if (check) {
      isFound.role = "user";
      const token = jwt.sign(
        {
          isFound
        },
        process.env.SECRET_KEY,
        { expiresIn: "48h" }
      );
      // request.token = token;
      response.status(200).json({
        message: "Login Successfully",
        token,
      });
    } else {
      let error = new Error("incorrect password");
      error.status = 403;
      next(error);
    }
  } else {
    let error = new Error("Email Not Found");
    error.status = 403;
    next(error);
  }
};

let register = (request, response, next) => {

  const imageProfile = request.file?.filename || '/userImage.png'
  let { userName, email, password, age } = request.body;
  bcrypt.hash(password, 8, (error, hash) => {
    let newUser = new userSchema({
      password: hash,
      email,
      age,
      userName,
      imageProfile: imageProfile
    })
    newUser
      .save()
      .then((data) => {
        response.status(200).json({
          message: "add user successfully",
          data,
        });
      })
      .catch((error) => {
        next(error);
      });
  })
  sendEmail({ email })
};


const verifyEmail = async (request, response, next) => {
  let { token } = request.params;
  jwt.verify(token, process.env.EmailKey, async (error, decoded) => {
    if (error) {
      return next(error);
    } else {
      await userSchema.findOneAndUpdate(
        { email: decoded.email },
        {
          confirmedEmail: true,
        }
      );
        response.status(200).end(thansksTemplate);
    }
  });
};

export { register, login, verifyEmail };
