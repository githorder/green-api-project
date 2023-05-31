import { useState } from "react";

import Auth from "./components/auth/auth.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Chat from "./components/chat/chat.component";

import "./App.css";

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  return userAccount !== null ? (
    <Auth setUserAccount={setUserAccount} />
  ) : (
    <div className="app">
      <Sidebar
        chats={chats}
        setChats={setChats}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      <Chat selectedChat={selectedChat} />
    </div>
  );
}

export default App;
