import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Tools from './pages/Tools';
import Directory from './pages/Directory';
import CelebrantProfile from './pages/CelebrantProfile';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import AdminExport from './pages/AdminExport';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-charcoal-800">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/celebrants/:slug" element={<CelebrantProfile />} />
            <Route path="/celebrant/:slug" element={<CelebrantProfile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-export" element={<AdminExport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
