"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { User, Bell, Shield, Key, Moon, Sun, Save, Plus, Trash2, Eye, Copy } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/100?img=11");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("userAvatar");
    if (saved) setAvatarUrl(saved);
  }, []);

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
             <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25 flex items-center">
               <Save className="w-4 h-4 mr-2" /> Save Changes
             </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation inside Settings */}
            <div className="w-full lg:w-64 space-y-2">
               <button onClick={() => setActiveTab("profile")} className={`w-full text-left px-4 py-3 rounded-xl border font-medium flex items-center transition ${activeTab === "profile" ? "bg-white dark:bg-[#1C1E2B] border-transparent shadow shadow-purple-500/10 dark:shadow-none dark:border-white/5 text-purple-600 dark:text-white" : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}>
                 <User className="w-4 h-4 mr-3" /> Profile
               </button>
               <button onClick={() => setActiveTab("notifications")} className={`w-full text-left px-4 py-3 rounded-xl border font-medium flex items-center transition ${activeTab === "notifications" ? "bg-white dark:bg-[#1C1E2B] border-transparent shadow shadow-purple-500/10 dark:shadow-none dark:border-white/5 text-purple-600 dark:text-white" : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}>
                 <Bell className="w-4 h-4 mr-3" /> Notifications
               </button>
               <button onClick={() => setActiveTab("security")} className={`w-full text-left px-4 py-3 rounded-xl border font-medium flex items-center transition ${activeTab === "security" ? "bg-white dark:bg-[#1C1E2B] border-transparent shadow shadow-purple-500/10 dark:shadow-none dark:border-white/5 text-purple-600 dark:text-white" : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}>
                 <Shield className="w-4 h-4 mr-3" /> Security
               </button>
               <button onClick={() => setActiveTab("apikeys")} className={`w-full text-left px-4 py-3 rounded-xl border font-medium flex items-center transition ${activeTab === "apikeys" ? "bg-white dark:bg-[#1C1E2B] border-transparent shadow shadow-purple-500/10 dark:shadow-none dark:border-white/5 text-purple-600 dark:text-white" : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}>
                 <Key className="w-4 h-4 mr-3" /> API Keys
               </button>
               <button onClick={() => setActiveTab("appearance")} className={`w-full text-left px-4 py-3 rounded-xl border font-medium flex items-center transition ${activeTab === "appearance" ? "bg-white dark:bg-[#1C1E2B] border-transparent shadow shadow-purple-500/10 dark:shadow-none dark:border-white/5 text-purple-600 dark:text-white" : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}>
                 <Moon className="w-4 h-4 mr-3" /> Appearance
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-8 min-h-[500px]">
               
               {activeTab === "profile" && (
                 <div className="animate-in fade-in duration-300">
                   <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
                   <div className="flex items-center space-x-6 mb-8">
                      <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-gray-50 dark:border-white/10 shadow-sm object-cover" />
                      <div>
                         <input 
                           type="file" 
                           accept="image/png, image/jpeg, image/gif" 
                           className="hidden" 
                           ref={fileInputRef} 
                           onChange={(e) => {
                             const file = e.target.files?.[0];
                             if (file) {
                               const reader = new FileReader();
                               reader.onloadend = () => {
                                  const result = reader.result as string;
                                  setAvatarUrl(result);
                                  localStorage.setItem("userAvatar", result);
                                  window.dispatchEvent(new Event("avatarUpdated"));
                               };
                               reader.readAsDataURL(file);
                             }
                           }}
                         />
                         <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition mb-2">Change Avatar</button>
                         <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">First Name</label>
                       <input type="text" defaultValue="Rajat" className="w-full px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Last Name</label>
                       <input type="text" defaultValue="Nagda" className="w-full px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition" />
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Email Address</label>
                       <input type="email" defaultValue="rajat@cogniview.com" className="w-full px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition" />
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Timezone</label>
                       <select className="w-full px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition">
                         <option>Asia/Kolkata (IST)</option>
                         <option>America/New_York (EST)</option>
                         <option>Europe/London (GMT)</option>
                       </select>
                     </div>
                   </div>

                   <hr className="border-t border-gray-200 dark:border-white/5 my-8" />
                   
                   <h3 className="text-lg font-bold mb-4 text-rose-600 dark:text-rose-500">Danger Zone</h3>
                   <div className="p-4 border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/5 rounded-xl flex justify-between items-center">
                      <div>
                        <h4 className="text-rose-700 dark:text-rose-400 font-medium text-sm">Delete Account</h4>
                        <p className="text-rose-600/70 dark:text-rose-400/70 text-xs mt-1">Permanently remove your personal account and all its data.</p>
                      </div>
                      <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-medium hover:bg-rose-600 transition shadow-sm">Delete Account</button>
                   </div>
                 </div>
               )}

               {activeTab === "notifications" && (
                 <div className="animate-in fade-in duration-300">
                   <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
                   <div className="space-y-6">
                     <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-white/5">
                        <div>
                           <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                           <p className="text-sm text-gray-500 mt-1">Receive daily summaries and critical alerts via email.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                     </div>
                     <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-white/5">
                        <div>
                           <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                           <p className="text-sm text-gray-500 mt-1">Receive real-time alerts in your browser for new orders.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="font-medium text-gray-900 dark:text-white">Weekly Marketing Report</h4>
                           <p className="text-sm text-gray-500 mt-1">A detailed automated PDF report sent every Monday.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                     </div>
                   </div>
                 </div>
               )}

               {activeTab === "security" && (
                 <div className="animate-in fade-in duration-300">
                   <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                   <div className="space-y-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Current Password</label>
                       <input type="password" placeholder="••••••••" className="w-full max-w-md px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">New Password</label>
                       <input type="password" placeholder="New Password" className="w-full max-w-md px-4 py-2 bg-gray-50 dark:bg-[#161722] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition" />
                     </div>
                     <div>
                       <button className="px-4 py-2 border border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-500/10 transition mt-2 truncate">Update Password</button>
                     </div>

                     <hr className="border-t border-gray-200 dark:border-white/5 my-8" />
                     
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                           <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                        </div>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition">Enable 2FA</button>
                     </div>
                   </div>
                 </div>
               )}

               {activeTab === "apikeys" && (
                 <div className="animate-in fade-in duration-300">
                   <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold">API Keys</h3>
                     <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition flex items-center">
                        <Plus className="w-4 h-4 mr-2" /> Generate Key
                     </button>
                   </div>
                   <p className="text-sm text-gray-500 mb-6">Use these keys to authenticate your API requests. Keep them secure.</p>
                   
                   <div className="overflow-x-auto w-full border border-gray-200 dark:border-white/5 rounded-xl">
                      <table className="w-full text-left">
                         <thead className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-200 dark:border-white/5">
                            <tr className="text-xs font-semibold text-gray-500 uppercase">
                               <th className="px-4 py-3">Name</th>
                               <th className="px-4 py-3">Key</th>
                               <th className="px-4 py-3">Created</th>
                               <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
                            <tr className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                               <td className="px-4 py-3 font-medium">Production Secret</td>
                               <td className="px-4 py-3 font-mono text-gray-500">pk_live_••••••••••••e8a9</td>
                               <td className="px-4 py-3 text-gray-500">Oct 12, 2026</td>
                               <td className="px-4 py-3 text-right">
                                  <button className="text-gray-400 hover:text-purple-500 mr-2"><Copy className="w-4 h-4" /></button>
                                  <button className="text-gray-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                               </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                               <td className="px-4 py-3 font-medium">Test Token</td>
                               <td className="px-4 py-3 font-mono text-gray-500">pk_test_••••••••••••b2c1</td>
                               <td className="px-4 py-3 text-gray-500">Oct 01, 2026</td>
                               <td className="px-4 py-3 text-right">
                                  <button className="text-gray-400 hover:text-purple-500 mr-2"><Copy className="w-4 h-4" /></button>
                                  <button className="text-gray-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                 </div>
               )}

               {activeTab === "appearance" && (
                 <div className="animate-in fade-in duration-300">
                   <h3 className="text-xl font-bold mb-6">Appearance</h3>
                   <div className="grid grid-cols-2 gap-6 max-w-lg">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-6 border-2 rounded-2xl flex flex-col items-center justify-center transition ${theme === 'light' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                         <Sun className={`w-10 h-10 mb-3 ${theme === 'light' ? 'text-purple-500' : 'text-gray-400'}`} />
                         <span className={`font-semibold ${theme === 'light' ? 'text-purple-600' : 'text-gray-600'}`}>Light Mode</span>
                      </button>

                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-6 border-2 rounded-2xl flex flex-col items-center justify-center transition ${theme === 'dark' ? 'border-purple-500 bg-[#161722]' : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gray-50 dark:bg-[#1C1E2B]'}`}
                      >
                         <Moon className={`w-10 h-10 mb-3 ${theme === 'dark' ? 'text-purple-500' : 'text-gray-500'}`} />
                         <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>Dark Mode</span>
                      </button>
                   </div>
                 </div>
               )}

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
