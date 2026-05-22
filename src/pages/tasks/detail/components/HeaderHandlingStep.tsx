import React, { useState } from 'react';

interface HeaderHandlingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HeaderHandlingStep({ onNext, onBack }: HeaderHandlingStepProps) {
  const [headerRowIndex, setHeaderRowIndex] = useState<number>(0);
  const [columns, setColumns] = useState([
    '桃树编号', '树高(cm)', '冠幅', '抗病性', '备注说明', '产量(kg)', '种植区域', '负责人'
  ]);

  // Mock data for preview
  const previewData = Array.from({ length: 10 }).map((_, rowIndex) => {
    if (rowIndex === 0) return columns; // Current header
    return [
      `PEACH-${2025000 + rowIndex}`,
      `${150 + Math.floor(Math.random() * 50)}`,
      `${80 + Math.floor(Math.random() * 20)}`,
      ['强', '中', '弱'][Math.floor(Math.random() * 3)],
      '无备注',
      `${800 + Math.floor(Math.random() * 200)}`,
      'A区',
      '张三'
    ];
  });

  const handleColumnNameChange = (index: number, newName: string) => {
    const newCols = [...columns];
    newCols[index] = newName;
    setColumns(newCols);
  };

  const deleteColumn = (index: number) => {
    const newCols = columns.filter((_, i) => i !== index);
    setColumns(newCols);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <i className="ri-information-line text-blue-600 mt-0.5"></i>
        <div className="text-sm text-blue-800">
          请点击行号选择表头所在的行。系统默认识别第一行为表头。
        </div>
      </div>

      {/* Table Preview */}
      <div className="border rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-16 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 border-r">
                行号
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-2 min-w-[150px]">
                  <div className="flex items-center gap-2 bg-white border rounded px-2 py-1">
                    <input 
                      type="text" 
                      value={col}
                      onChange={(e) => handleColumnNameChange(idx, e.target.value)}
                      className="w-full text-xs font-medium text-gray-700 border-none focus:ring-0 p-0"
                    />
                    <button 
                      onClick={() => deleteColumn(idx)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {previewData.map((row, rIdx) => (
              <tr 
                key={rIdx} 
                className={`hover:bg-gray-50 ${headerRowIndex === rIdx ? 'bg-blue-50/50' : ''}`}
              >
                <td 
                  onClick={() => setHeaderRowIndex(rIdx)}
                  className={`px-4 py-3 text-center text-xs cursor-pointer border-r sticky left-0 z-10 ${
                    headerRowIndex === rIdx 
                      ? 'bg-blue-100 text-blue-700 font-bold border-r-blue-200' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {headerRowIndex === rIdx ? (
                    <div className="flex items-center justify-center gap-1">
                      <span>{rIdx + 1}</span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                  ) : (
                    rIdx + 1
                  )}
                </td>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
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
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm transition-colors"
        >
          确认并下一步
        </button>
      </div>
    </div>
  );
}
