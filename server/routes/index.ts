import express, { Express, Router } from "express";
import { Response, NextFunction } from "express";
import { expressjwt, Request } from "express-jwt";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import order from "./order";
import common from "./common";
import response from "../../ultilities/response";
import review from "./review";
import voucher from "./voucher";
import jwt from "jsonwebtoken";
import services from "../services";

export default (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("tiny"));
  const privateRoute = express.Router();
  const publicRoute = express.Router();

  app.get("/tokens/:id", async (req, res) => {
    const [payload, err] = await services.account.find.byId(req.params.id);
    console.log(payload);
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

  privateRoute.use(
    expressjwt({ secret: process.env.SECRET_JWT || "", algorithms: ["HS256"] }),
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === "UnauthorizedError") {
        req.auth = undefined;
      }
      next();
    }
  );

  privateRoute.use((req: Request, res: Response, next: NextFunction) => {
    if (req.auth) {
      if (req.auth._id) {
        req.auth.id = req.auth._id;
        delete req.auth._id;
      }
      if (req.auth.user_id) {
        req.auth.id = req.auth.user_id;
        delete req.auth.user_id;
      }
      if (req.auth.role_name) {
        req.auth.role = req.auth.role_name;
        delete req.auth.role_name;
      }
    }
    next();
  });

  app.use("/api/v1/sv3", publicRoute);
  app.use("/api/v1/sv3", privateRoute);
  common(publicRoute);
  order(privateRoute);
  review(privateRoute);
  voucher(privateRoute);

  app.use("*", (req: Request, res: Response) => {
    return response.r404(res, "The route not found");
  });
};
