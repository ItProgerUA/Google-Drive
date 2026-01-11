import { useEffect } from "react";
import { io } from "socket.io-client";
import { useFoldersStore } from "feature/daschboard/store/foldersStore";

const socket = io("http://localhost:5001");

export const useSocket = () => {
  const triggerRefetch = useFoldersStore((state) => state.triggerRefetch);

  useEffect(() => {
    socket.on("folders:update", () => {
      triggerRefetch();
    });

    socket.on("files:update", () => {
      triggerRefetch();
    });

    return () => {
      socket.off("folders:update");
      socket.off("files:update");
    };
  }, [triggerRefetch]);
};
