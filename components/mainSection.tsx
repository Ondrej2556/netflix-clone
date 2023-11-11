import React from "react";
import Divider from "./divider";
import Image from "next/image";

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
        className={`flex items-center justify-center w-9/12 mx-auto sm:px-16 my-16 lg:text-left text-center
                                    ${
                                      i % 2 === 0
                                        ? "lg:flex-row"
                                        : "lg:flex-row-reverse"
                                    } 
                                    
                                    flex-col text-left`}
      >
        <div className="w-8/12">
          <h1 className="xl:text-5xl md:text-3xl text-xl font-bold mb-4">{title}</h1>
          <h3 className="xl:text-2xl md:text-xl text-sm lg:mb-0 mb-16">{subTitle}</h3>
        </div>
        <Image src={imageUrl} width={400} height={300} alt={title} />
      </div>
    </>
  );
};

export default MainSection;
