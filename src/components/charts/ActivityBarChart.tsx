"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { SalesOrder } from "@/lib/types"

export function ActivityBarChart({ data }: { data: SalesOrder[] }) {
  // Aggregate data by date
  const aggregated = data.reduce((acc, order) => {
    const d = order.order_date;
    if (!acc[d]) acc[d] = { name: new Date(d).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }), revenue: 0, units: 0, rawDate: d };
    acc[d].revenue += order.total_amount_inr;
    acc[d].units += order.quantity;
    return acc;
  }, {} as Record<string, any>);

  // Sort by date and take last 7 days for the bar chart
  const chartData = Object.values(aggregated)
    .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime())
    .slice(-7);

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 flex flex-col shadow-sm dark:shadow-lg transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Activity (Last 7 Days)</h3>
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mr-1.5 shadow-[0_0_8px_#8B5CF6]" />
            <span className="text-gray-600 dark:text-gray-400">Revenue (₹)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] mr-1.5 shadow-[0_0_8px_#F59E0B]" />
            <span className="text-gray-600 dark:text-gray-400">Units Sold x1K</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={8} barGap={4}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity={1} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity={1} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              tickFormatter={(v) => `₹${v / 1000}k`}
              dx={-10}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={false}
              hide
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
              contentStyle={{ backgroundColor: '#11121A', borderColor: '#333', color: '#fff' }} 
            />
            <Bar yAxisId="left" dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 4, 4]} />
            <Bar yAxisId="right" dataKey="units" fill="url(#colorUnits)" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
