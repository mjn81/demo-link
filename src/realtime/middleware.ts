import jwt from "jsonwebtoken";
import { BaseError } from "../errors";
import { extractToken } from "../helpers";
import { IUserPayload } from "../interfaces";

export const socketAuthMiddleware = async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new BaseError("Invalid Auth", 401));
  }
  const [_, tokenValue] = extractToken(token);
  if (!process.env.JWT_SECRET) throw new Error("JWT Secret not found");
  let payload: IUserPayload | null = null;
  try {
    payload = jwt.verify(
      tokenValue,
      process.env.JWT_SECRET
    ) as IUserPayload;
  } catch (error) {
    return next(new BaseError("Invalid Auth", 401));
  }
  if (!payload) return next(new BaseError("Invalid Auth", 401));

  socket.user = {
    id: payload.id,
    username: payload.username,
  };
  return next();
};
