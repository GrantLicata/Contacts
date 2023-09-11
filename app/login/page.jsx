"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleIcon from "public/google-logo-240.png";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    // Upon successful login the user is directed to the notebook page.
    signIn("google", { callbackUrl: "/notebook" });
  };

  return (
    <div className="w-screen h-screen px-5 mx-auto flex justify-between items-center bg-slate-100">
      <div className="flex flex-col mx-auto bg-white rounded-lg px-12 py-32 shadow-xl">
        <h1 className="text-4xl font-extrabold text-slate-700 mb-4">
          Contact Manager
        </h1>
        <button
          onClick={handleGoogleLogin}
          id="google-login-button"
          className="bg-sky-50 border border-slate-200 p-[6px] px-6 mb-2 mt-6 rounded-lg flex justify-center items-center gap-2 text-md hover:ring-1 hover:border hover:bg-sky-100 hover:shadow-sm active:bg-blue-200"
        >
          <Image
            src={GoogleIcon}
            alt="Google sign in option"
            width={30}
            height={30}
            className="border-none shadow-none"
          />
          <h2 className="text-slate-700">Sign in with Google</h2>
        </button>
      </div>
    </div>
  );
};

export default Login;
