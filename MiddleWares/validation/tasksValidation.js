import { body,param } from "express-validator";
import mongoose from "mongoose";

let postMehod=[
    body('title').isString().withMessage('title must be string'),
    body('startDate').isString().withMessage("startDate must be string "),
    body('endDate').isNumeric().withMessage("endDate must be string "),
    body('createdBy').isMongoId().withMessage("createdBy must be objectId").optional(),
    body('description').isString().withMessage("description must be string"),
]
let patchMehod=[
    body('title').isString().withMessage('title must be string').optional(),
    body('startDate').isString().withMessage("startDate must be string ").optional(),
    body('endDate').isNumeric().withMessage("endDate must be string ").optional(),
    body('createdBy').isMongoId().withMessage("createdBy must be objectId").optional(),
    body('description').isString().withMessage("description must be string").optional(),
    param('_id').isMongoId().withMessage('title must be string').optional(),
]
let DeleteMehod=[
    param('_id').isMongoId().withMessage('title must be string'),
]
let getMehod=[
    param('_id').isMongoId().withMessage('title must be string'),
]

export {postMehod,patchMehod,DeleteMehod,getMehod}