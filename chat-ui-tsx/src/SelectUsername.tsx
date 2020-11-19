import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import { E } from "./App";

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
  const handleUpdate = (event: E) => {
    onUpdate(event.target.value);
  };

  return (
    <>
      <TextField value={username} onChange={handleUpdate} />
      <Button onClick={onJoin}>Let Me In!!</Button>
    </>
  );
}
