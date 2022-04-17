import express, { Application, Request, Response, NextFunction } from 'express';
import routes from './routes/routes';
import mongoDB from './configs/DB';
import errorHandler from './middlewares/errorHandler';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.plugin();
		this.route();
		this.errorHandler();
	}

	protected plugin = () => {
		mongoDB.connect();
		this.app.use(express.urlencoded({ extended: false }));
	};

	protected route = () => {
		this.app.get('/', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Success' });
		});
		this.app.use('/api', routes);
	};

	protected errorHandler = () => {
		this.app.use(errorHandler);
	};
}

const app = new App().app;
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
