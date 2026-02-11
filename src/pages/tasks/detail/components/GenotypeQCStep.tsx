import { useState } from 'react';

interface GenotypeQCStepProps {
  onNext: () => void; // This will trigger the "Confirmation" step or final action
  onBack: () => void;
}

const MOCK_QC_DATA = [
  { id: 'KA134', missingRate: 0.023, heterozygousRate: 0.011, snpCount: 45200, status: 'normal' },
  { id: 'KA135', missingRate: 0.18, heterozygousRate: 0.06, snpCount: 45150, status: 'warning' },
  { id: 'KA136', missingRate: 0.015, heterozygousRate: 0.009, snpCount: 45230, status: 'normal' },
  { id: 'KA137', missingRate: 0.22, heterozygousRate: 0.08, snpCount: 44900, status: 'error' },
  { id: 'KA138', missingRate: 0.021, heterozygousRate: 0.012, snpCount: 45210, status: 'normal' },
  { id: 'KA139', missingRate: 0.018, heterozygousRate: 0.010, snpCount: 45220, status: 'normal' },
];

export default function GenotypeQCStep({ onNext, onBack }: GenotypeQCStepProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'warning' | 'error'>('all');

  const filteredData = MOCK_QC_DATA.filter(item => 
    filterStatus === 'all' ? true : 
    filterStatus === 'warning' ? item.status === 'warning' : 
    item.status === 'error'
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top: Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">总材料数</p>
          <p className="text-2xl font-bold text-gray-900">384</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">SNP 总数</p>
          <p className="text-2xl font-bold text-gray-900">45,230</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">平均缺失率</p>
          <p className="text-2xl font-bold text-blue-600">2.4%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">平均杂合率</p>
          <p className="text-2xl font-bold text-purple-600">1.2%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100 bg-red-50/50 shadow-sm">
          <p className="text-sm text-red-600 mb-1">异常材料 (&gt;15%缺失)</p>
          <p className="text-2xl font-bold text-red-600">12</p>
        </div>
      </div>

      {/* Middle: Chart Placeholder (Optional, maybe skip for now to keep simple) */}
      
      {/* Bottom: Material Detail Table */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">材料质量明细</h3>
          <div className="flex items-center gap-3">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="text-sm border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">全部状态</option>
              <option value="warning">警告 (Warning)</option>
              <option value="error">严重异常 (Error)</option>
            </select>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
              <i className="ri-download-line"></i> 下载报告
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 bg-gray-50 border-b border-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3 font-medium">材料 ID</th>
                <th className="px-6 py-3 font-medium">缺失率 (Missing)</th>
                <th className="px-6 py-3 font-medium">杂合率 (Hetero)</th>
                <th className="px-6 py-3 font-medium">有效 SNP 数</th>
                <th className="px-6 py-3 font-medium">状态评估</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                  <td className={`px-6 py-4 ${item.missingRate > 0.15 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {(item.missingRate * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-gray-600">{(item.heterozygousRate * 100).toFixed(1)}%</td>
                  <td className="px-6 py-4 text-gray-600">{item.snpCount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {item.status === 'normal' && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                        正常
                      </span>
                    )}
                    {item.status === 'warning' && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-50 text-orange-700">
                        <i className="ri-alert-line mr-1"></i> 缺失率稍高
                      </span>
                    )}
                    {item.status === 'error' && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700">
                        <i className="ri-close-circle-line mr-1"></i> 质量不合格
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end pt-2">
         <button
            onClick={onNext}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium shadow-sm hover:bg-teal-700 transition-all flex items-center gap-2"
          >
            完成评估，去入库
            <i className="ri-arrow-right-line"></i>
          </button>
      </div>
    </div>
  );
}
