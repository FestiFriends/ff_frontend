import apiFetcher from '@/lib/apiFetcher';
import {
  GetChatMessageListRequest,
  GetChatMessageListResponse,
} from '@/types/chat';

export const chatServiceApi = {
  getChatMessageList: async ({
    // chatRoomId,
    cursorId,
    size = 20,
  }: GetChatMessageListRequest) => {
    await apiFetcher.get<GetChatMessageListResponse>(`/api/v1/chat/list`, {
      params: { cursorId, size },
      // params: { chatRoomId, cursorId, size },
    });
  },
};
