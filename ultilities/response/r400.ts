import { Response } from "express"

export default (
    res:Response,
    data:any={},
    message:string='failed',
)=>{
    return res.status(400).json({data,message});
}