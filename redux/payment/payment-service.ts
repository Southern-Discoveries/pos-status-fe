import { instance } from '@/axios/api-interupt';

export class PaymentService {
  private PAYMENT_URL = '/payment';
  async claim_daily_credit() {
    const response = await instance<any>({
      method: 'POST',
      url: `${this.PAYMENT_URL}/claim_daily_credit`,
    });
    return response;
  }
}
export default new PaymentService();
