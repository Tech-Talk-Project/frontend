import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../../utils/cookie";

export default function useChat(chatRoomId, setChattingList, setChat) {
  const client = useRef();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // WebSocket endpoint
    const stompClient = Stomp.over(socket);

    client.current = stompClient;

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const connect = () => {
    client.current.connect(
      {
        memberId: jwtDecode(getCookie("accessToken")).memberId,
        chatRoomId,
      },
      () => {
        console.log("Connected to WebSocket");
        // Subscribe to the chat topic
        client.current.subscribe(
          `/topic/${chatRoomId}`,
          ({ body }) => {
            // Handle incoming messages
            // console.log('Received message:', JSON.parse(message.body));
            // You can update your React state with the new message here
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
        memberId: jwtDecode(getCookie("accessToken")).memberId,
      })
    );
    setChat("");
  };

  return { connect, disconnect, sendMessage };
}
