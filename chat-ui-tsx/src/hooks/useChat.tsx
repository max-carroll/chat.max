import * as React from "react";
import { Event } from "../types/Event";
import { ChatState } from "../models";
import axios from "axios";

export function useChat(username: string) {
  const [state, setState] = React.useState<ChatState>({
    message: "",
    messages: [],
  });

  React.useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("MessageReceived", (newMessage: any) => {
      setState((old) => ({ ...old, messages: [...old.messages, newMessage] }));
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

    await axios.post("api/messages", { message });
    // setState((old) => ({
    //   ...old,
    //   messages: [...old.messages, { text: message, username }],
    //   message: "",
    // }));

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
