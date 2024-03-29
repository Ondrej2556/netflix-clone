import React from "react";

interface YourAccountSectionProps {
    title: string;
    buttonTitle?: string;
    buttonAction?: () => void;
    loading?: boolean;
    leftData: string[];
    rightData: string[];
    rightDataAction?: any;
}

const YourAccountSection:React.FC<YourAccountSectionProps> = ({
    title,
    buttonTitle,
    buttonAction,
    leftData,
    rightData,
    rightDataAction,
    loading
}) => {
  return (
    <div className="flex gap-10 pt-2 w-full">
      <div className="flex flex-col flex-2 w-1/3">
        <h3 className="text-xl text-neutral-500 ">{title}</h3>
        {buttonTitle && (
        <button 
        disabled={loading}
        onClick={buttonAction}
        className="bg-neutral-200 py-2 shadow-sm shadow-black/40 mt-2 w-2/3 ">
          {buttonTitle}
        </button>
        )} 
      </div>
      <div className="flex flex-col flex-1 w-full justify-between">
        <div className="flex justify-between flex-1 gap-5">
          <div className="w-2/3">
        {leftData.map((data, i) => (
            <h3 key={i}>{data}</h3>
        ))}
          </div>
          <div className="w-1/3 text-blue-500 font-semibold cursor-not-allowed">
            {rightData.map((data, i) => (
                <h3 key={i} className="hover:underline">{data}</h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAccountSection;
