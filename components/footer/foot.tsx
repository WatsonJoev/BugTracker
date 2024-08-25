import React from 'react'
// import Image from 'next/image'
import Link from 'next/link'
import { FaBoxOpen } from "react-icons/fa";

const FootBar = () => {
    return (
        <div>
            <footer className="bottom-0 w-full mt-10 border-t border-gray-100 pt-0">
                <div className="container justify-center text-center self-center mx-auto px-10 py-5 w-fit">
                    <Link href="/" className="justify-center icon flex self-center border p-1 rounded items-center">
                        {/* <Image
                            src="/box.svg"
                            width={30}
                            height={30}
                            alt="Logo"
                        />
                        <strong className='font-mono flex self-center ml-1'>
                            Tracker
                        </strong> */}
                        <strong className='hidden font-mono md:flex self-center ml-1 sm:'>
                            StartupBox
                        </strong>
                        <FaBoxOpen className='ml-1' style={{fontSize: "20px"}} />
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default FootBar