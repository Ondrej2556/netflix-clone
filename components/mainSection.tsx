import React from "react";
import Image from "next/image";
import Divider from "./divider";

interface mainSectionProps {
  title: string;
  subTitle: string;
  imageUrl: string;
  i: number;
}

const MainSection: React.FC<mainSectionProps> = ({
  title,
  subTitle,
  imageUrl,
  i
}) => {
  return (
    <>
      <Divider />
      <div
        className={`flex items-center justify-center w-9/12 mx-auto sm:px-16 my-16 xl:text-left text-center
                                    ${
                                      i % 2 === 0
                                        ? "xl:flex-row"
                                        : "xl:flex-row-reverse"
                                    } 
                                    
                                    flex-col text-left`}
      >
        <div className="w-8/12">
          <h1 className="sm:text-5xl text-xl font-bold mb-4">{title}</h1>
          <h3 className="sm:text-2xl text-sm xl:mb-0 mb-16">{subTitle}</h3>
        </div>
        <Image src={imageUrl} width={600} height={300} alt={title} />
      </div>
    </>
  );
};

export default MainSection;
