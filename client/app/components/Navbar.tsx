'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src="/logo.png" alt='logo' width={144} height={30} />
        </Link>

        <div className='flex items-center gap-5'>
          {status === 'loading' ? null : session ? (
            <>
            <span>{session.user?.email}</span>
            <button 
                onClick={() => signOut()} 
                className="text-red-600 text-sm ml-2 px-2 py-1 cursor-pointer rounded hover:bg-red-50"
              >
                Çıkış Yap
              </button>
            </>
            
          ) : (
            <Link href="/login" className="text-blue-600">Giriş Yap</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
