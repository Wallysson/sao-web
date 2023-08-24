import { MenuItem, menu } from '../../helpers/menu';
import {
  Alien,
  Chat,
  User,
  Calendar,
  FileSearch,
  ChartBar,
  Folder,
  ShareFat,
} from '@phosphor-icons/react';

function mapIconNameToIcon(iconName: string) {
  switch (iconName) {
    case 'Alien':
      return <Alien size={24} />;
    case 'Chat':
      return <Chat size={24} />;
    case 'User':
      return <User size={24} />;
    case 'Calendar':
      return <Calendar size={24} />;
    case 'FileSearch':
      return <FileSearch size={24} />;
    case 'ChartBar':
      return <ChartBar size={24} />;
    case 'Folder':
      return <Folder size={24} />;
    case 'ShareFat':
      return <ShareFat size={24} />;
    default:
      return null;
  }
}

export function MenuItems({ showTitles }: { showTitles: boolean }) {
  return (
    <ul className="pt-4 overflow-y-hidden">
      {menu.map((menu: MenuItem, index: number) => (
        <li
          key={index}
          className={`flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 mt-4 ${
            index === 0 && 'bg-white'
          } hover:bg-green-700 hover:text-white transition-all duration-300 ease-in-out`}
        >
          {mapIconNameToIcon(menu.icon)}
          <span
            className={`${!showTitles && 'hidden'} origin-left duration-200`}
          >
            {menu.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
