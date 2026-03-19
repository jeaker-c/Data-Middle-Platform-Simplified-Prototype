import { useMemo, useState } from 'react';
import { PhenotypeRecord } from '../types';

interface PhenotypeDrawerProps {
  record: PhenotypeRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhenotypeDrawer({ record, isOpen, onClose }: PhenotypeDrawerProps) {
  const observations = useMemo(() => {
    return Array.from({ length: 60 }).map((_, idx) => ({
      plot: { row: 53 + Math.floor(idx / 12), col: 15 + (idx % 12) },
      materialId: `WM${String(634 + idx).padStart(5, '0')}`,
      value: 290 + ((idx * 7) % 40),
      unit: 'CM'
    }));
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = observations.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = observations.slice(pageStart, pageStart + pageSize);

  if (!isOpen || !record) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-[520px] bg-white shadow-xl border-l border-gray-200 z-10 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-start bg-gradient-to-br from-teal-50/60 to-white">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <i className="ri-layout-grid-fill text-2xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">表型试验详情</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="text-xs text-gray-500">试验名称</div>
              <div className="text-sm font-semibold text-gray-900 mt-1">{record.experimentName}</div>
            </div>
            <div className="px-6 py-4 border-b border-l border-gray-100">
              <div className="text-xs text-gray-500">性状</div>
              <div className="text-sm font-semibold text-gray-900 mt-1">{record.traitName}</div>
            </div>
            <div className="px-6 py-4">
              <div className="text-xs text-gray-500">试验年份</div>
              <div className="text-sm font-semibold text-gray-900 mt-1">{record.year}</div>
            </div>
            <div className="px-6 py-4 border-l border-gray-100">
              <div className="text-xs text-gray-500">观测地点</div>
              <div className="text-sm font-semibold text-gray-900 mt-1">{record.siteName}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="text-teal-600">
                <i className="ri-pulse-line text-xl"></i>
              </div>
              <div className="text-lg font-bold text-gray-900">数据点详情</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-gray-500">TOTAL: {total}</div>
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

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">排号</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">小区号</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">材料名称</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">性状值</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pageRows.map((o) => (
                  <tr key={`${o.materialId}-${o.plot.row}-${o.plot.col}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{o.plot.row}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{o.plot.col}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-semibold">{o.materialId}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-gray-900 font-semibold">
                      {o.value} <span className="text-gray-400 font-bold text-xs">{o.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
            <div className="text-xs text-gray-500">
              第 {safePage} / {totalPages} 页，共 {total} 条
            </div>
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

      <div className="p-6 border-t border-gray-100 bg-white">
        <button className="w-full py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 flex items-center justify-center gap-2">
          <i className="ri-download-2-line"></i> 导出相关表型试验数据
        </button>
      </div>
    </div>
  );
}
