import React, { useEffect, useRef, useState } from 'react';

import { ChatInput, Message, Modal } from 'components';
import { useContactDetailQuery, useModal } from 'hooks';
import { IContact } from 'interfaces';
import { useSocketStore, useMessageStore, useUserStore } from 'context';
import { useRoomHistoryQuery } from 'hooks';
import MoreSvg from 'assets/icons/more.svg';
import Users from 'assets/icons/profile-2user.svg';
import EditRoom from 'assets/icons/message-edit.svg';

const GROUP_DETAIL_MODAL = 'GROUP_DETAIL_MODAL';

export const ChatContent = ({ currentContact }: { currentContact: IContact }) => {
  const { data: details, isLoading: isLoadingDetails } = useContactDetailQuery(
    currentContact.id,
  );
  const socket = useSocketStore(state => state.socket);
  const chat = useMessageStore(state => state.chat);
  const setHistory = useMessageStore(state => state.setHistory);
  const addMessage = useMessageStore(state => state.addMessage);
  const contentRef = useRef<HTMLDivElement>(null);
  const { modalId, closeModal, openModal } = useModal();
  const userId = useUserStore(state => state.id);
  const { data: history, isLoading: isLoadingHistory } = useRoomHistoryQuery(
    currentContact.id,
  );
  const [users, setUsers] = useState<any>(null);
  useEffect(() => {
    const usr = details?.recipients.reduce((pre, cur) => {
      return {
        ...pre,
        [cur._id]: cur.username,
      };
    }, {});
    setUsers(usr);
  }, [currentContact.id, isLoadingDetails]);

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

        <img
          src={MoreSvg}
          alt="more"
          className="pointer"
          onClick={() => openModal(GROUP_DETAIL_MODAL)}
        />
      </header>

      <section className="chat-content">
        {chat.map(({ message, sender, updatedAt }, index) => (
          <Message
            me={userId}
            message={message}
            sender={sender}
            updatedAt={updatedAt}
            users={users}
            key={`${index}_${sender}`}
          />
        ))}
        <div ref={contentRef}></div>
      </section>

      {socket && (
        <ChatInput
          isLoadingHistory={isLoadingHistory}
          roomId={currentContact.id}
          socket={socket}
          recipients={currentContact.recipients}
        />
      )}

      <Modal
        header={
          <section>
            <h3>{currentContact.name}</h3>
          </section>
        }
        isOpen={modalId === GROUP_DETAIL_MODAL}
        onClose={() => closeModal(GROUP_DETAIL_MODAL)}
      >
        <section className="group-detail">
          <section className="title">
            <img src={Users} alt="users" />
            <h3>Members</h3>
          </section>
          <section className="users-list">
            {details?.recipients.map((user, index) => (
              <div className="item">
                <div className="profile">{user.username[0].toUpperCase()}</div>
                <p>{user.username}</p>
              </div>
            ))}
          </section>
          <button className="btn primary flex-center">
            <img src={EditRoom} className="icon" alt="edit-room" /> Edit Room
          </button>
        </section>
      </Modal>
    </main>
  );
};
