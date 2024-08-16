import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { FinalMessage, isDefined, isUndefined } from '../utils/common';
import { CtxMessage } from '../types/Common';
import { AppMessage, isAppMessage, isPingMessage } from '../types/ws';

export type InMsg = (msg: FinalMessage) => void;

export enum WebsocketState {
  CONNECTED = 0,
  DISCONNECTED = 1,
  TERMINATED = 2
}

export type WsConnectionParams = {
  outMsg: FinalMessage | CtxMessage;
  inMsg: InMsg;
};

const configDefaults = {
  heartbeatIntervalMS: 10000,
  maxDisconnectTimeMS: 600000,
  heartbeatMarginMS: 1000,
  serverReconnectAttempts: 3,
  serverReconnectIntervalMS: 10000
};

export function useWsConnection({ outMsg, inMsg }: WsConnectionParams): WebsocketState {
  const lastHeartbeat = useRef<number>(0);
  const [checkInterval, setCheckInterval] = useState<any>();
  const [isLive, setIsLive] = useState(true);
  const [isTerminated, setIsTerminated] = useState(false);

  //const platformWsUrl = 'wss://juvo.dev.jurisfutura.com/ms-platform-web/talk?guid=';
  const {
    heartbeatIntervalMS,
    maxDisconnectTimeMS,
    heartbeatMarginMS,
    serverReconnectAttempts,
    serverReconnectIntervalMS
  } = configDefaults;
  const socketUrl = `ws://localhost:8080`;
  const shouldConnect = true;

  useEffect(() => {
    console.log({ boot: { socketUrl: socketUrl } });
  }, [socketUrl]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        if (heartbeatIntervalMS > 0) startHeartbeat();
        console.log('WS opened, starting heartbeat')
      },
      onReconnectStop: () => {
        terminate();
      },
      shouldReconnect: () => {
        return !isTerminated;
      },
      reconnectInterval: serverReconnectIntervalMS,
      reconnectAttempts: serverReconnectAttempts,
      filter: (message: MessageEvent<any>) => {
        if (isPingMessage(JSON.parse(message.data))) {
          updateHeartbeat(Date.now());
          return false;
        } else {
          return true;
        }
      }
    },
    shouldConnect
  );

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data) {
        const appMsg: AppMessage = JSON.parse(lastMessage.data);
        if (isAppMessage(appMsg)) {
          console.log(`msgIn ${appMsg.app_id}`, { msgIn: appMsg })
          inMsg({ type: 'msg', payload: appMsg });
        }
        return;
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [lastMessage]);

  useEffect(() => {
    if (outMsg !== null) {
      sendMessage(JSON.stringify(outMsg.payload));
    }
  }, [outMsg, sendMessage]);

  const startHeartbeat = () => {
    lastHeartbeat.current = Date.now();
    if (isUndefined(checkInterval)) {
      const interval = setInterval(checkHeartbeat, heartbeatIntervalMS);
      setCheckInterval(interval);
    }
  };

  const checkHeartbeat = () => {
    if (isTerminated) return;
    const timeSinceLastBeat = Date.now() - lastHeartbeat.current;
    if (maxDisconnectTimeMS > 0 && timeSinceLastBeat >= maxDisconnectTimeMS) {
      terminate();
    }
    setIsLive(timeSinceLastBeat < heartbeatIntervalMS + heartbeatMarginMS);
  };

  const terminate = () => {
    if (isDefined(checkInterval)) {
      clearInterval(checkInterval);
      setCheckInterval(undefined);
    }
    setIsTerminated(true);
    setIsLive(false);
  };

  const updateHeartbeat = (beatTime: number) => {
    lastHeartbeat.current = beatTime;
  };

  if (isTerminated) {
    return WebsocketState.TERMINATED;
  } else if ((readyState === 1 && isLive) || !lastHeartbeat.current) {
    return WebsocketState.CONNECTED;
  } else {
    return WebsocketState.DISCONNECTED;
  }
}
