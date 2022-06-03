import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import EmptyLayout from './layouts/EmptyLayout';
import ChatLayout from './layouts/ChatLayout';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import Auth from './pages/Auth';
import Chat from './pages/Chat';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'}>
          <Route index element={
            <EmptyLayout>
              <Auth />
            </EmptyLayout>
          } />
          <Route path={'chat'} element={<ProtectedRoute />}>
            <Route index element={
              <ChatLayout>
                <Chat />
              </ChatLayout>
            } />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
