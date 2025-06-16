'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
// import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/lib/apiFetcher';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { ChatMessage } from '@/types/chat';
// import { CHAT_QUERY_KEY } from '@/constants/queryKeys';
// import { chatServiceApi } from '@/services/chatService';
// import { ApiResponse, CursorRequest } from '@/types/api';
// import { GetChatMessageListResponse } from '@/types/chat';

/**
 * 액세스 토큰 만료 여부를 확인하는 함수
 * @param token
 * @returns 액세스 토큰 만료 여부
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * 리프레시 토큰으로 액세스 토큰 재발급하는 함수
 * @returns 새 액세스 토큰
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const authInfo = localStorage.getItem('authInfo');
  if (!authInfo) return null;

  const refreshToken = JSON.parse(authInfo).state.refreshToken;
  if (!refreshToken) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const newAccessToken = data.data?.accessToken;

    if (!newAccessToken) return null;

    callTokenUpdater(newAccessToken);
    return newAccessToken;
  } catch (refreshErr) {
    callLogout();

    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.open(kakaoAuthUrl, '_self');

    return Promise.reject(refreshErr);
  }
};

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
      let token = getAccessToken();

      if (!token || isTokenExpired(token)) {
        token = await refreshAccessToken();
      }

      if (!token || !userId || !chatRoomId) return;

      const socket = new SockJS(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/chat`
      );

      const stompClient = new Client({
        webSocketFactory: () => socket,

        connectHeaders: {
          Authorization: `Bearer ${token}`,
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
