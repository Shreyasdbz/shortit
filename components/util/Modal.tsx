/** @format */

type ModalProps = {
  activeOn: boolean;
  children:
    | React.ReactElement
    | React.ReactElement[]
    | string
    | string[]
    | (React.ReactElement | string)[];
};

const Modal = ({ activeOn, children }: ModalProps) => {
  if (activeOn) {
    return (
      <div className="w-screen h-screen fixed top-0 z-10 flex items-start justify-center px-10 overflow-y-scroll">
        <div className="w-full  max-w-xl mt-10 mb-10 flex flex-col items-center justify-center bg-slate-100 rounded-xl dark:bg-slate-600 dark:text-gray-100  shadow-2xl shadow-slate-900/25 dark:shadow-slate-100/25">
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
