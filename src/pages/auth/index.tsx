import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { useAuthStore } from 'context';

const AuthRouter = () => {
  const token = useAuthStore(state => state.token);
  if (token) return <Navigate to="/app/chat" />;
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AuthRouter;
