import { Response } from "express"

export default (
    res:Response,
    message:string='unauthorized',
)=>{
    return res.status(401).json({message});
}