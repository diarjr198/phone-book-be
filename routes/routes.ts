import { Request, Response, NextFunction, Router } from 'express';
import users from '../controllers/user.controller';

class Routes {
	router: Router;
	constructor() {
		this.router = Router();
		this.login();
		this.register();
		this.user();
	}

	protected login = () => {
		this.router.post('/login', users.login);
	};

	protected register = () => {
		this.router.post('/register', users.register);
	};

	protected user = () => {
		this.router.get('/user', (req: Request, res: Response) => {
			res.status(200).json({ message: 'User' });
		});
	};
}

export default new Routes().router;
