import { Request, Response } from "express";
import { userAuth } from "../helpers";
import { User } from "../models";

export class UserController {
  private static _instance: UserController = new UserController();

  private constructor() {
    if (UserController._instance) {
      throw new Error(
        "Error: Instantiation failed: Use AuthController.getInstance() instead of new."
      );
    }
    UserController._instance = this;
  }

  public static getInstance(): UserController {
    return UserController._instance;
  }

  public async getUsers(req: Request, res: Response) {
    await userAuth(req.user);
    const users = await User.find();
    return res.status(200).json({ users });
  }

  public async getProfile(req: Request, res: Response) {
    const user = await userAuth(req.user);
    return res.status(200).json({ user });
  }
}

export const userController = UserController.getInstance();
