"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import type { SalesOrder } from "@/lib/types"

export function AssetsPieChart({ data }: { data: SalesOrder[] }) {
  // Aggregate revenue by category
  const aggregated = data.reduce((acc, order) => {
    const cat = order.category || 'Other';
    acc[cat] = (acc[cat] || 0) + order.total_amount_inr;
    return acc;
  }, {} as Record<string, number>);

  const COLORS = ['#8B5CF6', '#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#F43F5E'];
  const totalRevenue = Object.values(aggregated).reduce((a, b) => a + b, 0);

  const chartData = Object.entries(aggregated)
    .sort((a, b) => b[1] - a[1]) // Sort largest first
    .map(([name, value], i) => ({
      name,
      value,
      color: COLORS[i % COLORS.length]
    }));

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 shadow-sm dark:shadow-lg relative flex flex-col transition-colors">
      <div className="flex justify-between items-center z-10">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Sales by Category</h3>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
           <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 w-full relative">
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">₹{(totalRevenue / 1000).toFixed(1)}k</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total</span>
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Tooltip 
               contentStyle={{ backgroundColor: '#11121A', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
               itemStyle={{ color: '#fff' }}
               formatter={(value: any) => `₹${(value || 0).toLocaleString()}`}
            />
            <Pie
              data={chartData}
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              // startAngle={90}
              // endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Custom Legend to replace the floating badges */}
        <div className="h-10 flex items-center justify-center flex-wrap gap-x-4 gap-y-2 mt-4 overflow-hidden">
             {chartData.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center text-[10px] text-gray-300">
                   <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></div>
                   <span className="truncate max-w-[80px]">{item.name}</span>
                </div>
             ))}
             {chartData.length > 3 && (
                <div className="text-[10px] text-gray-500">+{chartData.length - 3} more</div>
             )}
        </div>
      </div>
    </div>
  )
}

