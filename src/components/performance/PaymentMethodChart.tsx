"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import type { SalesOrder } from "@/lib/types"

export function PaymentMethodChart({ data }: { data: SalesOrder[] }) {
  const aggregated = data.reduce((acc, order) => {
    const method = order.payment_method || 'Unknown';
    acc[method] = (acc[method] || 0) + 1; // Count of orders
    return acc;
  }, {} as Record<string, number>);

  const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'];
  const totalOrders = Object.values(aggregated).reduce((a, b) => a + b, 0);

  const chartData = Object.entries(aggregated)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], i) => ({
      name,
      value,
      color: COLORS[i % COLORS.length]
    }));

  return (
    <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 h-80 shadow-sm dark:shadow-lg relative flex flex-col transition-colors">
      <div className="flex justify-between items-center z-10">
        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Payment Methods</h3>
      </div>

      <div className="flex-1 w-full relative mt-2">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{totalOrders}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Orders</span>
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Tooltip 
               contentStyle={{ backgroundColor: '#11121A', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
               itemStyle={{ color: '#fff' }}
               formatter={(val: any) => `${(val || 0).toLocaleString()} orders`}
            />
            <Pie
              data={chartData}
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Custom Legend */}
        <div className="h-10 flex items-center justify-center flex-wrap gap-x-4 gap-y-2 mt-4 overflow-hidden">
             {chartData.map((item, i) => (
                <div key={i} className="flex items-center text-[10px] text-gray-600 dark:text-gray-300">
                   <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></div>
                   <span className="truncate max-w-[80px]">{item.name}</span>
                </div>
             ))}
        </div>
      </div>
    </div>
  )
}
