import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository.js";
import { ConflictError, ValidationError } from "../utils/errors/customErrors.js";
import { generateJwtToken } from "../utils/jwt.js";

export const signupService = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = await userRepository.create(user);
        return newUser;
    } catch (error) {
        // console.log("Error in user signup service:", error, error?.name);
        if(error.name === "ValidationError"){
            throw new ValidationError(error._message, {
                error : error.errors
            })
        }

        // Handle both MongoDB duplicate key errors and Mongoose transformed errors
        if((error.name === "MongoServerError" && error.code === 11000) || 
           (error.name === "MongooseError" && error.message.includes("already exists") && error.cause.code === 11000) ) {
            throw new ConflictError("User already exists with this email or username",{
                error : ['User already exists with this email or username']
            })
        }else{
            throw error;
        }
        
    }
};

export const signinService = async (user)=>{
    const foundUser = await userRepository.findOne({email: user.email});
    if(!foundUser) {
        throw {message: "User not found", status : StatusCodes.NOT_FOUND};
    }
    const isMatch = await bcrypt.compare(user.password, foundUser.password);
    if(!isMatch){
        throw {message: "Incorrect password", status: StatusCodes.UNAUTHORIZED};
    }
    const token = generateJwtToken({
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email
    })
    return token;
    
}