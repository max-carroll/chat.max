import { Button, Grid, TextField } from "@material-ui/core";
import * as React from "react";
import { E } from "./App";

interface Message {
  username: string;
  text: string;
}

export interface ChatState {
  message: string;
  messages: Array<Message>;
}

export interface ChatProps {
  username: string;
}

export function Chat({ username }: ChatProps) {
  const [state, setState] = React.useState<ChatState>({
    message: "",
    messages: [],
  });
  const { message, messages } = state;

  const handleMessageChange = (event: E) => {
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

  return (
    <>
      <Grid>
        {messages?.map((m) => (
          <div>
            <strong style={{ marginRight: 6 }}>&lt;{m.username}&gt;</strong>
            {m.text}
          </div>
        ))}
      </Grid>
      <TextField
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKey}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </>
  );
}
