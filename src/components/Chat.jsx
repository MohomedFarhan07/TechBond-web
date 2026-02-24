import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{ text: "hello world" }]);

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, i) => {
          return (
            <div key={i} className="chat chat-start">
              <div className="chat-header">
                Akshay Saini
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input className="flex-1 border border-gray-500 text-white rounded p-2" />
        <button className="btn btn-secondary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
