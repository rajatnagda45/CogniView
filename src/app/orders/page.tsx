"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { Search, Filter, MoreVertical, Eye, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { SalesOrder } from "@/lib/types"

export default function OrderManagement() {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: "",
    product_name: "",
    total_amount_inr: "",
    city: "Mumbai",
    order_status: "Pending",
    payment_method: "UPI"
  });

  async function fetchOrders() {
    const { data } = await supabase.from('sales_orders').select('*').order('order_date', { ascending: false }).limit(50);
    if(data) setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
    const newOrder: Partial<SalesOrder> = {
      order_id: newOrderId,
      order_date: new Date().toISOString(),
      customer_name: formData.customer_name || "Guest Customer",
      email: `${(formData.customer_name || "guest").split(' ')[0].toLowerCase()}@example.com`,
      phone: "9876543210",
      product_sku: `SKU-${Math.floor(Math.random() * 9999)}`,
      product_name: formData.product_name || "Custom Item",
      category: "General",
      unit_price_inr: Number(formData.total_amount_inr) || 0,
      quantity: 1,
      total_amount_inr: Number(formData.total_amount_inr) || 0,
      city: formData.city,
      state: "Maharashtra",
      pin_code: "400001",
      payment_method: formData.payment_method,
      order_status: formData.order_status,
      is_repeat_customer: false,
    };

    // Insert into Supabase
    const { error } = await supabase.from('sales_orders').insert([newOrder]);
    if (error) {
      console.error(error);
      alert("Failed to insert order.");
    } else {
      setIsModalOpen(false);
      setFormData({ customer_name: "", product_name: "", total_amount_inr: "", city: "Mumbai", order_status: "Pending", payment_method: "UPI" });
      fetchOrders(); // Refresh table
    }
  }

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1400px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25 flex items-center"
             >
                <Plus className="w-4 h-4 mr-2" /> Add New Order
             </button>
          </div>

          <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-md overflow-hidden flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-white/5">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-64" />
              </div>
              <button className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </button>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
               {loading ? (
                  <div className="flex items-center justify-center p-12 text-gray-400">Loading orders from Supabase...</div>
               ) : (
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 dark:bg-white/[0.02] text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                           <th className="px-6 py-4">Order ID</th>
                           <th className="px-6 py-4">Customer</th>
                           <th className="px-6 py-4">Product / Item</th>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4">Total Amount</th>
                           <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
                        {orders.map(order => (
                           <tr key={order.order_id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                           <td className="px-6 py-4 font-medium text-purple-600 dark:text-purple-400 truncate max-w-[120px]" title={order.order_id}>{order.order_id}</td>
                           <td className="px-6 py-4">{order.customer_name}</td>
                           <td className="px-6 py-4 text-gray-500 truncate max-w-[180px]">{order.product_name} (<span className="text-gray-400">{order.quantity}x</span>)</td>
                           <td className="px-6 py-4 text-gray-500">{new Date(order.order_date).toLocaleDateString()}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                                 order.order_status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/30' : 
                                 order.order_status === 'Cancelled' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-500/30' : 
                                 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 border-amber-500/30'
                              }`}>
                                 {order.order_status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{order.total_amount_inr.toLocaleString()}</td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-gray-400 hover:text-purple-500 transition mr-3"><Eye className="w-4 h-4" /></button>
                              <button className="text-gray-400 hover:text-white transition"><MoreVertical className="w-4 h-4 inline" /></button>
                           </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col scale-100 animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-gray-200 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-[#161722]">
                 <h3 className="text-lg font-bold">Add New Order</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"><X className="w-5 h-5"/></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
                    <input required value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} type="text" placeholder="John Doe" className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                    <input required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} type="text" placeholder="Premium Subscription" className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount (₹)</label>
                       <input required value={formData.total_amount_inr} onChange={e => setFormData({...formData, total_amount_inr: e.target.value})} type="number" placeholder="4200" className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Delivery City</label>
                       <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" placeholder="Mumbai" className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Order Status</label>
                       <select value={formData.order_status} onChange={e => setFormData({...formData, order_status: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                       <select value={formData.payment_method} onChange={e => setFormData({...formData, payment_method: e.target.value})} className="w-full px-4 py-2 bg-white dark:bg-[#11121A] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                          <option value="UPI">UPI</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="Net Banking">Net Banking</option>
                       </select>
                    </div>
                 </div>
                 
                 <div className="pt-6 flex justify-end space-x-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/25">Submit Order</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  )
}
