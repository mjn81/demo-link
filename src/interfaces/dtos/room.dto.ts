export interface IRoom {
  name: string;
  recipients: string[];
  isConv: boolean;
}

export interface IAddRecipientDto {
  recipients: string[];
}