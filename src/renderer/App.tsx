import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { BeatmapsPage, GameNotFound, ErrorPage } from 'renderer/pages';
import './App.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/beatmaps" element={<BeatmapsPage />} />
                <Route path="/" element={<GameNotFound />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
