import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProviderWrapper } from './graphql/client';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Freelancer from './pages/Freelancer';
import Employer from './pages/Employer';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <ApolloProviderWrapper>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ApolloProviderWrapper>
  );
};

export default App;

