import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  type: string;
  existingTags: string[];
}

const MOCK_FILES: FileItem[] = [
  { id: '1', name: '2025_Spring_Yield_Data.xlsx', uploadDate: '2025-01-15', size: '2.5MB', type: 'Phenotype', existingTags: ['Yield'] },
  { id: '2', name: 'Genotype_Batch_2024.vcf', uploadDate: '2024-12-20', size: '1.2GB', type: 'Genotype', existingTags: [] },
  { id: '3', name: 'Field_Notes_Site_A.csv', uploadDate: '2025-02-01', size: '450KB', type: 'Environment', existingTags: ['Site A'] },
  { id: '4', name: 'Breeding_Plan_2026.pdf', uploadDate: '2025-02-10', size: '5.1MB', type: 'Document', existingTags: ['Plan'] },
  { id: '5', name: 'Soil_Analysis_Report.xlsx', uploadDate: '2025-01-05', size: '1.8MB', type: 'Environment', existingTags: ['Soil'] },
];

interface Tag {
  key: string;
  value: string;
}

interface BatchTagModalProps {
  show: boolean;
  onClose: () => void;
}

export default function BatchTagModal({ show, onClose }: BatchTagModalProps) {
  const [step, setStep] = useState(1);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!show) return null;

  const filteredFiles = MOCK_FILES.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedFileIds.length === filteredFiles.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(filteredFiles.map(f => f.id));
    }
  };

  const handleToggleFile = (id: string) => {
    if (selectedFileIds.includes(id)) {
      setSelectedFileIds(selectedFileIds.filter(fid => fid !== id));
    } else {
      setSelectedFileIds([...selectedFileIds, id]);
    }
  };

  const handleAddTag = () => {
    if (currentKey && currentValue) {
      setTags([...tags, { key: currentKey, value: currentValue }]);
      setCurrentKey('');
      setCurrentValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleApply = () => {
    // Mock API call
    console.log('Applying tags', tags, 'to files', selectedFileIds);
    // Reset and close
    setStep(1);
    setSelectedFileIds([]);
    setTags([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">批量标签管理</h3>
            <p className="text-sm text-gray-500 mt-1">
              {step === 1 ? '第一步：选择需要打标签的文件' : '第二步：配置标签信息'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">
          {step === 1 ? (
            <div className="h-full flex flex-col">
              {/* Search & Filter */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="搜索文件名、类型..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  已选 <span className="font-bold text-teal-600">{selectedFileIds.length}</span> 个文件
                </div>
              </div>

              {/* File List */}
              <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 w-12">
                        <input
                          type="checkbox"
                          checked={selectedFileIds.length === filteredFiles.length && filteredFiles.length > 0}
                          onChange={handleSelectAll}
                          className="rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                        />
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">文件名</th>
                      <th className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">类型</th>
                      <th className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">大小</th>
                      <th className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">上传时间</th>
                      <th className="px-4 py-3 border-b border-gray-200 font-medium text-gray-700">现有标签</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredFiles.map(file => (
                      <tr 
                        key={file.id} 
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedFileIds.includes(file.id) ? 'bg-teal-50/50' : ''}`}
                        onClick={() => handleToggleFile(file.id)}
                      >
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedFileIds.includes(file.id)}
                            onChange={() => handleToggleFile(file.id)}
                            className="rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-900 font-medium">{file.name}</td>
                        <td className="px-4 py-3 text-gray-600">{file.type}</td>
                        <td className="px-4 py-3 text-gray-600">{file.size}</td>
                        <td className="px-4 py-3 text-gray-600">{file.uploadDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {file.existingTags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-full flex gap-8">
              {/* Left: Selected Files Summary */}
              <div className="w-1/3 border-r border-gray-200 pr-8 overflow-y-auto">
                <h4 className="text-sm font-bold text-gray-900 mb-4">已选文件 ({selectedFileIds.length})</h4>
                <div className="space-y-2">
                  {MOCK_FILES.filter(f => selectedFileIds.includes(f.id)).map(file => (
                    <div key={file.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-file-text-line text-teal-600"></i>
                        <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                      </div>
                      <div className="text-xs text-gray-500 pl-6">
                        {file.type} • {file.size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Tag Configuration */}
              <div className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">添加标签</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">标签名称</label>
                      <input
                        type="text"
                        list="tag-keys"
                        placeholder="例如：育种项目"
                        value={currentKey}
                        onChange={(e) => setCurrentKey(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <datalist id="tag-keys">
                        <option value="育种项目" />
                        <option value="育种策略" />
                        <option value="年份" />
                        <option value="地点" />
                        <option value="负责人" />
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">标签值</label>
                      <input
                        type="text"
                        placeholder="例如：2026TC1"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddTag}
                    disabled={!currentKey || !currentValue}
                    className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    添加到列表
                  </button>
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">待应用标签</h4>
                  {tags.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <i className="ri-price-tag-3-line text-3xl mb-2"></i>
                      <p className="text-sm">暂无标签，请在上处添加</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-100 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-white text-teal-700 text-xs font-bold rounded border border-teal-200">
                              {tag.key}
                            </span>
                            <span className="text-sm text-gray-700">{tag.value}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveTag(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <i className="ri-close-circle-line text-lg"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={selectedFileIds.length === 0}
                className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed cursor-pointer"
              >
                下一步
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                上一步
              </button>
              <button
                onClick={handleApply}
                disabled={tags.length === 0}
                className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed cursor-pointer"
              >
                确认应用
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
