/** @format */

type InfoTabProps = {
  onOpen: () => void;
};

const InfoTab = ({ onOpen }: InfoTabProps) => {
  return (
    <div className="w-full flex items-center justify-center fixed bottom-0 hover:opacity-90">
      <button
        className="info-tab bg-slate-300 dark:bg-slate-600 text-slate-900 rounded-t-lg pb-2"
        onClick={onOpen}
      >
        <span className="px-4 py-2">Info</span>
      </button>
    </div>
  );
};

export default InfoTab;
