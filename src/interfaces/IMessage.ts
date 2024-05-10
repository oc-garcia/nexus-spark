export interface IMessagePart {
  text: string;
}

export interface IMessage {
  role: string;
  parts: IMessagePart[];
}