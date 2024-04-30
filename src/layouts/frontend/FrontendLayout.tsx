import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../frontend/Footer.tsx';
import publicrouteslist from '../../routes/publicroutelist';


const FrontendLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div>
        <main>
          <Routes>
            {publicrouteslist.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FrontendLayout;
