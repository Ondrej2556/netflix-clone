import React from 'react'
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import PlayButton from './playButton';
import Image from 'next/image';

interface HeroProps {
    BGimageUrl: string;
    LOGOimageUrl: string;
    title: string;
    description: string;
    movieId: string;
}

const Hero:React.FC<HeroProps> = ({title, description, BGimageUrl, LOGOimageUrl, movieId}) => {
  return (
    <div 
    style={{backgroundImage: `url(${BGimageUrl})`}}
    className={`w-full lg:h-screen h-full bg-center bg-cover bg-no-repeat`}>
              <div className="bg-black h-full bg-opacity-10 flex justify-left items-start ">
                <div className=" flex justify-center flex-col  gap-4 lg:mx-16 mx-4 mt-32 lg:w-1/3 sm:w-2/3 ">
                  <Image
                  width={300}
                  height={160}
                    className="max-w-none- "
                    src= {LOGOimageUrl}
                    alt="Hero Title"
                  />
                  <h1 className="xl:text-4xl text-xl font-bold">
                    {title}
                  </h1>
                  <p className="xl:text-2xl md:text-md">
                    {description}
                  </p>
                  <div className="flex gap-4 mt-2 2xl:text-2xl  lg:text-md  text-sm pb-20 z-20">
                    <PlayButton type="long" movieId={movieId}  movieName={title}/>
                    <button className="flex items-center gap-2 xl:py-2 py-1 px-8 bg-neutral-600 text-white font-semibold rounded-md transition hover:bg-opacity-60">
                      <FaInfoCircle />
                      Další informace
                    </button>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Hero