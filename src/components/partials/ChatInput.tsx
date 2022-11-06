import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserStore } from 'context';
import { useMessageStore } from 'context/messageStore';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

export const ChatInput = ({
  recipients,
  socket,
  roomId,
  isLoadingHistory,
}: {
  isLoadingHistory: boolean;
  socket: Socket;
  roomId: string;
  recipients: string[];
}) => {
  const [message, setMessage] = useState<string>('');
  const [rows, setRows] = useState<number>(1);
  const sender = useUserStore(state => state.id);
  const addMessage = useMessageStore(state => state.addMessage);
  console.log('recipients', recipients);
  const handleSendMessage = () => {
    socket.emit('send-message', { roomId, message, sender, recipients });
    addMessage({ sender, message });
    setMessage('');
    setRows(1);
  };

  return (
    <section className="chat-input">
      <textarea
        disabled={isLoadingHistory}
        rows={rows}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Backspace') {
            message?.endsWith('\n') && setRows(prev => prev - 1);
          }
          if (message?.length === 0) {
            setRows(1);
          }
          if (e.key === 'Enter' && e.shiftKey) {
            setRows(rows + 1);
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        placeholder="Type a message"
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </section>
  );
};
