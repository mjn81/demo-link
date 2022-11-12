import React from 'react';

import { useContactsQuery } from 'hooks';
import { useRoomStore, useRoomListStore } from 'context/index';

import SearchSvg from 'assets/icons/search.svg';
import { Input } from 'components/core';
import { stringToTime } from 'utils/date';
import { firstLetterToUpperCase, trimToLength } from 'utils/string';
import { LENGTH_TO_MESSAGE } from 'constants';

export const Sidebar = () => {
  const addRooms = useRoomListStore(state => state.addRooms);
  const { isLoading } = useContactsQuery(data => {
    addRooms(data);
  });
  const setContact = useRoomStore(state => state.setContact);
  const currentContact = useRoomStore(state => state.contact);
  const rooms = useRoomListStore(state => state.rooms);

  return (
    <section className="sidebar">
      <section className="search">
        <Input icon={SearchSvg} placeholder="Search..." />
      </section>
      <section className="sidebar__contacts">
        {isLoading && <p>Loading...</p>}
        {rooms.map(room => (
          <div
            className={`sidebar__contact ${
              currentContact?.id === room.id ? 'active' : ''
            }`}
            key={room.id}
            onClick={() => {
              setContact({
                name: room.name,
                id: room.id,
                isConv: room.isConv,
                recipients: room.recipients,
              });
            }}
          >
            <div className="profile">{firstLetterToUpperCase(room.name)}</div>
            <div className="info">
              <section className="head">
                <h5 className="title">{room.name}</h5>
                <h5 className="time">
                  {room.lastMessage && stringToTime(room.lastMessage.updatedAt)}
                </h5>
              </section>
              <p className="last-message">
                {room.lastMessage
                  ? trimToLength(room.lastMessage.message, LENGTH_TO_MESSAGE)
                  : ''}
              </p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
