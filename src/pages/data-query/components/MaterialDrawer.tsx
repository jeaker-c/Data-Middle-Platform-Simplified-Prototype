import { Material } from '../types';
import { useState } from 'react';

interface MaterialDrawerProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialDrawer({ material, isOpen, onClose }: MaterialDrawerProps) {
  const [activeTab, setActiveTab] = useState('试验');
  const [selectedExperiment, setSelectedExperiment] = useState('2024年度玉米抗旱试验');
  const [selectedSite, setSelectedSite] = useState('杨凌');
  const [selectedReplicate, setSelectedReplicate] = useState('重复1');

  if (!isOpen || !material) return null;

  const phenotypeExperiments = ['2024年度玉米抗旱试验', '2025年度玉米抗旱试验'];
  const phenotypeSites = [
    { id: '杨凌', disabled: false },
    { id: '张掖', disabled: false }
  ];
  const phenotypeReplicates = ['重复1', '重复2', '重复3'];
  const phenotypeMatrix = [
    { name: '株高', code: 'PH', value: 310.5, unit: 'CM' },
    { name: '穗位高', code: 'EH', value: 157.0, unit: 'CM' },
    { name: '小区重量', code: 'PW', value: 12.5, unit: 'KG' },
    { name: '小区水份', code: 'PM', value: 27.3, unit: '%' },
    { name: '穗长', code: 'EL', value: 18.2, unit: 'CM' },
    { name: '穗粗', code: 'ED', value: 4.6, unit: 'CM' }
  ];

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
        {['试验', '表型', '基因型', '图像', '系谱'].map((tab) => (
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
        {activeTab === '基因型' ? (
          <div className="space-y-4">
            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-dna-line text-teal-600"></i>
                基因型质控摘要
              </div>
              <div className="p-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-500">缺失率 (Missing)</div>
                    <div className="mt-1 text-lg font-bold text-gray-900">0.12%</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-500">杂合率 (Hetero)</div>
                    <div className="mt-1 text-lg font-bold text-gray-900">4.80%</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-500">有效 SNP 数</div>
                    <div className="mt-1 text-lg font-bold text-gray-900">{material.genotypeSiteCount ?? 45230}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === '系谱' ? (
          <div className="space-y-4">
            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-node-tree text-teal-600"></i>
                系谱
              </div>
              <div className="p-4">
                <div className="text-sm font-mono text-gray-900">XYNO_004/XYNO_624</div>
              </div>
            </div>
          </div>
        ) : activeTab === '图像' ? (
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
        ) : activeTab === '表型' ? (
          <div className="space-y-4">
            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-links-line text-teal-600"></i>
                选择关联试验
              </div>
              <div className="p-3 flex flex-wrap gap-2">
                {phenotypeExperiments.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setSelectedExperiment(exp)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      selectedExperiment === exp
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-map-pin-line text-teal-600"></i>
                数据来源试验点
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {phenotypeSites.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (s.disabled) return;
                      setSelectedSite(s.id);
                    }}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                      s.disabled
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                        : selectedSite === s.id
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-repeat-2-line text-teal-600"></i>
                重复
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {phenotypeReplicates.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedReplicate(r)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                      selectedReplicate === r
                        ? 'bg-teal-50 text-teal-800 border-teal-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="border rounded-xl bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b bg-gray-50 flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <i className="ri-pulse-line text-teal-600"></i>
                  表型数据详情
                </div>
                <div className="text-xs font-semibold text-gray-500">记录条数: 10</div>
              </div>
              <div className="p-2.5 grid grid-cols-2 gap-2">
                {phenotypeMatrix.map((m) => (
                  <div key={m.code} className="border border-gray-200 rounded-md p-2.5">
                    <div className="text-[11px] text-gray-500 font-semibold truncate">
                      {m.name} ({m.code})
                    </div>
                    <div className="mt-1 text-lg font-bold text-gray-900 leading-none">
                      {m.value.toFixed(1)} <span className="text-[11px] font-bold text-gray-400">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
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
