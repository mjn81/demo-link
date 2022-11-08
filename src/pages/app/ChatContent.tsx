import React, { useEffect, useRef, useState } from 'react';

import { ChatInput } from 'components';
import { useContactDetailQuery } from 'hooks';
import { IContact } from 'interfaces';
import { useSocketStore, useMessageStore, useUserStore } from 'context';
import { useRoomHistoryQuery } from 'hooks';
import MoreSvg from 'assets/icons/more.svg';

export const ChatContent = ({ currentContact }: { currentContact: IContact }) => {
  const { data: details, isLoading: isLoadingDetails } = useContactDetailQuery(
    currentContact.id,
  );
  const socket = useSocketStore(state => state.socket);
  const chat = useMessageStore(state => state.chat);
  const setHistory = useMessageStore(state => state.setHistory);
  const addMessage = useMessageStore(state => state.addMessage);
  const contentRef = useRef<HTMLDivElement>(null);
  const userId = useUserStore(state => state.id);
  const { data: history, isLoading: isLoadingHistory } = useRoomHistoryQuery(
    currentContact.id,
  );
  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (isLoadingHistory) return;
    setHistory(history);
  }, [isLoadingHistory, currentContact.id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

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
        <section className="info">
          <h2>{currentContact.name}</h2>
          {details && !details.isConv && <p>{details.recipients.length} memebers</p>}
        </section>

        <img src={MoreSvg} alt="more" />
      </header>
      <div className="wrapper">
        <section
          className="chat-content"
          onScrollCapture={() => {
            console.log('s');
          }}
        >
          {chat.map(({ message, sender, updatedAt }, index) => {
            const user = details?.recipients.find(r => r._id === sender);
            const isMe = sender === userId;
            return (
              <div
                className={`message ${isMe ? 'me' : 'other'}`}
                key={`${index}_${sender}_${currentContact.id}`}
              >
                <div className="header">
                  <h6 className="sender">{isMe ? '' : user?.username}</h6>
                  <span className="time">
                    {updatedAt &&
                      new Date(updatedAt).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                  </span>
                </div>
                <p className="content">{message}</p>
              </div>
            );
          })}
          <div ref={contentRef}></div>
        </section>
      </div>

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
