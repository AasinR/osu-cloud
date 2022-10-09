import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, ErrorPage } from '../pages';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
