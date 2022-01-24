/** @format */

type CaptionTextProps = {
  children: React.ReactElement | React.ReactElement[] | string;
};

const CaptionText = ({ children }: CaptionTextProps) => {
  return (
    <div className="w-full flex items-center justify-start ">
      <span className="uppercase font-bold text-indigo-500">{children}</span>
    </div>
  );
};
export default CaptionText;
