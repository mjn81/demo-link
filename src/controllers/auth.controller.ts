import { Request, Response } from 'express';

import { User } from '../models';
import { BaseError } from '../errors';

class AuthController {
	private static _instance: AuthController = new AuthController();

	private constructor() {
		if (AuthController._instance) {
			throw new Error(
				'Error: Instantiation failed: Use AuthController.getInstance() instead of new.'
			);
		}
		AuthController._instance = this;
	}

	public static getInstance(): AuthController {
		return AuthController._instance;
	}

	public async register(req: Request, res: Response) {
		const { username }: { username: string } = req.body;
		if (!username) throw new BaseError('Username is required', 400);
		const fuser = await User.findOne({ username });
		if (fuser) throw new BaseError('Username already exists', 400);
		const user = await User.create({ username });
		return res.status(201).json({ user });
	}

	public async login(req: Request, res: Response) {
		const { username } = req.body;
		if (!username) throw new BaseError('Username is required', 400);
		const user = await User.findOne({ username });
		if (!user) throw new BaseError('User not found', 404);
		return res.status(200).json({ user });
	}
}

export const authController = AuthController.getInstance();
