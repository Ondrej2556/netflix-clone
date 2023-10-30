"use client";

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import LoggedNavbar from "@/components/navbar/loggedNavbar";

const Browse = () => {
  const { data: session } = useSession()
  
  if(!session || !session.user) {
    redirect("/")
  }
  {console.log(session)}
  return(
      <>
      <header>
        <LoggedNavbar />
      </header>
      <main className="mt-96">
          This is protected route!
          <br />
          {session.user.email}
      </main>
      <footer>
        Footer
      </footer>
      </>
  )
}

export default Browse 