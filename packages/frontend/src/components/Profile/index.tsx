import { useSession } from '../../hooks/useSession';

export function Profile({
  showTitles,
  isOpen,
}: {
  showTitles: boolean;
  isOpen: boolean;
}) {
  const { user } = useSession();

  return (
    <div className="flex flex-col items-center gap-y-2">
      <img
        src="https://avatars.githubusercontent.com/u/50278324?v=4"
        className={`cursor-pointer duration-500 ${
          isOpen && 'rotate-[360deg]'
        } h-10 w-10 rounded-full`}
      />
      <div className="flex flex-col items-center gap-x-4">
        <strong
          className={`text-white origin-left font-medium text-xs duration-200 ${
            !showTitles && 'scale-0'
          }`}
        >
          {user?.sNomeUSU}
        </strong>
        <span
          className={`text-white origin-left font-thin text-xs duration-200 ${
            !showTitles && 'scale-0'
          }`}
        >
          {user?.sNomeGRU}
        </span>
      </div>
    </div>
  );
}
