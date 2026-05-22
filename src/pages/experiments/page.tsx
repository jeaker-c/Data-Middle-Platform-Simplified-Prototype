import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';

interface Project {
  id: string;
  name: string;
  status: '计算中' | '已完成' | '待计算';
  creator: string;
  createDate: string;
  strategyCount: number;
  lastSync: string;
}

interface SyncLog {
  id: string;
  message: string;
  date: string;
  status: 'success' | 'error';
}

export default function BreedingProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: '抗病伏',
      status: '待计算',
      creator: '王组长',
      createDate: '2026/02/01',
      strategyCount: 0,
      lastSync: '2026-02-04'
    },
    {
      id: '2',
      name: '高蛋白桃选育计划',
      status: '计算中',
      creator: '李博士',
      createDate: '2026/01/15',
      strategyCount: 1,
      lastSync: '2026-02-04'
    },
    {
      id: '3',
      name: '黄淮海高产桃改良项目',
      status: '已完成',
      creator: '张科研',
      createDate: '2026/01/10',
      strategyCount: 3,
      lastSync: '2026-02-04'
    },
    {
      id: '4',
      name: '2025年秋季组合预测',
      status: '待计算',
      creator: '王组长',
      createDate: '2026/02/01',
      strategyCount: 0,
      lastSync: '2026-02-04'
    },
    {
      id: '5',
      name: '抗锈病桃选育计划',
      status: '计算中',
      creator: '李博士',
      createDate: '2026/01/15',
      strategyCount: 1,
      lastSync: '2026-02-04'
    },
    {
      id: '6',
      name: '抗褐腐病桃改良项目',
      status: '已完成',
      creator: '张科研',
      createDate: '2026/01/10',
      strategyCount: 3,
      lastSync: '2026-02-04'
    }
  ]);

  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([
    {
      id: '1',
      message: '成功同步 3 个项目',
      date: '2026-02-01',
      status: 'success'
    },
    {
      id: '2',
      message: 'NAS 数据路径校验完成',
      date: '2026-02-03',
      status: 'success'
    }
  ]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case '计算中':
        return 'bg-blue-100 text-blue-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '待计算':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '计算中':
        return 'ri-loader-2-line animate-spin';
      case '已完成':
        return 'ri-check-line';
      case '待计算':
        return 'ri-clock-line';
      default:
        return 'ri-help-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">育种项目</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="搜索项目名称、创建者..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm">
              <option>筛选状态</option>
              <option>计算中</option>
              <option>已完成</option>
              <option>待计算</option>
            </select>
            <select className="px-4 py-2 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm">
              <option>排序方式</option>
              <option>创建时间</option>
              <option>同步时间</option>
            </select>
            <button 
              onClick={() => navigate('/experiments/new')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
            >
              + 新建项目
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Projects Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <i className="ri-user-line"></i>
                          <span>{project.creator}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          <span>{project.createDate}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.status === '已完成' ? 'bg-green-100 text-green-800' : project.status === '计算中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-3">当前项目策略({project.strategyCount}个)</div>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {[
                        { name: '材料体检2025', status: '完成' },
                        { name: '品种开发2026', status: '失败' },
                        { name: '群体预测2026', status: '计算中' },
                        { name: 'DH系统筛选', status: '完成' }
                      ].map((strategy, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">{strategy.name}</span>
                          <div className="flex items-center gap-2">
                            {strategy.status === '完成' && (
                              <span className="flex items-center text-green-600 text-sm">
                                <i className="ri-check-line mr-1"></i>
                                完成
                              </span>
                            )}
                            {strategy.status === '失败' && (
                              <span className="flex items-center text-red-600 text-sm">
                                <i className="ri-close-line mr-1"></i>
                                失败
                              </span>
                            )}
                            {strategy.status === '计算中' && (
                              <span className="flex items-center text-gray-600 text-sm">
                                <i className="ri-loader-2-line animate-spin mr-1"></i>
                                计算中
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-4">
                    <i className="ri-sync-line mr-1"></i>
                    最后同步时间: {project.lastSync} 14:30
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/experiments/results')} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
                      <i className="ri-eye-line"></i>
                      查看结果
                    </button>
                    <button onClick={() => navigate('/experiments/new')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm flex items-center justify-center gap-2">
                      <i className="ri-add-line"></i>
                      新增策略
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Logs */}
          <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">同步日志</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="ri-refresh-line"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {syncLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 flex items-center justify-center rounded-full ${log.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <i className={log.status === 'success' ? 'ri-check-line text-sm' : 'ri-error-line text-sm'}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{log.message}</p>
                    <p className="text-xs text-gray-400">{log.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                <i className="ri-arrow-right-line text-xs"></i>
                查看完整日志
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

