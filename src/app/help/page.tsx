"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { HelpCircle, Search, Mail, MessageSquare, FileText, ChevronRight } from "lucide-react"

export default function HelpSupport() {
  const faqs = [
    { q: "How do I upgrade to a PRO plan?", a: "You can upgrade anytime by navigating to Settings > Billing and selecting the PRO tier." },
    { q: "Can I add multiple team members?", a: "Yes, Team and Enterprise plans allow adding up to 10 and unlimited members respectively." },
    { q: "Where can I find my API keys?", a: "API keys are generated inside Settings > Security under the API tokens tab." },
    { q: "Is my payment data secure?", a: "Absolutely. We use 256-bit encryption and integrate securely with Stripe for all transactions." },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-[#11121A] min-h-screen text-gray-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        <Header />
        
        <div className="flex-1 flex flex-col pt-2 mx-auto w-full max-w-[1000px] px-8 pb-8 overflow-y-auto no-scrollbar">
          <div className="text-center py-12">
             <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <HelpCircle className="w-8 h-8 text-white" />
             </div>
             <h2 className="text-3xl font-bold tracking-tight mb-4">How can we help you?</h2>
             <p className="text-gray-500 mb-8 max-w-lg mx-auto">Search our knowledge base or browse categories below to find exactly what you're looking for.</p>
             
             <div className="relative max-w-xl mx-auto">
               <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
               <input type="text" placeholder="Search for articles, guides..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1C1E2B] border border-gray-200 dark:border-white/10 rounded-2xl text-base shadow-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm hover:-translate-y-1 transition duration-300 cursor-pointer group">
               <FileText className="w-6 h-6 text-purple-500 mb-4" />
               <h3 className="font-bold text-lg mb-2 group-hover:text-purple-500 transition">Documentation</h3>
               <p className="text-gray-500 text-sm mb-4">Read our detailed guides to integrate our APIs and maximize usage.</p>
               <span className="text-sm font-medium text-purple-500 flex items-center">Read Docs <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm hover:-translate-y-1 transition duration-300 cursor-pointer group">
               <MessageSquare className="w-6 h-6 text-emerald-500 mb-4" />
               <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-500 transition">Community</h3>
               <p className="text-gray-500 text-sm mb-4">Join our Discord community to learn, share, and get fast answers.</p>
               <span className="text-sm font-medium text-emerald-500 flex items-center">Join Discord <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
            <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm hover:-translate-y-1 transition duration-300 cursor-pointer group">
               <Mail className="w-6 h-6 text-blue-500 mb-4" />
               <h3 className="font-bold text-lg mb-2 group-hover:text-blue-500 transition">Contact Support</h3>
               <p className="text-gray-500 text-sm mb-4">Unable to find an answer? Our technical support team is here to help.</p>
               <span className="text-sm font-medium text-blue-500 flex items-center">Open Ticket <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1E2B] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-8">
             <h3 className="text-xl font-bold tracking-tight mb-6">Frequently Asked Questions</h3>
             <div className="divide-y divide-gray-100 dark:divide-white/5">
                {faqs.map((faq, i) => (
                  <div key={i} className="py-4">
                     <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">{faq.q}</h4>
                     <p className="text-sm text-gray-500">{faq.a}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
