import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (!roomId) {
      alert("Please provide a valid room id");
    }
    router.push(`/${roomId}`);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-success rounded-md p-6 relative">
        <div
          className="flex items-center bg-special justify-center border border-success absolute top-[-15px] w-8 h-8 rounded-full right-[-16px]"
        >
          <div className="w-4 h-4 bg-red-800 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-center text-2xl text-success">Meeting</h1>
        <div className="pt-4 flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e?.target?.value)}
            className="input input-bordered input-success w-96"
          />
          <button className="btn mt-2 w-96 btn-success" onClick={joinRoom}>
            <span className="text-blue-100">Join Room</span>
          </button>
        </div>
        <div className="divider divider-success"></div>
        <div className="divider divider-success"></div>
        <button
          onClick={createAndJoin}
          className="btn text-blue-100 btn-success w-96 "
        >
          Create a new room
        </button>
      </div>
    </div>
  );
}
