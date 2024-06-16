import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FootBar = () => {
    return (
        <div>
            <footer className="bottom-0 w-full mt-10 border-t border-gray-100 pt-0">
                <div className="container justify-center text-center self-center mx-auto px-10 py-5 w-fit">
                    <Link href="/" className="justify-center icon flex self-center border p-1 rounded">
                        <Image
                            src="/bug.svg"
                            width={30}
                            height={30}
                            alt="Logo"
                        />
                        <strong className='font-mono flex self-center ml-1'>
                            Tracker
                        </strong>
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default FootBar