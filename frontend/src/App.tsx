import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './components/pages/HomePage';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
