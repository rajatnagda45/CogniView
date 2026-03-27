"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Package, AlertTriangle, TrendingUp, Tag } from "lucide-react"

export default function ProductAnalytics() {
  const dummyProducts = [
    { name: "Radiance Vitamin C Serum", category: "Face Care", stock: 142, status: "In Stock", revenue: "₹45,200", trend: "+12%" },
    { name: "Hydrating Night Cream", category: "Face Care", stock: 12, status: "Low Stock", revenue: "₹28,500", trend: "-3%" },
    { name: "Purifying Clay Mask", category: "Masks & Treatments", stock: 0, status: "Out of Stock", revenue: "₹15,000", trend: "0%" },
    { name: "SPF 50 Sunscreen", category: "Sun Care", stock: 320, status: "In Stock", revenue: "₹52,100", trend: "+25%" },
    { name: "Exfoliating Body Scrub", category: "Body Care", stock: 45, status: "In Stock", revenue: "₹18,900", trend: "+8%" },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Product Analytics</h2>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <Package className="w-6 h-6 text-indigo-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Products</p>
              <h3 className="text-2xl font-bold">142</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <Tag className="w-6 h-6 text-pink-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Top Category</p>
              <h3 className="text-2xl font-bold">Face Care</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-amber-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
              <TrendingUp className="w-6 h-6 text-emerald-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Overall Growth</p>
              <h3 className="text-2xl font-bold">+14.2%</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
               <h3 className="text-lg font-bold">Inventory Performance</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-white/[0.02] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
                  {dummyProducts.map((prod, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                      <td className="px-6 py-4 font-medium">{prod.name}</td>
                      <td className="px-6 py-4 text-gray-500">{prod.category}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-medium">{prod.stock} Units</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          prod.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                          prod.status === 'Out of Stock' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : 
                          'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 animate-pulse'
                        }`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{prod.revenue}</td>
                      <td className={`px-6 py-4 text-right font-medium ${prod.trend.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {prod.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
