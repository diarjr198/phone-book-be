import { Errback, NextFunction, Response, Request } from 'express';

export default (err: Errback, req: Request, res: Response, next: NextFunction) => {
	let code: number = 0;
	let name: string = err.name;
	let message: string = '';
	switch (name) {
		case 'NOT_FOUND':
			code = 404;
			message = 'Data tidak ditemukan!';
			break;
		case 'Missing_Token':
			code = 401;
			message = 'Akses token hilang!';
			break;
		case 'JsonWebTokenError':
			code = 403;
			message = 'Akses token tidak Valid!';
			break;
		case 'TokenExpiredError':
			code = 401;
			message = 'Akses Token Kamu sudah Expired. Harap login ulang!';
			break;
		case 'Email_Not_Match':
			code = 401;
			message = 'Email yang anda masukan tidak terdaftar!';
			break;
		case 'Email_Invalid':
			code = 401;
			message = 'Yang anda masukan bukan email!';
			break;
		case 'Email_Registered':
			code = 409;
			message = 'Email telah digunakan atau terdaftar!';
			break;
		case 'User_Invalid':
			code = 403;
			message = 'Email atau Password tidak Match!';
			break;
		case 'Password_Invalid':
			code = 403;
			message =
				'Password harus terdiri dari minimal 8 karakter, berupa alphanumeric, terdiri satu huruf kecil, dan satu angka!';
			break;
		case 'id_user_not_found':
			code = 404;
			message = 'ID user tidak ditemukan!';
			break;
		case 'id_contact_not_found':
			code = 404;
			message = 'ID contact tidak ditemukan!';
			break;
		case 'empty_field':
			code = 400;
			message = 'Field tidak boleh kosong!';
			break;
		default:
			code = 500;
			message = 'Internal Server Error!';
			break;
	}
	res.status(code).json({
		success: false,
		message: message
	});
};
