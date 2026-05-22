import React, { useState } from 'react';

interface FieldMappingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function FieldMappingStep({ onNext, onBack }: FieldMappingStepProps) {
  const [mappings, setMappings] = useState([
    { src: '桃树编号', sample: 'PEACH-2025001', target: 'tree_id', required: true, rule: '唯一性校验', status: 'matched' },
    { src: '树高(cm)', sample: '175', target: 'tree_height', required: true, rule: '数值范围 0-300', status: 'matched' },
    { src: '冠幅', sample: '95', target: 'crown_width', required: false, rule: '数值范围 0-200', status: 'manual' },
    { src: '抗病性', sample: '强', target: 'disease_resistance', required: true, rule: '枚举值校验', status: 'matched' },
    { src: '备注说明', sample: '无异常', target: 'remarks', required: false, rule: '长度限制 500', status: 'matched' },
    { src: '产量(kg)', sample: '850', target: 'yield_val', required: true, rule: '数值类型', status: 'manual' },
  ]);

  const systemFields = [
    { value: 'tree_id', label: '桃树编号' },
    { value: 'tree_height', label: '树高' },
    { value: 'crown_width', label: '冠幅' },
    { value: 'disease_resistance', label: '抗病性' },
    { value: 'remarks', label: '备注' },
    { value: 'yield_val', label: '产量' },
    { value: 'planting_area', label: '种植区域' },
    { value: 'manager', label: '负责人' },
  ];

  const handleMappingChange = (index: number, value: string) => {
    const newMappings = [...mappings];
    newMappings[index].target = value;
    newMappings[index].status = 'manual';
    setMappings(newMappings);
  };

  const isAllMapped = mappings.every(m => m.target !== '');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">字段映射配置</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1">
            <i className="ri-magic-line"></i>
            自动匹配
          </button>
          <button className="px-3 py-1.5 text-sm bg-teal-50 text-teal-700 border border-teal-200 rounded-md hover:bg-teal-100 flex items-center gap-1">
            <i className="ri-save-line"></i>
            保存映射模板
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <i className="ri-information-line text-blue-600 mt-0.5"></i>
        <div className="text-sm text-blue-800">
          系统已自动匹配 {mappings.filter(m => m.status === 'matched').length} 个字段，请确认剩余 {mappings.filter(m => m.status !== 'matched').length} 个字段的映射关系。
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原始字段名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">示例值</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">映射关系</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标系统字段</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">配置</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mappings.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.src}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.sample}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                  <i className="ri-arrow-right-line"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <select 
                    className={`block w-full pl-3 pr-10 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md ${
                      row.status === 'matched' ? 'bg-green-50 border-green-200 text-green-800' : ''
                    }`}
                    value={row.target}
                    onChange={(e) => handleMappingChange(idx, e.target.value)}
                  >
                    <option value="">-- 请选择 --</option>
                    {systemFields.map(field => (
                      <option key={field.value} value={field.value}>{field.label} ({field.value})</option>
                    ))}
                    <option value="ignore">忽略此字段</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    {row.required && (
                      <span className="text-red-500" title="必填字段">
                        <i className="ri-asterisk"></i>
                      </span>
                    )}
                    {row.rule && (
                      <div className="group relative">
                        <i className="ri-shield-check-line text-gray-400 hover:text-teal-600 cursor-help"></i>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                          {row.rule}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
          上一步
        </button>
        <button 
          onClick={onNext}
          disabled={!isAllMapped}
          className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm transition-colors ${
            isAllMapped ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          确认映射并校验
        </button>
      </div>
    </div>
  );
}
