import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">VideoApp</Link>
          <div>
            <Link className="nav-link d-inline text-white" to="/">Home</Link>
            <Link className="nav-link d-inline text-white" to="/videos">Videos</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
