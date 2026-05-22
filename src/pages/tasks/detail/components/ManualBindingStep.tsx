import { useState, useEffect } from 'react';

interface ManualBindingStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface FixItem {
  id: string;
  fileName: string;
  thumbnail: string;
  issueType: 'unmatched' | 'format' | 'duplicate' | 'corrupted';
}

interface FixItem {
  id: string;
  fileName: string;
  thumbnail: string;
  issueType: 'unmatched' | 'format' | 'duplicate' | 'corrupted';
  status?: 'pending' | 'matched' | 'new';
  matchedId?: string | null; // Added field to store matched material ID
}

interface SearchResult {
  id: string;
  name: string;
  code: string;
}

export default function ManualBindingStep({ onNext, onBack }: ManualBindingStepProps) {
  const [selectedItem, setSelectedItem] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [isMarkedAsNew, setIsMarkedAsNew] = useState(false); // State for new material marking

  // Mock Data: Items that need fixing with status
  const [fixItems, setFixItems] = useState<FixItem[]>([
    { id: '1', fileName: '桃材料001果实特写图', thumbnail: '', issueType: 'unmatched', status: 'new' },
    { id: '2', fileName: '桃材料003田间图', thumbnail: '', issueType: 'unmatched', status: 'pending' },
    { id: '3', fileName: '桃材料002叶片图', thumbnail: '', issueType: 'format', status: 'matched' },
    { id: '4', fileName: '异常图像样本004', thumbnail: '', issueType: 'corrupted', status: 'pending' },
  ]);

  const currentItem = fixItems.find(item => item.id === selectedItem) || fixItems[0];

  const handleMarkAsNew = () => {
    // If already marked as new, toggle off
    if (isMarkedAsNew) {
        setIsMarkedAsNew(false);
        const updatedItems = fixItems.map(item => 
            item.id === selectedItem ? { ...item, status: 'pending' as const, matchedId: null } : item
        );
        setFixItems(updatedItems);
    } else {
        // Toggle on
        setIsMarkedAsNew(true);
        setSelectedMatch(null); // Clear search match if marked as new
        const updatedItems = fixItems.map(item => 
            item.id === selectedItem ? { ...item, status: 'new' as const, matchedId: null } : item
        );
        setFixItems(updatedItems);
    }
  };

  const handleMatchSelect = (matchId: string) => {
    // If selecting the same match, toggle off
    if (selectedMatch === matchId) {
        setSelectedMatch(null);
        setIsMarkedAsNew(false);
        const updatedItems = fixItems.map(item => 
            item.id === selectedItem ? { ...item, status: 'pending' as const, matchedId: null } : item
        );
        setFixItems(updatedItems);
    } else {
        // Select new match
        setSelectedMatch(matchId);
        setIsMarkedAsNew(false); // Clear new marking if matched
        const updatedItems = fixItems.map(item => 
            item.id === selectedItem ? { ...item, status: 'matched' as const, matchedId: matchId } : item
        );
        setFixItems(updatedItems);
    }
  };

  // Reset local state when changing selected item
  useEffect(() => {
    const item = fixItems.find(i => i.id === selectedItem);
    if (item) {
        if (item.status === 'new') {
            setIsMarkedAsNew(true);
            setSelectedMatch(null);
        } else if (item.status === 'matched') {
            setIsMarkedAsNew(false);
            setSelectedMatch(item.matchedId || null); 
        } else {
            setIsMarkedAsNew(false);
            setSelectedMatch(null);
        }
        setSearchQuery('');
    }
  }, [selectedItem]); // Removed fixItems from deps to avoid loop, though it's technically missing dependency

  // Mock Data: Search Results
  const allSearchResults: SearchResult[] = [
    { id: 'M001', name: '春蜜桃', code: '材料003' },
    { id: 'M002', name: '黄金蜜桃', code: '材料004' },
    { id: 'M003', name: '丰产麦21', code: '材料109' },
  ];

  // Filter results based on search query
  const searchResults = allSearchResults.filter(item => {
    // If there's a selected match, always include it
    if (selectedMatch === item.id) return true;
    
    // If there's a search query, filter by it
    if (searchQuery.trim()) {
        return item.name.includes(searchQuery) || item.code.includes(searchQuery);
    }
    
    // If no query and no selected match (or this item isn't the selected match), show nothing
    return false;
  });

  // Reset selected match when changing item
  const handleItemChange = (itemId: string) => {
     setSelectedItem(itemId);
     setSelectedMatch(null);
     setSearchQuery('');
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Sidebar: Fix List */}
        <div className="w-80 bg-white rounded-lg border border-emerald-100 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-emerald-100 bg-emerald-50/70">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-error-warning-line text-emerald-600"></i>
              待修正项 ({fixItems.length})
            </h3>
            <p className="mt-1 text-xs text-emerald-700">统一处理未匹配、格式异常和损坏资源</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {fixItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 border relative overflow-hidden ${
                  selectedItem === item.id 
                    ? 'bg-emerald-50 border-emerald-400 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-emerald-50/50 hover:border-emerald-100'
                }`}
              >
                {/* Status Indicator Bar */}
                {item.status === 'new' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>}
                {item.status === 'matched' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"></div>}
                {item.status === 'pending' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>}

                <div className={`w-10 h-10 rounded-md flex items-center justify-center text-lg shrink-0 ${
                   selectedItem === item.id ? 'bg-white text-emerald-600' : 'bg-gray-100 text-gray-400'
                }`}>
                   <i className="ri-image-line"></i>
                </div>
                <div className="min-w-0 flex-1">
                   <div className="flex justify-between items-center mb-0.5">
                     <p className={`text-sm font-bold truncate ${selectedItem === item.id ? 'text-emerald-900' : 'text-gray-700'}`}>
                       {item.fileName}
                     </p>
                     {/* Status Badge */}
                     {item.status === 'new' && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">新建</span>}
                     {item.status === 'matched' && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">已关联</span>}
                   </div>
                   <p className="text-xs text-gray-500 truncate">
                      {item.status === 'matched' && <span className="text-emerald-600">已关联现有材料</span>}
                      {item.status === 'new' && <span className="text-emerald-600">已标记为新增材料</span>}
                      {item.status === 'pending' && (
                        <>
                          {item.issueType === 'unmatched' && '原因：库中无匹配材料'}
                          {item.issueType === 'duplicate' && '原因：名称重复'}
                          {item.issueType === 'corrupted' && '原因：图像损坏'}
                          {item.issueType === 'format' && '原因：格式不合规'}
                        </>
                      )}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Workspace */}
        <div className="flex-1 bg-white rounded-lg border border-emerald-100 shadow-sm p-6 flex flex-col">
           {/* Top: Image Preview & Name */}
           <div className="flex gap-6 mb-8">
              <div className="w-44 h-44 bg-emerald-50/40 rounded-lg border border-dashed border-emerald-200 flex items-center justify-center shrink-0">
                 {currentItem.thumbnail ? (
                   <img src={currentItem.thumbnail} alt="" className="w-full h-full object-cover rounded-lg" />
                 ) : (
                   <i className="ri-image-line text-6xl text-emerald-200"></i>
                 )}
              </div>
              <div className="flex-1 pt-4">
                 <label className="block text-xs font-bold text-gray-500 mb-2">当前资源名称</label>
                 <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg px-5 py-4 text-2xl font-bold text-gray-900 flex items-center justify-between">
                    {currentItem.fileName}
                 </div>
                 
                 <div className="mt-6">
                    <div className={`border rounded-lg p-4 flex gap-3 items-start transition-colors ${
                      isMarkedAsNew 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : selectedMatch 
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-amber-50 border-amber-200'
                    }`}>
                       {isMarkedAsNew ? (
                         <i className="ri-add-circle-line text-emerald-600 mt-0.5"></i>
                       ) : selectedMatch ? (
                         <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                       ) : (
                         <i className="ri-information-line text-amber-500 mt-0.5"></i>
                       )}
                       
                       <p className={`text-sm font-medium ${
                         isMarkedAsNew 
                           ? 'text-emerald-700' 
                           : selectedMatch 
                             ? 'text-emerald-700'
                             : 'text-amber-700'
                       }`}>
                         {isMarkedAsNew 
                           ? '已标记为新增材料，后续入库时会自动创建材料条目' 
                           : selectedMatch 
                             ? '已关联现有材料，如需调整可重新选择'
                             : '当前资源尚未完成关联，请选择绑定方式'
                         }
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Bottom: Action Modes */}
           <div className="flex-1 grid grid-cols-2 gap-6">
              {/* Mode A: Search Match */}
              <div className={`rounded-lg border p-5 transition-all flex flex-col ${selectedMatch ? 'border-emerald-400 bg-emerald-50/60' : 'border-gray-200 bg-white hover:border-emerald-200'}`}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                       <i className="ri-search-2-line"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">关联已有材料</h4>
                      <p className="text-xs text-gray-500 mt-0.5">通过名称或编号查找已有材料</p>
                    </div>
                 </div>
                 
                 {/* Search Box */}
                 <div className="relative mb-4">
                   <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                   <input 
                     type="text" 
                     placeholder="请输入材料名称或编号" 
                     className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-gray-700 bg-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     disabled={isMarkedAsNew}
                   />
                 </div>

                 {/* Search Results */}
                 <div className="flex-1 overflow-y-auto space-y-2 max-h-[200px]">
                    {searchResults.length > 0 ? (
                       searchResults.map(result => (
                         <div 
                           key={result.id} 
                           className={`p-3 rounded-md border flex items-center justify-between transition-all ${
                             selectedMatch === result.id 
                               ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                               : 'bg-white border-gray-100 hover:border-emerald-300 text-gray-700'
                           }`}
                         >
                             <div>
                               <div className="font-medium text-sm">{result.name}</div>
                               <div className={`text-xs mt-0.5 ${selectedMatch === result.id ? 'text-emerald-50' : 'text-gray-400'}`}>{result.code}</div>
                             </div>
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleMatchSelect(result.id); }}
                               className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                                 selectedMatch === result.id 
                                   ? 'bg-white/20 hover:bg-white/30 text-white' 
                                   : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                               }`}
                             >
                               {selectedMatch === result.id ? '取消绑定' : '绑定'}
                             </button>
                         </div>
                       ))
                    ) : (
                       searchQuery && <p className="text-sm text-gray-400 text-center py-4">未找到匹配材料</p>
                    )}
                 </div>
              </div>

              {/* Mode B: Create New */}
              <div className={`rounded-lg border p-5 transition-all flex flex-col ${isMarkedAsNew ? 'border-emerald-400 bg-emerald-50/60' : 'border-gray-200 bg-white hover:border-emerald-200'}`}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                       <i className="ri-add-circle-line"></i>
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900">新增材料条目</h4>
                       <p className="text-xs text-gray-500 mt-0.5">适用于库中不存在的全新材料资源</p>
                    </div>
                 </div>

                 <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                   如果当前图像对应的是新材料，系统会在资源同步阶段按当前名称自动创建材料条目，并完成资源归档。
                 </p>

                 <button
                   onClick={handleMarkAsNew}
                   className={`w-full py-3 rounded-md font-bold transition-all flex items-center justify-center gap-2 ${
                     isMarkedAsNew 
                       ? 'bg-emerald-600 text-white shadow-sm' 
                       : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                   }`}
                 >
                   {isMarkedAsNew ? (
                     <>
                       <i className="ri-checkbox-circle-line"></i>
                       已标记为新增材料
                     </>
                   ) : (
                     '按当前名称新增材料'
                   )}
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between pt-6 border-t border-gray-100 shrink-0">
        <button
          onClick={onBack}
          className="px-8 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          上一步
        </button>
        <button
          onClick={onNext}
          className="px-8 py-2.5 bg-emerald-600 text-white rounded-md font-medium shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-2"
        >
          完成绑定并进入下一步
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}
