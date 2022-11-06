import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useClearToken, useProfileQuery } from 'hooks';
import React, { useState } from 'react';
import { ContextMenu, MenuOption } from '../core';

export const Sidenav = () => {
  const { data: profile, isLoading } = useProfileQuery();
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

  return (
    <div className="sidenav">
      <section></section>
      <section className="sidenav__profile">
        <button className="circle font-xl" onClick={() => setIsOpen(o => !o)}>
          {profile?.user.username[0].toUpperCase()}
        </button>
        <ContextMenu prefix="prf" type="bottom" isOpen={isOpen} options={profileOpts} />
      </section>
    </div>
  );
};
