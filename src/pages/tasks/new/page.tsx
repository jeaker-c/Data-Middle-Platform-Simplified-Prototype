import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';

type UploadType = 'file' | 'folder' | 'url';

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface Project {
  id: string;
  name: string;
}

interface Strategy {
  id: string;
  name: string;
  projectId: string;
}

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: '2026年C1晋级' },
  { id: 'p2', name: '2026年TC1' },
  { id: 'p3', name: '2026年T1测试' },
];

const MOCK_STRATEGIES: Strategy[] = [
  // 2026年C1晋级
  { id: 's1', name: '材料体检', projectId: 'p1' },
  { id: 's2', name: '品种开发', projectId: 'p1' },
  { id: 's3', name: '育种群体预测', projectId: 'p1' },
  
  // 2026年TC1
  { id: 's4', name: 'DH系筛选', projectId: 'p2' },
  
  // 2026年T1测试
  { id: 's5', name: '材料体检', projectId: 'p3' },
  { id: 's6', name: '品种开发', projectId: 'p3' },
  { id: 's7', name: '育种群体预测', projectId: 'p3' },
  { id: 's8', name: 'DH系筛选', projectId: 'p3' },
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function NewTaskPage() {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState<UploadType>('file');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [taskName, setTaskName] = useState('');
  const [dataType, setDataType] = useState('表型');
  const [projectId, setProjectId] = useState('');
  const [strategyId, setStrategyId] = useState('');
  const [remarks, setRemarks] = useState('');

  // Manual entry state
  const [isManualProject, setIsManualProject] = useState(false);
  const [customProjectName, setCustomProjectName] = useState('');
  const [isManualStrategy, setIsManualStrategy] = useState(false);
  const [customStrategyName, setCustomStrategyName] = useState('');

  // Effect: When switching to manual project, force manual strategy
  useEffect(() => {
    if (isManualProject) {
      setIsManualStrategy(true);
      setProjectId('');
    }
  }, [isManualProject]);

  const filteredStrategies = MOCK_STRATEGIES.filter(s => s.projectId === projectId);

  const handleDataTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataType(e.target.value);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const simulateUpload = useCallback((fileId: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, status: 'success', progress: 100 } : f)
        );
      } else {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: Math.floor(progress) } : f)
        );
      }
    }, 500);
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || '未知类型',
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    // Auto-fill task name if empty
    if (!taskName && files.length > 0) {
        const name = files[0].name.split('.')[0];
        setTaskName(`${name}_导入任务`);
    }

    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  }, [simulateUpload, taskName]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleSubmit = () => {
    // In a real app, this would create the task via API
    // For now, navigate back to task list
    navigate('/tasks');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8 pt-24">
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => navigate('/tasks')}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <i className="ri-arrow-left-line text-2xl"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">新建上传任务</h1>
            <p className="text-sm text-gray-500 mt-1">上传数据文件并配置关联试验信息</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {/* 任务基本信息 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">任务名称</label>
                    <input 
                        type="text" 
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="请输入任务名称"
                        className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">数据类型</label>
                    <select 
                        value={dataType}
                        onChange={handleDataTypeChange}
                        className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    >
                        <option value="基因型">基因型</option>
                        <option value="表型">表型</option>
                        <option value="环境">环境</option>
                    </select>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">育种项目</label>
                        <button 
                            onClick={() => setIsManualProject(!isManualProject)}
                            className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                        >
                            {isManualProject ? '选择已有项目' : '手动填写'}
                        </button>
                    </div>
                    {isManualProject ? (
                        <input 
                            type="text" 
                            value={customProjectName}
                            onChange={(e) => setCustomProjectName(e.target.value)}
                            placeholder="请输入新项目名称"
                            className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                    ) : (
                        <select
                            value={projectId}
                            onChange={(e) => {
                                setProjectId(e.target.value);
                                setStrategyId('');
                            }}
                            className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        >
                            <option value="">请选择育种项目</option>
                            {MOCK_PROJECTS.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">育种策略</label>
                        {!isManualProject && (
                            <button 
                                onClick={() => setIsManualStrategy(!isManualStrategy)}
                                className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                            >
                                {isManualStrategy ? '选择已有策略' : '手动填写'}
                            </button>
                        )}
                    </div>
                    {isManualStrategy ? (
                        <input 
                            type="text" 
                            value={customStrategyName}
                            onChange={(e) => setCustomStrategyName(e.target.value)}
                            placeholder="请输入新策略名称"
                            className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                    ) : (
                        <select
                            value={strategyId}
                            onChange={(e) => setStrategyId(e.target.value)}
                            disabled={!projectId}
                            className="w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            <option value="">请选择育种策略</option>
                            {filteredStrategies.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

          {/* 上传区域 */}
          <div 
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all
              ${dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="hidden" 
              id="file-upload"
              multiple 
              onChange={handleFileInput}
            />
            
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-upload-cloud-2-line text-3xl"></i>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              点击或拖拽文件到此处
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              支持 Excel, CSV, PDF 等格式文件
            </p>
            
            <label 
              htmlFor="file-upload"
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <i className="ri-folder-open-line"></i>
              选择文件
            </label>
          </div>

          {/* 文件列表 */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="font-medium text-gray-900">已添加文件</h4>
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-teal-600">
                    <i className="ri-file-text-line text-xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          file.status === 'error' ? 'bg-red-500' : 'bg-teal-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {file.status === 'success' && (
                    <i className="ri-checkbox-circle-fill text-teal-500 text-xl"></i>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 备注 */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
            <textarea 
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="请输入任务备注信息"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* 提交按钮 */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end gap-4">
                <button 
                    onClick={() => navigate('/tasks')}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    取消
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={uploadedFiles.length === 0}
                    className={`
                        px-6 py-2.5 rounded-lg text-white font-medium flex items-center gap-2
                        ${uploadedFiles.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20'}
                    `}
                >
                    <i className="ri-check-line"></i>
                    创建任务
                </button>
            </div>
        </div>
      </main>
    </div>
  );
}