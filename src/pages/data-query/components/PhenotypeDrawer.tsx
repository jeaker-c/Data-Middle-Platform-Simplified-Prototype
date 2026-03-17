import { useMemo } from 'react';
import { PhenotypeRecord } from '../types';

interface PhenotypeDrawerProps {
  record: PhenotypeRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhenotypeDrawer({ record, isOpen, onClose }: PhenotypeDrawerProps) {
  const observations = useMemo(() => {
    return [
      { plot: { row: 53, col: 15 }, materialId: 'WM00634', value: 310, unit: 'CM' },
      { plot: { row: 53, col: 16 }, materialId: 'WM00635', value: 320, unit: 'CM' },
      { plot: { row: 53, col: 17 }, materialId: 'WM00636', value: 305, unit: 'CM' },
      { plot: { row: 53, col: 18 }, materialId: 'WM00637', value: 318, unit: 'CM' },
      { plot: { row: 53, col: 19 }, materialId: 'WM00638', value: 299, unit: 'CM' },
      { plot: { row: 53, col: 20 }, materialId: 'WM00639', value: 312, unit: 'CM' }
    ];
  }, []);

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

      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">试验名称 (NAME)</div>
              <div className="text-lg font-bold text-gray-900">{record.experimentName}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">性状 (TRAIT)</div>
              <div className="text-lg font-bold text-gray-900">{record.traitName}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">试验年份</div>
              <div className="text-lg font-bold text-gray-900 border-b-2 border-teal-100 inline-block pb-0.5">{record.year}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">观测地点</div>
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <i className="ri-map-pin-line text-teal-500"></i>
                <span>{record.siteName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-teal-600">
              <i className="ri-pulse-line text-xl"></i>
            </div>
            <div className="text-lg font-bold text-gray-900">数据点详情</div>
          </div>
          <div className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">TOTAL: {observations.length}</div>
        </div>

        <div className="mt-4 px-6 flex items-center gap-6 text-xs font-bold text-gray-400">
          <div className="w-20">小区标识</div>
          <div className="flex-1 min-w-0">材料名称</div>
          <div className="w-24 text-right">性状值</div>
        </div>

        <div className="mt-3 space-y-4">
          {observations.map((o) => (
            <div key={`${o.materialId}-${o.plot.row}-${o.plot.col}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-6 min-w-0">
                <div className="w-20">
                  <div className="text-sm font-bold text-gray-400">排号 {o.plot.row}</div>
                  <div className="text-sm font-bold text-gray-400">小区号 {o.plot.col}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-bold text-gray-900 truncate">{o.materialId}</div>
                </div>
              </div>
              <div className="text-right w-24">
                <div className="text-2xl font-extrabold text-gray-900">
                  {o.value}{' '}
                  <span className="text-sm font-bold text-gray-300 align-middle">{o.unit}</span>
                </div>
              </div>
            </div>
          ))}
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
