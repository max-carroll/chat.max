import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import { Event } from "../types/Event";

export interface SelectUsernameProps {
  username: string;
  onUpdate: (username: string) => void;
  onJoin: () => void;
}

export function SelectUsername({
  username,
  onUpdate,
  onJoin,
}: SelectUsernameProps) {
  const handleUpdate = (event: Event) => {
    onUpdate(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key.toLowerCase() === "enter") {
      onJoin();
    }
  };

  return (
    <>
      <TextField
        value={username}
        onChange={handleUpdate}
        onKeyUp={handleKeyUp}
      />
      <Button onClick={onJoin}>Let Me In!!</Button>
    </>
  );
}
