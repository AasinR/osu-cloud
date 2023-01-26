import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
    BeatmapsPage,
    GameNotFound,
    ErrorPage,
    CloudSelect,
    InformationPage,
} from 'renderer/pages';
import { Navbar } from './components';
import './App.css';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<GameNotFound />} />
                <Route path="/cloud-select" element={<CloudSelect />} />
                <Route path="/beatmaps" element={<BeatmapsPage />} />
                <Route path="/information" element={<InformationPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
