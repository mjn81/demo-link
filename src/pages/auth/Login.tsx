import { useLoginMutation } from 'hooks';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { mutate } = useLoginMutation();

	const handleSubmit = () => {
		const username = usernameRef.current?.value as string;
		const password = passwordRef.current?.value as string;
		mutate({ username, password });
	};

	return (
		<div className="login__container">
			<h2 className="tag-demo">Link (Demo)</h2>
			<section className="login__form">
				<h1 className="login__title">Login</h1>
				<input
					type="text"
					placeholder="Enter your username"
					ref={usernameRef}
				/>
				<input
					type="password"
					placeholder="Enter your password"
					ref={passwordRef}
				/>
				<div className="login__container-button">
					<button onClick={handleSubmit} className="primary">
						Login
					</button>

					<Link to="/auth/register" className="capitalize button font-bold">
						create new Id
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Login;
