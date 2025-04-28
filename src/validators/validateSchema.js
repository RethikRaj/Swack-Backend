import { StatusCodes } from "http-status-codes";

export const validate = (schema)=>{
    return async (req,res,next)=>{
        try{
            await schema.parseAsync(req.body);
            next();
        }catch(error){
            console.log("Zod validation Error : " , error, error.errors);
            let explanation = [];

            error.errors.forEach((ele)=>{
                explanation.push(`${ele.path[0]} : ${ele.message}`)
            })


            return res.status(StatusCodes.BAD_REQUEST).json({
                explanation : explanation,
                message: "Validation Error : "+explanation.join(" , ")
            })
        }
    }
}