"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { LayoutGrid, Download, Save, GripHorizontal } from "lucide-react"

export default function ReportBuilder() {
  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-8 overflow-y-auto no-scrollbar">
          
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold tracking-tight">Report Builder</h2>
             <div className="flex space-x-3">
               <button className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition flex items-center">
                 <Save className="w-4 h-4 mr-2" /> Save Pattern
               </button>
               <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25 flex items-center">
                 <Download className="w-4 h-4 mr-2" /> Export to PDF
               </button>
             </div>
          </div>

          <div className="flex gap-6 h-[calc(100vh-140px)]">
            {/* Widget Library (Left) */}
            <div className="w-64 flex flex-col bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/5 rounded-2xl p-4 shadow-sm dark:shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Widget Library</h3>
              
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 cursor-move hover:border-purple-500 transition group flex items-center">
                  <GripHorizontal className="w-4 h-4 text-gray-400 mr-2 group-hover:text-purple-500" />
                  <span className="text-sm">Revenue Timeline</span>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 cursor-move hover:border-emerald-500 transition group flex items-center">
                  <GripHorizontal className="w-4 h-4 text-gray-400 mr-2 group-hover:text-emerald-500" />
                  <span className="text-sm">Top Customers List</span>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 cursor-move hover:border-pink-500 transition group flex items-center">
                  <GripHorizontal className="w-4 h-4 text-gray-400 mr-2 group-hover:text-pink-500" />
                  <span className="text-sm">Category KPI Cards</span>
                </div>
              </div>
            </div>

            {/* Canvas (Right) */}
            <div className="flex-1 bg-gray-100 dark:bg-[#161722] border-2 border-dashed border-gray-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-400">
                  <span className="text-xs font-medium uppercase">Live Preview Canvas</span>
                  <div className="flex space-x-2">
                     <span className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500"></span>
                     <span className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500"></span>
                     <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500"></span>
                  </div>
               </div>

               <div className="w-full max-w-2xl px-8 flex flex-col items-center justify-center opacity-60">
                 <LayoutGrid className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                 <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Drag widgets here</h4>
                 <p className="text-center text-sm text-gray-500">Select and drop charts, tables, or metrics from the library to build your custom automated report.</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
