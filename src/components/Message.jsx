import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const messageDate = message.date.toDate(); // Assuming message.date is a Firestore Timestamp
  const formattedTime = messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      ref={ref}
      className={`message-container ${message.senderId === currentUser.uid ? "owner" : ""}`}
    >
      <div className="message-info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formattedTime}</span>
      </div>

      <div className="message-content">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;
