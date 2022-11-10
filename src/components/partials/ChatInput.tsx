import { useUserStore } from 'context';
import { useMessageStore } from 'context/messageStore';
import React, { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import SendSvg from 'assets/icons/send-2.svg';
import EmojiSvg from 'assets/icons/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import { Portal } from 'react-portal';

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
  // fix input performance overload
  const message = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState<number>(1);
  const sender = useUserStore(state => state.id);
  const addMessage = useMessageStore(state => state.addMessage);
  const handleSendMessage = () => {
    if (!message.current || !message.current.value) return;
    socket.emit('send-message', {
      roomId,
      message: message.current.value,
      sender,
      recipients,
    });
    addMessage({
      sender,
      message: message.current.value,
      updatedAt: new Date().toISOString(),
    });
    message.current.value = '';
    setRows(1);
  };
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  return (
    <section className="chat-input">
      <textarea
        ref={message}
        autoFocus
        disabled={isLoadingHistory}
        rows={rows}
        onKeyDown={e => {
          if (!message.current) {
            return;
          }
          const { value } = message.current;
          if (e.key === 'Backspace') {
            value.endsWith('\n') && setRows(prev => prev - 1);
          }
          if (value.length === 0) {
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
      <section className="send-button emoji">
        <div className={`emoji-picker ${emojiOpen ? 'open' : 'close'}`}>
          <EmojiPicker
            onEmojiClick={e => {
              message.current!.value += e.emoji;
            }}
          />
        </div>

        <img src={EmojiSvg} alt="send" onClick={() => setEmojiOpen(em => !em)} />
      </section>
      <button className="send-button right" onClick={handleSendMessage}>
        <img src={SendSvg} alt="send" />
      </button>
    </section>
  );
};
