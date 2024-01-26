import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useChat(
  chatRoomId,
  memberId,
  setChattingList,
  setChat
) {
  const client = useRef();

  useEffect(() => {
    client.current = Stomp.over(() => new SockJS("http://localhost:8080/ws"));

    return () => {
      if (client.current.connected) {
        client.current.disconnect();
      }
    };
  }, []);

  const connect = () => {
    client.current.connect(
      {
        memberId,
        chatRoomId,
      },
      () => {
        client.current.subscribe(
          `/topic/${chatRoomId}`,
          ({ body }) => {
            setChattingList((prev) => [...prev, JSON.parse(body).content]);
          },
          { "auto-delete": true, durable: false, exclusive: false }
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
    setChat("");
  };

  return { connect, disconnect, sendMessage };
}
