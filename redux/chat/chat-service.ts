import { instance } from '../../utils/helper/api/api-interupt';

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
    console.log('Check Current ChatId', response.data);
    return response;
  }
  // Get List Chat of This owner
  async getOwnChats() {
    const response = await instance<any>({
      method: 'GET',
      url: `${this.CHAT_URL}/my-chat?page=1&size=10&order_by=-updated_at`,
    });
    if (response.status === 200) {
      console.log(response.data);
    }
    return response;
  }
}
export default new ChatService();
