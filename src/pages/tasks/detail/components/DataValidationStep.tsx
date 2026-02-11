import React from 'react';

interface DataValidationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DataValidationStep({ onNext, onBack }: DataValidationStepProps) {
  // Mock validation results
  const stats = {
    total: 1245,
    valid: 1230,
    error: 15,
    errorTypes: [
      { type: '格式错误', count: 8, color: 'text-red-600 bg-red-50' },
      { type: '必填缺失', count: 5, color: 'text-orange-600 bg-orange-50' },
      { type: '唯一性冲突', count: 2, color: 'text-yellow-600 bg-yellow-50' }
    ]
  };

  const errorRows = [
    { id: 102, crop_id: 'CROP-2025102', height: '350', ear_height: '85', reason: '株高超出正常范围 (0-300)' },
    { id: 145, crop_id: 'CROP-2025145', height: '175', ear_height: '', reason: '必填字段缺失：穗位高' },
    { id: 288, crop_id: 'CROP-2025001', height: '160', ear_height: '80', reason: '作物编号重复' },
    { id: 289, crop_id: 'CROP-2025289', height: 'abc', ear_height: '82', reason: '株高必须为数值' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">总数据行数</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">有效数据</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{stats.valid}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm border-red-100 bg-red-50/30">
          <div className="text-sm text-gray-500">异常数据</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{stats.error}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col justify-center gap-2">
          {stats.errorTypes.map((err, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{err.type}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${err.color}`}>{err.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Table Preview */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
          <h4 className="font-medium text-gray-700 text-sm">异常数据预览 (前 4 条)</h4>
          <span className="text-xs text-red-500 flex items-center gap-1">
            <i className="ri-error-warning-fill"></i>
            请进入下一步进行修正
          </span>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作物编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">株高(cm)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">穗位高</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {errorRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('作物编号') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                  {row.crop_id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('株高') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                  {row.height}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('穗位高') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                  {row.ear_height || <span className="text-gray-300 italic">空</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 flex items-center gap-1">
                  <i className="ri-close-circle-line"></i>
                  {row.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
          上一步
        </button>
        <button 
          onClick={onNext}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <i className="ri-edit-box-line"></i>
          进入数据修正
        </button>
      </div>
    </div>
  );
}
