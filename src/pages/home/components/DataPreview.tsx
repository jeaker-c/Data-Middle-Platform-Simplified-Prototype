import { useState, useMemo, useCallback } from 'react';

// Static data moved outside component
const dataTypes = [
  { id: 'all', label: '全部数据', icon: 'ri-database-2-line', count: 6 },
  { id: 'genotype', label: '基因型数据', icon: 'ri-dna-line', count: 2 },
  { id: 'phenotype', label: '表型数据', icon: 'ri-plant-line', count: 2 },
  { id: 'image', label: '图片', icon: 'ri-image-line', count: 1 },
  { id: 'video', label: '视频', icon: 'ri-video-line', count: 1 }
];

const uploaders = ['全部上传者', '张研究员', '李博士', '王助理', '赵教授'];
const timeRanges = ['全部时间', '今天', '本周', '本月', '本季度', '今年'];
const availableTags = ['2025年', '第一季度', '春季', 'SNP', '抗病性', '田间观测'];

const mockData = [
  {
    id: 1,
    name: '玉米基因型数据_2025Q1.vcf',
    type: 'genotype',
    size: '45.2 MB',
    date: '2025-01-15 14:30',
    uploader: '张研究员',
    tags: ['基因型', '2025年', '第一季度', '玉米'],
    description: 'VCF格式，包含1000个样本的SNP数据'
  },
  {
    id: 2,
    name: '玉米表型观测_2025春季.xlsx',
    type: 'phenotype',
    size: '2.8 MB',
    date: '2025-01-15 11:20',
    uploader: '李博士',
    tags: ['表型', '2025年', '春季', '玉米'],
    description: '包含株高、穗长、粒重等15个性状数据'
  },
  {
    id: 3,
    name: '玉米田间照片_2025_01.jpg',
    type: 'image',
    size: '8.5 MB',
    date: '2025-01-14 16:45',
    uploader: '王助理',
    tags: ['图片', '2025年', '田间观测', '玉米'],
    description: '玉米生长期田间观测照片'
  },
  {
    id: 4,
    name: '玉米抗病性基因分析.vcf',
    type: 'genotype',
    size: '32.1 MB',
    date: '2025-01-13 09:15',
    uploader: '张研究员',
    tags: ['基因型', '2025年', 'SNP', '抗病性', '玉米'],
    description: '抗病性相关基因位点数据'
  },
  {
    id: 5,
    name: '玉米生长观测视频.mp4',
    type: 'video',
    size: '156.3 MB',
    date: '2025-01-12 14:20',
    uploader: '赵教授',
    tags: ['视频', '2025年', '田间观测', '玉米'],
    description: '玉米生长周期延时摄影'
  },
  {
    id: 6,
    name: '玉米产量性状数据.xlsx',
    type: 'phenotype',
    size: '4.2 MB',
    date: '2025-01-10 10:30',
    uploader: '李博士',
    tags: ['表型', '2025年', '第一季度', '玉米'],
    description: '包含产量、千粒重等性状数据'
  }
];

// Helper functions moved outside
const getTypeIcon = (type: string) => {
  switch(type) {
    case 'genotype': return 'ri-dna-line';
    case 'phenotype': return 'ri-plant-line';
    case 'image': return 'ri-image-line';
    case 'video': return 'ri-video-line';
    default: return 'ri-file-line';
  }
};

const getTypeLabel = (type: string) => {
  switch(type) {
    case 'genotype': return '基因型';
    case 'phenotype': return '表型';
    case 'image': return '图片';
    case 'video': return '视频';
    default: return '其他';
  }
};

export default function DataPreview() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedUploader, setSelectedUploader] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredData = useMemo(() => mockData.filter(item => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedUploader !== 'all' && item.uploader !== selectedUploader) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag))) return false;
    return true;
  }), [selectedType, selectedUploader, searchQuery, selectedTags]);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, 
      { role: 'user', content: chatInput },
      { role: 'ai', content: `正在为您搜索"${chatInput}"相关的数据...已找到 ${filteredData.length} 条匹配结果。` }
    ]);
    setChatInput('');
  }, [chatInput, filteredData.length]);

  const toggleRowSelection = useCallback((id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(item => item.id));
    }
  }, [selectedRows.length, filteredData]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedType('all');
    setSelectedUploader('all');
    setSelectedTimeRange('all');
    setSelectedTags([]);
    setSearchQuery('');
  }, []);

  return (
    <section id="data-preview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">数据预览与搜索</h2>
          <p className="text-gray-600">快速检索和预览您的育种数据</p>
        </div>

        <div className="flex gap-6">
          {/* 左侧筛选区 */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
              {/* 数据类型 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">数据类型</h3>
                <div className="space-y-1">
                  {dataTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        selectedType === type.id
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <i className={`${type.icon} text-base`}></i>
                        <span>{type.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{type.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 上传者 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">上传者</h3>
                <select
                  value={selectedUploader}
                  onChange={(e) => setSelectedUploader(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  {uploaders.map(uploader => (
                    <option key={uploader} value={uploader === '全部上传者' ? 'all' : uploader}>
                      {uploader}
                    </option>
                  ))}
                </select>
              </div>

              {/* 时间范围 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">时间范围</h3>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  {timeRanges.map(range => (
                    <option key={range} value={range === '全部时间' ? 'all' : range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* 标签 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTags(prev =>
                          prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${
                        selectedTags.includes(tag)
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 清除筛选 */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line mr-2"></i>
                清除筛选
              </button>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1">
            {/* 搜索栏 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="text"
                    placeholder="搜索文件名、描述..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  onClick={() => setShowAIChat(!showAIChat)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-robot-line mr-2"></i>
                  智能搜索
                </button>
              </div>

              {/* AI 对话框 */}
              {showAIChat && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-3">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm">
                        <i className="ri-robot-line text-3xl mb-2"></i>
                        <p>您好！我是智能搜索助手</p>
                        <p className="text-xs mt-1">您可以用自然语言描述您要查找的数据</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                                msg.role === 'user'
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-white border border-gray-200 text-gray-700'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="例如：查找2025年1月的玉米基因型数据"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      发送
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 结果统计 */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                找到 <span className="font-semibold text-teal-600">{filteredData.length}</span> 条数据
              </div>
              {selectedRows.length > 0 && (
                <div className="text-sm text-gray-600">
                  已选择 <span className="font-semibold text-teal-600">{selectedRows.length}</span> 条
                </div>
              )}
            </div>

            {/* 数据表格 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">类型</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">文件名</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">描述</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">上传者</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">大小</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">上传时间</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">标签</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRowSelection(item.id)}
                            className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-teal-50 rounded-lg">
                              <i className={`${getTypeIcon(item.type)} text-teal-600`}></i>
                            </div>
                            <span className="text-xs text-gray-600">{getTypeLabel(item.type)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-gray-600 max-w-xs truncate">{item.description}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-700">{item.uploader}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{item.size}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{item.date}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded whitespace-nowrap"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded whitespace-nowrap">
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer">
                              <i className="ri-eye-line"></i>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer">
                              <i className="ri-download-line"></i>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-inbox-line text-5xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">暂无数据</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
