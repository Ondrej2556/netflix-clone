"use client";

import { useUserStore } from '@/store/userStore';



const TestComponent = () => {
    const { selectedAccount, userAccounts } = useUserStore();

    console.log("SELECTED ACC: ",selectedAccount)
    console.log("ALL ACCS: ", userAccounts)
  return (
    <div>
        {userAccounts?.map((acc, i) => (
            <h1 key={i}>{acc.nickname}</h1>
        ))}
    </div>
  )
}

export default TestComponent