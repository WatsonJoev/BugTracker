"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from 'zod'

const SignupSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    fullname: z.string(),
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
    const [fullname, setFullname] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        const bodyObject = {
            email: email,
            password: password,
            confirmPassword: cnfpassword,
            fullname: fullname,
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
                        fullname: fullname,
                        role: role,
                    }
                },
            });
            if (error) {
                setErrorMessage(error.message);
            } else {
                router.refresh();
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
            <form className="flex flex-col gap-4">
                <label className="grid text-sm font-normal mb-2">
                    Fullname
                    <input
                        className="shadow font-normal appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="fullname"
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                    />
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
                    <Link href="/user/login" className="font-normal p-0 m-0 w-fit text-sm hover:underline">
                        Login
                    </Link>
                </p>
                <div className="w-full d-flex justify-around">
                    <Button variant="default"
                        className="p-2 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignUp}
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </>
    );
}