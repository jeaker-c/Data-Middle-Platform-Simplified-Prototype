import { useState } from 'react';

interface AttributeAssociationStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'phenotype' | 'genotype' | 'image' | 'directory_scan';
}

interface PreviewItem {
  id: string;
  fileName: string;
  systemParsedId: string;
  matchedTarget: string | null;
  matchDepth: 'exact' | 'fuzzy' | 'none';
}

export default function AttributeAssociationStep({ onNext, onBack, taskType = 'image' }: AttributeAssociationStepProps) {
  const [targetField, setTargetField] = useState('material_id'); // material_id | material_name
  const [matchLogic, setMatchLogic] = useState<'exact' | 'fuzzy'>('fuzzy');
  const [ignoreExtension, setIgnoreExtension] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [autoExtractId, setAutoExtractId] = useState(false);

  // Mock data based on prototype
  const imagePreviewData: PreviewItem[] = [
    { 
      id: '1', 
      fileName: 'IMG_A001_Corn.jpg', 
      systemParsedId: autoExtractId ? 'A001' : 'IMG_A001_Corn', 
      matchedTarget: 'A001 (玉米-金302)', 
      matchDepth: 'exact' 
    },
    { 
      id: '2', 
      fileName: 'IMG_a002_Soybean.png', 
      systemParsedId: autoExtractId ? 'a002' : 'IMG_a002_Soybean', 
      matchedTarget: (autoExtractId && ignoreCase) ? 'A002 (大豆-鲁青1号)' : null, 
      matchDepth: (autoExtractId && ignoreCase) ? 'exact' : 'none' 
    },
    { 
      id: '3', 
      fileName: 'IMG_B003_Rice.jpg', 
      systemParsedId: autoExtractId ? 'B003' : 'IMG_B003_Rice', 
      matchedTarget: null, 
      matchDepth: 'none' 
    },
  ];

  const directoryPreviewData: PreviewItem[] = [
    { 
      id: '1', 
      fileName: 'A001_CORN/', 
      systemParsedId: autoExtractId ? 'A001' : 'A001_CORN', 
      matchedTarget: 'A001 (玉米-金302)', 
      matchDepth: 'exact' 
    },
    { 
      id: '2', 
      fileName: 'B002_SOYBEAN/', 
      systemParsedId: autoExtractId ? 'B002' : 'B002_SOYBEAN', 
      matchedTarget: 'B002 (大豆-鲁青1号)', 
      matchDepth: 'exact' 
    },
    { 
      id: '3', 
      fileName: 'C999_TEST/', 
      systemParsedId: autoExtractId ? 'C999' : 'C999_TEST', 
      matchedTarget: null, 
      matchDepth: 'none' 
    },
  ];

  const previewData = taskType === 'directory_scan' ? directoryPreviewData : imagePreviewData;
  const matchRate = 66.7;

  return (
    <div className="space-y-8">
       {/* Configuration Card */}
       <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
             <span>{taskType === 'directory_scan' ? '父级目录 (FOLDER)' : '图片源属性 (SOURCE)'}</span>
             <span>材料库目标字段 (TARGET)</span>
          </div>
          
          {/* Mapping Flow */}
          <div className="flex items-center justify-between gap-6 mb-10">
             {/* Source */}
             <div className="flex-1 bg-white p-5 rounded-xl border border-teal-500 shadow-[0_0_0_1px_rgba(20,184,166,0.2)] relative overflow-hidden flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-2xl shrink-0">
                   {taskType === 'directory_scan' ? <i className="ri-folder-open-line"></i> : <i className="ri-file-list-line"></i>}
                </div>
                <div>
                   <div className="font-bold text-gray-900 text-lg">{taskType === 'directory_scan' ? '子文件夹名' : '图片文件名'}</div>
                   <div className="text-xs text-teal-600 font-medium mt-0.5">{taskType === 'directory_scan' ? 'SUBFOLDER NAME' : 'ORIGINAL FILENAME'}</div>
                </div>
             </div>

             {/* Link Icon */}
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 text-teal-500 text-xl shrink-0 z-10">
               <i className="ri-link"></i>
             </div>

             {/* Target */}
             <div className="flex-1 bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative">
                <div className="relative">
                  <select 
                    value={targetField}
                    onChange={(e) => setTargetField(e.target.value)}
                    className="w-full appearance-none bg-transparent text-gray-900 text-lg font-bold focus:outline-none cursor-pointer pr-8"
                  >
                    <option value="material_id">材料编号</option>
                    <option value="material_name">材料名称</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl"></i>
                </div>
             </div>
          </div>

          {/* Settings Row */}
          <div>
             <div className="flex items-center gap-2 mb-4">
                <i className="ri-settings-3-line text-teal-600"></i>
                <h4 className="font-bold text-gray-900">关联规则与过滤策略</h4>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Match Mode */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-3">
                    匹配模式
                  </label>
                  <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                    <button
                      onClick={() => setMatchLogic('exact')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${matchLogic === 'exact' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                      精准匹配
                    </button>
                    <button
                      onClick={() => setMatchLogic('fuzzy')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${matchLogic === 'fuzzy' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                      模糊匹配
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {matchLogic === 'exact' 
                      ? '要求文件名与库内字段字符完全一致。' 
                      : '允许文件名包含目标字段关键词（如：A001_Corn 匹配 A001）。'}
                  </p>
                </div>

                {/* String Processing */}
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-3">
                     字符预处理
                   </label>
                   <div className="space-y-3">
                     <label className={`flex items-center justify-between cursor-pointer bg-white px-4 py-3 rounded-xl border transition-all ${ignoreCase ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20' : 'border-gray-200 hover:border-teal-300'}`}>
                       <span className="text-sm font-bold text-gray-700">忽略大小写</span>
                       <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${ignoreCase ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                          {ignoreCase && <i className="ri-check-line text-white text-xs"></i>}
                       </div>
                       <input 
                         type="checkbox" 
                         checked={ignoreCase} 
                         onChange={(e) => setIgnoreCase(e.target.checked)}
                         className="hidden"
                       />
                     </label>
                     
                     <label className={`flex items-center justify-between cursor-pointer bg-white px-4 py-3 rounded-xl border transition-all ${ignoreExtension ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20' : 'border-gray-200 hover:border-teal-300'}`}>
                       <span className="text-sm font-bold text-gray-700">忽略扩展名</span>
                       <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${ignoreExtension ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                          {ignoreExtension && <i className="ri-check-line text-white text-xs"></i>}
                       </div>
                       <input 
                         type="checkbox" 
                         checked={ignoreExtension} 
                         onChange={(e) => setIgnoreExtension(e.target.checked)}
                         className="hidden"
                       />
                     </label>
                   </div>
                </div>

                {/* Advanced Extraction */}
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-3">
                     高级提取规则
                   </label>
                   <label className={`flex items-start justify-between cursor-pointer bg-white px-4 py-3 rounded-xl border transition-all h-[108px] ${autoExtractId ? 'border-teal-500 shadow-sm ring-1 ring-teal-500/20' : 'border-gray-200 hover:border-teal-300'}`}>
                     <div>
                        <span className="text-sm font-bold text-gray-700 block mb-1">自动提取有效ID</span>
                        <span className="text-xs text-gray-400 leading-relaxed">尝试从 `IMG_XXX` 格式中提取 ID</span>
                     </div>
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${autoExtractId ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                        {autoExtractId && <i className="ri-check-line text-white text-xs"></i>}
                     </div>
                     <input 
                       type="checkbox" 
                       checked={autoExtractId} 
                       onChange={(e) => setAutoExtractId(e.target.checked)}
                       className="hidden"
                     />
                   </label>
                </div>
             </div>
          </div>
       </div>

       {/* Preview Report */}
       <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-eye-line text-teal-600"></i>
              规则应用预览
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
              <span>实时计算中</span>
              <i className="ri-refresh-line animate-spin"></i>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 uppercase text-xs font-bold tracking-wider">
                 <tr>
                   <th className="px-8 py-4">{taskType === 'directory_scan' ? '父级目录 (FOLDER)' : '源文件名 (ORIGINAL)'}</th>
                   <th className="px-6 py-4">系统处理后标识</th>
                   <th className="px-6 py-4">库匹配目标 (TARGET)</th>
                   <th className="px-8 py-4 text-right">匹配深度</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {previewData.map(item => (
                   <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                     <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                         {taskType === 'directory_scan' ? <i className="ri-folder-3-line text-indigo-500"></i> : <i className="ri-image-2-line text-indigo-500"></i>}
                         <span className="font-bold text-gray-800">{item.fileName}</span>
                       </div>
                     </td>
                     <td className="px-6 py-5">
                       <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-mono font-medium border border-gray-200">
                         {item.systemParsedId}
                       </span>
                     </td>
                     <td className="px-6 py-5">
                        {item.matchedTarget ? (
                          <span className="text-gray-500 font-bold italic">{item.matchedTarget}</span>
                        ) : (
                          <span className="text-gray-400 italic font-light">未找到对应材料</span>
                        )}
                     </td>
                     <td className="px-8 py-5 text-right">
                       {item.matchDepth === 'exact' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                           完全匹配
                         </span>
                       )}
                       {item.matchDepth === 'fuzzy' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                           模糊匹配
                         </span>
                       )}
                       {item.matchDepth === 'none' && (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                           疑似异常
                         </span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
       </div>

       {/* Actions */}
       <div className="flex justify-between pt-6 border-t border-gray-100">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-sm uppercase tracking-wide"
          >
            PREV / 上一步
          </button>
          <button
            onClick={onNext}
            className="px-8 py-3 bg-teal-600 text-white rounded-lg font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:shadow-xl transition-all flex items-center gap-2 text-sm uppercase tracking-wide"
          >
            NEXT / 继续下一步
            <i className="ri-arrow-right-line"></i>
          </button>
       </div>
    </div>
  );
}