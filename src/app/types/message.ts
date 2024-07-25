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

export interface PostGroupMessage {
  sender_id: number;
  group_id: number;
  content: string;
}

export interface PostPrivateMessage {
  sender_id: number;
  receiver_id: number;
  content: string;
}
