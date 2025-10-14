import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import FooterPage from './pages/FooterPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import MyNavbar from './components/Navbar/MyNavbar.jsx'; 

function App() {
  return (
    <Router>
      <MyNavbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <FooterPage />
    </Router>
  );
}

export default App;
