export interface Chat {
  chat_id: string;
  chats: {
    id: string;
    status: string;
    task_id: string;
    tasks: {
      id: string;
      title: string;
      description: string;
    };
  };
}

export interface ChatsResponse {
  chats: Chat[];
}

export interface Message {
  id: string;
  chat_id: string;
  message: string;
  sender_id: string;
  created_at: string;
  profiles?: {
    name: string;
    url: string;
  };
}

export interface MessagesResponse {
  messages: Message[];
}
