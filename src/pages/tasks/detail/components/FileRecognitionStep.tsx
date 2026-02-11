import { useState, useEffect } from 'react';

interface FileRecord {
  id: string;
  name: string;
  type: string;
  size: string;
  sheetCount?: number;
  status: 'success' | 'warning' | 'error';
  sheets?: SheetInfo[];
}

interface SheetInfo {
  name: string;
  rowCount: number;
  colCount: number;
  isEmpty: boolean;
  isDataTable: boolean;
}

interface FileRecognitionStepProps {
  onNext: () => void;
  taskType: 'phenotype' | 'genotype';
}

export default function FileRecognitionStep({ onNext, taskType }: FileRecognitionStepProps) {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate file recognition process
    const timer = setTimeout(() => {
      if (taskType === 'phenotype') {
        setFiles([
          {
            id: '1',
            name: '2024_phenotype_data.xlsx',
            type: 'Excel',
            size: '2.4 MB',
            sheetCount: 3,
            status: 'success',
            sheets: [
              { name: 'Sheet1', rowCount: 1200, colCount: 15, isEmpty: false, isDataTable: true },
              { name: 'Sheet2', rowCount: 0, colCount: 0, isEmpty: true, isDataTable: false },
              { name: 'DUS_Data', rowCount: 350, colCount: 12, isEmpty: false, isDataTable: true },
            ]
          }
        ]);
      } else {
        setFiles([
          {
            id: '1',
            name: 'maize_genotype_v3.hmp.txt',
            type: 'HMP',
            size: '450 MB',
            status: 'warning', // Needs conversion
          },
          {
            id: '2',
            name: 'sample_info.xlsx',
            type: 'Excel',
            size: '12 KB',
            sheetCount: 1,
            status: 'success',
            sheets: [
              { name: 'Samples', rowCount: 200, colCount: 5, isEmpty: false, isDataTable: true }
            ]
          }
        ]);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [taskType]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <i className="ri-information-line text-blue-600 mt-0.5"></i>
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">系统自动识别结果</p>
          <p>系统已自动分析上传文件的格式与结构，请确认识别结果。对于 Excel 文件，已自动扫描所有 Sheet 页。</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">文件列表</h3>
          <span className="text-xs text-gray-500">共 {files.length} 个文件</span>
        </div>
        
        {loading ? (
          <div className="p-12 text-center">
             <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-gray-500">正在分析文件结构...</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">文件名</th>
                <th className="px-6 py-3 font-medium">文件类型</th>
                <th className="px-6 py-3 font-medium">Sheet 数</th>
                <th className="px-6 py-3 font-medium">识别结果</th>
                <th className="px-6 py-3 font-medium">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {files.map(file => (
                <tr key={file.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                    <i className={`ri-file-${file.type === 'Excel' ? 'excel' : 'text'}-line text-lg text-gray-400`}></i>
                    {file.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{file.type}</td>
                  <td className="px-6 py-4 text-gray-600">{file.sheetCount ? `${file.sheetCount} 个` : '-'}</td>
                  <td className="px-6 py-4">
                    {file.status === 'success' && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                        <i className="ri-check-line mr-1"></i> 识别成功
                      </span>
                    )}
                    {file.status === 'warning' && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-50 text-orange-700">
                        <i className="ri-alert-line mr-1"></i> 需格式转换
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                     {file.sheets && (
                       <div className="text-xs text-gray-500 space-y-1">
                         {file.sheets.map((sheet, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                             <i className="ri-table-line"></i>
                             <span className="font-medium text-gray-700">{sheet.name}</span>
                             <span className="text-gray-400">({sheet.rowCount}行, {sheet.colCount}列)</span>
                             {sheet.isEmpty && <span className="text-red-400">[空]</span>}
                           </div>
                         ))}
                       </div>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={loading}
          className={`px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium shadow-sm transition-all flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700 hover:shadow-md'}`}
        >
          下一步
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}
