import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faP, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useContactsQuery } from 'hooks';
import { useContactStore } from 'context';
import { ButtonProfile, SimpleProfile, MenuOption, ContextMenu } from 'components';
import { useClearToken, useProfileQuery } from 'hooks';

export const Sidebar = () => {
  const { data: contacts, isLoading } = useContactsQuery();
  const { data: profile } = useProfileQuery();
  const logout = useClearToken();
  const profileOpts: MenuOption[] = [
    {
      onClick: logout,
      children: (
        <span className="profile-item capitalize">
          logout
          <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
        </span>
      ),
      extraClass: 'logout',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const setContact = useContactStore(state => state.setContact);
  const currentContact = useContactStore(state => state.contact);
  return (
    <section className="sidebar">
      <section className="self">
        <section className='avatar'>
          <ButtonProfile
            onClick={() => setIsOpen(o => !o)}
            name={profile?.user.username}
          />
          <ContextMenu prefix="prf" type="bottom" isOpen={isOpen} options={profileOpts} />
        </section>
        <section className="text">
          <h4 className="time">Good Morning</h4>
          <h1 className="name capitalize">{profile?.user.username}</h1>
        </section>
        <section className='more'>
          <button className='search circle'>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          <button className='search circle'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </button>
        </section>
      </section>
      <section className="sidebar__contacts">
        {isLoading && <p>Loading...</p>}
        {contacts?.rooms.map(contact => (
          <div
            className={`sidebar__contact ${currentContact?.id === contact._id && 'active'}`}
            key={contact._id}
            onClick={() => {
              setContact({
                name: contact.name,
                id: contact._id,
                isConv: contact.isConv,
                recipients: contact.recipients,
              });
            }}
          >
            <div className="sidebar__contact-info">
              <SimpleProfile name={contact.name} />
              <h3 className="name">{contact.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
