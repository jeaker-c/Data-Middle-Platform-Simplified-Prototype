import { Material } from '../types';
import { useState } from 'react';

interface MaterialDrawerProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialDrawer({ material, isOpen, onClose }: MaterialDrawerProps) {
  const [activeTab, setActiveTab] = useState('试验');

  if (!isOpen || !material) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-xl border-l border-gray-200 z-10 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{material.name}</h2>
            <span className="text-sm text-gray-400">#{material.id}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {material.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
            <button className="text-teal-600 text-xs hover:underline flex items-center gap-1">
              <i className="ri-edit-line"></i> 编辑标签
            </button>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-b border-gray-100 flex gap-3">
        <button className="flex-1 py-2 px-4 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
          <i className="ri-download-cloud-2-line mr-1"></i> 下载全部数据
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          查看详情
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6">
        {['试验', '表型', '基因型', '环境', '图像', '血缘'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'border-teal-600 text-teal-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === '图像' ? (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">相关图像资源 (3)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                  <i className="ri-image-line text-3xl"></i>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
                    <i className="ri-eye-line"></i>
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">幼苗期</span>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                  <i className="ri-image-line text-3xl"></i>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
                    <i className="ri-eye-line"></i>
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">抽穗期</span>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                  <i className="ri-image-line text-3xl"></i>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
                    <i className="ri-eye-line"></i>
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">成熟期</span>
              </div>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 text-xs text-teal-800">
              <i className="ri-information-line mr-1"></i>
              支持查看该材料在不同生长周期的表型图像记录。
            </div>
          </div>
        ) : (
          <div className="space-y-6">
              {/* Mock Content for other tabs */}
              <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">关联试验 ({material.experimentCount})</h3>
                  <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <div className="font-medium text-gray-900 text-sm">202{5-i}年度玉米抗旱试验</div>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                  <span><i className="ri-calendar-line"></i> 202{5-i}</span>
                                  <span><i className="ri-map-pin-line"></i> 杨凌</span>
                                  <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">表型</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">基本属性</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-500">创建时间</div>
                      <div className="text-gray-900 text-right">{material.updateTime || '2024-01-15'}</div>
                      <div className="text-gray-500">数据版本</div>
                      <div className="text-gray-900 text-right">v1.2</div>
                  </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
