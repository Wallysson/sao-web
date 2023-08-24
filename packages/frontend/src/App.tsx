import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from './pages/HomePage/HomePage';
import { ToastContainer, Flip } from 'react-toastify';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { Layout } from './components/Layout';

export function App() {
  const { isAuthenticated } = useSession();

  return (
    <>
      <ToastContainer transition={Flip} />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Add other routes here if necessary */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
