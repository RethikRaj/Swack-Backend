import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from "../config/serverConfig.js"

export const generateJwtToken = (payload)=>{
    return jwt.sign(payload , JWT_SECRET_KEY, { expiresIn: '1h' }  )
}

export const verifyJwtToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
};