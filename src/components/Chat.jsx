import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Chat() {

  const { data } = useContext(ChatContext);

  return (
    <div className="chat-container">
      <div className="chatInfo">
          <img src={data.user.photoURL} alt="" />
          <div className="userChatInfo">
            <p className="userChatInfo-name">{data.user.displayName}</p>
          </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
