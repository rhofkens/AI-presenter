import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './components/pages/HomePage';
import { CreateNewVideo } from './components/pages/CreateNewVideo';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNewVideo />} />
      </Routes>
    </RootLayout>
  );
}

// Add Toaster outside of RootLayout to ensure it's always visible
export function AppWithToaster() {
  return (
    <>
      <App />
      <Toaster />
    </>
  );
}

export default AppWithToaster;
