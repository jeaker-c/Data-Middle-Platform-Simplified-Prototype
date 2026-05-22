import React from 'react';

interface FileParsingStepProps {
  onNext: () => void;
}

export default function FileParsingStep({ onNext }: FileParsingStepProps) {
  const files = [
    {
      id: 1,
      name: '2025年度桃树种植数据.xlsx',
      type: 'Excel (.xlsx)',
      rows: 1245,
      cols: 24,
      status: 'success',
      size: '2.4 MB'
    }
  ];

  return (
    <div className="space-y-6">
      {/* File List */}
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <i className="ri-file-excel-2-line text-2xl text-green-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{file.name}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>{file.type}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{file.size}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{file.rows} 行 / {file.cols} 列</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <i className="ri-check-line mr-1"></i>
                解析成功
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Parsing Log */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">解析日志</label>
        <div className="bg-gray-50 border rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs text-gray-600">
          <p>[2025-01-26 14:30:01] 开始上传文件...</p>
          <p>[2025-01-26 14:30:02] 文件上传成功，开始校验文件完整性...</p>
          <p>[2025-01-26 14:30:02] 文件校验通过，进入解析队列...</p>
          <p>[2025-01-26 14:30:03] 正在读取 Excel 工作表 'Sheet1'...</p>
          <p>[2025-01-26 14:30:04] 成功读取 1245 行数据</p>
          <p>[2025-01-26 14:30:04] 正在分析数据类型...</p>
          <p className="text-green-600">[2025-01-26 14:30:05] 解析完成，耗时 3.2s</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
          <i className="ri-refresh-line mr-1"></i>
          重新解析
        </button>
        <button 
          onClick={onNext}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm transition-colors"
        >
          下一步
        </button>
      </div>
    </div>
  );
}
