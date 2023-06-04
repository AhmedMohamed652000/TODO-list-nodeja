import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    age: Number,
    imageProfile: {
        default:'/userImage.png',
        type:String,
    },
    role: {
        default:'user',
        type:String,
        enum:['user','admin']
    },
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'tasks'
    }],
    confirmedEmail: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("users", userSchema);