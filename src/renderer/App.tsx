import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
    BeatmapsPage,
    GameNotFound,
    ErrorPage,
    CloudSelect,
    SettingsPage,
    InformationPage,
} from 'renderer/pages';
import { TitleBar } from './components';
import './App.css';

export default function App() {
    return (
        <Router>
            <TitleBar />
            <Routes>
                <Route path="/" element={<GameNotFound />} />
                <Route path="/cloud-select" element={<CloudSelect />} />
                <Route path="/beatmaps" element={<BeatmapsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<InformationPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
