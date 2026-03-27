"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Sparkles, TrendingUp, Flame, MapPin, AlertTriangle, Users } from "lucide-react"

export default function AIInsights() {
  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-12">
          
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Auto-generated intelligence from your Supabase data lake.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             
             {/* Insight 1: Revenue */}
             <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
                   <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Revenue Growth</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Revenue increased by <span className="text-emerald-600 dark:text-emerald-400 font-bold">12%</span> this week compared to last week.</p>
             </div>

             {/* Insight 2: Trending */}
             <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-4">
                   <Flame className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trending Product</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Vitamin C Serum is trending heavily <span className="text-orange-600 dark:text-orange-500 font-bold">(+25% WoW)</span>.</p>
             </div>

             {/* Insight 3: Location */}
             <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4">
                   <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Top Geography</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium"><span className="text-blue-600 dark:text-blue-400 font-bold">Mumbai</span> generated the highest revenue concentration this month.</p>
             </div>

             {/* Insight 4: Inventory Alert */}
             <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-xl p-6 relative overflow-hidden group border-rose-200 dark:border-rose-500/20 hover:-translate-y-1 transition duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-500/20">
                   <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 flex items-center">Inventory Warning <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 uppercase tracking-wider">Urgent</span></h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">2 critical products (Retinol Cream, SPF 50) are <span className="text-rose-600 dark:text-rose-500 font-bold">low in stock</span>.</p>
             </div>

             {/* Insight 5: Customers */}
             <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition duration-300 lg:col-span-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center mb-4">
                   <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Retention</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">Your loyalty strategies are working! Repeat customers increased by <span className="text-purple-600 dark:text-purple-400 font-bold">8%</span> over the last 30 days. Average Cart Value for returning users is up ₹350.</p>
             </div>
             
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-2xl border border-indigo-500/20 dark:border-indigo-500/10 p-6 flex items-center justify-between">
             <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Insights engine refreshed 5 mins ago. Powered by Supabase Realtime.</span>
             </div>
             <button className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition">Run Deep Analysis</button>
          </div>

        </div>
      </main>
    </div>
  )
}
