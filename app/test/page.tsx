"use client";

import React, {useState, useEffect} from 'react'
import { useUserStore } from '@/store/userStore';
import TestComponent from '@/components/testComponent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Test = () => {
    const { userAccounts, selectedAccount, setAccount, setUserAccounts } = useUserStore();
    const router = useRouter()
    useEffect(() => {
      const userAccounts = [{
          id: "test1",
          nickname: "test1",
          imageUrl: "test.image.cz"
        },{
          id: "test2",
          nickname: "test2",
          imageUrl: "test.image.cz"
        },{
          id: "test3",
          nickname: "test3",
          imageUrl: "test.image.cz"
        },{
          id: "test4",
          nickname: "test4",
          imageUrl: "test.image.cz"
        },

      ]
    
        setAccount(userAccounts[0]);
        setUserAccounts(userAccounts)
      }, [setAccount]);
    
  return (
    <div>
      test
      <br />
      <Link href="/createAccount">Clik</Link>
    </div>
  )
}

export default Test