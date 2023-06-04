import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})

export default mongoose.model("tasks", tasksSchema);