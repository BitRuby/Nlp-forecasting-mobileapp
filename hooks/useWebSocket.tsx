import { useState, useEffect, useCallback } from 'react';
import { WS_URL } from '../data/utils';
import { Message } from './types';

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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
      const parsed = JSON.parse(e.data);
      setMessages(prevMessages => [...prevMessages, parsed]);
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
