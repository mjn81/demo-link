import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from './Chat';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRouter;
