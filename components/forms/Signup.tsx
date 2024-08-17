"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { z } from 'zod'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const SignupSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    firstname: z.string(),
    role: z.string(),

}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
        });
    }
});


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfpassword, setCnfpassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async (e: any) => {
        e.preventDefault()
        const bodyObject = {
            email: email,
            password: password,
            confirmPassword: cnfpassword,
            firstname: firstname,
            lastname: lastname,
            role: role,
        }
        try {
            SignupSchema.parse(bodyObject);
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        firstname: firstname,
                        lastname: lastname,
                        role: role,
                    }
                },
            });
            if (error) {
                setErrorMessage(error.message);
            } else {
                router.push("/org");
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrorMessage(err.issues[0].message);
            }
        }
    };

    return (
        <>
            {errorMessage && <p className="bg-red-400 rounded p-4 my-3 font-mono">{errorMessage}</p>}
            <form className="flex flex-col gap-4" onSubmit={(e) => handleSignUp(e)}>
                <div className="block md:flex justify-between">
                    <label className="grid text-sm font-normal">
                        Firstname
                        <input
                            className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="Firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                        />
                    </label>
                    <label className="grid text-sm font-normal mt-0 md:mt-0 sm:mt-5">
                        Lastname
                        <input
                            className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="Lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                        />
                    </label>
                </div>
                <label className="grid text-sm font-normal mb-2">
                    Role or Admin
                    <select className="text-sm shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option className="text-sm" value="org">Org Owner</option>
                        <option className="text-sm" value="pro">Professional</option>
                    </select>
                </label>
                <label className="grid text-sm font-normal mb-2">
                    Role
                    <input
                        className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    />
                </label>
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
                <label className="grid text-sm font-normal mb-2">
                    Confirm Password
                    <input
                        className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="cnfpassword"
                        onChange={(e) => setCnfpassword(e.target.value)}
                        value={cnfpassword}
                    />
                </label>
                <p className="text-sm font-normal mb-2">
                    Already a member? {" "}
                    <Link href="/user/login" className="font-normal p-0 m-0 w-fit text-sm underline">
                        Login
                    </Link>
                </p>
                <div className="w-full flex justify-around">
                    <Button variant="default"
                        className="p-2 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </>
    );
}