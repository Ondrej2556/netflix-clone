"use client";

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const Browse = () => {
  const { data: session } = useSession()
  
  if(!session || !session.user) {
    redirect("/")
  }
  {console.log(session)}
  return(
      <>
      <header>
        <LoggedNavbar />
        <div className="bg-[url('/images/loggedHero.webp')] w-full h-screen bg-center bg-cover bg-no-repeat">
          <div className="bg-black h-full bg-opacity-10 flex justify-left items-start ">
            <div className=" flex justify-center flex-col  gap-4 lg:mx-16 mx-4 mt-32 sm:w-1/3">
              <img 
                className="max-w-none- "
                src="/images/loggedHeroTitle.webp"
                alt="Hero Title"
              />
              <h1 className="xl:text-4xl text-2xl font-bold">Potvrzeno: další řada je na cestě</h1>
              <p className="xl:text-2xl md:text-xl">Pár desítek let po turnaji, který jim změnil život, na sebe znova narazí soupeři Johny a Daniel. Další pokračování série filmů "Karate Kid".</p>
              <div className="flex gap-4 mt-2 xl:text-2xl text-sm">
                <button className="flex items-center gap-2 py-3 px-8 bg-white text-black  font-semibold rounded-md transition hover:bg-neutral-400"><FaPlay />Přehrát</button>
                <button className="flex items-center gap-2 py-3 px-8 bg-neutral-600 text-white font-semibold rounded-md transition hover:bg-opacity-60"><FaInfoCircle />Další informace</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
          This is protected route!
          <br />
          {session.user.email}
      </main>
      <footer>
        Footer
      </footer>
      </>
  )
}


export default Browse 