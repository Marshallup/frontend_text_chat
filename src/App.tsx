import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import EmptyLayout from './layouts/EmptyLayout';
import ChatLayout from './layouts/ChatLayout';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'}>
          <Route index element={
            <EmptyLayout>
              <AuthPage />
            </EmptyLayout>
          } />
          <Route path={'chat'} element={<ProtectedRoute />}>
            <Route index element={
              <ChatLayout>
                <ChatPage />
              </ChatLayout>
            } />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
