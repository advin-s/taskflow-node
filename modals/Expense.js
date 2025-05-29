import mongoose, { Mongoose } from "mongoose";

const expenseSchema = new mongoose.Schema({
    id:{type:Number, required:true, unique:true},
    category:{type:String, required:true},
    amount:{type:Number, required:true},
    date:{type:Date, required:true},
    notes:{type:String}
})

const Expense = mongoose.model('expense', expenseSchema)

export default Expense