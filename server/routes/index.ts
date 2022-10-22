import express, { Express } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import order from "./order";
import common from "./common";
import jwt from "jsonwebtoken";
import response from "../../ultilities/response";
import services from "../services";
import review from "./review";

export default (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));

  app.get("/tokens/:id", async (req, res) => {
    const [payload, err] = await services.account.find.byId(req.params.id);
    const token = jwt.sign(
      {
        ...payload,
      },
      process.env.SECRET_JWT || "",
      {
        expiresIn: "90d",
      }
    );
    return response.r200(res, { token });
  });

  app.use(
    expressjwt({ secret: process.env.SECRET_JWT || "", algorithms: ["HS256"] }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        console.log(err);
        res.status(401).send("invalid token...");
      } else {
        next();
      }
    }
  );
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.auth?._id) {
      req.auth.id = req.auth._id;
      delete req.auth._id;
    }
    if (req.auth?.user_id) {
      req.auth.id = req.auth.user_id;
      delete req.auth.user_id;
    }
    if (req.auth?.name_role) {
      req.auth.role = req.auth.name_role;
      delete req.auth.name_role;
    }
    next();
  });
  common(app);
  order(app);
  review(app);
  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });
};
