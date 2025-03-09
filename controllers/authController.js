import User from '../modals/User.js'
import jwt from 'jsonwebtoken'

const signToken = (id) => jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRY
})

export const signUp = async(req,res,next) =>{
  try{
    const { name,email,password,confirmPassword } = req.body
    const newUser = await User.create({name,email,password,confirmPassword});

    const token = signToken({id: newUser._id})

    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
  }catch(err){
    res.status(500).json({
        status:"failed",
        err
    })
  }
}

export const login = async(req,res,next) =>{
    try{
        const { email,password } = req.body
        // check if email and password exist
        if(!email || !password){
            return res.status(404).json({
                status:"failed",
                message:"Please provide email and password"
            })
        }

        // check if password is correct
        const user = await User.findOne({email}).select('+password')

        const correct = await user.correctPassword(password,user.password)

        if(!user || !correct){
            return res.status(404).json({
                status:"failed",
                message:"invalid provide email or password"
            })
        }


        // if success return token
        const token = signToken(user.id)
        res.status(200).json({
            status:"success",
            token
        })
    }catch(err){

    }
}