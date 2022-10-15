import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, ErrorPage } from 'pages';
import { useFetchToken } from 'hooks';
import { useEffect } from 'react';
import './App.css';

export default function App() {
  const { isValid, accessToken } = useFetchToken();

  useEffect(() => {
    (async () => {
      if (isValid) {
        console.log('app runs ------------------');
        // await accessToken();
      }
    })();
  }, [isValid]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
