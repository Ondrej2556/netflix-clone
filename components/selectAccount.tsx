import Link from 'next/link';
import React from 'react'


interface selectAccountProps {
    setAccount: any;
}
const SelectAccount:React.FC<selectAccountProps> = ({
    setAccount
}) => {
    //fetch user accounts
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-neutral-900 text-neutral-500">
        <h1 className="text-6xl mb-12 text-white">Kdo se právě dívá?</h1>
        <div className="flex gap-4">
        <div 
            onClick={()=> setAccount(true)}
            className="w-48 h-48 flex flex-col items-center hover:text-white cursor-pointer transition">
            <img src="/images/default-blue.png" alt="user1" className='rounded-md hover:border-4 transition'/>
            <h1 className="text-2xl  font-bold mt-1">Ondřej</h1>
        </div>
        <div className="w-48 h-48 border-2 border-pink-500">

        </div>
        <div className="w-48 h-48 border-2 border-pink-500">

        </div>
        <div className="w-48 h-48 border-2 border-pink-500">

        </div>
        <div className="w-48 h-48 border-2 border-pink-500">

        </div>
        </div>
        <Link href="/manageProfiles" className="mt-12 outline outline-1 px-12 py-3 text-2xl hover:text-white hover:outline-white">Spravovat profily</Link>
    </main>
  )
}

export default SelectAccount