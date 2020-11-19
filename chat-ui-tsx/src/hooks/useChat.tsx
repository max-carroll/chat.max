import * as React from "react";
import { Event } from "../types/Event";
import { ChatState } from "../models";

export function useChat(username: string) {
  const [state, setState] = React.useState<ChatState>({
    message: "",
    messages: [],
  });
  const { message, messages } = state;

  const handleMessageChange = (event: Event) => {
    setState((old) => ({ ...old, message: event.target.value }));
  };

  const isValid = (message: string): boolean => {
    if (!message) return false;

    return true;
  };

  const handleSubmit = () => {
    if (!isValid(message)) return;

    setState((old) => ({
      ...old,
      messages: [...old.messages, { text: message, username }],
      message: "",
    }));

    // TODO broadcast websocket
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return {
    message,
    messages,
    handleMessageChange,
    handleSubmit,
    handleKey,
  };
}
