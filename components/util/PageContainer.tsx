/** @format */

type PageContainerProps = {
  children: React.ReactElement | React.ReactElement[];
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-600">
      <div className="w-full max-w-4xl h-full overflow-y-scroll flex flex-col items-center justify-start bg-slate-200 dark:bg-slate-800 shadow-md">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
