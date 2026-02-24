import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, {firstName, text}]);
      console.log(text);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages && messages.map((msg, i) => {
          return (
            <div key={i} className="chat chat-start">
              <div className="chat-header">{msg.firstName}</div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
