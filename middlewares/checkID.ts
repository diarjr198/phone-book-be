import { NextFunction, Request, Response } from 'express';

declare global {
	namespace Express {
		interface Request {
			id?: string;
		}
	}
}

export default (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id_user } = req.query;
		const { userId } = req;
		if (!userId) {
			throw { name: 'Missing_Token' };
		}
		if (id_user === userId.id) {
			next();
		} else {
			throw {
				name: 'ID_NOT_PASS'
			};
		}
	} catch (error) {
		console.log(error);
		console.log((error as Error).message);
		next(error);
	}
};
