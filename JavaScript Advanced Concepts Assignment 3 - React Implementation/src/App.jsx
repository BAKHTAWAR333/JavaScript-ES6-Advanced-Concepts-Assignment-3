import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Section1Page from './pages/Section1Page';
import Section2Page from './pages/Section2Page';
import Section3Page from './pages/Section3Page';
import Section4Page from './pages/Section4Page';
import FinalProjectPage from './pages/FinalProjectPage';
import LogsPage from './pages/LogsPage';

function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <Link to="/section1" style={styles.link}>Section 1</Link>
          <Link to="/section2" style={styles.link}>Section 2</Link>
          <Link to="/section3" style={styles.link}>Section 3</Link>
          <Link to="/section4" style={styles.link}>Section 4</Link>
          <Link to="/final" style={styles.link}>Final Project</Link>
          <Link to="/logs" style={styles.link}>Execution Logs</Link>
        </nav>
        
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Section1Page />} />
            <Route path="/section1" element={<Section1Page />} />
            <Route path="/section2" element={<Section2Page />} />
            <Route path="/section3" element={<Section3Page />} />
            <Route path="/section4" element={<Section4Page />} />
            <Route path="/final" element={<FinalProjectPage />} />
            <Route path="/logs" element={<LogsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: { fontFamily: 'Arial, sans-serif' },
  nav: { 
    padding: '20px', 
    background: '#333', 
    display: 'flex', 
    gap: '20px',
    justifyContent: 'center'
  },
  link: { 
    color: 'white', 
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    ':hover': { background: '#555' }
  },
  content: { padding: '20px' }
};

export default App;