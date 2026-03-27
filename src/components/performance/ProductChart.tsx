"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import type { SalesOrder } from "@/lib/types"

export function ProductChart({ data }: { data: SalesOrder[] }) {
  // Aggregate sales by product_name
  const aggregated = data.reduce((acc, order) => {
    // some product_names might be long, we'll truncate them in the UI
    const prod = order.product_name || 'Unknown';
    acc[prod] = (acc[prod] || 0) + order.total_amount_inr;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(aggregated)
    .sort((a, b) => b[1] - a[1]) // highest first
    .slice(0, 5) // top 5
    .map(([product, revenue]) => ({ product, revenue }));

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 flex flex-col shadow-sm dark:shadow-lg transition-colors col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Top Products by Revenue</h3>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid horizontal={true} vertical={false} stroke="rgba(150,150,150,0.1)" />
            <XAxis type="number" hide />
            <YAxis 
               type="category" 
               dataKey="product" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#6B7280', fontSize: 11 }} 
               width={120}
               tickFormatter={(v) => v.length > 20 ? v.substring(0, 20) + '...' : v}
            />
            <Tooltip 
               cursor={{ fill: 'rgba(150,150,150,0.05)' }} 
               contentStyle={{ backgroundColor: '#11121A', borderColor: '#333', color: '#fff', borderRadius: '8px' }} 
               formatter={(val: any) => `₹${(val || 0).toLocaleString()}`} 
            />
            <Bar dataKey="revenue" fill="#F43F5E" radius={[0, 4, 4, 0]} barSize={16}>
               {/* adding a gradient to the bar */}
               {chartData.map((entry, index) => (
                 <Cell key={`cell-${index}`} style={{ fill: 'url(#colorProduct)' }} />
               ))}
            </Bar>
            <defs>
              <linearGradient id="colorProduct" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FB7185" stopOpacity={1} />
                <stop offset="100%" stopColor="#E11D48" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
