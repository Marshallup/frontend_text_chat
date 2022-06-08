import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import EmptyLayout from './layouts/EmptyLayout';
import ChatLayout from './layouts/ChatLayout';
import { AuthProvider } from './contexts/AuthContext';
import { DbProvider } from './contexts/DbContext';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import { GeneralProvider } from './contexts/GeneralContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  return (
    <DbProvider>
      <GeneralProvider>
        <AuthProvider>
          <ChatProvider>
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
          </ChatProvider>
        </AuthProvider>
      </GeneralProvider>
    </DbProvider>
  );
}

export default App;
