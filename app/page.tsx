"use client";

import FaqDropdown from "@/components/FaqDropdown";
import MainSection from "@/components/mainSection";
import Navbar from "@/components/navbar/navbar";
import Reminder from "@/components/reminder";
import { mainSection, FAQ } from "@/tempData/mainPage";
import Divider from "@/components/divider";
import Footer from "@/components/footer";
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()

  if(session) {
    redirect("/browse")
  }
  
  return (
    <>
      <header>
        <Navbar type="home"/>
        <div className="bg-[url('/images/hero.jpg')] w-full h-[43rem] bg-center bg-cover bg-no-repeat">
          <div className="bg-black h-full bg-opacity-70 flex items-center justify-center">
            <div className="w-[64rem] flex items-center flex-col gap-4">
              <h1 className="xl:text-5xl sm:text-4xl text-3xl font-bold text-center">
                Unlimited movies, TV shows, and more
              </h1>
              <h3 className="sm:text-2xl text-xl text-center">
                Watch anywhere. Cancel anytime.
              </h3>
              <Reminder />
            </div>
          </div>
        </div>
      </header>
      <main>
        {mainSection?.map((section, i) => (
          <MainSection
            key={section.id}
            i={i}
            title={section.title}
            subTitle={section.subTitle}
            imageUrl={section.imageUrl}
          />
        ))}
        <Divider />
        <div className="w-9/12 flex flex-col justify-center items-center mx-auto py-16 sm:px-16">
          <h1 className="sm:text-5xl text-3xl text-center font-bold pb-6">
            Frequently Asked Questions
          </h1>
          {FAQ?.map((item) => (
            <FaqDropdown key={item.id} question={item.Q} answer={item.A} />
          ))}
          <br />
        </div>
          <Reminder />
        <Divider />
      </main>
      <Footer />
    </>
  );
}
