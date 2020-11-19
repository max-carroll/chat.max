import * as React from "react";
import { Chat } from "./components/Chat";
import { SelectUsername } from "./components/SelectUsername";

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

  const { username, hasJoined, users } = state;
  const handleUpdate = (username: string) =>
    setState((old) => ({ ...old, username }));
  const handleJoin = () =>
    setState((old) => ({
      ...old,
      hasJoined: true,
      users: [...old.users, username],
    }));
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
