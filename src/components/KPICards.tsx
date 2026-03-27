"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { SalesOrder } from "@/lib/types"

export function KPICards({ data }: { data: SalesOrder[] }) {
  if (!data || data.length === 0) return <div className="px-8 mt-4 text-gray-500">No data for selected period.</div>;

  const totalRevenue = data.reduce((sum, order) => sum + order.total_amount_inr, 0);
  const totalOrders = data.length;
  const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const repeatOrders = data.filter(d => d.is_repeat_customer).length;
  const repeatPercent = totalOrders > 0 ? (repeatOrders / totalOrders) * 100 : 0;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      sub: "INR",
      trend: "up",
      trendAmount: "12%",
      trendText: "more than last period",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      sub: "Orders",
      trend: "up",
      trendAmount: "5%",
      trendText: "more than last period",
    },
    {
      title: "Average Order Value",
      value: `₹${aov.toFixed(2)}`,
      sub: "Per order",
      trend: "up",
      trendAmount: "2%",
      trendText: "more than last period",
    },
    {
      title: "Repeat Customers",
      value: `${repeatPercent.toFixed(1)}%`,
      sub: "Of total orders",
      trend: "down",
      trendAmount: "1.5%",
      trendText: "less than last period",
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-8">
      {cards.map((item, i) => (
        <div key={i} className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/[0.03] shadow-sm dark:shadow-lg dark:shadow-black/20 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-[#1f212e] transition-colors cursor-default group">
          <p className="text-gray-500 dark:text-gray-300 font-medium mb-4">{item.title}</p>
          <div className="flex items-end justify-between mb-4 mt-auto">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{item.value}</span>
              {item.sub && <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{item.sub}</span>}
            </div>
          </div>
          
          <div className={`flex items-center space-x-1.5 text-xs font-semibold ${item.trend === 'up' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
            <div className={`flex items-center justify-center p-0.5 rounded-sm ${item.trend === 'up' ? 'bg-emerald-100 dark:bg-emerald-400/10' : 'bg-rose-100 dark:bg-rose-400/10'}`}>
              {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            </div>
            <span>{item.trendAmount}</span>
            <span className="font-normal text-gray-500 dark:text-gray-400 lowercase">{item.trendText}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
