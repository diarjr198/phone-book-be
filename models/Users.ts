import { Schema, model, Model } from 'mongoose';
import IUsers from '../interfaces/IUsers';

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true }
	},
	{
		versionKey: false,
		timestamps: true
	}
);

const User: Model<IUsers> = model<IUsers>('user', userSchema);
export default User;
