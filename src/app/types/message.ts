export interface GroupMessage {
  content: string;
  group_id: number;
  id: number;
  sender: string;
  sent_at: string;
}

export interface PrivateMessage {
  id?: number;
  content: string;
  group_id: number;
}
