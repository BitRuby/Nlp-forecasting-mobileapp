import { useState, useEffect, useCallback } from 'react';
import { WS_URL, mapValues } from '../data/utils';
import { WsMessage } from './types';
import { ItemProps } from '../ui/List';

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [preds, setPreds] = useState<ItemProps[]>([]);
  const [error, setError] = useState<Error>({} as Error);
  const [finish, setFinish] = useState<boolean>(false);

  const clearMessages = () => {
    setPreds([]);
    setError({} as Error);
    setFinish(false);
  };

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
      const parsed = JSON.parse(e.data) as WsMessage;

      if ('error' in parsed) {
        setError(parsed.error);
      } else if ('finish' in parsed) {
        setFinish(true);
      } else {
        if (!error.message) {
          setPreds(prev => [
            ...prev,
            {
              id: parsed.id,
              data: {
                ...(parsed.preds.accuracy !== undefined && {
                  Accuracy: Number(parsed.preds.accuracy),
                  Layers: mapValues(parsed.layers),
                }),
                ...(parsed.preds.mse !== undefined && {
                  MSE: Number(parsed.preds.mse),
                  Layers: mapValues(parsed.layers),
                }),
              },
            },
          ]);
        }
      }
    };

    ws.onerror = e => {
      console.log('WebSocket Error:', e.message);
    };

    ws.onclose = e => {
      console.log('WebSocket Disconnected:', e.reason);
      clearMessages();
      setConnected(false);
    };

    setSocket(ws);

    return () => {
      clearMessages();
      ws.close();
    };
  }, [error.message]);

  return {
    socket,
    preds,
    error,
    finish,
    connected,
    sendMessage,
  };
};

export default useWebSocket;
