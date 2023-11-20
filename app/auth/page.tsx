"use client";

import Input from "@/components/input";
import Navbar from "@/components/navbar/navbar";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const Auth = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  const [cookies, removeCookie] = useCookies(["tempEmail"]);
  const [isLoginVariant, setIsLoginVariant] = useState(true);
  const [email, setEmail] = useState(cookies.tempEmail || "");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!isEmailValid(email)) {
      setLoading(false);
      setEmailError(true);
      return;
    }
    if (password.length === 0) {
      setLoading(false);
      setPasswordError(true);
      return;
    }

    removeCookie("tempEmail", null);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Špatné přihlašovací údaje.");
        return;
      }

      window.location.href = "/browse";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }
    if (password.length === 0) {
      setPasswordError(true);
      return;
    }
    if (name.length === 0) {
      setNameError(true);
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      handleLogin();
    } catch (error) {
      toast.error("Něco se pokazilo..");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main>
        <div className="bg-[url('/images/hero.jpg')] w-full h-screen bg-center bg-cover bg-no-repeat">
          <Navbar type="auth" />
          <div className="bg-black h-full sm:bg-opacity-60 flex items-center justify-center">
            <div className="xl:w-[28rem] sm:w-96 w-full flex items-center flex-col gap-4  p-16 bg-black bg-opacity-70 xl:-mt-10 mt-24 mb-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold pb-6">
                  {isLoginVariant ? "Sign In" : "Sign Up"}
                </h1>
                <Input
                  type="email"
                  label="Email Address"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  error={emailError}
                />
                {!isLoginVariant && (
                  <Input
                    type="name"
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={nameError}
                  />
                )}
                <Input
                  type="password"
                  label="Password"
                  id="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  error={passwordError}
                />
                <button
                  disabled={loading}
                  onClick={isLoginVariant ? handleLogin : handleRegister}
                  className={` rounded-md py-3 mt-3 ${
                    loading
                      ? "bg-red-900 hover:cursor-wait"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
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
                  {isLoginVariant
                    ? "New to Netflix?"
                    : "Already have an account?"}
                  <span
                    onClick={() => setIsLoginVariant(!isLoginVariant)}
                    className="text-white cursor-pointer"
                  >
                    {isLoginVariant ? "\u00A0Sign Up" : "\u00A0Sign In"}
                  </span>
                </p>
                <p className="text-zinc-500 text-sm">
                  This page is protected by Google reCAPTCHA to ensure youre not
                  a bot. <span className="text-blue-600">Learn more.</span>
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
