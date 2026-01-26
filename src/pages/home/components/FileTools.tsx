import { useState, useCallback } from 'react';

// Static data moved outside component
const tools = [
  {
    id: 'genotype-convert',
    icon: 'ri-file-transfer-line',
    title: '基因型数据转换',
    desc: '将下机数据转换为VCF格式',
    color: 'text-blue-600 bg-blue-50',
    features: ['支持多种测序平台', '自动格式识别', '批量转换处理']
  },
  {
    id: 'phenotype-check',
    icon: 'ri-shield-check-line',
    title: '表型数据质检',
    desc: '数据格式和字段范围验证',
    color: 'text-green-600 bg-green-50',
    features: ['字段格式检查', '数值范围验证', '异常数据标记']
  },
  {
    id: 'data-merge',
    icon: 'ri-git-merge-line',
    title: '数据合并工具',
    desc: '合并多个数据源',
    color: 'text-purple-600 bg-purple-50',
    features: ['智能字段匹配', '去重处理', '冲突解决']
  },
  {
    id: 'format-convert',
    icon: 'ri-refresh-line',
    title: '格式转换',
    desc: '在不同数据格式间转换',
    color: 'text-orange-600 bg-orange-50',
    features: ['Excel/CSV互转', '编码转换', '分隔符调整']
  },
  {
    id: 'data-clean',
    icon: 'ri-eraser-line',
    title: '数据清洗',
    desc: '清理和标准化数据',
    color: 'text-teal-600 bg-teal-50',
    features: ['缺失值处理', '异常值检测', '数据标准化']
  },
  {
    id: 'batch-tag',
    icon: 'ri-price-tag-3-line',
    title: '批量标签管理',
    desc: '为文件批量添加标签',
    color: 'text-pink-600 bg-pink-50',
    features: ['智能标签推荐', '批量操作', '标签分类']
  }
];

const usageStats = [
  { tool: '基因型转换', count: 1234, trend: '+12%' },
  { tool: '表型质检', count: 892, trend: '+8%' },
  { tool: '数据合并', count: 567, trend: '+15%' },
  { tool: '格式转换', count: 2341, trend: '+5%' }
];

export default function FileTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = useCallback((id: string) => {
    setSelectedTool(id);
  }, []);

  const handleCloseTool = useCallback(() => {
    setSelectedTool(null);
  }, []);


  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">文件处理工具</h2>
          <p className="text-lg text-gray-600">专业的数据处理工具集，提升工作效率</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* 工具列表 */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                    selectedTool === tool.id
                      ? 'border-teal-500 shadow-lg'
                      : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center ${tool.color} rounded-lg flex-shrink-0`}>
                      <i className={`${tool.icon} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.title}</h3>
                      <p className="text-sm text-gray-600">{tool.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-check-line text-teal-600"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-play-circle-line mr-2"></i>
                    启动工具
                  </button>
                </div>
              ))}
            </div>

            {/* 工具详情 */}
            {selectedTool && (
              <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">工具配置</h3>
                  <button
                    onClick={handleCloseTool}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                {selectedTool === 'genotype-convert' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">输入文件格式</label>
                      <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                        <option>Illumina下机数据</option>
                        <option>BGI测序数据</option>
                        <option>PacBio数据</option>
                        <option>Oxford Nanopore数据</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">输出VCF版本</label>
                      <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                        <option>VCF 4.3</option>
                        <option>VCF 4.2</option>
                        <option>VCF 4.1</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="filter" className="w-4 h-4 text-teal-600 rounded cursor-pointer" />
                      <label htmlFor="filter" className="text-sm text-gray-700 cursor-pointer">过滤低质量位点</label>
                    </div>
                    <button className="w-full px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-play-line mr-2"></i>
                      开始转换
                    </button>
                  </div>
                )}

                {selectedTool === 'phenotype-check' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">质检规则</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600 rounded cursor-pointer" />
                          <span className="text-sm text-gray-700">字段格式检查</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600 rounded cursor-pointer" />
                          <span className="text-sm text-gray-700">数值范围验证</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-teal-600 rounded cursor-pointer" />
                          <span className="text-sm text-gray-700">缺失值检测</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-teal-600 rounded cursor-pointer" />
                          <span className="text-sm text-gray-700">异常值标记</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">性状字段范围</label>
                      <textarea
                        placeholder="输入性状字段的合理范围，例如：株高: 50-200cm"
                        rows={4}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                      ></textarea>
                    </div>
                    <button className="w-full px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-play-line mr-2"></i>
                      开始质检
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div>
            {/* 使用统计 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">使用统计</h3>
              <div className="space-y-4">
                {usageStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{stat.tool}</span>
                        <span className="text-sm text-green-600">{stat.trend}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${(stat.count / 2500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快速指南 */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mb-4">
                <i className="ri-lightbulb-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">需要帮助？</h3>
              <p className="text-sm text-teal-50 mb-4">查看工具使用指南和最佳实践</p>
              <button className="w-full px-4 py-2 bg-white text-teal-600 text-sm font-medium rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-book-open-line mr-2"></i>
                查看文档
              </button>
            </div>

            {/* 处理历史 */}
            <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">处理历史</h3>
              <div className="space-y-3">
                {[
                  { tool: '基因型转换', status: 'completed', time: '10分钟前' },
                  { tool: '表型质检', status: 'completed', time: '1小时前' },
                  { tool: '数据合并', status: 'processing', time: '进行中' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.tool}</div>
                      <div className="text-gray-500 text-xs">{item.time}</div>
                    </div>
                    {item.status === 'completed' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded whitespace-nowrap">
                        已完成
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded whitespace-nowrap">
                        处理中
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
