"use client";

import React, {useState, useEffect} from 'react'
import { useUserStore } from '@/store/userStore';

const Test = () => {
    const { userAccounts, selectedAccount, setAccount } = useUserStore();
    useEffect(() => {
        const tempUser = {
          id: "23423FDHFJKDS",
          nickname: "Test stest",
          imageUrl: "test.image.cz"
        }
    
        setAccount(tempUser);
      }, [setAccount]);
    
      console.log(selectedAccount);
  return (
    <div>{selectedAccount?.nickname}</div>
  )
}

export default Test