import React from 'react';
import { useCountMember } from 'hooks';
import { IRecipient } from 'interfaces';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChatHeader = ({ recipients }: { recipients: IRecipient[] }) => {
  const lastMember = useCountMember(recipients);

  return (
    <section className="chat-members">
      {recipients.map((member, index) => (
        <div
          className="member"
          style={{
            right: `${index * 30}px`,
          }}
          key={member._id}
        >
          {member.username[0].toUpperCase()}
        </div>
      ))}
      <button
        className="member text-primary"
        style={{
          right: `${lastMember * 30}px`,
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </section>
  );
};
