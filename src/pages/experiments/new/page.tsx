import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';

export default function ParameterConfigPage() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [strategyName, setStrategyName] = useState('');
  const [coreArea, setCoreArea] = useState('新泽西桃区');
  const [plantingPeriod, setPlantingPeriod] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('品种开发');
  const [activeGoalTab, setActiveGoalTab] = useState('self-bred');

  const handleReset = () => {
    setProjectName('');
    setStrategyName('');
    setCoreArea('新泽西桃区');
    setPlantingPeriod('');
    setSelectedStrategy('品种开发');
  };

  const handleSaveAndStart = () => {
    // 保存配置并启动
    console.log('保存配置并启动');
    navigate('/experiments');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">参数配置</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors shadow-sm"
            >
              重置
            </button>
            <button 
              onClick={handleSaveAndStart}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
            >
              保存并启动
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Main Content */}
          <div className="w-full">
            {/* Project Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">项目名称</label>
                  <input 
                    type="text" 
                    placeholder="请输入项目名称"
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <div className="text-xs text-gray-400 mt-1">0/50</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">填写策略名称</label>
                  <input 
                    type="text" 
                    placeholder="请输入策略名称"
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                  />
                  <div className="text-xs text-gray-400 mt-1">0/50</div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">核心育种策略</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: '材料体检', label: '材料体检', icon: '🍃' },
                    { id: '品种开发', label: '品种开发', icon: '🌱' },
                    { id: '群体预测', label: '群体预测', icon: '📊' },
                    { id: 'DH系统筛选', label: 'DH系统筛选', icon: '🧬' }
                  ].map((strategy) => (
                    <button
                      key={strategy.id}
                      onClick={() => setSelectedStrategy(strategy.id)}
                      className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg border transition-all ${selectedStrategy === strategy.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`text-xl ${selectedStrategy === strategy.id ? 'text-green-600' : 'text-gray-500'}`}>
                          {strategy.icon}
                        </div>
                        <span className={`text-sm font-medium ${selectedStrategy === strategy.id ? 'text-green-700' : 'text-gray-700'}`}>
                          {strategy.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">核心育种区</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                    value={coreArea}
                    onChange={(e) => setCoreArea(e.target.value)}
                  >
                    <option>新泽西桃区</option>
                    <option>佐治亚桃区</option>
                    <option>加州桃区</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预计种植期</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    className="w-full px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                    value={plantingPeriod}
                    onChange={(e) => setPlantingPeriod(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-400">选择日期</div>
                    <button className="text-sm text-green-600 hover:text-green-700">
                      📅
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Breeding Goals */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-leaf-line text-green-600"></i>
                <h2 className="text-lg font-semibold text-gray-900">育种目标设定</h2>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setActiveGoalTab('self-bred')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm ${
                    activeGoalTab === 'self-bred' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  自交系性状表现评估
                </button>
                <button 
                  onClick={() => setActiveGoalTab('combined')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm ${
                    activeGoalTab === 'combined' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  组合性状表现评估
                </button>
              </div>

              {activeGoalTab === 'self-bred' && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">产量</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">kg/亩</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">容重</label>
                      </div>
                      <input 
                        type="text" 
                        placeholder="" 
                        className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">含水量</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">农艺性状</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        '开花期', '落花期', '硬核期', '结果枝数',
                        '果径', '抗病', '蛋白', '主干高',
                        '分枝角', '冠幅', '树高'
                      ].map((trait, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <label className="text-sm font-medium text-gray-700">{trait}</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              placeholder="" 
                              className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">抗病性状</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        '黄锈叶斑病', '镰孢菌(病)', '流胶病', '南方锈病',
                        '灰斑病(级)', '桃根腐病', '褐腐病(级)', '穿孔病(级)',
                        '甘蔗花叶病'
                      ].map((trait, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <label className="text-sm font-medium text-gray-700">{trait}</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              placeholder="" 
                              className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeGoalTab === 'combined' && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">组合产量</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">kg/亩</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">杂种优势(MP)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">杂种优势(HP)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label className="text-sm font-medium text-gray-700">含水量</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="" 
                          className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">组合农艺性状</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        '树高', '冠幅', '生育期', '落果率', '裂果率',
                        '病果率', '双果率', '可溶性固形物', '单果重'
                      ].map((trait, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <label className="text-sm font-medium text-gray-700">{trait}</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              placeholder="" 
                              className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">组合抗病性状</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        '褐腐病', '穿孔病', '流胶病', '炭疽病',
                        '根癌病', '缩叶病', '疮痂病', '黑星病',
                        '花叶病'
                      ].map((trait, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <label className="text-sm font-medium text-gray-700">{trait}</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              placeholder="" 
                              className="w-full px-3 py-2 rounded-lg border-gray-300 shadow-sm text-sm"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>


        </div>
      </main>
    </div>
  );
}
