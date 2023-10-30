"use client";

import Input from "@/components/input";
import Navbar from "@/components/navbar/navbar";
import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { signIn } from "next-auth/react";   
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


const Auth =  () => {
  const { data: session } = useSession()
  if(session) {
    redirect("/")
  }
    const [cookies, removeCookie] = useCookies(['tempEmail']);
    const [isLoginVariant, setIsLoginVariant] = useState(true)
    const [email, setEmail] = useState(cookies.tempEmail || "")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [nameError, setNameError] = useState(false)

    const isEmailValid = (email:string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const handleLogin = async () => {
      if(!isEmailValid(email)) {setEmailError(true); return; }
      if(password.length === 0) {setPasswordError(true); return;}
      
      removeCookie("tempEmail", null)
      console.log("User emai: ", email, "User passwrod", password)
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/browse"
        })
      } catch (error) {
        console.log(error)
      }
    }
    const handleRegister = async () => {
      if(!isEmailValid(email)) {setEmailError(true); return; }
      if(password.length === 0) {setPasswordError(true); return;}
      if(name.length === 0) {setNameError(true); return;}
      
      console.log("User emai: ", email, "User name: ", name,  "User passwrod", password)

      try {
        await axios.post("/api/register" , {
          email, name, password
        })
        handleLogin()
      } catch (error) {
        console.log(error)
      }

    }
  return (
    <>
      <main>
        <div className="bg-[url('/images/hero.jpg')] w-full h-screen bg-center bg-cover bg-no-repeat">
          <Navbar type="auth" />
          <div className="bg-black h-full sm:bg-opacity-60 flex items-center justify-center">
            <div className="sm:w-[28rem] w-full flex items-center flex-col gap-4 h-[40rem] p-16 bg-black bg-opacity-70 -mt-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold pb-6">{isLoginVariant ? "Sign In" : "Sign Up"}</h1>
                <Input type="email" label="Email Address" id="email" value={email} onChange={(e:any)=>setEmail(e.target.value)} error={emailError}/>
                {!isLoginVariant && <Input type="name" label="Name" id="name" value={name} onChange={(e:any)=>setName(e.target.value)} error={nameError}/>}
                <Input type="password" label="Password" id="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} error={passwordError}/>
                <button onClick={isLoginVariant ? handleLogin : handleRegister} className="bg-red-700 rounded-md py-3 mt-3">
                    {isLoginVariant ? "Sign In" : "Sign Up"}
                </button>
                <div className="flex justify-between text-sm text-zinc-500">
                  <p>
                    <input type="checkbox" name="remember" id="remember" />{" "}
                    Remember me
                  </p>
                  <p>Need help?</p>
                </div>
                <br />
                <p className="text-zinc-500">
                  {isLoginVariant ? "New to Netflix?" : "Already have an account?"}
                  <span 
                  onClick={()=> setIsLoginVariant(!isLoginVariant)}
                  className="text-white cursor-pointer">{isLoginVariant ? " Sign Up" : " Sign In"}</span>
                </p>
                <p className="text-zinc-500 text-sm">
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot. <span className="text-blue-600">Learn more.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
