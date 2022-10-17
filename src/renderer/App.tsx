import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { TokenContext } from 'utils/contexts';
import { HomePage, ErrorPage } from 'pages';
import { useFetchToken } from 'hooks';
import './App.css';

export default function App() {
  const { accessToken } = useFetchToken();

  return (
    <TokenContext.Provider value={accessToken}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}
