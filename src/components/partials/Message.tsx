import React from 'react';
import { stringToTime } from 'utils/date';

interface Props {
  updatedAt: string;
  message: string;
  sender: string;
  me: string;
  users: any;
}

export const Message = ({ updatedAt, sender, me, users, message }: Props) => {
  const isMe = sender === me;
  return (
    <div className={`message ${isMe ? 'me' : 'other'}`}>
      {
        <>
          <div className="header">
            <h6 className="sender">{isMe ? '' : users[sender].username}</h6>
            <span className="time">{updatedAt && stringToTime(updatedAt)}</span>
          </div>
          <p className="content">{message}</p>
        </>
      }
    </div>
  );
};
