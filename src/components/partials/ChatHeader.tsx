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
      //   <SimpleProfile
      //     className="member"
      //     name={member.username}
      //     style={{
      //       right: `${index * 30}px`,
      //     }}
      //     key={member._id}
      //   />
        <></>
      ))}
{/*       
      //   onClick={() => console.log('add member')}
      //   className="member"
      //   style={{
      //     right: `${lastMember * 30}px`,
      //   }}
      // > */}
        <FontAwesomeIcon className="text-primary" icon={faPlus} />
    </section>
  );
};
