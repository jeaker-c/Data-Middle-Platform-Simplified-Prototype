import { Experiment } from '../types';
import { useState } from 'react';

interface ExperimentDrawerProps {
  experiment: Experiment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperimentDrawer({ experiment, isOpen, onClose }: ExperimentDrawerProps) {
  const [activeTab, setActiveTab] = useState('基本信息');

  if (!isOpen || !experiment) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-[500px] bg-white shadow-xl border-l border-gray-200 z-10 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-start bg-gradient-to-br from-indigo-50/50 to-white">
        <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <i className="ri-layout-grid-fill text-2xl"></i>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">试验报告详情</h2>
                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">TRIAL ID: #{experiment.id}</span>
            </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>

      {/* Action Bar */}
      <div className="px-6 py-3 border-b border-gray-50 flex justify-end">
          <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:text-indigo-700">
              <i className="ri-cloud-download-line"></i> 下载原始试验数据报表
          </button>
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-gray-200">
        {['基本信息', '参试材料', '试验点'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-8 py-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
        {activeTab === '基本信息' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">名称 (NAME)</label>
                    <div className="text-lg font-bold text-gray-900">{experiment.name}</div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">年份 (YEAR)</label>
                    <div className="text-lg font-bold text-gray-900 border-b-2 border-indigo-100 inline-block pb-0.5">{experiment.year}年</div>
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">试验类型 (TYPE)</label>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span className="text-base font-bold text-gray-900">{experiment.type}</span>
                </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-3xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center text-green-600">
                        <i className="ri-check-line text-xl font-bold"></i>
                    </div>
                    <div>
                        <div className="text-base font-bold text-green-800">数据入库状态</div>
                        <div className="text-xs font-bold text-green-600/60 uppercase tracking-wide">FULL RECORD INGESTED</div>
                    </div>
                </div>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-green-600 border border-green-100 shadow-sm">100%</span>
            </div>
          </div>
        )}

        {activeTab === '参试材料' && (
           <div className="space-y-4 animate-in fade-in duration-300">
               <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-gray-400 uppercase">展示关联样本 (TOP 10)</span>
                   <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-1 rounded">TOTAL: {experiment.materialCount}</span>
               </div>
               
               <div className="space-y-3">
                   {Array.from({ length: 10 }).map((_, idx) => (
                       <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                           <div className="flex items-center gap-4">
                               <span className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-sm font-bold text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                   {idx + 1}
                               </span>
                               <span className="font-bold text-gray-700 group-hover:text-indigo-900">
                                   WM0063{4 + idx}
                               </span>
                           </div>
                           <i className="ri-arrow-right-s-line text-gray-300 group-hover:text-indigo-400"></i>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {activeTab === '试验点' && (
           <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-red-50 text-red-500 text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-2">
                    <i className="ri-map-pin-line"></i>
                    试验涉及 {experiment.sites.length} 个观测点
                </div>

                <div className="space-y-3">
                    {experiment.sites.map((site, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-5 shadow-sm">
                             <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-400 shrink-0">
                                 <i className="ri-global-line text-2xl"></i>
                             </div>
                             <div>
                                 <div className="text-base font-bold text-gray-900 mb-1">{site}</div>
                                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">PRIMARY OBSERVATION SITE</div>
                             </div>
                        </div>
                    ))}
                </div>
           </div>
        )}
      </div>
    </div>
  );
}
