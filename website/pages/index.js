import { useSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
export default function App() {
  const [session, loading] = useSession();
  if(!session){
    return (
      <div>
        <button onClick={(e)=>signIn('google')}>Google</button>
        <button onClick={(e)=>signIn('github')}>Github</button>
      </div>
    )
  }
}
