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
    { id: '1', fileName: 'A001_Corn_New', thumbnail: '', issueType: 'unmatched', status: 'new' }, // Example of marked as new
    { id: '2', fileName: 'IMG_B003_Rice.jpg', thumbnail: '', issueType: 'unmatched', status: 'pending' },
    { id: '3', fileName: 'IMG_A002_Soybean.png', thumbnail: '', issueType: 'format', status: 'matched' }, // Example of matched
    { id: '4', fileName: '损坏的图片文件.jpg', thumbnail: '', issueType: 'corrupted', status: 'pending' },
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
    { id: 'M001', name: '超级水稻-深优1号', code: 'B003-V2' },
    { id: 'M002', name: '抗盐碱稻-3号', code: 'B004' },
    { id: 'M003', name: '丰产麦-21', code: 'C109' },
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
        <div className="w-80 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-5 border-b border-gray-100 bg-red-50/30">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-error-warning-line text-red-500"></i>
              待修正项 ({fixItems.length})
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {fixItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 border relative overflow-hidden ${
                  selectedItem === item.id 
                    ? 'bg-teal-50 border-teal-500 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                {/* Status Indicator Bar */}
                {item.status === 'new' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>}
                {item.status === 'matched' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>}
                {item.status === 'pending' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                   selectedItem === item.id ? 'bg-white text-teal-600' : 'bg-gray-100 text-gray-400'
                }`}>
                   <i className="ri-image-line"></i>
                </div>
                <div className="min-w-0 flex-1">
                   <div className="flex justify-between items-center mb-0.5">
                     <p className={`text-sm font-bold truncate ${selectedItem === item.id ? 'text-teal-900' : 'text-gray-700'}`}>
                       {item.fileName}
                     </p>
                     {/* Status Badge */}
                     {item.status === 'new' && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">NEW</span>}
                     {item.status === 'matched' && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">MATCH</span>}
                   </div>
                   <p className="text-xs text-red-400 truncate">
                      {item.status === 'matched' && <span className="text-green-600">已关联现有材料</span>}
                      {item.status === 'new' && <span className="text-purple-600">已标记为新材料</span>}
                      {item.status === 'pending' && (
                        <>
                          {item.issueType === 'unmatched' && '原因: 库中无匹配材料'}
                          {item.issueType === 'duplicate' && '原因: 文件名重复'}
                          {item.issueType === 'corrupted' && '原因: 文件损坏'}
                          {item.issueType === 'format' && '原因: 格式不合规'}
                        </>
                      )}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Workspace */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col">
           {/* Top: Image Preview & Name */}
           <div className="flex gap-8 mb-10">
              <div className="w-48 h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center shrink-0">
                 {currentItem.thumbnail ? (
                   <img src={currentItem.thumbnail} alt="" className="w-full h-full object-cover rounded-2xl" />
                 ) : (
                   <i className="ri-image-line text-6xl text-gray-200"></i>
                 )}
              </div>
              <div className="flex-1 pt-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">当前名称标识 (文件夹名)</label>
                 <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-2xl font-bold text-gray-900 flex items-center justify-between">
                    {currentItem.fileName}
                 </div>
                 
                 <div className="mt-6">
                    <div className={`border rounded-xl p-4 flex gap-3 items-start transition-colors ${
                      isMarkedAsNew 
                        ? 'bg-purple-50 border-purple-100' 
                        : selectedMatch 
                          ? 'bg-green-50 border-green-100'
                          : 'bg-red-50 border-red-100'
                    }`}>
                       {isMarkedAsNew ? (
                         <i className="ri-add-circle-line text-purple-500 mt-0.5"></i>
                       ) : selectedMatch ? (
                         <i className="ri-checkbox-circle-line text-green-500 mt-0.5"></i>
                       ) : (
                         <i className="ri-shield-keyhole-line text-red-500 mt-0.5"></i>
                       )}
                       
                       <p className={`text-sm font-medium ${
                         isMarkedAsNew 
                           ? 'text-purple-700' 
                           : selectedMatch 
                             ? 'text-green-700'
                             : 'text-red-700'
                       }`}>
                         {isMarkedAsNew 
                           ? '已标记为新材料，将自动创建新条目' 
                           : selectedMatch 
                             ? '已关联现有材料，点击下方可修改'
                             : '未找到匹配的库内材料，请选择后续处理方式'
                         }
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Bottom: Action Modes */}
           <div className="flex-1 grid grid-cols-2 gap-8">
              {/* Mode A: Search Match */}
              <div className={`rounded-2xl border-2 p-6 transition-all flex flex-col ${selectedMatch ? 'border-teal-500 bg-teal-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                       <i className="ri-search-2-line"></i>
                    </div>
                    <h4 className="font-bold text-gray-900">搜索匹配材料</h4>
                 </div>
                 
                 {/* Search Box */}
                 <div className="relative mb-4">
                   <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                   <input 
                     type="text" 
                     placeholder="输入材料名/编号" 
                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-700 bg-white"
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
                           className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                             selectedMatch === result.id 
                               ? 'bg-teal-600 border-teal-600 text-white shadow-md' 
                               : 'bg-white border-gray-100 hover:border-teal-500 text-gray-700'
                           }`}
                         >
                             <div className="font-medium text-sm">{result.name}</div>
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleMatchSelect(result.id); }}
                               className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                 selectedMatch === result.id 
                                   ? 'bg-white/20 hover:bg-white/30 text-white' 
                                   : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                               }`}
                             >
                               {selectedMatch === result.id ? '取消绑定' : '绑定'}
                             </button>
                         </div>
                       ))
                    ) : (
                       searchQuery && <p className="text-sm text-gray-400 text-center py-4">无匹配结果</p>
                    )}
                 </div>
              </div>

              {/* Mode B: Create New */}
              <div className={`rounded-2xl border-2 p-6 transition-all flex flex-col ${isMarkedAsNew ? 'border-purple-500 bg-purple-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                       <i className="ri-add-circle-line"></i>
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900">以该名新建材料</h4>
                    </div>
                 </div>

                 <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                   如果这是一个全新的品种或批次，系统将在入库确认阶段自动为您在数据库中创建同名材料条目。
                 </p>

                 <button
                   onClick={handleMarkAsNew}
                   className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                     isMarkedAsNew 
                       ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                 >
                   {isMarkedAsNew ? (
                     <>
                       <i className="ri-checkbox-circle-line"></i>
                       已标记为新建
                     </>
                   ) : (
                     '标记为新建材料项'
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
          className="px-8 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          上一步
        </button>
        <button
          onClick={onNext}
          className="px-8 py-2.5 bg-teal-600 text-white rounded-full font-medium shadow-sm hover:bg-teal-700 hover:shadow-md transition-all flex items-center gap-2"
        >
          完成所有图片匹配
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}
