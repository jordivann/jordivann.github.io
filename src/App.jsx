// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Páginas (pueden estar en src/pages/)
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound'; // 404
import { AboutCartProvider } from './context/AboutCartContext';
import { ThemeProvider } from './context/ThemeContext';
function App() {
  return (
    <ThemeProvider>

      <AboutCartProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AboutCartProvider>
    </ThemeProvider>
  );
}

export default App;
