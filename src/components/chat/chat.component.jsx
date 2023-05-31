/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import "./chat.style.css";
import userImage from "../../assets/user.png";

function Chat({ selectedChat }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedChat && message !== "") {
      fetch(
        `https://api.green-api.com/waInstance1101825774/sendMessage/a5f7d85a9b5547f7acc30da519e250fb0821e8b5cecf42638d`,
        {
          method: "post",
          "Content-Type": "application/json",
          body: JSON.stringify({
            chatId: `${selectedChat}@c.us`,
            message: message,
          }),
        }
      ).catch((err) => console.log(err));

      setMessages({
        ...messages,
        [selectedChat]: messages[selectedChat]
          ? [
              ...messages[selectedChat],
              {
                position: "right",
                message: message,
              },
            ]
          : [
              {
                position: "right",
                message: message,
              },
            ],
      });

      setMessage("");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`https://api.green-api.com/waInstance1101825774/receiveNotification/a5f7d85a9b5547f7acc30da519e250fb0821e8b5cecf42638d
`)
        .then((response) => response.json())
        .then((data) => {
          if (
            data?.body?.typeWebhook === "outgoingMessageReceived" &&
            selectedChat
          ) {
            setMessages((prevMessages) => ({
              ...prevMessages,
              [selectedChat]: prevMessages[selectedChat]
                ? [
                    ...prevMessages[selectedChat],
                    {
                      position: "left",
                      message:
                        data.body.messageData.textMessageData.textMessage,
                    },
                  ]
                : [
                    {
                      position: "left",
                      message:
                        data.body.messageData.textMessageData.textMessage,
                    },
                  ],
            }));
          }
          return data;
        })
        .then((data) => {
          if (data) {
            fetch(
              `https://api.green-api.com/waInstance1101825774/deleteNotification/a5f7d85a9b5547f7acc30da519e250fb0821e8b5cecf42638d/${data.receiptId}
  `,
              { method: "delete" }
            );
          }
        })
        .catch((err) => console.log(err));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedChat]);

  return (
    <div className="chat-container">
      {selectedChat ? (
        <>
          <div className="chat-header">
            <img
              alt="selected-chat-user-image"
              src={userImage}
              className="user-image"
            />
            <span>{selectedChat}</span>
          </div>
          <div className="chat-body">
            {messages[selectedChat]?.map(({ message, position }, id) => (
              <div
                key={id}
                className={`message-container position-${position}`}
              >
                <div className={`message-text ${position}`}>{message}</div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                className="chat-input"
                placeholder="Type a message"
                type="text"
                onChange={handleChange}
                value={message}
              />
              <button className="btn-hide"></button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Chat;
