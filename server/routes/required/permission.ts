import { Request } from "express-jwt";
import { Response, NextFunction } from "express";
import response from "../../../ultilities/response";
import constants from "../../../constants";

const permission = function (role: string, require: Array<string> = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    const scopes = (req.auth?.scopes?.split(",") as Array<string>) || null;
    if (req.auth?.role == constants.account.role.admin) {
      return next();
    }

    if (!(req.auth?.role == role)) {
      return response.r401(res, "bạn không có quyền thực hiện hành động này");
    }

    if (!scopes) {
      return response.r401(res, "bạn không có quyền thực hiện hành động này");
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

    return next();
  };
};

export default permission;
