import { ReactNode } from 'react';

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

export default function StatsOverview({ tabSlot }: { tabSlot?: ReactNode } = {}) {
  return (
    <section className="pb-8">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">数据概览</h2>
            <p className="text-sm text-gray-500 mt-1">实时监控平台数据状态，掌握最新动态</p>
          </div>
          <div className="flex items-center gap-3">
            {tabSlot}
          </div>
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
            </div>

            <div className="space-y-3">
              {genotypeData.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
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
          </div>

          {/* 表型数据 */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">表型数据</h3>
            </div>

            <div className="space-y-3">
              {phenotypeData.map((file) => (
                <div key={file.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
