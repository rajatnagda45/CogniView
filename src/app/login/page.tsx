"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Hexagon, Lock, Mail, Loader2 } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-white bg-gray-50 dark:bg-[#11121A] fixed inset-0 z-[100]">
      {/* Left Design Pane */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#1A1C29] to-[#11121A] items-center justify-center overflow-hidden border-r border-gray-200 dark:border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_left_center,rgba(103,48,227,0.15),transparent_50%)]"></div>
        <div className="relative z-10 text-center max-w-lg px-8">
           <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30 transform rotate-12">
              <Hexagon className="w-10 h-10 text-white fill-white/20" />
           </div>
           <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Welcome back to Cogniview</h1>
           <p className="text-gray-400 text-lg leading-relaxed">Securely access your data, run advanced SaaS analytics, and scale your business operations seamlessly.</p>
        </div>
      </div>

      {/* Right Login Pane */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
         <div className="w-full max-w-sm mx-auto">
            <div className="flex items-center space-x-3 mb-10 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                <Hexagon className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-bold tracking-tight">Cogniview</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight mb-2">Sign In</h2>
            <p className="text-gray-500 mb-8 font-medium">Enter your email and password to access your dashboard.</p>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6">
                 {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@cogniview.com" 
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition shadow-sm"
                    />
                  </div>
               </div>
               
               <div className="space-y-2 pb-2">
                  <div className="flex justify-between items-center text-sm">
                     <label className="font-medium text-gray-700 dark:text-gray-300">Password</label>
                     <Link href="#" className="font-medium text-purple-600 hover:text-purple-500 transition">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition shadow-sm"
                    />
                  </div>
               </div>

               <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25 disabled:opacity-50"
               >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
               </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-gray-500">
               Don't have an account? <Link href="/signup" className="text-purple-600 hover:text-purple-500 transition">Create Organization</Link>
            </div>
         </div>
      </div>
    </div>
  )
}
