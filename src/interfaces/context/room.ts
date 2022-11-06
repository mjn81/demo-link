export interface IContact {
  id: string;
  name: string;
  isConv: boolean;
  recipients: string[];
}

export interface IContactState {
  contact: IContact | null;
  setContact: (room: IContact) => void;
  clearContact: () => void;
}
