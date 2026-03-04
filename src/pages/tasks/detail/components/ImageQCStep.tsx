import { useState } from 'react';

interface ImageQCStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface QCItem {
  id: string;
  fileName: string;
  checkItem: string;
  status: 'passed' | 'error' | 'warning' | 'fatal';
  message: string;
}

export default function ImageQCStep({ onNext, onBack }: ImageQCStepProps) {
  const [showOnlyExceptions, setShowOnlyExceptions] = useState(false);

  // Mock Data
  const qcList: QCItem[] = [
    { id: '1', fileName: 'IMG_A001_Corn.jpg', checkItem: '库匹配', status: 'passed', message: '成功匹配材料库 A001' },
    { id: '2', fileName: 'IMG_A002_Soybean.png', checkItem: '格式合规', status: 'error', message: '限制格式为 JPG，检测到 PNG' },
    { id: '3', fileName: 'IMG_A002_Soybean_Copy.jpg', checkItem: '重名校验', status: 'warning', message: '名称与已有记录重复' },
    { id: '4', fileName: '损坏的图片文件.jpg', checkItem: '文件完整性', status: 'fatal', message: '图片头信息损坏，无法读取' },
    { id: '5', fileName: 'IMG_B003_Rice.jpg', checkItem: '库匹配', status: 'error', message: '材料编号 B003 在库中不存在' },
    { id: '6', fileName: 'A004_Wheat.webp', checkItem: '格式合规', status: 'error', message: '不支持 WebP 格式' },
    // Fill some passed items to make list longer
    { id: '7', fileName: 'IMG_C005_Corn.jpg', checkItem: '库匹配', status: 'passed', message: '成功匹配材料库 C005' },
    { id: '8', fileName: 'IMG_C006_Corn.jpg', checkItem: '库匹配', status: 'passed', message: '成功匹配材料库 C006' },
  ];

  const filteredList = showOnlyExceptions 
    ? qcList.filter(item => item.status !== 'passed')
    : qcList;

  const getStatusBadge = (status: QCItem['status']) => {
    switch (status) {
      case 'passed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">通过</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">未通过</span>;
    }
  };

  const getIconForStatus = (status: QCItem['status']) => {
    switch (status) {
      case 'passed': return 'ri-image-line text-green-500'; // Or just image icon
      case 'error': return 'ri-image-line text-red-500';
      case 'warning': return 'ri-image-line text-orange-500';
      case 'fatal': return 'ri-image-line text-pink-500';
      default: return 'ri-image-line text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Detail List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-table-2 text-indigo-600 text-xl"></i>
            <h3 className="text-lg font-bold text-gray-900">匹配结果详细清单</h3>
          </div>
          <button 
            onClick={() => setShowOnlyExceptions(!showOnlyExceptions)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              showOnlyExceptions 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className={`ri-filter-3-line ${showOnlyExceptions ? 'text-red-600' : 'text-gray-400'}`}></i>
            仅看异常
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">图片资源</th>
                <th className="px-6 py-4">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredList.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                         <i className={getIconForStatus(item.status)}></i>
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-teal-700 transition-colors">{item.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredList.length === 0 && (
            <div className="py-12 text-center text-gray-400">
               <i className="ri-checkbox-circle-line text-4xl mb-2 text-gray-300"></i>
               <p>没有发现相关记录</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="px-8 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          上一步
        </button>
        <button
          onClick={onNext}
          className="px-8 py-2.5 bg-teal-600 text-white rounded-full font-medium shadow-sm hover:bg-teal-700 hover:shadow-md transition-all flex items-center gap-2"
        >
          确认结果并进入修正阶段
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}