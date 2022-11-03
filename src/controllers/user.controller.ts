import { Request, Response } from "express";
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
    const users = await User.find();
    return res.status(200).json({ users });
  }
}

export const userController = UserController.getInstance();
