import { useState, useEffect, useCallback } from 'react';
import { WS_URL } from '../data/utils';

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    },
    [socket],
  );

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setConnected(true);
    };

    ws.onmessage = e => {
      setMessages(prevMessages => [...prevMessages, e.data]);
    };

    ws.onerror = e => {
      console.log('WebSocket Error:', e.message);
    };

    ws.onclose = e => {
      console.log('WebSocket Disconnected:', e.reason);
      setConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return { socket, messages, connected, sendMessage };
};

export default useWebSocket;
