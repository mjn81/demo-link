import MessageSvg from 'assets/icons/messages-3.svg';
import CallSvg from 'assets/icons/call.svg';
import FolderSvg from 'assets/icons/folder-2.svg';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from 'context';

const SidenavMenu = [
  {
    title: 'Messages',
    icon: MessageSvg,
    link: '/app/chat',
  },
  {
    title: 'Calls',
    icon: CallSvg,
    link: '/app/call',
  },
  {
    title: 'Files',
    icon: FolderSvg,
    link: '/app/files',
  },
];

export const Sidenav = () => {

  const { pathname } = useLocation();
  const username = useUserStore(state => state.username);
  
  return (
    <div className="sidenav">
      <div></div>
      <ul className="menu">
        {SidenavMenu.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>
              <img className={item.link === pathname ? 'active' : ''} src={item.icon} alt={item.title} />
            </Link>
          </li>
        ))}
      </ul>

      <button className="profile">
      {username && <p className='username'>{username[0].toUpperCase()}</p>}
      </button>
    </div>
  );
};
