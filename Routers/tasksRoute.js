import mongoose from "mongoose";
import express from 'express';
import validationErrors from '../MiddleWares/validation/validatorErrors.js'
import { postMehod, patchMehod, DeleteMehod, getMehod } from '../MiddleWares/validation/tasksValidation.js'
import { addTask, editTask, deleteTask, getTasksByUserId } from "../Controllers/tasksController.js";

let router = express.Router()

router.route("/task").post(postMehod, validationErrors, addTask)
        .get(getTasksByUserId)

router.route("/task/:_id")
        .patch(patchMehod, validationErrors, editTask)
        .delete(DeleteMehod, validationErrors, deleteTask)


export default router