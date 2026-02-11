import { useState, useCallback } from 'react';

const uploadCategories = [
  {
    id: 'phenotype',
    icon: 'ri-plant-line',
    title: '表型数据',
    desc: '上传表型观测数据',
    formats: '.xlsx, .csv, .txt',
    color: 'text-green-600 bg-green-50'
  },
  {
    id: 'genotype',
    icon: 'ri-dna-line',
    title: '基因型数据',
    desc: '上传测序和基因型数据',
    formats: '.vcf, .fasta, .fastq',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    id: 'image',
    icon: 'ri-image-line',
    title: '图片资料',
    desc: '上传田间观察照片',
    formats: '.jpg, .png, .tiff',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    id: 'video',
    icon: 'ri-video-line',
    title: '视频文件',
    desc: '上传实验记录视频',
    formats: '.mp4, .avi, .mov',
    color: 'text-orange-600 bg-orange-50'
  },
  {
    id: 'document',
    icon: 'ri-file-text-line',
    title: '文档报告',
    desc: '上传研究报告和文档',
    formats: '.pdf, .doc, .docx',
    color: 'text-teal-600 bg-teal-50'
  },
  {
    id: 'other',
    icon: 'ri-folder-line',
    title: '其他文件',
    desc: '上传其他类型文件',
    formats: '所有格式',
    color: 'text-gray-600 bg-gray-50'
  }
];

const uploadFeatures = [
  { icon: 'ri-upload-cloud-2-line', title: '批量上传', desc: '支持多文件同时上传' },
  { icon: 'ri-folder-zip-line', title: '压缩包支持', desc: '自动解压ZIP/RAR文件' },
  { icon: 'ri-shield-check-line', title: '权限设置', desc: '灵活的访问权限控制' },
  { icon: 'ri-price-tag-3-line', title: '智能标签', desc: '自动识别并添加标签' }
];

const uploadHistory = [
  { name: '玉米基因型数据_2025Q1.vcf', status: 'completed', progress: 100, time: '2025-01-15 14:30' },
  { name: '玉米表型观测_2025春季.xlsx', status: 'completed', progress: 100, time: '2025-01-15 11:20' },
  { name: '玉米田间照片_2025.zip', status: 'processing', progress: 67, time: '上传中' }
];

export default function DataUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadType, setUploadType] = useState('file');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  }, []);

  return (
    <section id="upload" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">统一数据上传</h2>
          <p className="text-lg text-gray-600">支持多种数据格式，提供便捷的上传体验</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* 上传区域 */}
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

            {/* 拖拽上传区 */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/50'
              }`}
            >
              <div className="w-20 h-20 flex items-center justify-center bg-teal-100 rounded-full mx-auto mb-6">
                <i className="ri-upload-cloud-2-line text-4xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">拖拽文件到此处上传</h3>
              <p className="text-gray-600 mb-6">或者点击选择文件</p>
              <button className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-folder-open-line mr-2"></i>
                选择文件
              </button>
              <p className="text-sm text-gray-500 mt-4">支持批量上传，单个文件最大 2GB</p>
            </div>

            {/* 上传选项 */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">上传设置</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">数据分类</label>
                  <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                    <option>表型数据</option>
                    <option>基因型数据</option>
                    <option>图片资料</option>
                    <option>视频文件</option>
                    <option>文档报告</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">访问权限</label>
                  <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                    <option>仅自己可见</option>
                    <option>团队成员可见</option>
                    <option>项目组可见</option>
                    <option>公开</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">添加标签</label>
                  <input
                    type="text"
                    placeholder="输入标签，用逗号分隔"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">备注说明</label>
                  <textarea
                    placeholder="添加文件描述或备注信息"
                    rows={3}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 上传特性 */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {uploadFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-lg mx-auto mb-3">
                    <i className={`${feature.icon} text-xl text-teal-600`}></i>
                  </div>
                  <h5 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h5>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 数据分类 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">选择数据类型</h3>
            <div className="space-y-3">
              {uploadCategories.map((category) => (
                <button
                  key={category.id}
                  className="w-full bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${category.color} rounded-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <i className={`${category.icon} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{category.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.desc}</p>
                      <p className="text-xs text-gray-500">{category.formats}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 上传历史 */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>最近上传</span>
                <button className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer">查看全部</button>
              </h4>
              <div className="space-y-2">
                {uploadHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 truncate flex-1">{item.name}</span>
                    <span className="text-gray-500 text-xs ml-2 whitespace-nowrap">{item.time}</span>
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
