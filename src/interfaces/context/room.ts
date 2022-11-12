export interface IRoom {
  id: string;
  name: string;
  isConv: boolean;
  recipients: string[];
}

export interface IContactState {
  contact: IRoom | null;
  setContact: (room: IRoom) => void;
  clearContact: () => void;
}
