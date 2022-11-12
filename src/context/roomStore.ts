import { IContactState, IGetContactListRes, IRoom } from 'interfaces';
import create from 'zustand';
import { IMessage } from './messageStore';

export const useRoomStore = create<IContactState>(set => ({
  contact: null,
  setContact: room => set({ contact: room }),
  clearContact: () => set({ contact: null }),
}));

interface IRoomListItem extends IRoom {
  lastMessage?: IMessage;
}

interface IRoomListState {
  rooms: IRoomListItem[];
  addRooms: (lMessage: IGetContactListRes) => void;
  addRoom: (room: IRoom, message?: IMessage) => void;
  updateLastMessage: (roomId: string, message: IMessage) => void;
  clearRooms: () => void;
}

export const useRoomListStore = create<IRoomListState>((set, get) => ({
  rooms: [],
  addRooms: (messages: IGetContactListRes) => {
    let lMessages: IRoomListItem[] = [];
    const res = messages.response;
    for (let i = 0; i < res.length; i++) {
      const { room, lastMessage } = res[i];
      lMessages.push({
        id: room._id,
        name: room.name,
        isConv: room.isConv,
        recipients: room.recipients,
        lastMessage: lastMessage,
      });
    }
    set({
      rooms: lMessages,
    });
  },
  addRoom: (room: IRoom, message?: IMessage) => {
    set({ rooms: [...get().rooms, { ...room, lastMessage: message }] });
  },
  updateLastMessage: (roomId: string, message: IMessage) => {
    const rooms = get().rooms;
    const index = rooms.findIndex(room => room.id === roomId);
    set({
      rooms: [
        ...rooms.slice(0, index),
        { ...rooms[index], lastMessage: message },
        ...rooms.slice(index + 1),
      ],
    });
  },
  clearRooms: () => {
    set({ rooms: [] });
  },
}));
