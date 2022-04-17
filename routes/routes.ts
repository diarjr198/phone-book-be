import { Request, Response, NextFunction, Router } from 'express';
import users from '../controllers/user.controller';
import authJwt from '../middlewares/authJWT';
import userRoutes from './user.routes';

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
		this.router.use('/user', userRoutes);
	};
}

export default new Routes().router;
