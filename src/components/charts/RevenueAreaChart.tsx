"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import type { SalesOrder } from "@/lib/types"

export function RevenueAreaChart({ data }: { data: SalesOrder[] }) {
  // Aggregate revenue by date
  const aggregated = data.reduce((acc, order) => {
    const d = order.order_date;
    if (!acc[d]) acc[d] = { name: new Date(d).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), value: 0, rawDate: d };
    acc[d].value += order.total_amount_inr;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(aggregated)
    .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 flex flex-col shadow-sm dark:shadow-lg relative overflow-hidden group transition-colors">
      <div className="flex justify-between items-center mb-2 z-10 w-full">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Revenue Trend</h3>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
           <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 w-full -ml-[15px] z-0">
        <ResponsiveContainer width="105%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10} 
            />
            
            {/* Custom Tooltip to mimic the pink "12,234" pill */}
            <Tooltip 
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                      ₹{payload[0].value?.toLocaleString()}
                    </div>
                  )
                }
                return null
              }}
            />
            
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#EC4899" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenueArea)" 
              activeDot={{ r: 6, fill: "#1C1E2B", stroke: "#EC4899", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Decorative dashed line on bottom matching UI */}
      <div className="absolute bottom-[40px] left-0 w-full border-t border-dashed border-white/10" />
    </div>
  )
}
