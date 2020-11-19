import * as React from "react";
import { Event } from "../types/Event";
import { ChatState } from "../models";
import axios from "axios";
import { apiUrl } from "../Settings";
import io from "socket.io-client";
import { Message } from "../models/Message";

export function useChat(username: string) {
  const [state, setState] = React.useState<ChatState>({
    message: "",
    messages: [],
  });

  React.useEffect(() => {
    const socket = io.connect(apiUrl);
    socket.on("MessageReceived", (message: Message) => {
      setState((old) => ({ ...old, messages: [...old.messages, message] }));
    });
  }, []);

  const { message, messages } = state;

  const handleMessageChange = (event: Event) => {
    setState((old) => ({ ...old, message: event.target.value }));
  };

  const isValid = (message: string): boolean => {
    if (!message) return false;

    return true;
  };

  const handleSubmit = async () => {
    if (!isValid(message)) return;

    await axios.post(`${apiUrl}/api/messages`, { message, username });
    setState((old) => ({ ...old, message: "" }));
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
