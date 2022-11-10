import React from 'react';

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
    <div className={`message ${isMe ? 'me' : 'other'}`} >
      {(
        <>
          <div className="header">
            <h6 className="sender">{isMe ? '' : users[sender].username}</h6>
            <span className="time">
              {updatedAt &&
                new Date(updatedAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
            </span>
          </div>
          <p className="content">{message}</p>
        </>
      ) }
    </div>
  );
};
