import * as React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChatProps } from "../models";
import { useChat } from "../hooks/useChat";

const boxy = {
  border: "1px solid black",
  margin: 12,
  padding: 12,
};

const useStyles = makeStyles({
  root: {
    //    border: "1px solid black",
    height: "80vh",
    display: "flex",
    //  flexDirection: "column",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    ...boxy,
  },
  message: {
    display: "flex",
    flexGrow: 0,
    flewShrink: 1,
    ...boxy,
  },
  messageLine: {},
  sidePanel: {
    flexGrow: 1,
    ...boxy,
  },
});

export function Chat({ username, users }: ChatProps) {
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
      <Grid container className={classes.root}>
        <Grid item className={classes.col} xs={8} md={6}>
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
        </Grid>

        <Grid item xs={4} md={2} className={classes.col}>
          <div className={classes.sidePanel}>
            {users.map((u) => (
              <div className={classes.messageLine}>{u}</div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
