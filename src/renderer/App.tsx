import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, GameNotFound, ErrorPage } from 'pages';
import './App.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/a" element={<HomePage />} />
                <Route path="/" element={<GameNotFound />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
