import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';

interface Task {
  id: string;
  name: string;
  dataType: string;
  status: 'processing' | 'pending_mapping' | 'validating' | 'fixing' | 'stored' | 'error' | 'image_qc';
  errorCount: number;
  updatedAt: string;
  creator: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: 'T001',
    name: '2024春季玉米育种数据.xlsx',
    dataType: '表型数据',
    status: 'pending_mapping',
    errorCount: 0,
    updatedAt: '2024-03-20 14:30',
    creator: '张三'
  },
  {
    id: 'T002',
    name: '实验室基因测序批次A.csv',
    dataType: '基因型数据',
    status: 'fixing',
    errorCount: 12,
    updatedAt: '2024-03-19 09:15',
    creator: '李四'
  },
  {
    id: 'T003',
    name: '历史气象数据导入.xlsx',
    dataType: '环境数据',
    status: 'stored',
    errorCount: 0,
    updatedAt: '2024-03-18 16:45',
    creator: '王五'
  },
  {
    id: 'T004',
    name: '玉米新品种测试报告.pdf',
    dataType: '非结构化文档',
    status: 'processing',
    errorCount: 0,
    updatedAt: '2024-03-21 10:00',
    creator: '赵六'
  },
  {
    id: 'T005',
    name: '2026年参试品种图片',
    dataType: '图像',
    status: 'image_qc',
    errorCount: 0,
    updatedAt: '2024-03-22 11:20',
    creator: '钱七'
  },
  {
    id: 'T006',
    name: '2026年参试品种图片文件夹存放',
    dataType: '图像',
    status: 'processing',
    errorCount: 0,
    updatedAt: '2024-03-23 09:30',
    creator: '孙八'
  }
];
export default function TaskListPage() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchText, setSearchText] = useState('');

  const getStatusTag = (status: Task['status']) => {
    const styles = {
      processing: 'bg-blue-100 text-blue-800',
      pending_mapping: 'bg-yellow-100 text-yellow-800',
      validating: 'bg-purple-100 text-purple-800',
      fixing: 'bg-red-100 text-red-800',
      stored: 'bg-green-100 text-green-800',
      error: 'bg-gray-100 text-gray-800',
      image_qc: 'bg-indigo-100 text-indigo-800'
    };
    
    const labels = {
      processing: '解析中',
      pending_mapping: '待映射',
      validating: '规则校验中',
      fixing: '需修正',
      stored: '已存储',
      error: '异常',
      image_qc: '图像质检'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredTasks = MOCK_TASKS.filter(task => {
    if (filterType && task.dataType !== filterType) return false;
    if (filterStatus && task.status !== filterStatus) return false;
    if (searchText && !task.name.includes(searchText) && !task.creator.includes(searchText)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8 pt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">数据处理任务</h1>
            <p className="text-sm text-gray-500 mt-1">管理所有数据上传、解析及入库任务状态</p>
          </div>
          <button
            onClick={() => navigate('/tasks/new')}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors shadow-sm"
          >
            <i className="ri-add-line text-lg"></i>
            新建上传任务
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">数据类型</label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">全部类型</option>
              <option value="表型数据">表型数据</option>
              <option value="基因型数据">基因型数据</option>
              <option value="环境数据">环境数据</option>
              <option value="非结构化文档">非结构化文档</option>
              <option value="图像">图像</option>
            </select>
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">任务状态</label>
            <select 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">全部状态</option>
              <option value="processing">解析中</option>
              <option value="pending_mapping">待映射</option>
              <option value="validating">规则校验中</option>
              <option value="fixing">需修正</option>
              <option value="stored">已存储</option>
              <option value="error">异常</option>
              <option value="image_qc">图像质检</option>
            </select>
          </div>
          <div className="flex-1 min-w-[240px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索文件名 / 创建人" 
                className="w-full pl-10 pr-4 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数据类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">异常数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建人</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{task.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <i className="ri-file-excel-2-line text-green-600 mr-2 text-lg"></i>
                      <span className="text-sm font-medium text-gray-900">{task.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dataType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusTag(task.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.errorCount > 0 ? (
                      <span className="text-red-600 font-medium flex items-center text-sm">
                        <i className="ri-error-warning-fill mr-1"></i>
                        {task.errorCount}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.updatedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.creator}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      className="text-teal-600 hover:text-teal-900 bg-teal-50 px-3 py-1 rounded-md transition-colors"
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-3 block text-gray-300"></i>
              <p>暂无符合条件的任务</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}