"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { SalesOrder } from "@/lib/types"

export function LocationChart({ data }: { data: SalesOrder[] }) {
  const aggregated = data.reduce((acc, order) => {
    const city = order.city || 'Unknown';
    acc[city] = (acc[city] || 0) + order.total_amount_inr;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(aggregated)
    .sort((a, b) => b[1] - a[1]) // highest first
    .slice(0, 5) // top 5
    .map(([city, revenue]) => ({ city, revenue }));

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 flex flex-col shadow-sm dark:shadow-lg transition-colors col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Top Cities by Revenue</h3>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid horizontal={true} vertical={false} stroke="rgba(150,150,150,0.1)" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="city" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip cursor={{ fill: 'rgba(150,150,150,0.05)' }} contentStyle={{ backgroundColor: '#11121A', borderColor: '#333', color: '#fff', borderRadius: '8px' }} formatter={(val: any) => `₹${(val || 0).toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
