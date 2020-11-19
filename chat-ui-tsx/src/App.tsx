import * as React from "react";
import { Chat } from "./components/Chat";
import { SelectUsername } from "./components/SelectUsername";
import { apiUrl } from "./Settings";
import axios from "axios";
import io, { Socket } from "socket.io-client";

interface AppState {
  username: string;
  hasJoined: boolean;
  users: Array<string>;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    username: "",
    hasJoined: false,
    users: [],
  });

  React.useEffect(() => {
    if (state.hasJoined) return;
    const socket = io(apiUrl);
    socket.on("UserJoined", (user: any) => {
      console.log({ user });
      setState((old) => ({ ...old, users: [...old.users, user.username] }));
    });
  }, [state.hasJoined]);

  const { username, hasJoined, users } = state;

  const handleUpdate = (username: string) =>
    setState((old) => ({ ...old, username }));

  const handleJoin = async () => {
    await axios.post(`${apiUrl}/api/join`, { username: state.username });
    setState((old) => ({
      ...old,
      hasJoined: true,
    }));
  };

  return (
    <>
      <h1>chat.max 2</h1>
      {!hasJoined && (
        <SelectUsername
          username={username}
          onUpdate={handleUpdate}
          onJoin={handleJoin}
        />
      )}
      {hasJoined && <Chat username={username} users={users} />}
    </>
  );
}

export default App;
