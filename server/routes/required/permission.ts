import { Request } from "express-jwt";
import { Response, NextFunction } from "express";
import response from "../../../ultilities/response";

const permission = function (role: string, require: Array<string> = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    const scopes = (req.auth?.scopes.split(",") as Array<string>) || null;

    if (req.auth?.role == "admin") {
      next();
    }

    if (!(req.auth?.role == role)) {
      return response.r401(res, "No permission");
    }

    if (!scopes) {
      return response.r401(res, "No permission");
    }

    let isPermission = true;
    require.forEach((i) => {
      if (!scopes.includes(i)) {
        isPermission = false;
      }
    });

    if (!isPermission) {
      return response.r401(res, "No permission");
    }

    next();
  };
};

export default permission;
