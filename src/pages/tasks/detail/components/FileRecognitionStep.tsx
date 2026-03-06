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

interface ImageRecord {
  id: string;
  name: string;
  type: string;
  resolution: string;
  status: 'success' | 'error' | 'warning';
}

interface FileRecognitionStepProps {
  onNext: () => void;
  taskType: 'phenotype' | 'genotype' | 'image' | 'directory_scan';
}

export default function FileRecognitionStep({ onNext, taskType }: FileRecognitionStepProps) {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageRecord[]>([]);
  const [directoryFiles, setDirectoryFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate file recognition process
    const timer = setTimeout(() => {
      if (taskType === 'directory_scan') {
         setDirectoryFiles([
            { id: '1', path: 'A001_Corn/', name: 'IMG_001.jpg', resolution: '1920x1080', status: 'valid' },
            { id: '2', path: 'A001_Corn/', name: 'IMG_002.jpg', resolution: '1920x1080', status: 'valid' },
            { id: '3', path: 'B002_Soybean/', name: 'Side_View.png', resolution: '3840x2160', status: 'valid' },
            { id: '4', path: 'B002_Soybean/', name: 'Top_View.jpg', resolution: '1024x768', status: 'valid' },
            { id: '5', path: 'C003_Rice/', name: 'IMG_Invalid.bmp', resolution: 'N/A', status: 'invalid_format' },
         ]);
      } else if (taskType === 'phenotype') {
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
      } else if (taskType === 'genotype') {
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
      } else {
         // Image task
         setImageFiles([
             { id: '1', name: 'IMG_A001_Corn.jpg', type: 'JPG', resolution: '1920x1080', status: 'success' },
             { id: '2', name: 'IMG_A002_Soybean.png', type: 'PNG', resolution: '3840x2160', status: 'success' },
             { id: '3', name: 'IMG_B003_Rice.jpg', type: 'JPG', resolution: '1024x768', status: 'success' },
             { id: '4', name: '损坏的图片文件.jpg', type: 'JPG', resolution: '0x0', status: 'error' },
             { id: '5', name: 'A004_Wheat.webp', type: 'WEBP', resolution: '1280x720', status: 'warning' },
         ]);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [taskType]);

  if (taskType === 'directory_scan') {
    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-5">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-indigo-100 text-indigo-600 shrink-0">
             <i className="ri-folder-open-line text-2xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-1">结构化目录扫描完成</h4>
            <div className="flex items-center gap-2 text-indigo-800 text-sm font-medium">
               <span>系统检测到压缩包包含 <span className="underline decoration-indigo-300 decoration-2 underline-offset-2">12 个子文件夹</span>。</span>
               <span className="flex items-center gap-1 bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                 当前模式: 目录模式
               </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <div className="grid grid-cols-4 w-full text-xs font-bold text-gray-400 uppercase tracking-wider">
               <span>解析路径 (Relative Path)</span>
               <span>资源名称</span>
               <span>分辨率规格</span>
               <span className="text-right">解析状态</span>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
               <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-gray-500">正在递归扫描目录结构...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {directoryFiles.map(file => (
                <div key={file.id} className="grid grid-cols-4 px-8 py-6 hover:bg-gray-50/50 transition-colors items-center group">
                  <div className="flex items-center gap-2 font-bold text-indigo-600">
                    <i className="ri-folder-3-line text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                    {file.path}
                  </div>
                  <div className="font-bold text-gray-800">{file.name}</div>
                  <div className="text-gray-500 font-bold text-sm">{file.resolution}</div>
                  <div className="text-right">
                    {file.status === 'valid' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-green-50 text-green-600 border border-green-100 uppercase tracking-wide">
                         识别成功
                      </span>
                    )}
                    {file.status === 'invalid_format' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">
                         不支持文件中的图片格式
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-8 items-center">
          <button
             className="px-8 py-3 bg-gray-50 border border-gray-200 text-gray-500 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
             PREV / 上一阶段
          </button>
          
          <button
            onClick={onNext}
            disabled={loading}
            className={`px-10 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg transition-all flex items-center gap-3 text-sm uppercase tracking-widest ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:shadow-xl hover:-translate-y-0.5'}`}
          >
            Next / 推进执行
            <i className="ri-arrow-right-line text-lg"></i>
          </button>
        </div>
      </div>
    );
  }

  if (taskType === 'image') {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <i className="ri-information-line text-blue-600 mt-0.5"></i>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">系统自动识别结果</p>
            <p>共检测到 128 张图片。检测到 1 个损坏的文件以及 2 个不支持的格式。</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="grid grid-cols-4 w-full text-xs font-bold text-gray-400 uppercase tracking-wider">
               <span>资源文件名</span>
               <span>类型</span>
               <span>分辨率</span>
               <span className="text-right">解析状态</span>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
               <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-gray-500">正在分析图片资源...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {imageFiles.map(file => (
                <div key={file.id} className="grid grid-cols-4 px-6 py-5 hover:bg-gray-50/50 transition-colors items-center">
                  <div className="font-bold text-gray-800">{file.name}</div>
                  <div className="text-gray-400 font-bold text-sm">{file.type}</div>
                  <div className="text-gray-500 font-bold text-sm">{file.resolution}</div>
                  <div className="text-right">
                    {file.status === 'success' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                         识别成功
                      </span>
                    )}
                    {file.status === 'error' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                         文件损坏
                      </span>
                    )}
                    {file.status === 'warning' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100">
                         不支持{file.type}格式
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
