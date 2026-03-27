"use client"

import { MoreHorizontal, ChevronDown } from "lucide-react"
import type { SalesOrder } from "@/lib/types"
import { useState } from "react"

export function ActivityTable({ data }: { data: SalesOrder[] }) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Sort by date
  const recentOrders = [...data]
    .sort((a, b) => {
       const timeA = new Date(a.order_date).getTime();
       const timeB = new Date(b.order_date).getTime();
       return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    })
    .slice(0, 10);

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-lg overflow-hidden mt-6 mb-12 transition-colors">
      {/* Table Header / Action */}
      <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-white/[0.04]">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Recent Orders</h3>
        <button onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 px-4 py-2 rounded-xl transition border border-gray-200 dark:border-white/5">
          <span className="flex items-center text-gray-500 mr-2"><span className="w-1 h-1 bg-gray-500 rounded-full inline-block mr-1"></span><span className="w-2 h-1 bg-gray-500 rounded-sm inline-block"></span></span>
          {sortOrder === "newest" ? "Sort: Newest First" : "Sort: Oldest First"}
          <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/[0.04] text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.01]">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentOrders.map((order, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.03] transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.customer_name}&backgroundColor=1C1E2B&textColor=fff`} alt={order.customer_name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10" />
                    <span className="text-gray-900 dark:text-gray-200 font-medium">{order.customer_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{order.category}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(order.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</td>
                <td className="px-6 py-4">
                  {order.order_status === 'Delivered' ? (
                     <span className="px-2.5 py-1 rounded-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10">{order.order_status}</span>
                  ) : order.order_status === 'Cancelled' ? (
                     <span className="px-2.5 py-1 rounded-md border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium bg-rose-50 dark:bg-rose-500/10">{order.order_status}</span>
                  ) : (
                     <span className="px-2.5 py-1 rounded-md border border-amber-500/30 text-amber-600 dark:text-amber-500 text-xs font-medium bg-amber-50 dark:bg-amber-500/10">{order.order_status}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-300 font-medium">
                  ₹{order.total_amount_inr.toLocaleString()}
                </td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders found for the selected period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
