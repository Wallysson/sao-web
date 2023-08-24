import { useState } from 'react';
import { Profile } from '../Profile';
import { MenuItems } from './MenuItems';
import { ArrowLeft } from '@phosphor-icons/react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showTitles, setShowTitles] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowTitles(!isOpen);
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-72' : 'w-20'
      } h-screen duration-300 bg-green-900 relative flex items-center justify-start flex-col py-4`}
    >
      <ArrowLeft
        size={32}
        weight="bold"
        className={`${
          !isOpen && 'rotate-180'
        } w-7 h-7 p-1 flex items-center justify-center bg-slate-50 border-2 border-green-900 cursor-pointer absolute top-10 rounded-full -right-3`}
        onClick={toggleSidebar}
      />
      <Profile showTitles={showTitles} isOpen={isOpen} />
      <MenuItems showTitles={showTitles} />
    </aside>
  );
}
