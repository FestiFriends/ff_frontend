'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
// import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/lib/apiFetcher';
import { ChatMessage } from '@/types/chat';
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

  useEffect(() => {
    const connectWebSocket = async () => {
      const accessToken = getAccessToken();

      // 액세스 토큰이 만료되면 자동으로 서버에서 401 error가 날아옴
      // 401 error 시 리프레시 토큰으로 액세스 토큰을 재발급 해야 함

      if (!accessToken || !userId || !chatRoomId) return;

      const socket = new SockJS(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat`
      );

      const stompClient = new Client({
        webSocketFactory: () => socket,

        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },

        onConnect: () => {
          setIsConnected(true);
          stompClient.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
            const body = JSON.parse(message.body);
            setMessages((prev) => [...prev, body]);
          });
        },

        onDisconnect: () => {
          setIsConnected(false);
        },

        // debug: (debugMessage: string) => {
        //   console.log(`debug: ${debugMessage}`);
        // },

        onStompError: (error) => {
          console.log(`stomp error: ${error}`);
        },

        onWebSocketError: (error) => {
          console.log(`web socket error: ${error}`);
        },

        reconnectDelay: 3000,
      });

      clientRef.current = stompClient;
      stompClient.activate();
    };

    connectWebSocket();

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
        console.log('error: ', error);
      }
    },
    [isConnected, userId, chatRoomId]
  );

  return { messages, sendMessage, isConnected };
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
