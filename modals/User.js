import mongoose from "mongoose";
import Validator from "validator"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please tell us your name"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Please tell us your email"],
    lowercase: true,
    validator:[Validator.isEmail,'Please provide a valid email']
  },
  password: { type: String, required: [true,'Please provide a password'], minlength:8, select:false },
  confirmPassword: { type: String, required: [true,'Please confirm your password'],  validate:{
    // this will only work on create and save
    validator:function(el){
      return el === this.password
    },
    message:"Passwords are not the same"
  } },
});

userSchema.pre('save', async function(next){
// only run if the password field is modifiedl
  if(!this.isModified('password')) return next()

  // hash password with const 12
  this.password = await bcrypt.hash(this.password, 12)

  // remove confirmPassword
  this.confirmPassword = undefined
  next()

})

userSchema.methods.correctPassword = function(candidatePassword,userPassword){
  return bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User',userSchema)

export default User
