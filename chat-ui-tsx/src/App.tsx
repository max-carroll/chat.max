import * as React from "react";
import { Chat } from "./components/Chat";
import { SelectUsername } from "./components/SelectUsername";

interface AppState {
  username: string;
  hasJoined: boolean;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    username: "max",
    hasJoined: true,
  });

  const { username, hasJoined } = state;
  const handleUpdate = (username: string) =>
    setState((old) => ({ ...old, username }));
  const handleJoin = () => setState((old) => ({ ...old, hasJoined: true }));
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
      {hasJoined && <Chat username={username} />}
    </>
  );
}

export default App;
