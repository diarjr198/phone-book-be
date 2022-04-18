import { NextFunction, Response, Request } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			userId?: Record<string, any>;
		}
	}
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({ message: 'No token provided!' });
	}

	jwt.verify(
		token.toString(),
		'domain: phonebook.com, salt: asafsafasfasf',
		(err: VerifyErrors | null, decoded: any | undefined) => {
			if (err) {
				console.log(err);
				return res.status(401).send({ message: 'Unauthorized!' });
			}
			req.userId = decoded;
			next();
		}
	);
};

const authJwt = {
	verifyToken
};

export default authJwt;
