"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        const setUoProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }

        setUoProviders()
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"} className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='Promptopia Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Desktop */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link className='black_btn' href={"/create-prompt"}>
                            Create Post
                        </Link>
                        <button
                            type='button'
                            onClick={signOut}
                            className='outline_btn'
                        >
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                className='rounded-full'
                                src={session?.user.image}
                                alt='profile'
                                width={37}
                                height={37}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Moblie */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            className='rounded-full'
                            src={session?.user.image}
                            alt='profile'
                            width={37}
                            height={37}
                            onClick={() => setDropDown((prev) => !prev)}
                        />

                        {dropDown && (
                            <div className='dropdown'>
                                <Link
                                    href={"/profile"}
                                    className='dropdown_link'
                                    onClick={() => setDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/create-prompt"}
                                    className='dropdown_link'
                                    onClick={() => setDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setDropDown(false)
                                        signOut()
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
