"use client"

import { UserCircle, ShoppingCart, CreditCard, Repeat } from "lucide-react"
import type { SalesOrder } from "@/lib/types"

export function PerformanceKPICards({ data }: { data: SalesOrder[] }) {
  if (!data || data.length === 0) return <div className="px-8 mt-4 text-gray-500">No data for selected period.</div>;

  const totalOrders = data.length;
  const uniqueCustomers = new Set(data.map(d => d.email)).size;
  const avgOrdersPerCustomer = uniqueCustomers > 0 ? totalOrders / uniqueCustomers : 0;
  
  const repeatOrders = data.filter(d => d.is_repeat_customer).length;
  // If is_repeat_customer means the order was a repeat, then number of repeated customers = repeatOrders ? Actually one customer can place multiple repeat orders.
  // The unique repeating customers would be those whose email appears where is_repeat_customer === true
  const uniqueRepeatCustomers = new Set(data.filter(d => d.is_repeat_customer).map(d => d.email)).size;

  const totalRevenue = data.reduce((sum, order) => sum + order.total_amount_inr, 0);

  const cards = [
    {
      title: "Avg Orders / Customer",
      value: avgOrdersPerCustomer.toFixed(2),
      sub: "Orders",
      icon: <UserCircle className="w-5 h-5 text-purple-400" />
    },
    {
      title: "Repeated Customers",
      value: uniqueRepeatCustomers.toLocaleString(),
      sub: "Unique users",
      icon: <Repeat className="w-5 h-5 text-pink-400" />
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      sub: "INR",
      icon: <CreditCard className="w-5 h-5 text-orange-400" />
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      sub: "Orders",
      icon: <ShoppingCart className="w-5 h-5 text-emerald-400" />
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-8">
      {cards.map((item, i) => (
        <div key={i} className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-lg flex flex-col justify-between transition-colors cursor-default">
          <div className="flex justify-between items-start mb-4">
             <p className="text-gray-500 dark:text-gray-400 font-medium">{item.title}</p>
             <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
               {item.icon}
             </div>
          </div>
          <div className="flex items-baseline space-x-2 mt-auto">
             <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{item.value}</span>
             {item.sub && <span className="text-sm font-medium text-gray-500">{item.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
