import User from "../modals/User.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

export const authorizedRoles = (...allowedRoles) => {
  return async(req,res,next) =>{
    const userRole = req.body.role
    
    if(!allowedRoles.includes(userRole)){
      return res.status(403).json({
        status:'failed',
        message:'Forbidden access denied'
      })
    }
    next()
  }
}

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, passwordChangedAt} = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
      passwordChangedAt
    });

    const token = signToken({ id: newUser._id });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // check if email and password exist
    if (!email || !password) {
      return res.status(404).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }

    // check if password is correct
    const user = await User.findOne({ email }).select("+password");
    console.log(user);

    const correct = await user.correctPassword(password, user.password);
    console.log(correct);

    if (!user || !correct) {
      return res.status(404).json({
        status: "failed",
        message: "invalid provide email or password",
      });
    }

    // if success return token
    const token = signToken(user.id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {}
};

export const protect = async (req, res, next) => {
  try {
    let token = ''
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new Error("You are not logged in"));

    const isValidToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    const {id} = isValidToken 
    
   const freshUser = await User.findById(id);
    if (!freshUser) return next(new Error("Account error"));

    freshUser.changedPasswordAfter(isValidToken.iat);

    next();
  } catch (err) {
    return next(new Error("Error, Please login again"));
  }
};
