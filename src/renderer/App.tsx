import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
