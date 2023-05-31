/* eslint-disable react/prop-types */

import User from "../user/user.component";

import "./user-list.component";

function UserList({ chats, setSelectedChat, selectedChat }) {
  return chats.map((phoneNumber, id) => (
    <User
      setSelectedChat={setSelectedChat}
      selectedChat={selectedChat}
      phoneNumber={phoneNumber}
      key={id}
      chats={chats}
    />
  ));
}

export default UserList;
