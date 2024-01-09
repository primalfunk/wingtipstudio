import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import CodePage from './CodePage';
import MusicPage from './MusicPage';
import ContactPage from './ContactPage';
import HireMePage from './HireMePage';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/code" element={<CodePage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/hireme" element={<HireMePage />} />
              {/* Add other routes as needed */}
          </Routes>
      </Router>
  );
}

export default App;