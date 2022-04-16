import { Request, Response, NextFunction, Router } from 'express';

class Routes {
	router: Router;
	constructor() {
		this.router = Router();
		this.login();
		this.register();
		this.user();
	}

	protected login = () => {
		this.router.post('/login', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Login' });
		});
	};

	protected register = () => {
		this.router.post('/register', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Register' });
		});
	};

	protected user = () => {
		this.router.get('/user', (req: Request, res: Response) => {
			res.status(200).json({ message: 'User' });
		});
	};
}

export default new Routes().router;
