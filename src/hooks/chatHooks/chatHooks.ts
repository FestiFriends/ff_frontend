'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
// import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/lib/apiFetcher';
import { ChatMessage } from '@/types/chat';
import { getNewAccessToken } from '@/utils/getNewAccessToken';
// import { CHAT_QUERY_KEY } from '@/constants/queryKeys';
// import { chatServiceApi } from '@/services/chatService';
// import { ApiResponse, CursorRequest } from '@/types/api';
// import { GetChatMessageListResponse } from '@/types/chat';

/**
 * 채팅 웹소켓 연결
 * @param chatRoomId
 * @returns { messages, sendMessage, isConnected }
 */
export const useChatWebSocket = (
  userId: number | undefined,
  chatRoomId: number | undefined
) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !chatRoomId) return;

    const connectWebSocket = async (token: string) => {
      setStatusMessage('채팅방 연결중...');

      const socket = new SockJS(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat`
      );

      const stompClient = new Client({
        webSocketFactory: () => socket,

        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },

        // debug: (debugMessage: string) => {
        //   console.log(`debug: ${debugMessage}`);
        // },

        reconnectDelay: 0,

        onConnect: () => {
          setIsConnected(true);
          setStatusMessage(null);
          stompClient.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
            const body = JSON.parse(message.body);
            setMessages((prev) => [...prev, body]);
          });
        },

        onDisconnect: () => {
          setIsConnected(false);
        },

        onStompError: async () => {
          const newToken = await getNewAccessToken();
          if (newToken) {
            stompClient.deactivate();
            connectWebSocket(newToken);
          } else {
            setStatusMessage('서버 연결 중 오류가 발생했습니다.');
          }
        },

        onWebSocketError: (error) => {
          console.log(`web socket error: ${error}`);
          setStatusMessage('서버 연결 중 오류가 발생했습니다.');
        },
      });

      clientRef.current = stompClient;
      stompClient.activate();
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      connectWebSocket(accessToken);
    }

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
      setIsConnected(false);
    };
  }, [userId, chatRoomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!clientRef.current || !isConnected || !userId || !chatRoomId) return;

      try {
        const requestData = { senderId: userId, content: message };
        const requestBody = JSON.stringify(requestData);

        clientRef.current.publish({
          destination: `/pub/chat/${chatRoomId}`,
          body: requestBody,
        });
      } catch (error) {
        setStatusMessage('메세지 전송에 실패했습니다.');
        console.log('error: ', error);
      }
    },
    [isConnected, userId, chatRoomId]
  );

  return { messages, sendMessage, isConnected, statusMessage };
};

// export const useGetChatMessageList = (size: CursorRequest['size']) =>
//   useInfiniteQuery<
//     AxiosResponse<GetChatMessageListResponse>,
//     ApiResponse,
//     InfiniteData<AxiosResponse<GetChatMessageListResponse>>,
//     string[],
//     number | undefined
//   >({
//     queryKey: [CHAT_QUERY_KEY.chat],
//     queryFn: ({ pageParam }) =>
//       chatServiceApi.getChatMessageList({
//         // chatRoomId,
//         cursorId: pageParam,
//         size,
//       }),
//     initialPageParam: undefined,
//     getNextPageParam: (lastPage) =>
//       lastPage.data.hasNext ? lastPage.data.cursorId : undefined,
//   });

// export const useGetChatMessageList = (size: CursorRequest['size']) =>
//   useInfiniteQuery<
//     AxiosResponse<GetChatMessageListResponse>,
//     ApiResponse,
//     InfiniteData<AxiosResponse<GetChatMessageListResponse>>,
//     string[],
//     number | undefined
//   >({
//     queryKey: [CHAT_QUERY_KEY.chat],
//     queryFn: ({ pageParam }) =>
//       chatServiceApi.getChatMessageList({
//         // chatRoomId,
//         cursorId: pageParam,
//         size,
//       }),
//     initialPageParam: undefined,
//     getNextPageParam: (lastPage) =>
//       lastPage.data.hasNext ? lastPage.data.cursorId : undefined,
//   });
