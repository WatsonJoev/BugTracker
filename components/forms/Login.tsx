"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <>
      {errorMessage && <p className="bg-red-500 rounded p-4 my-3 font-mono">{errorMessage}</p>}
      <form className="flex flex-col gap-4">
        <label className="grid text-sm font-normal mb-2">
          Email
          <input
            className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="grid text-sm font-normal mb-2">
          Password
          <input
            className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <p className="text-sm font-normal mb-2">
          New to BugTracker? {" "}
          <Link href="/user/signup" className="font-normal p-0 m-0 w-fit text-sm hover:underline">
            Signup
          </Link>
        </p>
        <div className="w-full d-flex justify-around">
          <Button variant="default"
            className="p-2 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>
      </form>
    </>
  );
}