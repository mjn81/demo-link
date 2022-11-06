import React, { useEffect, useState } from 'react';

import { ChatHeader, ChatInput } from 'components';
import { useContactDetailQuery } from 'hooks';
import { IContact } from 'interfaces';
import { useSocketStore, useMessageStore, useUserStore } from 'context';
import { useRoomHistoryQuery } from 'hooks';

export const ChatContent = ({ currentContact }: { currentContact: IContact }) => {
  const { data: details, isLoading: isLoadingDetails } = useContactDetailQuery(
    currentContact.id,
  );
  const socket = useSocketStore(state => state.socket);
  const chat = useMessageStore(state => state.chat);
  const setHistory = useMessageStore(state => state.setHistory);
  const addMessage = useMessageStore(state => state.addMessage);
  const userId = useUserStore(state => state.id);
  const { data: history, isLoading: isLoadingHistory } = useRoomHistoryQuery(
    currentContact.id,
  );
  useEffect(() => {
    if (isLoadingHistory) return;
    setHistory(history);
  }, [isLoadingHistory, currentContact.id]);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', message => {
      addMessage(message);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [socket]);
  return (
    <main className="chat-area">
      <header className="chat-header">
        <h2 className="title">{currentContact.name}</h2>
        {details && !details.isConv && <ChatHeader recipients={details.recipients} />}
      </header>
      <section
        className="chat-content"
        onScrollCapture={() => {
          console.log('s');
        }}
      >
        {chat.map(({ message, sender }, index) => {
          const user = details?.recipients.find(r => r._id === sender);
          const isMe = sender === userId;
          return (
            <div
              className={`message ${isMe ? 'me' : ''}`}
              key={`${index}_${sender}_${currentContact.id}`}
            >
              <h6 className="sender">{isMe ? '' : user?.username}</h6>
              <p className="content">{message}</p>
            </div>
          );
        })}
      </section>

      {socket && (
        <ChatInput
          isLoadingHistory={isLoadingHistory}
          roomId={currentContact.id}
          socket={socket}
          recipients={currentContact.recipients}
        />
      )}
    </main>
  );
};
