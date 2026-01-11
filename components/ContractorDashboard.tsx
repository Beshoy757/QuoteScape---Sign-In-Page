
import React, { useState } from 'react';
import { Users, FileText, TrendingUp, Search, MoreHorizontal, Download, Calculator, Clock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateProfessionalQuote } from '../services/geminiService';

const MOCK_LEADS = [
  { id: '1', name: 'Sarah Miller', date: 'Oct 24, 2024', project: 'Zen Garden', budget: '$12k', status: 'New', address: '456 Oak St' },
  { id: '2', name: 'James Wilson', date: 'Oct 22, 2024', project: 'Paver Patio', budget: '$8k', status: 'Followed Up', address: '789 Pine Rd' },
  { id: '3', name: 'Linda Chen', date: 'Oct 20, 2024', project: 'Full Backyard', budget: '$25k', status: 'Quoted', address: '122 Maple Ave' },
];

const STATS = [
  { label: 'Active Leads', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Quotes Sent', value: '48', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Conv. Rate', value: '24%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const CHART_DATA = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 12 },
  { name: 'Fri', leads: 8 },
  { name: 'Sat', leads: 3 },
  { name: 'Sun', leads: 2 },
];

const ContractorDashboard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<typeof MOCK_LEADS[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quote, setQuote] = useState<any>(null);

  const handleGenerateQuote = async (lead: typeof MOCK_LEADS[0]) => {
    setSelectedLead(lead);
    setIsGenerating(true);
    setQuote(null);
    const result = await generateProfessionalQuote(lead);
    setQuote(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contractor Command Center</h1>
          <p className="text-slate-500">Welcome back, Landscape Pro.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">Export Data</button>
          <button className="flex-1 md:flex-none bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">Add New Lead</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-lg">Recent Leads</h3>
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search leads..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Customer</th>
                    <th className="px-6 py-4 text-left font-medium">Project</th>
                    <th className="px-6 py-4 text-left font-medium">Status</th>
                    <th className="px-6 py-4 text-left font-medium">Budget</th>
                    <th className="px-6 py-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_LEADS.map(lead => (
                    <tr key={lead.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{lead.project}</p>
                        <p className="text-xs text-slate-400">{lead.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                          lead.status === 'Quoted' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{lead.budget}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleGenerateQuote(lead)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          Generate Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-6">Leads Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f8fafc'}}
                  />
                  <Bar dataKey="leads" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-emerald-400" /> Instant Quote Generator
            </h3>
            
            {isGenerating ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-400 text-sm animate-pulse">Analyzing project requirements...</p>
              </div>
            ) : quote ? (
              <div className="space-y-6 animate-in zoom-in duration-300">
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase tracking-widest text-slate-400">Total Estimate</span>
                    <span className="text-2xl font-bold text-emerald-400">${quote.total.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    {quote.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-700/50 last:border-0">
                        <span className="text-slate-300">{item.desc}</span>
                        <span className="font-medium">${item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Clock size={16} className="text-emerald-400" />
                  Estimated duration: <span className="text-white font-medium">{quote.duration}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> Send to Client
                  </button>
                  <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">Select a lead to generate a professional AI quote instantly.</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Daily Motivation</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 italic text-emerald-800 text-sm">
              "Great landscaping is 90% vision and 10% hard work. Use the AI to show them the vision, and the work will follow."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
