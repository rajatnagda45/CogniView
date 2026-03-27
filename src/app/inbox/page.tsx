"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Search, Send, CheckCheck, Phone, Video, MoreVertical } from "lucide-react"

export default function Inbox() {
  const users = [
    { name: "Support Team", message: "Hi! How can we help you today?", time: "10:42 AM", unread: 2, active: true },
    { name: "Alice Johnson", message: "My order hasn't arrived.", time: "Yesterday", unread: 0, active: false },
    { name: "System Alerts", message: "Server usage at 85%.", time: "Monday", unread: 0, active: false },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col px-8 pb-8 mx-auto w-full max-w-[1400px]">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Inbox / Messages</h2>

          <div className="flex-1 bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm flex overflow-hidden min-h-[500px]">
            {/* Left Sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-white/5 flex flex-col">
               <div className="p-4 border-b border-gray-200 dark:border-white/5">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input type="text" placeholder="Search messages..." className="pl-9 pr-4 py-2 w-full bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:border-purple-500 transition" />
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto no-scrollbar">
                  {users.map((user, i) => (
                    <div key={i} className={`p-4 border-b border-gray-100 dark:border-white/[0.02] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition flex items-center justify-between ${user.active ? 'bg-purple-50 dark:bg-white/[0.04]' : ''}`}>
                       <div className="flex items-center space-x-3 truncate">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
                          <div className="truncate">
                             <h4 className={`text-sm font-medium ${user.active ? 'text-purple-600 dark:text-white' : 'text-gray-900 dark:text-gray-200'}`}>{user.name}</h4>
                             <p className="text-xs text-gray-500 truncate mt-0.5">{user.message}</p>
                          </div>
                       </div>
                       <div className="flex flex-col items-end space-y-1 ml-2">
                         <span className="text-[10px] text-gray-400">{user.time}</span>
                         {user.unread > 0 && <span className="w-4 h-4 bg-purple-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">{user.unread}</span>}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-transparent relative">
               <div className="h-16 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 bg-white dark:bg-[#1C1E2B]">
                  <div className="flex items-center space-x-3">
                     <div className="relative">
                       <img src="https://api.dicebear.com/7.x/initials/svg?seed=Support Team" alt="Support" className="w-9 h-9 rounded-full" />
                       <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#1C1E2B] rounded-full"></span>
                     </div>
                     <div>
                       <h3 className="text-sm font-bold text-gray-900 dark:text-white">Support Team</h3>
                       <p className="text-[11px] text-emerald-500">Online</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <Phone className="w-4 h-4 hover:text-purple-500 cursor-pointer transition" />
                    <Video className="w-5 h-5 hover:text-purple-500 cursor-pointer transition" />
                    <MoreVertical className="w-5 h-5 hover:text-white cursor-pointer transition" />
                  </div>
               </div>

               <div className="flex-1 p-6 overflow-y-auto space-y-6">
                 {/* Chat Bubble Left */}
                 <div className="flex items-start max-w-[80%]">
                    <img src="https://api.dicebear.com/7.x/initials/svg?seed=Support Team" alt="avatar" className="w-8 h-8 rounded-full mr-3 border border-gray-200 dark:border-white/10 mt-1" />
                    <div>
                       <div className="bg-white dark:bg-[#252836] p-3.5 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-white/5 shadow-sm text-sm text-gray-700 dark:text-gray-300">
                         Hi Rajat! I noticed you were exploring the new dashboard. Need any help?
                       </div>
                       <span className="text-[10px] text-gray-400 mt-1 ml-1">10:41 AM</span>
                    </div>
                 </div>

                 {/* Chat Bubble Right */}
                 <div className="flex items-start justify-end max-w-[80%] ml-auto">
                    <div>
                       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3.5 rounded-2xl rounded-tr-sm text-sm text-white shadow-md shadow-purple-500/20">
                         Actually yes, how can I export the Performance charts as a PDF?
                       </div>
                       <div className="flex items-center justify-end space-x-1 mt-1 mr-1">
                          <span className="text-[10px] text-gray-400">10:45 AM</span>
                          <CheckCheck className="w-3 h-3 text-emerald-400" />
                       </div>
                    </div>
                 </div>
               </div>

               <div className="p-4 bg-white dark:bg-[#1C1E2B] border-t border-gray-200 dark:border-white/5">
                 <div className="relative flex items-center">
                    <input type="text" placeholder="Type a message..." className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-full text-sm outline-none focus:border-purple-500 transition" />
                    <button className="absolute right-2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition shadow-sm">
                       <Send className="w-4 h-4 ml-0.5" />
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
