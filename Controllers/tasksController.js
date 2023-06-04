
import mongoose from "mongoose"
import '../Models/tasks.Model.js'
import '../Models/userModel.js'
let taskSchema = mongoose.model("tasks")
let userSchema = mongoose.model("users")
let addTask = async (request, response, next) => {
    try {
        let userInfo = request.userInfo
        let userId = userInfo.isFound._id
        let body = request.body
        body.createdBy = userId
        let newTask = await taskSchema.insertMany(body)
        await userSchema.findOneAndUpdate({ _id: userId }, { $push: { tasks: newTask[0]._id } })
        response.json({
            newTask
        })
    } catch (error) {
        next(error)
    }

}
let editTask = async (request, response, next) => {
    try {
        let userInfo = request.userInfo
        let userId = userInfo.isFound._id
        let body = request.body
        body.createdBy = userId
        let updateTask = await taskSchema.findOneAndUpdate({ _id: request.params._id }, request.body)
        response.json({
            updateTask
        })
    } catch (error) {
        next(error)
    }

}
let deleteTask = async (request, response, next) => {
    let userInfo = request.userInfo
    let userId = userInfo.isFound._id
    try {
        await userSchema.findOneAndUpdate({ _id: userId }, { $pull: { tasks: request.params._id } })
        let DeleteTask = await taskSchema.findOneAndDelete({ _id: request.params._id })
        response.json({
            DeleteTask
        }).status(200)
    } catch (error) {
        next(error)
    }

}
let getTasksByUserId = async (request, response, next) => {
    let userInfo = request.userInfo
    let userId = userInfo.isFound._id
    const filter = { createdBy: userId, ...request.query }
    try {
        let pageNumber = 1;
        //? if user send string in url
        pageNumber = pageNumber * 1 || 1;
        if (pageNumber <= 0 || !pageNumber) pageNumber = 1;
        let LIMIT = 5;
        let skip = (pageNumber - 1) * LIMIT;
        const tasks = await (taskSchema.find({filter})).skip(skip).limit(LIMIT)
        response.json({
            tasks
        }).status(200)
    } catch (error) {
        next(error)
    }

}


export { addTask, editTask, deleteTask, getTasksByUserId }

