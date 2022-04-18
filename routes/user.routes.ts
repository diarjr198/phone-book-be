import { Router, Request, Response } from 'express';
import contacts from '../controllers/contact.controller';

class UserRoutes {
	userRoutes: Router;

	constructor() {
		this.userRoutes = Router();
		this.userroutes();
	}

	protected userroutes = () => {
		this.userRoutes.get('/list', contacts.getContactUser);

		this.userRoutes.get('/listspecific', contacts.getContactUserSpecific);

		this.userRoutes.post('/add', contacts.addContactUser);

		this.userRoutes.put('/update', contacts.updateContactUser);

		this.userRoutes.delete('/delete', contacts.deleteContactUser);

		this.userRoutes.patch('/favorite', contacts.favoriteContactUser);

		this.userRoutes.get('/listfavorite', contacts.getListFavoriteContactUser);

		this.userRoutes.get('/recent', contacts.recentContactUser);
	};
}

export default new UserRoutes().userRoutes;
