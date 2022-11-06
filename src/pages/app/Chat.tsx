import React, { useEffect } from 'react';

import { Sidebar, Sidenav } from 'components';
import { useSetToken } from 'hooks';
import { useAuthStore, useContactStore, useSocketStore } from 'context';
import { createSocket } from 'utils/socket';
import { ChatContent } from './ChatContent';

const Chat = () => {
  useSetToken();
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
      {contact && <ChatContent currentContact={contact} />}
    </div>
  );
};

export default Chat;
