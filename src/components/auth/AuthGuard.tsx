"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isPublicRoute = pathname === "/login" || pathname === "/signup";

    const fetchSession = async () => {
       const { data: { session } } = await supabase.auth.getSession();
       
       if (!session && !isPublicRoute) {
          router.push("/login");
       } else if (session && isPublicRoute) {
          router.push("/");
       } else {
          setLoading(false);
       }
    }

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       if (!session && !isPublicRoute) {
          router.push("/login");
       } else if (session && isPublicRoute) {
          router.push("/");
       }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
     return (
       <div className="min-h-screen bg-[#11121A] flex items-center justify-center">
         <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
       </div>
     );
  }

  return <>{children}</>
}
