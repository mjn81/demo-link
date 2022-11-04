import { Request, Response } from "express";
import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { BaseError } from "../errors";
import { IAuthDTO } from "../interfaces";

class AuthController {
  private static _instance: AuthController = new AuthController();

  private constructor() {
    if (AuthController._instance) {
      throw new Error(
        "Error: Instantiation failed: Use AuthController.getInstance() instead of new."
      );
    }
    AuthController._instance = this;
  }

  public static getInstance(): AuthController {
    return AuthController._instance;
  }

  public async register(req: Request, res: Response) {
    const { username, password }: IAuthDTO = req.body;
    if (!username) throw new BaseError("Username is required", 400);
    const fuser = await User.findOne({ username });
    if (fuser) throw new BaseError("Username already exists", 400);
    const hPassword = await this._hashPassword(password);
    const user = await User.create({
      username,
      password: hPassword,
		});
		const token = this._generateToken(user.username, user._id);
    return res.status(201).json({ token });
  }

  public async login(req: Request, res: Response) {
    const { username, password }: IAuthDTO = req.body;
    if (!username) throw new BaseError("Username is required", 400);
    const user = await User.findOne({ username });
    if (!user) throw new BaseError("Invalid Auth", 401);
    const validPassword = await this._verifyPassword(
      password,
      user.password
    );
    if (!validPassword) throw new BaseError("Invalid Auth", 401);
    const token = this._generateToken(user.username, user._id);
    return res.status(200).json({
      token,
    });
  }

  private async _hashPassword(password: string) {
    return await hash(password);
  }

  private async _verifyPassword(password: string, hash: string) {
    return await verify(password, hash);
  }

  private _generateToken(username: string, id: string) {
    if (!process.env.JWT_SECRET) throw new Error("JWT Secret not found");
    return jwt.sign({ username, id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

export const authController = AuthController.getInstance();
