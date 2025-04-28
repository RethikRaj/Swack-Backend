import {z} from 'zod';

export const zodsignupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string()
            .min(8)
            .refine((password)=>{
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(password);
            },"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    username: z.string().min(3, "Name must be at least 3 characters long"),
})