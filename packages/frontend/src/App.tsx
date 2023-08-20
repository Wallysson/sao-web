import { LoginPage } from './pages/LoginPage/LoginPage';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <LoginPage />
      <ToastContainer transition={Flip} />
    </>
  );
}
