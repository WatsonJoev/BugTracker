'use client';

import React, { useEffect, useState } from 'react'

// Dependencies
import Image from 'next/image';
import Link from 'next/link'
import classnames from 'classnames'
import { PiUserBold } from 'react-icons/pi'
import { ModeToggle } from "@/components/context/theme-toogle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// CSS
import "./nav.css"

// Icons
import { TiTags } from "react-icons/ti";
import { FaBoxOpen } from "react-icons/fa";

const navigation = [
    { name: 'Dashboard', href: '/tracker', current: true },
    { name: 'Issues', href: '/tracker/issues', current: false },
]

const NavBar = () => {
    const currentPath = usePathname();
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [userLogged, setUserLogged] = useState(false)

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getUser();
            setUserLogged(data?.user ? true : false)
        }
        getSession()
    }, [userLogged, currentPath, supabase.auth])

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUserLogged(false)
        if (typeof window !== "undefined") {
            router.push("/user/login");
        }
    };

    return (
        <div>
            <div className="p-0 flex justify-between md:px-10 md:py-3 mb-3 border-b">
                <Link href="/" className="icon flex self-center border p-1 rounded items-center">
                    <strong className='hidden font-mono md:flex self-center ml-1 sm:'>
                        StartupBox
                    </strong>
                    <FaBoxOpen className='ml-1' style={{fontSize: "20px"}} />
                </Link>
                {
                    currentPath === "/tracker" && userLogged && <div className="notificationIcon self-center hidden md:block">
                        <div className="flex">
                            {navigation.map((link, index) =>
                                <Link href={link.href} key={index} className={classnames({
                                    'transition-colors flex mx-3 justify-center self-center hover:font-semibold rounded w-28': true,
                                    'text-primary border-b-4 border-indigo-500 pt-1 font-semibold': link.href === currentPath || currentPath.includes("/tracker/issues") && link.name === "Issues",
                                })}>
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    </div>
                }
                <div className='flex self-center'>
                    <div className="self-center mr-3">
                        <ModeToggle />
                    </div>
                    {/* <div className="mx-3 self-center">
                        {userLogged &&
                            <Button variant="outline" size="icon">
                                <Link href="/tags/">
                                    <TiTags className="text-lg" />
                                </Link>
                            </Button>
                        }
                    </div> */}
                    <div className="dropdown dropdown-bottom dropdown-end self-center hidden md:block">
                        {
                            userLogged && <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <label tabIndex={0}>
                                            <Button variant="outline" size="icon">
                                                <PiUserBold className="text-lg" />
                                            </Button>
                                        </label>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <Link href="/user">
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={handleSignOut}>
                                            Logout
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                        }
                    </div>
                </div>
                <div className="self-center block md:hidden">
                    <details className="dropdown">
                        <summary className="m-0 p-1.5 h-fit" />
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 right-0 rounded-box w-52">
                            {navigation.map((link, index) =>
                                <Link href={link.href} key={index} className={classnames({
                                    'transition-colors flex my-3 justify-center self-center hover:text-zinc-800 rounded w-28': true,
                                    'text-zinc-800 border-b-4 border-indigo-500 pt-1': link.href === currentPath || currentPath === "/tracker/issues/new" && link.name === "Issues",
                                    'text-zinc-500': link.href != currentPath
                                })}>
                                    {link.name}
                                </Link>
                            )}
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default NavBar