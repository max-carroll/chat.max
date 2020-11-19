import { Message } from "./Message";

export interface ChatState {
  message: string;
  messages: Array<Message>;
}
