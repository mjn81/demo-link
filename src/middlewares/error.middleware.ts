import { BaseError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export const errorHandlingMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('[ERROR]', err);
	if (err instanceof BaseError) {
		return res.status(err.getCode()).json({ message: err.message });
	}
	return res.status(500).json({ message: err.message });
};
