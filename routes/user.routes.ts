import { Router, Request, Response } from 'express';
import contacts from '../controllers/contact.controller';
import checkID from '../middlewares/checkID';

class UserRoutes {
	userRoutes: Router;

	constructor() {
		this.userRoutes = Router();
		this.userroutes();
	}

	protected userroutes = () => {
		this.userRoutes.get('/list', checkID, contacts.getContactUser);

		this.userRoutes.get('/listspecific', checkID, contacts.getContactUserSpecific);

		this.userRoutes.post('/add', checkID, contacts.addContactUser);

		this.userRoutes.put('/update', checkID, contacts.updateContactUser);

		this.userRoutes.delete('/delete', checkID, contacts.deleteContactUser);

		this.userRoutes.patch('/favorite', checkID, contacts.favoriteContactUser);

		this.userRoutes.get('/listfavorite', checkID, contacts.getListFavoriteContactUser);

		this.userRoutes.get('/recent', checkID, contacts.recentContactUser);
	};
}

export default new UserRoutes().userRoutes;
