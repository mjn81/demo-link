import { BaseError } from "../errors";
import { IUserPayload } from "../interfaces";
import { User } from "../models";

export const userAuth = async (payload?: IUserPayload) => {
  if (!payload) throw new BaseError("Invalid Auth", 401);
  const user = await User.findById(payload.id);
  if (!user) {
    throw new BaseError("Invalid Auth", 401);
  }
  return user;
  // if (!roles) return user;
  // if (roles.find((role) => user.role === role)) {
  //   return user;
  // }

  // throw new AuthorizationError(MESSAGES["INSUFFICIENT_PERMISSION"]);
};

export const extractToken = (token: string) => {
  const bearer = token?.split(" ") as string[];
  return [bearer[0], bearer[1]];
};
