"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Hexagon, Lock, Mail, Loader2, Building2, User } from "lucide-react"

export default function Signup() {
  const [name, setName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // 1. Create Supabase Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError || !authData.user) {
      setError(authError?.message || "Failed to create account")
      setLoading(false)
      return;
    }

    try {
      // 2. Create the Organization (Tenant)
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name: orgName }])
        .select('id')
        .single();

      if (orgError) throw orgError;

      // 3. Create the Database User Mapping dynamically bypassing RLS initially because admin rules
      // Note: Because RLS block inserts heavily if completely locked down, we map assuming initial public signup is allowed or handled securely
      const { error: userError } = await supabase
        .from('users')
        .insert([{
           id: authData.user.id,
           org_id: orgData.id,
           role: 'admin',
           full_name: name,
        }]);

      if (userError) throw userError;

      router.push("/login?signup_success=true")
    } catch (err: any) {
      setError("Registration completed, but failed to map organization. Contact support.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex text-gray-900 dark:text-white bg-gray-50 dark:bg-[#11121A] fixed inset-0 z-[100]">
      {/* Right Design Pane */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#1A1C29] to-[#11121A] items-center justify-center overflow-hidden border-l border-gray-200 dark:border-white/5 order-2">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_right_center,rgba(236,72,153,0.15),transparent_50%)]"></div>
        <div className="relative z-10 text-center max-w-lg px-8">
           <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-pink-500/30 transform -rotate-12">
              <Hexagon className="w-10 h-10 text-white fill-white/20" />
           </div>
           <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Scale Your Business</h1>
           <p className="text-gray-400 text-lg leading-relaxed">Join thousands of organizations using Cogniview's advanced CRM and Analytics infrastructure to drive multi-tenant growth.</p>
        </div>
      </div>

      {/* Left Signup Pane */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 overflow-y-auto no-scrollbar py-12 order-1">
         <div className="w-full max-w-sm mx-auto">
            <div className="flex items-center space-x-3 mb-10 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shrink-0">
                <Hexagon className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-bold tracking-tight">Cogniview</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight mb-2">Create Organization</h2>
            <p className="text-gray-500 mb-8 font-medium">Deploy your dedicated enterprise instance instantly.</p>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6">
                 {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
               
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Organization Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="text" 
                      value={orgName}
                      onChange={e => setOrgName(e.target.value)}
                      placeholder="Acme Corp" 
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition shadow-sm"
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Rajat Nagda" 
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition shadow-sm"
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@acmecorp.com" 
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition shadow-sm"
                    />
                  </div>
               </div>
               
               <div className="space-y-2 pb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
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
                  className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25 disabled:opacity-50 mt-2"
               >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Environment"}
               </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-gray-500">
               Already have an organization? <Link href="/login" className="text-purple-600 hover:text-purple-500 transition">Sign In</Link>
            </div>
         </div>
      </div>
    </div>
  )
}
