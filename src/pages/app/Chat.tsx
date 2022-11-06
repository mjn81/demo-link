import React, { useEffect } from 'react';
import { Sidebar, Sidenav } from 'components';
import { useSetToken } from 'hooks';
import { ChatContent } from './ChatContent';
import { useAuthStore, useContactStore, useSocketStore } from 'context';
import { useSocketSetup } from 'hooks/useSocket';
import { createSocket } from 'utils/socket';

const Chat = () => {
	useSetToken();
	const contact = useContactStore((state) => state.contact);
	const setSocket = useSocketStore(state => state.setSocket);
	const token = useAuthStore((state) => state.token);
	useEffect(() => {
		const socket = createSocket(token);
		socket.connect();
		setSocket(socket);
		return () => {
			socket.disconnect();
			console.log('disconnnected');
		};
	}, [token]);
	return (
		<div className="chat">
			<Sidenav />
			<Sidebar />
			{contact && <ChatContent currentContact={contact} />}
		</div>
	);
};

export default Chat;
