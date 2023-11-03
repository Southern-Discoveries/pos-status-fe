import { instance } from '../api/api-interupt';

export class ChatService {
  private CHAT_URL = '/chat';
  async getOwnChats() {
    const response = await instance<any>({
      method: 'GET',
      url: `${this.CHAT_URL}/my-chat?page=1&size=10&order_by=-updated_at`,
    });
    if (response.status === 200) {
      console.log(response.data);
    }
  }
}
export default new ChatService();
