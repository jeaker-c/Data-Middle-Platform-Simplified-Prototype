import React from 'react';

interface DataValidationStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'material' | 'phenotype' | 'genotype' | 'image' | 'directory_scan' | 'environment';
}

export default function DataValidationStep({ onNext, onBack, taskType = 'phenotype' }: DataValidationStepProps) {
  // Mock validation results
  const stats = {
    total: 1245,
    valid: 1230,
    error: 15,
    errorTypes: [
      { type: '格式错误', count: 8, color: 'text-red-600 bg-red-50' },
      { type: '必填缺失', count: 5, color: 'text-orange-600 bg-orange-50' },
      { type: '唯一性冲突', count: 2, color: 'text-yellow-600 bg-yellow-50' }
    ]
  };

  const phenotypeErrorRows = [
    { id: 102, tree_id: 'PEACH-2025102', height: '350', crown_width: '85', reason: '树高超出正常范围 (0-300)' },
    { id: 145, tree_id: 'PEACH-2025145', height: '175', crown_width: '', reason: '必填字段缺失：冠幅' },
    { id: 288, tree_id: 'PEACH-2025001', height: '160', crown_width: '80', reason: '桃树编号重复' },
    { id: 289, tree_id: 'PEACH-2025289', height: 'abc', crown_width: '82', reason: '树高必须为数值' },
  ];

  const materialErrorRows = [
    { id: 1, name: 'XY25H3007', pedigree: 'XYNO_004/XYNO_624', type: '杂交种', rachis_color: '红', grain_color: '白', grain_type: '扁平形', grafted: '是', reason: '材料名称重复' },
    { id: 11, name: 'XY25H3007', pedigree: 'XYNO_552/XYNO_615', type: '杂交种', rachis_color: '1', grain_color: '黄', grain_type: '椭圆形', grafted: 'TRUE', reason: '是否嫁接只能填写为是/否' },
    { id: 111, name: 'SH000464', pedigree: '春雪母本/映霜红母本', type: '', rachis_color: '白', grain_color: '白', grain_type: '圆形', grafted: '', reason: '必填字段缺失' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">总数据行数</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">有效数据</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{stats.valid}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm border-red-100 bg-red-50/30">
          <div className="text-sm text-gray-500">异常数据</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{stats.error}</div>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col justify-center gap-2">
          {stats.errorTypes.map((err, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{err.type}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${err.color}`}>{err.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Table Preview */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
          <h4 className="font-medium text-gray-700 text-sm">异常数据预览 (前 {taskType === 'material' ? materialErrorRows.length : phenotypeErrorRows.length} 条)</h4>
          <span className="text-xs text-red-500 flex items-center gap-1">
            <i className="ri-error-warning-fill"></i>
            请进入下一步进行修正
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {taskType === 'material' ? (
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">系谱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果肉颜色</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果皮颜色</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果形</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">是否嫁接</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">桃树编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">树高(cm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">冠幅</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
                </tr>
              )}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taskType === 'material' ? (
                materialErrorRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('材料名称') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.pedigree}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('果肉颜色') || row.rachis_color === '1' ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.rachis_color}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.grain_color}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.grain_type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('是否嫁接') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.grafted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 flex items-center gap-1">
                      <i className="ri-close-circle-line"></i>
                      {row.reason}
                    </td>
                  </tr>
                ))
              ) : (
                phenotypeErrorRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('桃树编号') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.tree_id}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('树高') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.height}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.reason.includes('冠幅') ? 'bg-red-50 ring-1 ring-inset ring-red-200' : ''}`}>
                      {row.crown_width || <span className="text-gray-300 italic">空</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 flex items-center gap-1">
                      <i className="ri-close-circle-line"></i>
                      {row.reason}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
          上一步
        </button>
        <button 
          onClick={onNext}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <i className="ri-edit-box-line"></i>
          进入数据修正
        </button>
      </div>
    </div>
  );
}
