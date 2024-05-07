import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../utils/cookie";

export default function useChatNotification(type, memberId, callback) {
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
        type,
      },
      () => {
        client.current.subscribe(
          `/topic/${memberId}`,
          ({ body }) => {
            callback(body);
          },
          {
            "auto-delete": true,
            durable: false,
            exclusive: false,
            type,
            accessToken: getCookie("accessToken"),
          }
        );
      }
    );
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  return { connect, disconnect };
}
