import axiosInstance from './api';
import type { ChatsResponse, MessagesResponse } from '../types/chatTypes';

export const getChats = async (): Promise<ChatsResponse> => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  const { data } = await axiosInstance.get('/chats/getChats', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};

export const getChatMessages = async (chatId: string): Promise<MessagesResponse> => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  const { data } = await axiosInstance.get(`/chats/messages/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};

export const sendMessage = async (chatId: string, message: string): Promise<void> => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  await axiosInstance.post(`/chats/createMessage/${chatId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
