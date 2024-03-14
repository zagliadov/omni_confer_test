import { useState } from "react";
import { useSocket } from "@/context/socket";

const Chat = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const socket = useSocket();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="border p-4 flex w-full h-[400px]">
      <div className="w-full flex flex-col justify-between">
        <div>Chat</div>
        <div className="flex flex-col w-full mt-6">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => handleChange(e)}
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button onClick={handleSend} className="btn mt-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
