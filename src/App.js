import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar /> {/* Agregué el Navbar para que también se muestre */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
