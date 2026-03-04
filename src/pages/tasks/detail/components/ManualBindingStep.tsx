import { useState } from 'react';

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

interface SearchResult {
  id: string;
  name: string;
  code: string;
}

export default function ManualBindingStep({ onNext, onBack }: ManualBindingStepProps) {
  const [selectedItem, setSelectedItem] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Data: Items that need fixing
  const fixItems: FixItem[] = [
    { id: '1', fileName: 'IMG_A002_Soybean.png', thumbnail: '', issueType: 'format' },
    { id: '2', fileName: '损坏的图片文件.jpg', thumbnail: '', issueType: 'corrupted' },
    { id: '3', fileName: 'IMG_B003_Rice.jpg', thumbnail: '', issueType: 'unmatched' },
    { id: '4', fileName: 'A004_Wheat.webp', thumbnail: '', issueType: 'format' },
  ];

  const currentItem = fixItems.find(item => item.id === selectedItem) || fixItems[0];

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Mock Data: Search Results
  const allSearchResults: SearchResult[] = [
    { id: 'M001', name: '超级水稻-深优1号', code: 'B003-V2' },
    { id: 'M002', name: '抗盐碱稻-3号', code: 'B004' },
    { id: 'M003', name: '丰产麦-21', code: 'C109' },
  ];

  // Filter results based on search query
  const searchResults = searchQuery.trim() 
    ? allSearchResults.filter(item => 
        item.name.includes(searchQuery) || item.code.includes(searchQuery)
      )
    : [];

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
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 border ${
                  selectedItem === item.id 
                    ? 'bg-teal-50 border-teal-500 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                   selectedItem === item.id ? 'bg-white text-teal-600' : 'bg-gray-100 text-gray-400'
                }`}>
                   <i className="ri-image-line"></i>
                </div>
                <div className="min-w-0">
                   <p className={`text-sm font-bold truncate ${selectedItem === item.id ? 'text-teal-900' : 'text-gray-700'}`}>
                     {item.fileName}
                   </p>
                   {/* Optional: Show issue type badge if needed, kept simple per prototype */}
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
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">当前文件名</label>
                 <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-lg font-bold text-gray-800 flex items-center justify-between">
                    {currentItem.fileName}
                 </div>
                 
                 <div className="mt-6 flex gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                      <i className="ri-alert-line mr-1"></i>
                      {currentItem.issueType === 'corrupted' && '文件损坏'}
                      {currentItem.issueType === 'unmatched' && '库匹配失败'}
                      {currentItem.issueType === 'duplicate' && '文件重名'}
                    </span>
                 </div>
              </div>
           </div>

           {/* Bottom: Search & Bind */}
           <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">材料库手动关联</label>
              
              {/* Search Box */}
              <div className="flex gap-3 mb-6">
                 <div className="relative flex-1">
                   <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                   <input 
                     type="text" 
                     placeholder="输入编号或名称搜索..." 
                     className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-gray-700"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>
                 <button className="px-8 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                   立即检索
                 </button>
              </div>

              {/* Search Results */}
              <div className="space-y-3">
                 {searchResults.length > 0 ? (
                    searchResults.map(result => (
                      <div 
                        key={result.id} 
                        onClick={() => setSelectedMatch(result.id)}
                        className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedMatch === result.id 
                            ? 'bg-teal-50 border-teal-500 shadow-[0_0_0_1px_rgba(20,184,166,1)]' 
                            : 'bg-white border-gray-100 hover:border-teal-500 hover:shadow-[0_4px_12px_rgba(20,184,166,0.1)]'
                        }`}
                      >
                          <div>
                            <span className={`font-bold ${selectedMatch === result.id ? 'text-teal-900' : 'text-gray-800'}`}>{result.name}</span>
                            <span className="ml-2 text-gray-500 font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">({result.code})</span>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedMatch === result.id ? 'border-teal-600' : 'border-gray-200 group-hover:border-teal-500'
                          }`}>
                            <div className={`w-3 h-3 rounded-full bg-teal-600 transition-opacity ${
                              selectedMatch === result.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}></div>
                          </div>
                      </div>
                    ))
                 ) : (
                    searchQuery && (
                      <div className="text-center py-8 text-gray-400">
                        <i className="ri-search-2-line text-2xl mb-2"></i>
                        <p>未找到匹配的材料</p>
                      </div>
                    )
                 )}
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