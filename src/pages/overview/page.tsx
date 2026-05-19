import { useState } from 'react';
import Navbar from '../home/components/Navbar';
import RealtimeDashboard from '../home/components/RealtimeDashboard';
import StatsOverview from '../home/components/StatsOverview';

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'overview'>('monitor');

  const TabBar = (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100/80 p-1 shadow-inner">
      <button
        type="button"
        onClick={() => setActiveTab('monitor')}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
          activeTab === 'monitor' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        数据监控
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('overview')}
        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
          activeTab === 'overview' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        数据概览
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div className="pt-24">
        {activeTab === 'monitor' ? <RealtimeDashboard tabSlot={TabBar} /> : <StatsOverview tabSlot={TabBar} />}
      </div>
    </div>
  );
}
