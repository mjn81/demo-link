import React from 'react';

import { useContactsQuery } from 'hooks';
import { useContactStore } from 'context';

import SearchSvg from 'assets/icons/search.svg';
import { Input } from 'components/core';

const TEST_STRING =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, velit nam voluptas nisi repellendus deserunt neque possimus earum id dolorum a sint cumque modi ducimus in natus repudiandae iste voluptatibus!';

export const Sidebar = () => {
  const { data: contacts, isLoading } = useContactsQuery();
  const setContact = useContactStore(state => state.setContact);
  const currentContact = useContactStore(state => state.contact);
  return (
    <section className="sidebar">
      <section className="search">
        <Input icon={SearchSvg} placeholder="Search..." />
      </section>
      <section className="sidebar__contacts">
        {isLoading && <p>Loading...</p>}
        {contacts?.rooms.map(contact => (
          <div
            className={`sidebar__contact ${
              currentContact?.id === contact._id ? 'active' : ''
            }`}
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
            <div className="profile">{contact.name[0].toUpperCase()}</div>
            <div className="info">
              <section className="head">
                <h5 className="title">{contact.name}</h5>
                <h5 className="time">12:25PM</h5>
              </section>
              <p className="last-message">{TEST_STRING.slice(0, 38) + '...'}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
