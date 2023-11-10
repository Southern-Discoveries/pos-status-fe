import { IFilterData } from '../chat/chat-interface';

import { instance } from '@/axios/api-interupt';

export class TrainService {
  private TRAIN_URL = 'training';
  private KNOW_URL = 'knowledge';
  async createBrain(title: string, description: string) {
    const response = await instance<any>({
      method: 'PUT',
      url: `/${this.TRAIN_URL}/brain`,
      data: {
        title,
        description,
      },
    });
    return response;
  }
  async updateBrain(bran_id: string, title: string, description: string) {
    const response = await instance<any>({
      method: 'POST',
      url: `/${this.TRAIN_URL}/brain/${bran_id}`,
      data: {
        title,
        description,
      },
    });
    return response;
  }
  async deleteBrain(bran_id: string) {
    const response = await instance<any>({
      method: 'DELETE',
      url: `/${this.TRAIN_URL}/brain/${bran_id}`,
    });
    return response;
  }
  async getUserBrains(data: IFilterData) {
    const response = await instance<any>({
      method: 'GET',
      url: `/${this.TRAIN_URL}/user-brain?page=${data.page}&size=${data.limit}&order_by=${data.order_by}`,
    });
    return response;
  }
  // Create Training Data to each Brain
  async createKnowledge(bran_id: string, content: string) {
    const response = await instance<any>({
      method: 'PUT',
      url: `/${this.TRAIN_URL}/${this.KNOW_URL}/${bran_id}`,
      data: content,
    });
    return response;
  }
  async deleteKnowledge(known_id: string) {
    const response = await instance<any>({
      method: 'DELETE',
      url: `/${this.TRAIN_URL}/${this.KNOW_URL}/${known_id}`,
    });
    return response;
  }
}
