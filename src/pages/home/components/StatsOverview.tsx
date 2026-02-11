import { useState, useCallback } from 'react';

const stats = [
  {
    icon: 'ri-database-2-line',
    label: '总数据量',
    value: '12,847',
    unit: '条',
    color: 'text-teal-600 bg-teal-50',
    trend: '+15%'
  },
  {
    icon: 'ri-upload-cloud-line',
    label: '本周上传',
    value: '1,234',
    unit: '条',
    color: 'text-green-600 bg-green-50',
    trend: '+23%'
  },
  {
    icon: 'ri-dna-line',
    label: '基因型数据',
    value: '1,876',
    unit: '条',
    color: 'text-blue-600 bg-blue-50',
    trend: '+8%'
  },
  {
    icon: 'ri-plant-line',
    label: '表型数据',
    value: '3,245',
    unit: '条',
    color: 'text-purple-600 bg-purple-50',
    trend: '+12%'
  }
];

// 基因型数据列表
const genotypeData = [
  { id: 1, name: '玉米基因型数据_2025Q1.vcf', size: '45.2 MB', time: '2025-01-15 14:30', user: '张研究员', status: 'completed' },
  { id: 2, name: '玉米SNP标记_2025.csv', size: '12.3 MB', time: '2025-01-13 15:20', user: '张研究员', status: 'completed' },
  { id: 3, name: '玉米基因组测序_2025.fastq', size: '128.5 MB', time: '2025-01-12 09:30', user: '李博士', status: 'processing' },
  { id: 4, name: '玉米分子标记_2025.txt', size: '8.7 MB', time: '2025-01-11 16:45', user: '王助理', status: 'completed' }
];

// 表型数据列表
const phenotypeData = [
  { id: 1, name: '玉米表型观测_2025春季.xlsx', size: '2.8 MB', time: '2025-01-15 11:20', user: '李博士', status: 'completed' },
  { id: 2, name: '玉米抗病性评估_2025.xlsx', size: '1.5 MB', time: '2025-01-12 10:30', user: '李博士', status: 'completed' },
  { id: 3, name: '玉米产量数据_2025.csv', size: '3.2 MB', time: '2025-01-10 14:15', user: '赵教授', status: 'completed' },
  { id: 4, name: '玉米生长周期记录_2025.xlsx', size: '4.1 MB', time: '2025-01-08 09:00', user: '王助理', status: 'processing' }
];

export default function StatsOverview() {
  const [selectedGenotype, setSelectedGenotype] = useState<number[]>([]);
  const [selectedPhenotype, setSelectedPhenotype] = useState<number[]>([]);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processType, setProcessType] = useState<'vcf' | 'phenotype' | null>(null);

  const handleSelectGenotype = useCallback((id: number) => {
    setSelectedGenotype(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectPhenotype = useCallback((id: number) => {
    setSelectedPhenotype(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleProcess = useCallback((type: 'vcf' | 'phenotype') => {
    setProcessType(type);
    setShowProcessModal(true);
  }, []);

  return (
    <section className="pb-8">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">数据概览</h2>
          <p className="text-sm text-gray-500 mt-1">实时监控平台数据状态，掌握最新动态</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 flex items-center justify-center ${stat.color} rounded-lg`}>
                  <i className={`${stat.icon} text-2xl`}></i>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 基因型数据 */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">基因型数据</h3>
              <button
                onClick={() => handleProcess('vcf')}
                disabled={selectedGenotype.length === 0}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedGenotype.length > 0
                    ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <i className="ri-file-transfer-line mr-2"></i>
                下机数据转VCF
              </button>
            </div>

            <div className="space-y-3">
              {genotypeData.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGenotype.includes(file.id)}
                        onChange={() => handleSelectGenotype(file.id)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                      />
                    </label>
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg flex-shrink-0">
                      <i className="ri-dna-line text-xl text-blue-600"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm truncate">{file.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.user}</span>
                        <span>•</span>
                        <span>{file.time}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {file.status === 'completed' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                          已完成
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
                          处理中
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedGenotype.length > 0 && (
              <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-teal-700">
                  <i className="ri-information-line mr-2"></i>
                  已选择 {selectedGenotype.length} 个文件
                </p>
              </div>
            )}
          </div>

          {/* 表型数据 */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">表型数据</h3>
              <button
                onClick={() => handleProcess('phenotype')}
                disabled={selectedPhenotype.length === 0}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedPhenotype.length > 0
                    ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <i className="ri-file-check-line mr-2"></i>
                表型数据处理
              </button>
            </div>

            <div className="space-y-3">
              {phenotypeData.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPhenotype.includes(file.id)}
                        onChange={() => handleSelectPhenotype(file.id)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                      />
                    </label>
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg flex-shrink-0">
                      <i className="ri-plant-line text-xl text-purple-600"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm truncate">{file.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.user}</span>
                        <span>•</span>
                        <span>{file.time}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {file.status === 'completed' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                          已完成
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">
                          处理中
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedPhenotype.length > 0 && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700">
                  <i className="ri-information-line mr-2"></i>
                  已选择 {selectedPhenotype.length} 个文件
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 处理弹窗 */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {processType === 'vcf' ? '下机数据转VCF' : '表型数据处理'}
              </h3>
              <button
                onClick={() => setShowProcessModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>已选择文件：</strong>
                </p>
                <p className="text-sm text-gray-600">
                  {processType === 'vcf' 
                    ? `${selectedGenotype.length} 个基因型数据文件`
                    : `${selectedPhenotype.length} 个表型数据文件`
                  }
                </p>
              </div>

              {processType === 'vcf' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">转换选项</label>
                  <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                    <option>标准VCF格式</option>
                    <option>压缩VCF格式 (VCF.gz)</option>
                    <option>BCF格式</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">处理类型</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" defaultChecked />
                      <span className="text-sm text-gray-700">数据格式质检</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" defaultChecked />
                      <span className="text-sm text-gray-700">性状字段范围质检</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer" />
                      <span className="text-sm text-gray-700">数据标准化</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProcessModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowProcessModal(false);
                  if (processType === 'vcf') {
                    setSelectedGenotype([]);
                  } else {
                    setSelectedPhenotype([]);
                  }
                }}
                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  processType === 'vcf' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                开始处理
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
