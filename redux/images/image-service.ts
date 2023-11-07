import { instance } from '@/axios/api-interupt';

export class ImageService {
  private IMG_URL = '/image';
  async getImage(img_id: string) {
    // Current API no  return any thing
    // It jut a messsage
    const response = await instance<any>({
      method: 'GET',
      url: `${this.IMG_URL}/${img_id}`,
      responseType: 'blob',
    });
    /*  if (response.status === 200) {
      const arrayBuffer = new Uint8Array(response.data).buffer;
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      console.log('IMG URL', imageUrl);
    } */

    return response;
  }
  async generateImage(chat_id: string, data: any) {
    const response = await instance<any, any>({
      method: 'PUT',
      url: `/public${this.IMG_URL}/${chat_id}`,
      data,
    });
    return response.data;
  }
}
export default new ImageService();
