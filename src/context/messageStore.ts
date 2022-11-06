import create from 'zustand';

interface IMessage {
  sender: string;
  message: string;
}

interface IConversationState {
  chat: IMessage[];
  addMessage: (message: IMessage) => void;
  setHistory: (messages: IMessage[]) => void;
  clearHistory: () => void;
}

export const useMessageStore = create<IConversationState>((set, get) => ({
  chat: [],
  addMessage: (message: IMessage) => {
    set({
      chat: [...get().chat, message],
    });
  },
  setHistory: (messages: IMessage[]) => {
    set({
      chat: messages,
    });
  },
  clearHistory: () => {
    set({
      chat: [],
    });
  },
}));
