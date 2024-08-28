"use client"

import * as React from "react"
import { PropsWithChildren, createContext, useState, useEffect } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const defaultValue = {
    role: "",
    email: "",
    id: "",
    firstname: "",
    lastname: "",
}

type UserState = {
    role: String,
    email: String,
    id: String,
    firstname: String,
    lastname: String,
}

const UserContext = createContext<UserState>(defaultValue)

export const UserProvider = (props: PropsWithChildren) => {
    const [user, setUser] = useState<UserState>(defaultValue);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createServerComponentClient({ cookies });
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser({
                    role: user.role || "",
                    email: user.email || "",
                    id: user.id || "",
                    firstname: user.user_metadata?.firstname || "",
                    lastname: user.user_metadata?.lastname || "",
                });
            }
        };

        fetchUser();
    }, []);

    return (
      <UserContext.Provider value={{ ...user, ...setUser }}>
        {props.children}
      </UserContext.Provider>
    );
  };