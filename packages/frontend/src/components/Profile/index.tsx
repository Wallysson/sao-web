export function Profile({
  showTitles,
  isOpen,
}: {
  showTitles: boolean;
  isOpen: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-x-4">
      <img
        src="https://avatars.githubusercontent.com/u/50278324?v=4"
        className={`cursor-pointer duration-500 ${
          isOpen && 'rotate-[360deg]'
        } h-10 w-10 rounded-full`}
      />
      <h1
        className={`text-white origin-left font-medium text-lg duration-200 ${
          !showTitles && 'scale-0'
        }`}
      >
        Designer
      </h1>
    </div>
  );
}
