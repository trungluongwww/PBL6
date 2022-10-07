import express, { Express } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import order from "./order";
import common from "./common";

import response from "../../ultilities/response";

export default (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  //   app.use(
  //     expressjwt({ secret: process.env.JWT_SECRET || "", algorithms: ["HS256"] }),
  //     (err:Error,req:Request,res:Response,next:NextFunction)=>{
  //         if (err.name === "UnauthorizedError") {
  //             res.status(401).send("invalid token...");
  //           } else {
  //             next();
  //           }
  //     }
  //   );
  //   app.use((req:Request,res:Response,next:NextFunction)=>{
  //     if(req.auth?._id){
  //         req.auth.id = req.auth._id
  //         delete req.auth._id
  //     }
  //     next()
  //   })
  common(app);
  order(app);
  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });
};
