/** @format */

type SubHeadingProps = {
  location: "start" | "center";
  children: React.ReactElement | React.ReactElement[] | string;
};

const SubHeading = ({ location, children }: SubHeadingProps) => {
  if (location === "center") {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="text-2xl font-medium py-4 text-slate-600 dark:text-slate-400">
          {children}
        </span>
      </div>
    );
  } else {
    return (
      <div className="w-full flex items-center justify-start">
        <span className="text-2xl font-medium py-4 text-slate-600 dark:text-slate-400">
          {children}
        </span>
      </div>
    );
  }
};

export default SubHeading;
