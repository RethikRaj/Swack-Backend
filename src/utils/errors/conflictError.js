import { StatusCodes } from "http-status-codes";

class ConflictError extends Error {
    constructor(message, errorDetails){
        super(message);
        this.name = 'ConflictError';
        this.statusCode = StatusCodes.CONFLICT;
        this.message = message;

        let explanation = [];
        Object.keys(errorDetails.error).forEach((key)=>{
            explanation.push(`${errorDetails.error[key]}`);
        })
        this.explanation = explanation;
        
    }
}
export default ConflictError;