"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { SalesOrder } from "@/lib/types"

import { PerformanceKPICards } from "@/components/performance/PerformanceKPICards"
import { LocationChart } from "@/components/performance/LocationChart"
import { PaymentMethodChart } from "@/components/performance/PaymentMethodChart"
import { ProductChart } from "@/components/performance/ProductChart"

export default function PerformanceDashboard() {
  const [data, setData] = useState<SalesOrder[]>([]);
  const [filteredData, setFilteredData] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"7D" | "30D" | "ALL">("ALL");

  useEffect(() => {
    async function load() {
      const { data: orders, error } = await supabase.from('sales_orders').select('*');
      if (!error && orders) {
        setData(orders);
        setFilteredData(orders);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (filterType === "ALL") {
      setFilteredData(data);
      return;
    }
    
    if (data.length > 0) {
      const maxDate = new Date(Math.max(...data.map(d => new Date(d.order_date).getTime())));
      
      const threshold = new Date(maxDate);
      if (filterType === "7D") threshold.setDate(threshold.getDate() - 7);
      if (filterType === "30D") threshold.setDate(threshold.getDate() - 30);
      
      setFilteredData(data.filter(d => new Date(d.order_date).getTime() > threshold.getTime()));
    }
  }, [filterType, data]);

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px]">
          
          {/* Controls */}
          <div className="px-8 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
             <h2 className="text-2xl font-bold tracking-tight mb-4 sm:mb-0">Performance Overview</h2>
             <div className="flex bg-white dark:bg-[#1C1E2B] rounded-lg p-1 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-lg">
                <button 
                   onClick={() => setFilterType("7D")}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${filterType === "7D" ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                >
                   Last 7 Days
                </button>
                <button 
                   onClick={() => setFilterType("30D")}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${filterType === "30D" ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                >
                   Last 30 Days
                </button>
                <button 
                   onClick={() => setFilterType("ALL")}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${filterType === "ALL" ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                >
                   All Time
                </button>
             </div>
          </div>

          {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-500 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mb-4" />
                Loading Performance Data...
             </div>
          ) : (
             <>
                <PerformanceKPICards data={filteredData} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 h-auto pb-4">
                   <LocationChart data={filteredData} />
                   <PaymentMethodChart data={filteredData} />
                   {/* Product chart spans full width if added separately, or 2 cols inside grid */}
                </div>

                <div className="px-8 w-full mt-4 mb-12">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <ProductChart data={filteredData} />
                      {/* Third column could be left blank or added another chart, for now product chart spans 2 cols as set in its className */}
                   </div>
                </div>
             </>
          )}
        </div>
      </main>
    </div>
  )
}
