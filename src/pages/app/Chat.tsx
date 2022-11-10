import React, { useEffect } from 'react';

import { Sidebar, Sidenav } from 'components';
import { useProfileQuery, useSetToken } from 'hooks';
import { useAuthStore, useContactStore, useSocketStore } from 'context';
import { createSocket } from 'utils/socket';
import { ChatContent } from './ChatContent';

const Chat = () => {
  useSetToken();
  const { data: userProfile } = useProfileQuery();
  const contact = useContactStore(state => state.contact);
  const setSocket = useSocketStore(state => state.setSocket);
  const token = useAuthStore(state => state.token);
  useEffect(() => {
    const socket = createSocket(token);
    socket.connect();
    setSocket(socket);
    return () => {
      socket.disconnect();
      console.log('disconnnected');
    };
  }, [token]);
  return (
    <div className="chat">
      <Sidenav />
      <Sidebar />
      <section className="chat-container">
        {contact && <ChatContent currentContact={contact} />}
      </section>
    </div>
  );
};

export default Chat;
