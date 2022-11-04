import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { BaseError } from "../errors";
import { IUserPayload } from "../interfaces";

export const userAuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization;
  if (!token) return next();

  const bearer = token?.split(" ") as string[];

  if (!bearer[1] || bearer[0] !== "Token")
    throw new BaseError("Invalid Auth", 401);

  if (!process.env.JWT_SECRET) throw new Error("JWT Secret not found");
  const payload: IUserPayload = jwt.verify(
    bearer[1],
    process.env.JWT_SECRET
  ) as IUserPayload;
  if (!payload) return next();

  req.user = {
    id: payload.id,
    username: payload.username,
  };

  return next();
};
