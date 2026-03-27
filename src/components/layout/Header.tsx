"use client"

import { Search, Settings2, Bell, Sun, Moon, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [today, setToday] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setToday(new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }))
  }, [])

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between py-6 px-8 select-none bg-white dark:bg-[#11121A] transition-colors relative z-20">
      
      {/* Title & Date */}
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-sm">
          👋
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-0.5 transition-colors">Hello, Rajat Nagda</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{today}</p>
        </div>
      </div>

      {/* Actions (Search, Theme, Notifications) */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 transition" />
          </div>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-gray-50 dark:bg-transparent border border-gray-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-200 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:focus:border-purple-500/50 dark:focus:bg-white/5 transition w-64"
          />
        </div>

        {/* Setting / Filter Icon */}
        <button 
           onClick={() => router.push("/settings")}
           className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition"
        >
          <Settings2 className="w-4 h-4" />
        </button>

        {/* Notification Icon */}
        <div className="relative">
           <button 
             onClick={() => setShowNotifications(!showNotifications)}
             className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition"
           >
             <Bell className="w-4 h-4" />
             <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-pink-500 rounded-full border border-white dark:border-[#161722]"></span>
           </button>
           
           {/* Notifications Dropdown */}
           {showNotifications && (
             <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
               <div className="p-4 border-b border-gray-200 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/[0.02]">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-xs text-purple-600 dark:text-purple-400 hover:underline">Mark all read</button>
               </div>
               <div className="max-h-72 overflow-y-auto">
                 <div className="p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition">
                    <p className="text-sm font-medium mb-1">New Order #ORD-72153</p>
                    <p className="text-xs text-gray-500">Kavya Verma just placed an order for ₹1,950.</p>
                 </div>
                 <div className="p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition">
                    <p className="text-sm font-medium mb-1 flex items-center"><Check className="w-3 h-3 text-emerald-500 mr-1" /> Payment Successful</p>
                    <p className="text-xs text-gray-500">₹2,200 payment from Sachin Jain cleared.</p>
                 </div>
                 <div className="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition">
                    <p className="text-sm font-medium mb-1 text-pink-500">Low Stock Alert</p>
                    <p className="text-xs text-gray-500">Vitamin C Serum is running low (4 items left).</p>
                 </div>
               </div>
             </div>
           )}
        </div>
        
        {/* Theme Toggle */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition ml-2"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}
      </div>
    </header>
  )
}
