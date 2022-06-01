import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import AuthForm from './components/AuthForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/'}>
          <Route index element={<AuthForm />} />
          <Route path={'chat'} element={<ProtectedRoute />}>
            <Route index element={<div>wwww</div>} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
