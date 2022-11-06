import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useContactsQuery } from 'hooks/fetch/useContacts';
import { useContactStore } from 'context';

export const Sidebar = () => {
  const { data: contacts, isLoading } = useContactsQuery();
  const setContact = useContactStore(state => state.setContact);
  return (
    <section className="sidebar">
      <section className="conversation">
        <button className="icon-button">
          <FontAwesomeIcon className="icon" icon={faPlus} />
          New conversation
        </button>
      </section>
      <section className="sidebar__title-container">
        <h2 className="title">Chats</h2>
        <button className="plain inline-block w-fit">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </section>
      <section className="sidebar__search">
        <input type="text" placeholder="Search" className="secondary" />
      </section>
      <section className="sidebar__contacts">
        {isLoading && <p>Loading...</p>}
        {contacts?.rooms.map(contact => (
          <div
            className="sidebar__contact"
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
              <h3 className="name">{contact.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
