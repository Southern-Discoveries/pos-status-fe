export interface IChatData {
  created_at: string;
  id: string;
  last_message: string;
  title: string;
  updated_at: string;
  user_id: string;
}

export interface IFilterData {
  limit: number;
  page: number;
  order_by: string;
}
