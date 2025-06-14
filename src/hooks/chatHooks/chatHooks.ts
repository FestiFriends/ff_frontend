'use client';

import { useCallback, useEffect, useState } from 'react';
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
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken || !userId || !chatRoomId) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat`);

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

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
      setIsConnected(false);
    };
  }, [userId, chatRoomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!client || !isConnected) return;

      try {
        const requestData = { senderId: userId, content: message };
        const requestBody = JSON.stringify(requestData);

        client.publish({
          destination: `/pub/chat/${chatRoomId}`,
          body: requestBody,
        });
      } catch (error) {
        console.log('error: ', error);
      }
    },
    [client, isConnected, userId, chatRoomId]
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
