import React, { useState } from 'react';

interface DataCorrectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DataCorrectionStep({ onNext, onBack }: DataCorrectionStepProps) {
  const [errorCount, setErrorCount] = useState(15);
  const [rows, setRows] = useState([
    { id: 102, crop_id: 'CROP-2025102', height: '350', ear_height: '85', reason: '株高超出正常范围 (0-300)', fixed: false },
    { id: 145, crop_id: 'CROP-2025145', height: '175', ear_height: '', reason: '必填字段缺失：穗位高', fixed: false },
    { id: 288, crop_id: 'CROP-2025001', height: '160', ear_height: '80', reason: '作物编号重复', fixed: false },
    { id: 289, crop_id: 'CROP-2025289', height: 'abc', ear_height: '82', reason: '株高必须为数值', fixed: false },
  ]);

  const handleFix = (id: number, field: string, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value, fixed: true } : row
    ));
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleRevalidate = () => {
    // Simulate validation
    const remainingErrors = rows.filter(r => !r.fixed).length;
    setErrorCount(remainingErrors);
    
    if (remainingErrors === 0) {
      // All good
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Bar */}
      <div className={`p-4 rounded-lg flex items-center justify-between ${errorCount > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3">
          <i className={`text-xl ${errorCount > 0 ? 'ri-error-warning-fill text-red-600' : 'ri-checkbox-circle-fill text-green-600'}`}></i>
          <div>
            <h4 className={`font-medium ${errorCount > 0 ? 'text-red-900' : 'text-green-900'}`}>
              {errorCount > 0 ? `当前仍有 ${errorCount} 条数据异常` : '所有数据校验通过'}
            </h4>
            <p className={`text-sm ${errorCount > 0 ? 'text-red-700' : 'text-green-700'}`}>
              {errorCount > 0 ? '请直接在表格中修改数据，或删除无效行。' : '您可以进行下一步操作。'}
            </p>
          </div>
        </div>
        {errorCount > 0 && (
           <button 
             onClick={handleRevalidate}
             className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium shadow-sm"
           >
             重新校验
           </button>
        )}
      </div>

      {/* Editable Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作物编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">株高(cm)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">穗位高</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input 
                    type="text"
                    value={row.crop_id}
                    onChange={(e) => handleFix(row.id, 'crop_id', e.target.value)}
                    className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('作物编号') ? 'border-red-300 bg-red-50' : ''}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input 
                    type="text"
                    value={row.height}
                    onChange={(e) => handleFix(row.id, 'height', e.target.value)}
                    className={`block w-24 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('株高') ? 'border-red-300 bg-red-50' : ''}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input 
                    type="text"
                    value={row.ear_height}
                    onChange={(e) => handleFix(row.id, 'ear_height', e.target.value)}
                    className={`block w-24 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('穗位高') ? 'border-red-300 bg-red-50' : ''}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                   {row.fixed ? (
                     <span className="text-green-600 flex items-center gap-1">
                       <i className="ri-check-line"></i> 已修改
                     </span>
                   ) : row.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleDelete(row.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="删除此行"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            所有异常数据已处理
          </div>
        )}
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
          disabled={errorCount > 0}
          className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm transition-colors ${
            errorCount === 0 ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          确认无误，下一步
        </button>
      </div>
    </div>
  );
}
