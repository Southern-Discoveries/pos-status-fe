import { instance } from '@/axios/api-interupt';

export class TrainService {
  private TRAIN_URL = '/training';
  async createBrain(title: string, description: string) {
    const response = await instance<any>({
      method: 'PUT',
      url: `${this.TRAIN_URL}/brain`,
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
      url: `${this.TRAIN_URL}/brain/${bran_id}`,
    });
    return response;
  }
}
