import apiFetcher from '@/lib/apiFetcher';
import { GetChatHistoryRequest, GetChatHistoryResponse } from '@/types/chat';

export const chatServiceApi = {
  getChatHistory: async ({
    chatRoomId,
    cursorId,
    size = 20,
  }: GetChatHistoryRequest) =>
    (
      await apiFetcher.get<GetChatHistoryResponse>(`/api/v1/chat/list`, {
        params: { chatRoomId, cursorId, size },
      })
    ).data,
};
