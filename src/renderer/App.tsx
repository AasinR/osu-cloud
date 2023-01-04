import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
    BeatmapsPage,
    GameNotFound,
    ErrorPage,
    CloudSelect,
} from 'renderer/pages';
import './App.css';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/a" element={<GameNotFound />} />
                <Route path="/" element={<CloudSelect />} />
                <Route path="/beatmaps" element={<BeatmapsPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
