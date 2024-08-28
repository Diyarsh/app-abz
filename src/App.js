import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Users from './components/Users';
import RegisterForm from './components/RegisterForm';
import './assets/styles/main.scss';

const App = () => {
  const [refreshUsers, setRefreshUsers] = useState(false);

  const handleUserRegistered = () => {
    setRefreshUsers((prev) => !prev);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <section id="users-section" className="content-section">
          <Users key={refreshUsers} />
        </section>
        <section id="signup-section" className="post-section">
          <RegisterForm onUserRegistered={handleUserRegistered} />
        </section>
      </main>
    </div>
  );
};

export default App;



