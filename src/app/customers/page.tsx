"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Users, UserPlus, Star, TrendingUp } from "lucide-react"

export default function CustomerAnalytics() {
  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Customer Analytics</h2>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <Users className="w-6 h-6 text-purple-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Customers</p>
              <h3 className="text-2xl font-bold">12,492</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <UserPlus className="w-6 h-6 text-emerald-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">New Users (30d)</p>
              <h3 className="text-2xl font-bold">842</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <TrendingUp className="w-6 h-6 text-pink-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Retention Rate</p>
              <h3 className="text-2xl font-bold">42.5%</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <Star className="w-6 h-6 text-amber-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg CLV</p>
              <h3 className="text-2xl font-bold">₹12,400</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Segmentation Card */}
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm h-80 flex flex-col justify-center items-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
               <div className="relative z-10 text-center">
                 <h3 className="text-lg font-bold mb-2">Customer Segmentation</h3>
                 <div className="flex items-center justify-center space-x-8 mt-6">
                    <div className="text-center">
                       <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center text-xl font-bold text-indigo-500 mb-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">65%</div>
                       <p className="text-sm text-gray-500">Returning</p>
                    </div>
                    <div className="text-center">
                       <div className="w-24 h-24 rounded-full border-4 border-pink-500 flex items-center justify-center text-xl font-bold text-pink-500 mb-2 shadow-[0_0_15px_rgba(236,72,153,0.3)]">35%</div>
                       <p className="text-sm text-gray-500">New Users</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm h-80 overflow-y-auto">
               <h3 className="text-lg font-bold mb-4">Top Customers Leaderboard</h3>
               <div className="space-y-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border border-transparent dark:hover:border-white/10">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">{i}</div>
                         <div>
                            <p className="font-medium text-gray-900 dark:text-white">Enterprise User {i}</p>
                            <p className="text-xs text-gray-500">contact{i}@business.com</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-emerald-500">₹{(40000 / i).toLocaleString()}</p>
                         <p className="text-xs text-gray-500">{10 * i} Orders</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
