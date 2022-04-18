import { NextFunction, Response, Request } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

class users {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return res.status(400).json({
					message: 'Please enter all fields'
				});
			}
			const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
			const validEmail = emailRegex.test(email);
			if (!validEmail) {
				throw { name: 'Email_Invalid' };
			}
			const resultEmail = await User.findOne({ email: email.toLowerCase() });
			if (resultEmail) {
				throw { name: 'Email_Registered' };
			}
			const passRegex = /^[a-zA-Z0-9]{8,}$/;
			const validPass = passRegex.test(password);
			if (!validPass) {
				throw { name: 'Password_Invalid' };
			}
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);
			const result = await User.create({
				name,
				email: email.toLowerCase(),
				password: hashedPassword
			});
			return res.status(201).json({
				success: true,
				message: 'Register Berhasil',
				data: result
			});
		} catch (error) {
			console.log((error as Error).message);
			next(error);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(400).json({
					message: 'Please enter all fields'
				});
			}
			const result = await User.findOne({ email: email.toLowerCase() });
			if (!result) {
				throw { name: 'Email_Not_Found' };
			}
			const checkPass = bcrypt.compareSync(password, result.password);
			if (!checkPass) {
				throw {
					name: 'Password_Invalid'
				};
			}
			const token = jwt.sign(
				{ id: result._id, email: result.email },
				'domain: phonebook.com, salt: asafsafasfasf',
				{ expiresIn: '30d' }
			);
			return res.status(200).json({
				success: true,
				message: 'Login Success',
				token: token,
				user: { id: result._id, name: result.name }
			});
		} catch (error) {
			console.log(error);
			console.log((error as Error).message);
			next(error);
		}
	}
}

export default users;
