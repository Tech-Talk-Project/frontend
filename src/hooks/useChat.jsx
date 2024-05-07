import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../utils/cookie";

export default function useChat(type, chatRoomId, memberId, callback) {
  const client = useRef();

  useEffect(() => {
    client.current = Stomp.over(
      () => new SockJS(`${process.env.REACT_APP_API_URL}/ws`)
    );

    return () => {
      if (client.current.connected) {
        client.current.disconnect();
      }
    };
  }, []);

  const connect = () => {
    client.current.connect(
      {
        type, // "CHAT_ROOM" -> type, memberId, chatRoomId, "CHAT_ROOM_LIST" -> type, "NEW_CHAT_NOTIFICATION"
        memberId,
        chatRoomId,
      },
      () => {
        client.current.subscribe(
          `/topic/${chatRoomId}`,
          ({ body }) => {
            callback(body);
          },
          {
            "auto-delete": true,
            durable: false,
            exclusive: false,
            type,
            chatRoomId,
            accessToken: getCookie("accessToken"),
          }
        );
      }
    );
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const sendMessage = (message) => {
    client.current.send(
      `/pub/chat/message/${chatRoomId}`,
      {},
      JSON.stringify({
        content: message,
        memberId,
      })
    );
  };

  return { connect, disconnect, sendMessage };
}
