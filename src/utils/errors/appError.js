class AppError extends Error{
    constructor(message, statusCode, errorDetails={}){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;

        this.explanation = [];
        if(errorDetails.error){
            Object.keys(errorDetails.error).forEach((key)=>{
                this.explanation.push(`${errorDetails.error[key]}`);
            })
        }
    }
}

export default AppError;