import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Login/LoginForm';
import MainPage from './MainPage';
import kc from 'keycloak-js';

function App() {
  const keycloak = new kc({
    url: 'http://keycloak-server${kc_base_path}',
    realm: 'master',
    clientId: 'main-page'
  });
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  );
}

export default App;