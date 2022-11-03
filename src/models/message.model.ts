import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const message = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
		},
		text: String,
		room_id: {
			type: String,
			required: true,
			ref: 'Room',
		},
	},
	{
		timestamps: true,
	}
);

export const Message = model('Message', message);
