"use client"

import Link from "next/link"
import { LayoutDashboard, BarChart3, FileText, Radio, Inbox, Settings, LogOut, Hexagon, ShoppingBag, Users, PackageOpen, Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"

export function Sidebar() {
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/100?img=11");

  useEffect(() => {
    const checkAvatar = () => {
      const saved = localStorage.getItem("userAvatar");
      if (saved) setAvatarUrl(saved);
    };

    checkAvatar();
    window.addEventListener("avatarUpdated", checkAvatar);
    return () => window.removeEventListener("avatarUpdated", checkAvatar);
  }, []);

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col bg-white dark:bg-[#11121A] border-r border-gray-200 dark:border-white/5 font-sans sticky top-0 left-0 transition-colors">
      
      {/* Brand Logo */}
      <div className="p-6 flex items-center space-x-3 mt-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
          <Hexagon className="w-5 h-5 text-white fill-white/20" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">Cogniview</span>
      </div>

      <div className="flex-1 px-4 overflow-y-auto no-scrollbar py-2 space-y-8">
        {/* Main Menu */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</p>
          <MenuLink href="/" icon={LayoutDashboard} label="Overview" active={pathname === "/"} />
          <MenuLink href="/performance" icon={BarChart3} label="Performance" active={pathname === "/performance"} />
          <MenuLink href="/report-builder" icon={FileText} label="Report Builder" active={pathname === "/report-builder"} />
          <MenuLink href="/live-feed" icon={Radio} label="Live Feed" active={pathname === "/live-feed"} />
        </div>

        {/* Analytics Menu */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Analytics</p>
          <MenuLink href="/orders" icon={ShoppingBag} label="Orders" active={pathname === "/orders"} />
          <MenuLink href="/customers" icon={Users} label="Customers" active={pathname === "/customers"} />
          <MenuLink href="/products" icon={PackageOpen} label="Products" active={pathname === "/products"} />
        </div>

        {/* General Menu */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">General</p>
          <MenuLink href="/inbox" icon={Inbox} label="Inbox" active={pathname === "/inbox"} />
          <MenuLink href="/ai-insights" icon={Sparkles} label="AI Insights" active={pathname === "/ai-insights"} />
          <MenuLink href="/settings" icon={Settings} label="Settings" active={pathname === "/settings"} />
        </div>
      </div>



      {/* User Footer */}
      <div className="p-4 mb-2 mt-auto">
        <div className="flex items-center space-x-3 px-2">
          <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 object-cover" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Rajat Nagda</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">rajat@cogniview.com</p>
          </div>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

function MenuLink({ href, icon: Icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
  if (active) {
    return (
      <Link href={href} className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#4F2D87] to-[#7B42DA] text-white shadow-md shadow-purple-900/20 group">
        <Icon className="w-5 h-5 opacity-90" />
        <span className="font-medium text-sm">{label}</span>
      </Link>
    )
  }
  return (
    <Link href={href} className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition group">
      <Icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition" />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  )
}
