"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleIcon from "public/google-logo-240.png";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { status, update, data: session } = useSession();

  // Status tracking
  useEffect(() => {
    console.log("Session status:", status);
  }, []);

  const handleGoogleLogin = () => {
    // Upon successful login the user is directed to the notebook page.
    signIn("google", { callbackUrl: "/notebook" });
  };

  // const handleEmailLogin = async () => {
  //   try {
  //     const res = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: true,
  //       callbackUrl: "http://localhost:3000/notebook",
  //     });

  //     if (res.error) {
  //       setError("Invalid Credentials");
  //       return;
  //     }
  //   } catch (error) {
  //     console.log("Login error:", error);
  //   }
  // };

  return (
    <div className="w-screen h-screen px-5 mx-auto flex justify-between items-center bg-slate-100">
      <div className="flex flex-col mx-auto bg-white rounded-lg px-12 py-10 shadow-xl">
        <Link href="/" className="flex flex-col items-center justify-center">
          <h1 className="text-xl mb-8 text-center font-medium">
            Welcome to Contact Manager
          </h1>
        </Link>
        <button
          onClick={handleGoogleLogin}
          id="google-login-button"
          className="bg-sky-50 border border-slate-200 p-[6px] px-6 mb-2 rounded-lg flex justify-center items-center gap-2 text-md hover:ring-1 hover:border hover:bg-sky-50 hover:shadow-sm active:bg-blue-200"
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
        {/* <div className="flex justify-center">
          <hr className="my-2 border-1 border-slate-300 rounded-lg w-28" />
          <p className="px-4">or</p>
          <hr className="my-2 border-1 border-slate-300 rounded-lg w-28" />
        </div>
        <div className="flex flex-col gap-1 pb-2 w-80">
          <label className="text-sm" htmlFor="name">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md p-2 h-9 hover:ring-1 hover:shadow-sm"
            type="email"
            id="name"
          />
        </div>

        <div className="flex flex-col gap-1 pb-2 w-auto">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 h-9 hover:ring-1 hover:shadow-sm"
            type="password"
            id="password"
          />
        </div>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <div className="flex justify-end items-center mt-4">
          <Link href="/register">
            <p className="pr-3 text-sm hover:underline underline-offset-4 decoration-slate-500">
              Need an account?
            </p>
          </Link>
          <button
            className="rounded px-3 py-[6px] text-md bg-zinc-200 hover:bg-zinc-300 active:bg-slate-300"
            onClick={handleEmailLogin}
          >
            Login
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
