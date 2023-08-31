import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { SignOut } from '@phosphor-icons/react';

export function Header() {
  const navigate = useNavigate();

  function clearCookie() {
    Cookies.remove('token');
  }

  function clearStorage() {
    localStorage.removeItem('user');
  }

  function handleLogout() {
    clearCookie();
    clearStorage();
    navigate('/login');
  }

  return (
    <header className="bg-green-950 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">SAO</div>
      <div className="cursor-pointer" title="sign-out" onClick={handleLogout}>
        <SignOut size={24} weight="bold" />
      </div>
    </header>
  );
}
