import { IFilterData } from './chat-interface';

import { instance } from '@/axios/api-interupt';

export class ChatService {
  private CHAT_URL = '/chat';
  async createNewChat(title: string) {
    const response = await instance<any>({
      method: 'PUT',
      url: `chat/new-chat`,
      data: {
        title: title,
      },
    });

    return response;
  }
  // Get List Chat of This owner
  async getOwnChats(data: IFilterData) {
    const response = await instance<any>({
      method: 'GET',
      url: `${this.CHAT_URL}/my-chat?page=${data.page}&size=${data.limit}&order_by=${data.order_by}`,
    });
    return response;
  }
  async getChatMessage(chat_id: string, data: IFilterData) {
    const response = await instance<any>({
      method: 'GET',
      url: `${this.CHAT_URL}/messages/${chat_id}?page=${data.page}&size=${data.limit}&order_by=${data.order_by}`,
    });
    return response;
  }
  async deleteChat(chat_id: string) {
    const response = await instance<any>({
      method: 'DELETE',
      url: `${this.CHAT_URL}/delete-chat/${chat_id}`,
    });
    return response;
  }
}
export default new ChatService();
