import { NextFunction, Response, Request } from 'express';
import Contact from '../models/Contacts';

class contacts {
	static async getContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user } = req.query;
			if (!id_user) {
				throw { name: 'id_user_not_found' };
			}
			const result = await Contact.find({ id_user: id_user }).sort({ name: 1 });
			if (!result) {
				throw { name: 'id_user_not_found' };
			}
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async getContactUserSpecific(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user, id_contact } = req.query;
			if (!id_user || !id_contact) {
				throw { name: 'id_user_not_found' };
			}
			const result = await Contact.findOneAndUpdate(
				{ id_user: id_user, _id: id_contact },
				{ last_seen: new Date() },
				{ new: true }
			);
			if (!result) {
				throw { name: 'id_contact_not_found' };
			}
			return res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async addContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user } = req.query;
			const { name, phone, email, company, job } = req.body;
			if (!id_user || !name || !phone || !email || !company || !job) {
				// return res.status(400).json({
				// 	message: 'Please enter all fields'
				// });
				throw { name: 'empty_field' };
			}
			const result = await Contact.create({
				id_user: id_user,
				name: name[0].toUpperCase() + name.slice(1),
				telp: phone,
				email: email,
				company: company,
				job: job,
				last_seen: new Date()
			});
			if (!result) {
				throw { name: 'create_contact_failed' };
			}
			res.status(201).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async updateContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user, id_contact } = req.query;
			const { name, phone, email, company, job } = req.body;
			if (!id_contact || !name || !phone || !email || !company || !job) {
				throw { name: 'empty_field' };
			}
			const getContact = await Contact.findOne({ id_user: id_user, _id: id_contact });
			if (!getContact) {
				throw { name: 'id_contact_not_found' };
			}
			const result = await Contact.findOneAndUpdate(
				{ id_user: id_user, _id: id_contact },
				{
					name: name,
					telp: phone,
					email: email,
					company: company,
					job: job,
					last_seen: new Date()
				},
				{ new: true }
			);
			if (!result) {
				throw { name: 'update_contact_failed' };
			}
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async deleteContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user, id_contact } = req.query;
			if (!id_contact) {
				throw { name: 'id_contact_not_found' };
			}
			const result = await Contact.findOneAndDelete({ id_user: id_user, _id: id_contact });
			if (!result) {
				throw { name: 'delete_contact_failed' };
			}
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async favoriteContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user, id_contact } = req.query;
			if (!id_contact) {
				throw { name: 'id_contact_not_found' };
			}
			const resultContact = await Contact.findById(id_contact);
			if (!resultContact) {
				throw { name: 'id_contact_not_found' };
			}
			let result;
			if (resultContact.favorite === 'N') {
				result = await Contact.findOneAndUpdate(
					{ id_user: id_user, _id: id_contact },
					{ favorite: 'Y' },
					{ new: true }
				);
			} else {
				result = await Contact.findOneAndUpdate(
					{ id_user: id_user, _id: id_contact },
					{ favorite: 'N' },
					{ new: true }
				);
			}
			if (!result) {
				throw { name: 'update_contact_failed' };
			}
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async getListFavoriteContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user } = req.query;
			if (!id_user) {
				throw { name: 'id_user_not_found' };
			}
			const result = await Contact.find({ id_user: id_user, favorite: 'Y' }).sort({ name: 1 });
			if (!result) {
				throw { name: 'favorite_contact_not_found' };
			}
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}

	static async recentContactUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id_user } = req.query;
			if (!id_user) {
				throw { name: 'id_user_not_found' };
			}
			const result = await Contact.find({ id_user: id_user }).sort({ last_seen: -1 }).limit(5);
			if (!result) {
				throw { name: 'id_user_not_found' };
			}
			res.status(200).json(result);
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}
}

export default contacts;
