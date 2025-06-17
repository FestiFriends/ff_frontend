'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
// import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
// import { AxiosResponse } from 'axios';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/lib/apiFetcher';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { TokenRefreshResponse } from '@/types/auth';
import { ChatMessage } from '@/types/chat';
// import { CHAT_QUERY_KEY } from '@/constants/queryKeys';
// import { chatServiceApi } from '@/services/chatService';
// import { ApiResponse, CursorRequest } from '@/types/api';
// import { GetChatMessageListResponse } from '@/types/chat';

/**
 * 리프레시 토큰으로 액세스 토큰 재발급하는 함수
 * @returns Promise<newAccessToken:string | null>
 */
const refreshAccessToken = async (): Promise<string> => {
  try {
    const res = await axios.post<TokenRefreshResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = res.data.data?.accessToken;

    if (!newAccessToken) {
      throw new Error('토큰이 존재하지 않습니다.');
    }

    callTokenUpdater(newAccessToken);
    return newAccessToken;
  } catch (err) {
    callLogout();

    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.open(kakaoAuthUrl, '_self');

    return Promise.reject(err);
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

        debug: (debugMessage: string) => {
          console.log(`debug: ${debugMessage}`);
        },

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
          const newToken = await refreshAccessToken();
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
