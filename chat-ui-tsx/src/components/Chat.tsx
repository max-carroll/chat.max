import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChatProps } from "../models";
import { useChat } from "../hooks/useChat";

const useStyles = makeStyles({
  root: {
    //    border: "1px solid black",
    height: "80vh",
    width: "60vw",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    margin: 12,
    padding: 12,
  },
  message: {
    border: "1px solid black",
    display: "flex",
    flexGrow: 0,
    flewShrink: 1,
    margin: 12,
    padding: 12,
  },
  messageLine: {},
});

export function Chat({ username }: ChatProps) {
  const classes = useStyles();

  const {
    message,
    messages,
    handleMessageChange,
    handleSubmit,
    handleKey,
  } = useChat(username);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.messages}>
          {messages?.map((m) => (
            <div className={classes.messageLine}>
              <strong style={{ marginRight: 6 }}>&lt;{m.username}&gt;</strong>
              {m.text}
            </div>
          ))}
        </div>
        <div className={classes.message}>
          <TextField
            fullWidth={true}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKey}
          />
          <Button onClick={handleSubmit}>Send</Button>
        </div>
      </div>
    </>
  );
}
