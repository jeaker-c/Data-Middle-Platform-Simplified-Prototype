interface BatchActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export default function BatchActionBar({ selectedCount, onClearSelection }: BatchActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-6 z-20 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3">
        <span className="font-medium">{selectedCount} 项已选择</span>
        <button 
          onClick={onClearSelection}
          className="text-gray-400 hover:text-white text-sm"
        >
          取消
        </button>
      </div>
      
      <div className="h-4 w-px bg-gray-700"></div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
          <i className="ri-download-cloud-2-line"></i>
          批量下载
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
          <i className="ri-price-tag-3-line"></i>
          打标签
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
          <i className="ri-file-list-3-line"></i>
          导出清单
        </button>
      </div>
    </div>
  );
}
