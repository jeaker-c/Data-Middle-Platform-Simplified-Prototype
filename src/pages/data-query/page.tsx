import { useState, useMemo, useCallback } from 'react';
import Navbar from '../home/components/Navbar';

interface DataItem {
  id: number;
  name: string;
  type: 'document' | 'image' | 'video' | 'table' | 'genotype' | 'phenotype';
  description: string;
  uploader: string;
  size: string;
  uploadTime: string;
  tags: string[];
  status: 'active' | 'archived' | 'processing';
}

const mockData: DataItem[] = [
  {
    id: 1,
    name: '玉米基因型数据_2025Q1.vcf',
    type: 'genotype',
    description: 'VCF格式，包含1000个样本的SNP数据',
    uploader: '张研究员',
    size: '45.2 MB',
    uploadTime: '2025-01-15 14:30',
    tags: ['基因型', '2025年', '第一季度', '玉米', 'SNP'],
    status: 'active'
  },
  {
    id: 2,
    name: '玉米表型观测_2025春季.xlsx',
    type: 'phenotype',
    description: '包含株高、穗长、粒重等15个性状数据',
    uploader: '李博士',
    size: '2.8 MB',
    uploadTime: '2025-01-15 11:20',
    tags: ['表型', '2025年', '春季', '玉米', '性状数据'],
    status: 'active'
  },
  {
    id: 3,
    name: '田间观察记录.jpg',
    type: 'image',
    description: '田间作物生长状态照片',
    uploader: '王助理',
    size: '3.5 MB',
    uploadTime: '2025-01-14 16:45',
    tags: ['图片', '田间记录', '2025年'],
    status: 'active'
  },
  {
    id: 4,
    name: '育种过程演示.mp4',
    type: 'video',
    description: '育种操作流程演示视频',
    uploader: '赵教授',
    size: '156.3 MB',
    uploadTime: '2025-01-13 09:15',
    tags: ['视频教程', '育种流程', '2025年'],
    status: 'active'
  },
  {
    id: 5,
    name: '基因测序结果.xlsx',
    type: 'table',
    description: '最新一批样本的基因测序数据',
    uploader: '张研究员',
    size: '5.7 MB',
    uploadTime: '2025-01-12 11:30',
    tags: ['基因数据', '测序结果', '2025年'],
    status: 'processing'
  },
  {
    id: 6,
    name: '实验室检测报告.pdf',
    type: 'document',
    description: '土壤和植物样本检测报告',
    uploader: '李博士',
    size: '2.1 MB',
    uploadTime: '2025-01-11 15:20',
    tags: ['检测报告', '实验室', '2025年'],
    status: 'active'
  },
  {
    id: 7,
    name: '玉米抗病性基因分析.vcf',
    type: 'genotype',
    description: '抗病性相关基因位点数据',
    uploader: '张研究员',
    size: '32.1 MB',
    uploadTime: '2025-01-10 09:45',
    tags: ['基因型', 'SNP', '抗病性', '玉米'],
    status: 'active'
  },
  {
    id: 8,
    name: '历史育种数据_2024.xlsx',
    type: 'table',
    description: '2024年全年育种数据汇总',
    uploader: '赵教授',
    size: '12.4 MB',
    uploadTime: '2025-01-08 14:20',
    tags: ['历史数据', '2024年', '育种数据'],
    status: 'archived'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'document': return 'ri-file-text-line';
    case 'table': return 'ri-file-excel-2-line';
    case 'image': return 'ri-image-line';
    case 'video': return 'ri-video-line';
    case 'genotype': return 'ri-dna-line';
    case 'phenotype': return 'ri-plant-line';
    default: return 'ri-file-line';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'document': return 'bg-orange-100 text-orange-600';
    case 'table': return 'bg-green-100 text-green-600';
    case 'image': return 'bg-pink-100 text-pink-600';
    case 'video': return 'bg-red-100 text-red-600';
    case 'genotype': return 'bg-teal-100 text-teal-600';
    case 'phenotype': return 'bg-lime-100 text-lime-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getTypeName = (type: string) => {
  switch (type) {
    case 'document': return '文档';
    case 'table': return '表格';
    case 'image': return '图片';
    case 'video': return '视频';
    case 'genotype': return '基因型';
    case 'phenotype': return '表型';
    default: return '其他';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">活跃</span>;
    case 'archived':
      return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">已归档</span>;
    case 'processing':
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full whitespace-nowrap">处理中</span>;
    default:
      return null;
  }
};

export default function DataQueryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUploader, setSelectedUploader] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sizeRange, setSizeRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<{ field: string; order: 'asc' | 'desc' }>({ field: 'uploadTime', order: 'desc' });
  const [showFilters, setShowFilters] = useState(false);

  const allTags = useMemo(() => Array.from(new Set(mockData.flatMap(item => item.tags))), []);
  const allUploaders = useMemo(() => Array.from(new Set(mockData.map(item => item.uploader))), []);

  const filteredData = useMemo(() => mockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesUploader = selectedUploader === 'all' || item.uploader === selectedUploader;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => item.tags.includes(tag));
    return matchesSearch && matchesType && matchesUploader && matchesStatus && matchesTags;
  }), [searchTerm, selectedType, selectedUploader, selectedStatus, selectedTags]);

  const sortedData = useMemo(() => [...filteredData].sort((a, b) => {
    const { field, order } = sortBy;
    let comparison = 0;

    switch (field) {
      case 'uploadTime':
        comparison = new Date(a.uploadTime).getTime() - new Date(b.uploadTime).getTime();
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'size':
        comparison = parseFloat(a.size) - parseFloat(b.size);
        break;
      case 'uploader':
        comparison = a.uploader.localeCompare(b.uploader);
        break;
      default:
        return 0;
    }

    return order === 'asc' ? comparison : -comparison;
  }), [filteredData, sortBy]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedItems.length === sortedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedData.map(item => item.id));
    }
  }, [selectedItems.length, sortedData]);

  const toggleSelectItem = useCallback((id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedUploader('all');
    setSelectedStatus('all');
    setSelectedTags([]);
    setDateRange({ start: '', end: '' });
    setSizeRange({ min: '', max: '' });
  }, []);

  const handleSort = useCallback((field: string) => {
    setSortBy(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, 
      { role: 'user' as const, content: chatInput }
    ];
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, 
        { 
          role: 'ai' as const, 
          content: `我理解您想查找"${chatInput}"。根据您的描述，我为您找到了 ${sortedData.length} 条相关数据。建议您可以：\n\n1. 使用数据类型筛选\n2. 选择特定的上传者\n3. 通过标签进行精确筛选\n\n需要我帮您进一步筛选吗？` 
        }
      ]);
    }, 500);
    
    setChatMessages(newMessages);
    setChatInput('');
  }, [chatInput, chatMessages, sortedData.length]);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <div className="pt-20">
        <section className="py-12 bg-white">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">智能数据查询</h2>
              <p className="text-gray-600">强大的筛选功能，快速定位您需要的数据</p>
            </div>

            {/* 左右布局 */}
            <div className="flex gap-6">
              {/* 左侧：搜索、筛选和表格 (75%) */}
              <div className="flex-1" style={{ width: '75%' }}>
                {/* 搜索栏 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 relative">
                      <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                      <input
                        type="text"
                        placeholder="搜索文件名、描述、标签..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`px-6 py-3 rounded-lg transition-all text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                        showFilters 
                          ? 'bg-teal-600 text-white hover:bg-teal-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className="ri-filter-3-line text-lg"></i>
                      筛选条件
                      <i className={`ri-arrow-${showFilters ? 'up' : 'down'}-s-line text-lg`}></i>
                    </button>
                  </div>

                  {/* 筛选条件展开区域 */}
                  {showFilters && (
                    <div className="border-t border-gray-200 pt-5 space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        {/* 数据类型 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">数据类型</label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          >
                            <option value="all">全部类型</option>
                            <option value="genotype">基因型</option>
                            <option value="phenotype">表型</option>
                            <option value="document">文档</option>
                            <option value="table">表格</option>
                            <option value="image">图片</option>
                            <option value="video">视频</option>
                          </select>
                        </div>

                        {/* 上传者 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">上传者</label>
                          <select
                            value={selectedUploader}
                            onChange={(e) => setSelectedUploader(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          >
                            <option value="all">全部上传者</option>
                            {allUploaders.map(uploader => (
                              <option key={uploader} value={uploader}>{uploader}</option>
                            ))}
                          </select>
                        </div>

                        {/* 数据状态 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">数据状态</label>
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          >
                            <option value="all">全部状态</option>
                            <option value="active">活跃</option>
                            <option value="processing">处理中</option>
                            <option value="archived">已归档</option>
                          </select>
                        </div>

                        {/* 清除筛选 */}
                        <div className="flex items-end">
                          <button
                            onClick={clearAllFilters}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                          >
                            <i className="ri-refresh-line"></i>
                            清除筛选
                          </button>
                        </div>
                      </div>

                      {/* 日期范围和文件大小 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">日期范围</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              value={dateRange.start}
                              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                              type="date"
                              value={dateRange.end}
                              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">文件大小 (MB)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={sizeRange.min}
                              onChange={(e) => setSizeRange({ ...sizeRange, min: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                              placeholder="最小"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                              type="number"
                              value={sizeRange.max}
                              onChange={(e) => setSizeRange({ ...sizeRange, max: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                              placeholder="最大"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 标签筛选 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">标签筛选</label>
                        <div className="flex flex-wrap gap-2">
                          {allTags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                                selectedTags.includes(tag)
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 结果统计 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      找到 <span className="font-semibold text-teal-600 text-base">{sortedData.length}</span> 条数据
                    </div>
                    {(selectedType !== 'all' || selectedUploader !== 'all' || selectedStatus !== 'all' || selectedTags.length > 0) && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">已应用筛选：</span>
                        {selectedType !== 'all' && (
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{getTypeName(selectedType)}</span>
                        )}
                        {selectedUploader !== 'all' && (
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{selectedUploader}</span>
                        )}
                        {selectedStatus !== 'all' && (
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{selectedStatus}</span>
                        )}
                        {selectedTags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedItems.length > 0 && (
                    <div className="text-sm text-gray-600">
                      已选择 <span className="font-semibold text-teal-600">{selectedItems.length}</span> 项
                    </div>
                  )}
                </div>

                {/* 操作栏 */}
                {selectedItems.length > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <span className="text-sm text-teal-700 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i>
                      已选择 <strong>{selectedItems.length}</strong> 项
                    </span>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2">
                        <i className="ri-download-line"></i>
                        批量下载
                      </button>
                      <button className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2">
                        <i className="ri-archive-line"></i>
                        批量归档
                      </button>
                      <button className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap flex items-center gap-2">
                        <i className="ri-delete-bin-line"></i>
                        批量删除
                      </button>
                    </div>
                  </div>
                )}

                {/* 数据表格 */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="w-12 px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedItems.length === sortedData.length && sortedData.length > 0}
                              onChange={toggleSelectAll}
                              className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">类型</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            <button
                              onClick={() => handleSort('name')}
                              className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors whitespace-nowrap"
                            >
                              文件名
                              <div className="flex flex-col">
                                <i className={`ri-arrow-up-s-line text-xs leading-none ${sortBy.field === 'name' && sortBy.order === 'asc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                                <i className={`ri-arrow-down-s-line text-xs leading-none -mt-1 ${sortBy.field === 'name' && sortBy.order === 'desc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                              </div>
                            </button>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">描述</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            <button
                              onClick={() => handleSort('uploader')}
                              className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors whitespace-nowrap"
                            >
                              上传者
                              <div className="flex flex-col">
                                <i className={`ri-arrow-up-s-line text-xs leading-none ${sortBy.field === 'uploader' && sortBy.order === 'asc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                                <i className={`ri-arrow-down-s-line text-xs leading-none -mt-1 ${sortBy.field === 'uploader' && sortBy.order === 'desc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                              </div>
                            </button>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            <button
                              onClick={() => handleSort('size')}
                              className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors whitespace-nowrap"
                            >
                              大小
                              <div className="flex flex-col">
                                <i className={`ri-arrow-up-s-line text-xs leading-none ${sortBy.field === 'size' && sortBy.order === 'asc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                                <i className={`ri-arrow-down-s-line text-xs leading-none -mt-1 ${sortBy.field === 'size' && sortBy.order === 'desc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                              </div>
                            </button>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            <button
                              onClick={() => handleSort('uploadTime')}
                              className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors whitespace-nowrap"
                            >
                              上传时间
                              <div className="flex flex-col">
                                <i className={`ri-arrow-up-s-line text-xs leading-none ${sortBy.field === 'uploadTime' && sortBy.order === 'asc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                                <i className={`ri-arrow-down-s-line text-xs leading-none -mt-1 ${sortBy.field === 'uploadTime' && sortBy.order === 'desc' ? 'text-teal-600' : 'text-gray-400'}`}></i>
                              </div>
                            </button>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">标签</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sortedData.map(item => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleSelectItem(item.id)}
                                className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                                <i className={`${getTypeIcon(item.type)} text-base`}></i>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-gray-600 max-w-xs truncate">{item.description}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-teal-700">{item.uploader.charAt(0)}</span>
                                </div>
                                <span className="text-sm text-gray-600">{item.uploader}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-gray-600">{item.size}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-gray-600">{item.uploadTime}</div>
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(item.status)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap">
                                    {tag}
                                  </span>
                                ))}
                                {item.tags.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap">
                                    +{item.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer" title="预览">
                                  <i className="ri-eye-line text-base"></i>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer" title="下载">
                                  <i className="ri-download-line text-base"></i>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer" title="删除">
                                  <i className="ri-delete-bin-line text-base"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {sortedData.length === 0 && (
                    <div className="text-center py-16">
                      <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500 text-lg mb-2">未找到匹配的数据</p>
                      <p className="text-gray-400 text-sm">试试调整筛选条件或使用智能助手</p>
                    </div>
                  )}

                  {/* 分页 */}
                  {sortedData.length > 0 && (
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        显示 <strong>1-{sortedData.length}</strong> 条，共 <strong>{sortedData.length}</strong> 条
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                          上一页
                        </button>
                        <button className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm cursor-pointer whitespace-nowrap">
                          1
                        </button>
                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                          2
                        </button>
                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                          3
                        </button>
                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                          下一页
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧：智能助手对话框 (25%) */}
              <div className="w-[400px] flex-shrink-0">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200 p-6 sticky top-24 h-[calc(100vh-120px)] flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-robot-line text-white text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 mb-1">智能搜索助手</h4>
                      <p className="text-sm text-gray-600">用自然语言描述您要查找的数据</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 flex-1 overflow-y-auto mb-4 shadow-sm">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <i className="ri-chat-smile-3-line text-5xl text-teal-600 mb-3"></i>
                        <p className="text-sm text-gray-600 mb-2">您好！我是您的智能搜索助手</p>
                        <p className="text-xs text-gray-500 mb-4">试试这样问我：</p>
                        <div className="space-y-2">
                          {[
                            '查找张研究员上传的基因型数据',
                            '最近一周的玉米相关数据',
                            '大于10MB的视频文件'
                          ].map((example, index) => (
                            <button
                              key={index}
                              onClick={() => setChatInput(example)}
                              className="block w-full text-left px-4 py-3 bg-teal-50 text-teal-700 text-sm rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"
                            >
                              <i className="ri-lightbulb-line mr-2"></i>
                              {example}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] px-4 py-3 rounded-lg text-sm ${
                                msg.role === 'user'
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                              style={{ whiteSpace: 'pre-line' }}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="例如：查找2025年1月的玉米基因型数据..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-3 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                    >
                      <i className="ri-send-plane-fill text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
