import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id:{type:Number, required:true,unique:true},
    todo:{type:String, required:true},
    completed:{type:Boolean, default:false},
    userId:{type:Number, required:true}
},{
    timestamps:true
})

const Task = mongoose.model('task',taskSchema)

export default Task