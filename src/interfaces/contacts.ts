interface IRoom {
	_id: string;
	name: string;
	recipients: string[];
	isConv: boolean;
}

export interface IRecipient {
	_id: string;
	username: string;
}

export interface IGetContactListRes {
	rooms: IRoom[];
}

export interface IGetContactDetailRes {
	_id: string;
	name: string;
	recipients: IRecipient[];
	isConv: boolean;
}
