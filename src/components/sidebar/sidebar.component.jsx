/* eslint-disable react/prop-types */

import { useState } from "react";

import UserList from "../user-list/user-list.component";

import "./sidebar.style.css";

function Sidebar({ chats, setChats, setSelectedChat, selectedChat }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setChats([...chats, phoneNumber]);
    setPhoneNumber("");
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header"></div>
      <div className="phone-container">
        <form onSubmit={handleSubmit}>
          <input
            className="phone-input"
            placeholder="Type a phone number"
            type="text"
            value={phoneNumber}
            onChange={handleChange}
          />
          <button className="btn-hide"></button>
        </form>
      </div>
      <UserList
        selectedChat={selectedChat}
        chats={chats}
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
}

export default Sidebar;
