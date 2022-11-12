import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { BaseError } from "../errors";
import { extractToken } from "../helpers";
import { IUserPayload } from "../interfaces";

export const userAuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization;
  if (!token) return next();
  const [bearer , tokenValue]= extractToken(token);

  if (!process.env.JWT_SECRET) throw new Error("JWT Secret not found");
  let payload: IUserPayload | null = null;
  try {
    payload = jwt.verify(
      tokenValue,
      process.env.JWT_SECRET
    ) as IUserPayload;
  } catch (error) {
    return next();
  }
  if (!payload) return next();

  req.user = {
    id: payload.id,
    username: payload.username,
  };

  return next();
};
