'use client';

import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
// import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/lib/apiFetcher';
import { ChatMessageResponse } from '@/types/chat';
// import { CHAT_QUERY_KEY } from '@/constants/queryKeys';
// import { chatServiceApi } from '@/services/chatService';
// import { ApiResponse, CursorRequest } from '@/types/api';
// import { GetChatMessageListResponse } from '@/types/chat';

const sender = 1;

/**
 * 채팅 웹소켓 연결
 * @param chatRoomId
 * @returns { messages, sendMessage, isConnected }
 */
export const useChatWebSocket = (chatRoomId: string | null) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken || !chatRoomId) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`);

    const stompClient = new Client({
      webSocketFactory: () => socket,

      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },

      onConnect: () => {
        setIsConnected(true);
        console.log('connected to stomp client');

        stompClient.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
          console.log(`subscribed chat room ${chatRoomId}`);
          const body = JSON.parse(message.body);
          console.log('received message: ', body);
          setMessages((prev) => [...prev, body]);
        });
      },

      onDisconnect: () => {
        setIsConnected(false);
        console.log('disconnected to stomp client');
      },

      debug: (debugMessage: string) => {
        console.log(`debug: ${debugMessage}`);
      },

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
  }, [chatRoomId]);

  const sendMessage = (content: string) => {
    if (!client || !isConnected) return;

    try {
      const requestData = { senderId: sender, content: content };
      const requestBody = JSON.stringify(requestData);

      client.publish({
        destination: `/pub/chat/${chatRoomId}`,
        body: requestBody,
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

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
