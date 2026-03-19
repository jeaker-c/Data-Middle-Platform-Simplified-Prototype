import { Experiment } from '../types';
import { useMemo, useState } from 'react';

interface ExperimentDrawerProps {
  experiment: Experiment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperimentDrawer({ experiment, isOpen, onClose }: ExperimentDrawerProps) {
  const [activeTab, setActiveTab] = useState('基本信息');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const exp: any = experiment ?? {};
  const expName: string = typeof exp?.name === 'string' ? exp.name : '';
  const expId: string = typeof exp?.id === 'string' ? exp.id : '';
  const expYear: string = typeof exp?.year === 'string' ? exp.year : String(exp?.year ?? '');
  const expType: string = typeof exp?.type === 'string' ? exp.type : '';
  const expMaterialCountNum = Number(exp?.materialCount);
  const expMaterialCount = Number.isFinite(expMaterialCountNum) ? expMaterialCountNum : 0;
  const expSites: string[] = Array.isArray(exp?.sites) ? exp.sites : [];

  const relatedSamples = useMemo(() => {
    const n = Math.min(120, Math.max(expMaterialCount, 60));
    return Array.from({ length: n }).map((_, idx) => ({
      idx: idx + 1,
      id: `WM${String(634 + idx).padStart(5, '0')}`
    }));
  }, [expMaterialCount]);

  const total = relatedSamples.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = relatedSamples.slice(pageStart, pageStart + pageSize);

  if (!isOpen || !experiment) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-[500px] bg-white shadow-xl border-l border-gray-200 z-10 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 truncate">{expName}</h2>
            <span className="text-sm text-gray-400">#{expId}</span>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <i className="ri-calendar-line"></i>
              {expYear}年
            </span>
            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
            <span className="inline-flex items-center gap-1">
              <i className="ri-flask-line"></i>
              {expType}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6">
        {['基本信息', '参试材料', '试验点'].map((tab) => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'border-teal-600 text-teal-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
        {activeTab === '基本信息' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-xs text-gray-500">试验名称</div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{expName}</div>
                </div>
                <div className="px-4 py-3 border-b border-l border-gray-100">
                  <div className="text-xs text-gray-500">试验年份</div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{expYear}年</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-xs text-gray-500">试验类型</div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{expType}</div>
                </div>
                <div className="px-4 py-3 border-l border-gray-100">
                  <div className="text-xs text-gray-500">试验点数量</div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{expSites.length}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '参试材料' && (
           <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">展示关联样本</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">TOTAL: {expMaterialCount}</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="text-xs border-gray-300 rounded-lg px-2 py-1 focus:ring-teal-500 focus:border-teal-500 bg-white"
                  >
                    <option value={10}>10 / 页</option>
                    <option value={20}>20 / 页</option>
                    <option value={50}>50 / 页</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">序号</th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">材料编号</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {pageRows.map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2.5 whitespace-nowrap text-gray-700 font-medium">{r.idx}</td>
                          <td className="px-4 py-2.5 whitespace-nowrap text-gray-900 font-semibold">{r.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-xs text-gray-500">第 {safePage} / {totalPages} 页，共 {total} 条</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={safePage <= 1}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        safePage <= 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      上一页
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={safePage >= totalPages}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        safePage >= totalPages ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      下一页
                    </button>
                  </div>
                </div>
              </div>
           </div>
        )}

        {activeTab === '试验点' && (
           <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">试验点</span>
                <span className="text-xs font-semibold text-gray-500">TOTAL: {expSites.length}</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">序号</th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">试验点</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {expSites.map((site, idx) => (
                        <tr key={`${site}-${idx}`} className="hover:bg-gray-50">
                          <td className="px-4 py-2.5 whitespace-nowrap text-gray-700 font-medium">{idx + 1}</td>
                          <td className="px-4 py-2.5 whitespace-nowrap text-gray-900 font-semibold">{site}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
