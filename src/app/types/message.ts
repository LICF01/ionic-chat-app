export interface GroupMessage {
  content: string;
  group_id: number;
  id: number;
  sender: string;
  sent_at: string;
}

export interface PrivateMessage {
  content: string;
  id: number;
  receiver_id: number;
  sender_id: number;
  sent_at: string;
  type: string;
}
