import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const user = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
		},
		username: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

export const User = model('User', user);
