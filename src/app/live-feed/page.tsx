"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Activity, ShoppingBag, UserPlus, CreditCard, ChevronRight } from "lucide-react"

export default function LiveFeed() {
  const events = [
    { id: 1, type: 'order', title: 'New Order Received', desc: 'Alice Johnson placed an order for ₹4,200', time: 'Just now', icon: <ShoppingBag className="w-5 h-5 text-purple-500" /> },
    { id: 2, type: 'user', title: 'New Customer Registered', desc: 'Mark Smith joined from Mumbai', time: '2 mins ago', icon: <UserPlus className="w-5 h-5 text-emerald-500" /> },
    { id: 3, type: 'payment', title: 'Payment Success', desc: 'Order ORD-9482 payment cleared (UPI)', time: '5 mins ago', icon: <CreditCard className="w-5 h-5 text-blue-500" /> },
    { id: 4, type: 'system', title: 'Low Stock Alert', desc: 'Hydrating Night Cream is running low (12 left)', time: '12 mins ago', icon: <Activity className="w-5 h-5 text-amber-500" /> },
    { id: 5, type: 'order', title: 'Order Cancelled', desc: 'Order ORD-9480 was cancelled by the user', time: '1 hour ago', icon: <ShoppingBag className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1000px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <div className="flex items-center space-x-3 mb-8">
             <div className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </div>
             <h2 className="text-2xl font-bold tracking-tight">Live Activity Feed</h2>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
            {events.map((event, i) => (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#11121A] bg-gray-50 dark:bg-[#1C1E2B] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform hover:scale-110">
                  {event.icon}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{event.title}</div>
                    <time className="font-medium text-xs text-gray-500">{event.time}</time>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{event.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center pb-8 z-10">
             <button className="px-6 py-2 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm transition inline-flex items-center gap-2 text-gray-500">
               Load More History <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </main>
    </div>
  )
}
