import { Router, Request, Response } from 'express';

class UserRoutes {
	userRoutes: Router;

	constructor() {
		this.userRoutes = Router();
		this.userroutes();
	}

	protected userroutes = () => {
		this.userRoutes.get('/list', (req: Request, res: Response) => {
			res.status(200).json({ message: 'List' });
		});

		this.userRoutes.post('/create', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Create' });
		});

		this.userRoutes.put('/update', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Update' });
		});

		this.userRoutes.delete('/delete', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Delete' });
		});

		this.userRoutes.patch('/favorite', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Favorite' });
		});
	};
}

export default new UserRoutes().userRoutes;
