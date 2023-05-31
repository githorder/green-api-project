/* eslint-disable react/prop-types */

import "./user.style.css";
import userImage from "../../assets/user.png";

function User({ phoneNumber, setSelectedChat, selectedChat, chats }) {
  return (
    <div
      onClick={() =>
        setSelectedChat(chats.find((chat) => chat === phoneNumber))
      }
      className={`user-container ${
        selectedChat === phoneNumber ? "selected-chat" : ""
      }`}
    >
      <img className="user-image" alt="user-chat" src={userImage} />
      <span>{phoneNumber}</span>
    </div>
  );
}

export default User;
