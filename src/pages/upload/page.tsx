import { useState, useCallback } from 'react';
import Navbar from '../home/components/Navbar';

type UploadType = 'file' | 'folder' | 'url';

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

// Helper function moved outside
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function UploadPage() {
  const [uploadType, setUploadType] = useState<UploadType>('file');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');

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

    // 模拟上传进度
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  }, [simulateUpload]);

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

  const handleUrlImport = useCallback(() => {
    if (!urlInput.trim()) return;
    
    const newFile: UploadedFile = {
      id: Date.now(),
      name: urlInput.split('/').pop() || 'URL导入文件',
      size: '未知',
      type: 'URL导入',
      status: 'uploading',
      progress: 0
    };

    setUploadedFiles(prev => [...prev, newFile]);
    simulateUpload(newFile.id);
    setUrlInput('');
  }, [urlInput, simulateUpload]);

  const removeFile = useCallback((fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">数据上传</h1>
            <p className="text-sm text-gray-500 mt-1">支持多种数据格式，提供便捷的上传体验</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* 左侧上传区域 */}
            <div className="col-span-2">
              {/* 上传方式切换 */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setUploadType('file')}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    uploadType === 'file'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-file-upload-line mr-2"></i>
                  文件上传
                </button>
                <button
                  onClick={() => setUploadType('folder')}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    uploadType === 'folder'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-folder-upload-line mr-2"></i>
                  文件夹上传
                </button>
                <button
                  onClick={() => setUploadType('url')}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    uploadType === 'url'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-link mr-2"></i>
                  URL导入
                </button>
              </div>

              {/* 文件上传区域 */}
              {uploadType === 'file' && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-all ${
                    dragActive 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-300 hover:border-teal-400'
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-teal-50 rounded-full">
                    <i className="ri-upload-cloud-2-line text-4xl text-teal-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">拖拽文件到此处上传</h3>
                  <p className="text-gray-600 mb-6">或者点击下方按钮选择文件</p>
                  <label className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-folder-open-line mr-2"></i>
                    选择文件
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-6">
                    支持格式：CSV, XLSX, JSON, TXT, FASTA, VCF, BAM 等
                  </p>
                </div>
              )}

              {/* 文件夹上传区域 */}
              {uploadType === 'folder' && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-all ${
                    dragActive 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-300 hover:border-teal-400'
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-teal-50 rounded-full">
                    <i className="ri-folder-upload-line text-4xl text-teal-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">拖拽文件夹到此处上传</h3>
                  <p className="text-gray-600 mb-6">支持批量上传整个文件夹及其子文件夹</p>
                  <label className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-folder-line mr-2"></i>
                    选择文件夹
                    <input
                      type="file"
                      multiple
                      // @ts-ignore
                      webkitdirectory=""
                      // @ts-ignore
                      directory=""
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <i className="ri-information-line text-blue-600 text-lg mt-0.5"></i>
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-900 mb-1">文件夹上传说明</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 保持原有文件夹结构</li>
                          <li>• 自动识别文件类型和关联关系</li>
                          <li>• 支持大规模数据集批量上传</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* URL导入区域 */}
              {uploadType === 'url' && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-teal-50 rounded-full">
                    <i className="ri-link text-4xl text-teal-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">从URL导入数据</h3>
                  <p className="text-gray-600 mb-6 text-center">支持从公共数据库或云存储导入数据</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        数据URL地址
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://example.com/data/file.csv"
                          className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          onClick={handleUrlImport}
                          className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-download-line mr-2"></i>
                          导入
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">常用数据源</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer text-left">
                          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                            <i className="ri-database-2-line text-blue-600 text-lg"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">NCBI</p>
                            <p className="text-xs text-gray-500">基因数据库</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer text-left">
                          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                            <i className="ri-plant-line text-green-600 text-lg"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Ensembl</p>
                            <p className="text-xs text-gray-500">基因组数据</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer text-left">
                          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                            <i className="ri-cloud-line text-purple-600 text-lg"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">AWS S3</p>
                            <p className="text-xs text-gray-500">云存储</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer text-left">
                          <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
                            <i className="ri-server-line text-orange-600 text-lg"></i>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">FTP服务器</p>
                            <p className="text-xs text-gray-500">远程服务器</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <i className="ri-error-warning-line text-amber-600 text-lg mt-0.5"></i>
                        <div>
                          <p className="text-sm font-medium text-amber-900 mb-1">注意事项</p>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• 确保URL可公开访问或已配置访问权限</li>
                            <li>• 大文件导入可能需要较长时间</li>
                            <li>• 支持HTTP、HTTPS、FTP协议</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 上传列表 */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      上传列表 ({uploadedFiles.length})
                    </h3>
                    <button
                      onClick={() => setUploadedFiles([])}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line mr-1"></i>
                      清空列表
                    </button>
                  </div>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          file.status === 'success' ? 'bg-green-100' :
                          file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <i className={`text-lg ${
                            file.status === 'success' ? 'ri-checkbox-circle-line text-green-600' :
                            file.status === 'error' ? 'ri-error-warning-line text-red-600' :
                            'ri-file-line text-blue-600'
                          }`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
                          {file.status === 'uploading' && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>上传中...</span>
                                <span>{file.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-teal-600 h-1.5 rounded-full transition-all"
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧信息面板 */}
            <div className="space-y-6">
              {/* 上传统计 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">上传统计</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">总文件数</span>
                    <span className="text-lg font-semibold text-gray-900">{uploadedFiles.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">成功</span>
                    <span className="text-lg font-semibold text-green-600">
                      {uploadedFiles.filter(f => f.status === 'success').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">上传中</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {uploadedFiles.filter(f => f.status === 'uploading').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">失败</span>
                    <span className="text-lg font-semibold text-red-600">
                      {uploadedFiles.filter(f => f.status === 'error').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* 支持格式 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">支持格式</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <i className="ri-file-text-line text-teal-600 mt-0.5"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">表格数据</p>
                      <p className="text-xs text-gray-500">CSV, XLSX, TSV</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-code-line text-teal-600 mt-0.5"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">序列数据</p>
                      <p className="text-xs text-gray-500">FASTA, FASTQ, VCF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-database-line text-teal-600 mt-0.5"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">比对数据</p>
                      <p className="text-xs text-gray-500">BAM, SAM, BED</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-file-code-line text-teal-600 mt-0.5"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-900">结构化数据</p>
                      <p className="text-xs text-gray-500">JSON, XML, GFF</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 上传建议 */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <i className="ri-lightbulb-line text-teal-600 text-lg mt-0.5"></i>
                  <div>
                    <h3 className="text-sm font-semibold text-teal-900 mb-2">上传建议</h3>
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li>• 大文件建议使用文件夹批量上传</li>
                      <li>• 添加清晰的文件命名和标签</li>
                      <li>• 压缩文件可自动解压</li>
                      <li>• 支持断点续传功能</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
