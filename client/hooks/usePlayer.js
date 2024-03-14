import { useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const router = useRouter();
  const playersCopy = cloneDeep(players);

  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  const leaveRoom = () => {
    socket.emit("user-leave", myId, roomId);
    console.log("leaving room", roomId);
    peer?.disconnect();
    router.push("/");
  };

  const toggleAudio = () => {
    console.log("Toggling my audio");
    setPlayers((prev) => {
      const newState = { ...prev };
      newState[myId] = { ...newState[myId], muted: !newState[myId].muted };
      return newState;
    });
    socket.emit("user-toggle-audio", myId, roomId, !players[myId].muted); // Отправляйте явное состояние
  };

  const toggleVideo = () => {
    console.log("Toggling my video");
    setPlayers((prev) => {
      const newState = { ...prev };
      newState[myId] = { ...newState[myId], playing: !newState[myId].playing };
      return newState;
    });
    socket.emit("user-toggle-video", myId, roomId, !players[myId].playing); // Отправляйте явное состояние
  };

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      console.log("Screen sharing started");

      socket.emit("user-share-screen", myId, roomId);
    } catch (e) {
      console.error("Error in sharing screen", e);
    }
  };

  const sendMessage = async (msg) => {
    try {
      console.log(msg, 'Msg')
      socket.emit("user-chat-message", myId, roomId, msg);
    } catch (e) {
      console.error("Error in sharing screen", e);
    }
  }

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
    shareScreen,
    sendMessage
  };
};

export default usePlayer;
