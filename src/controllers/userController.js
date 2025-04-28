import { StatusCodes } from "http-status-codes";

import { signinService, signupService } from "../services/userService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";

export const signupController = async (req,res)=>{
    try {
        const newUser = await signupService(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(newUser, 'User created successfully' ));
    } catch (error) {
        // console.log("Error in signupController: ", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(500).json(internalErrorResponse(error));
    }
}

export const signinController = async (req,res)=>{
    try{
        const user = await signinService(req.body);
        res.status(StatusCodes.OK).json(successResponse(user, 'User authenticated successfully' ));
    }catch(error){
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};