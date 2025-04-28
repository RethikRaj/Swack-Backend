import { StatusCodes } from "http-status-codes";

import AppError from "./appError.js";

class ConflictError extends AppError {
    constructor(message='conflict', errorDetails){
        super(message, StatusCodes.CONFLICT,errorDetails);
    }
}

class ValidationError extends AppError{
    constructor(message, errorDetails){
        super(message, StatusCodes.BAD_REQUEST,errorDetails);
    }
}

export {ConflictError, ValidationError}