import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import LeftColumn from './components/LeftColumn';
import ProfileConfig from './pages/ProfileConfig';
import Home from './pages/Home';
import Saas1 from './pages/Saas1';
import Twilio from './pages/Twilio';


const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 container-custom py-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <LeftColumn />
        </div>
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/saas1" element={<Layout><Saas1 /></Layout>} />
        <Route path="/twilio" element={<Layout><Twilio /></Layout>} />
        <Route path="/profile/config" element={<Layout><ProfileConfig /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;