"use client";

import Input from "./input";
import { useState} from "react";
import {useRouter} from "next/navigation"
import { useCookies } from 'react-cookie';

const Reminder = () => {
  const [cookies, setCookie] = useCookies(['tempEmail']);
  const [email, setEmail] = useState(cookies.tempEmail || "")
  const [emailError, setEmailError] = useState(false)
  const router = useRouter()


  const handleSubmit = () => {
    if(email.length === 0) {
      setEmailError(true)
      return;
    }
    const expirationTime = new Date().getTime() + 60000;
    setCookie("tempEmail", email, { path: '/', expires: new Date(expirationTime)})
    router.push("/auth")

  }
  return (
    <div className="w-4/5 mx-auto">
    <h3 className="text-xl text-center mb-2">Ready to watch? Enter your email to create or restart your membership.</h3>
    <div className="flex sm:flex-row flex-col sm:gap-2 gap-4 md:w-2/3 w-full max-h-24 justify-center  sm:mt-2 m-12 mx-auto pb-6">
      <Input
        type="email"
        id="email"
        label="Email Address"
        value={email}
        onChange={(e:any) => {setEmail(e.target.value);}}
        error={emailError}
      />
      <button 
      onClick={handleSubmit}
      className="bg-red-700 rounded-md py-3  md:text-2xl text-xl font-semibold hover:bg-red-800 transition w-48 self-center text-center">
        Get Started &gt;
      </button>
    </div>
    </div>
  );
};

export default Reminder;
