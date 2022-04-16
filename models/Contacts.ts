import { Schema, model, Model } from 'mongoose';
import IContacts from '../interfaces/IContacts';

const contactSchema = new Schema(
	{
		id_user: { type: Schema.Types.ObjectId, ref: 'user' },
		name: { type: String, required: true },
		telp: { type: String, required: true },
		company: { type: String, required: true },
		job: { type: String, required: true },
		email: { type: String, required: true },
		favorite: { type: String, enum: [ 'Y', 'N' ], default: 'N' },
		last_seen: { type: Date, required: true }
	},
	{
		versionKey: false,
		timestamps: true
	}
);

const Contact: Model<IContacts> = model<IContacts>('contact', contactSchema);
export default Contact;
