"use client";

import baseApi from "@/redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { io, type Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((s) => s.auth) || {};
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token =
      accessToken ||
      (typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : null);

    if (!token) return;

    const socket = io(getBackendUrl(), {
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect_error", () => {
      // keep quiet; UI still works via polling/refresh
    });

    socket.on("notification:new", () => {
      dispatch(baseApi.util.invalidateTags(["notifications"]));
    });

    return () => {
      socket.off("notification:new");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [accessToken, dispatch]);

  return children;
}
