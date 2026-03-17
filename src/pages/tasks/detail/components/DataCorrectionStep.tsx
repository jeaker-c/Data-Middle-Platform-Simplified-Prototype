import React, { useState } from 'react';

interface DataCorrectionStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'material' | 'phenotype' | 'genotype' | 'image' | 'directory_scan' | 'environment';
}

export default function DataCorrectionStep({ onNext, onBack, taskType = 'phenotype' }: DataCorrectionStepProps) {
  const [errorCount, setErrorCount] = useState(15);
  
  const [phenotypeRows, setPhenotypeRows] = useState([
    { id: 102, crop_id: 'CROP-2025102', height: '350', ear_height: '85', reason: '株高超出正常范围 (0-300)', fixed: false },
    { id: 145, crop_id: 'CROP-2025145', height: '175', ear_height: '', reason: '必填字段缺失：穗位高', fixed: false },
    { id: 288, crop_id: 'CROP-2025001', height: '160', ear_height: '80', reason: '作物编号重复', fixed: false },
    { id: 289, crop_id: 'CROP-2025289', height: 'abc', ear_height: '82', reason: '株高必须为数值', fixed: false },
  ]);

  const [materialRows, setMaterialRows] = useState([
    { id: 1, name: 'XY25H3007', pedigree: 'XYNO_004/XYNO_624', type: '杂交种', rachis_color: '红', grain_color: '白', grain_type: '硬粒', gmo: '是', reason: '材料名称重复', fixed: false },
    { id: 11, name: 'XY25H3007', pedigree: 'XYNO_552/XYNO_615', type: '杂交种', rachis_color: '1', grain_color: '黄', grain_type: '半马齿', gmo: 'TRUE', reason: '转基因只能填写为是/否', fixed: false },
    { id: 111, name: 'SH000464', pedigree: '中垦玉21母本/NF119母本', type: '', rachis_color: '白', grain_color: '白', grain_type: '马齿', gmo: '', reason: '必填字段缺失', fixed: false },
  ]);

  const rows = taskType === 'material' ? materialRows : phenotypeRows;
  const setRows = taskType === 'material' ? setMaterialRows : setPhenotypeRows;

  const handleFix = (id: number, field: string, value: string) => {
    // @ts-ignore
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value, fixed: true } : row
    ));
  };

  const handleDelete = (id: number) => {
    // @ts-ignore
    setRows(rows.filter(row => row.id !== id));
  };

  const handleRevalidate = () => {
    // Simulate validation
    const remainingErrors = rows.filter(r => !r.fixed).length;
    setErrorCount(remainingErrors);
    
    if (remainingErrors === 0) {
      // All good
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Bar */}
      <div className={`p-4 rounded-lg flex items-center justify-between ${errorCount > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3">
          <i className={`text-xl ${errorCount > 0 ? 'ri-error-warning-fill text-red-600' : 'ri-checkbox-circle-fill text-green-600'}`}></i>
          <div>
            <h4 className={`font-medium ${errorCount > 0 ? 'text-red-900' : 'text-green-900'}`}>
              {errorCount > 0 ? `当前仍有 ${errorCount} 条数据异常` : '所有数据校验通过'}
            </h4>
            <p className={`text-sm ${errorCount > 0 ? 'text-red-700' : 'text-green-700'}`}>
              {errorCount > 0 ? '请直接在表格中修改数据，或删除无效行。' : '您可以进行下一步操作。'}
            </p>
          </div>
        </div>
        {errorCount > 0 && (
           <button 
             onClick={handleRevalidate}
             className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium shadow-sm"
           >
             重新校验
           </button>
        )}
      </div>

      {/* Editable Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {taskType === 'material' ? (
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">系谱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">穗轴颜色</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">籽粒颜色</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">籽粒类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">转基因</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            ) : (
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作物编号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">株高(cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">穗位高</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                {taskType === 'material' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.name}
                        onChange={(e) => handleFix(row.id, 'name', e.target.value)}
                        // @ts-ignore
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('材料名称') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.pedigree}
                        onChange={(e) => handleFix(row.id, 'pedigree', e.target.value)}
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.type}
                        onChange={(e) => handleFix(row.id, 'type', e.target.value)}
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.rachis_color}
                        onChange={(e) => handleFix(row.id, 'rachis_color', e.target.value)}
                        // @ts-ignore
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('穗轴颜色') || row.rachis_color === '1' ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.grain_color}
                        onChange={(e) => handleFix(row.id, 'grain_color', e.target.value)}
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.grain_type}
                        onChange={(e) => handleFix(row.id, 'grain_type', e.target.value)}
                        className="block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.gmo}
                        onChange={(e) => handleFix(row.id, 'gmo', e.target.value)}
                        // @ts-ignore
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('转基因') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.crop_id}
                        onChange={(e) => handleFix(row.id, 'crop_id', e.target.value)}
                        // @ts-ignore
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('作物编号') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.height}
                        onChange={(e) => handleFix(row.id, 'height', e.target.value)}
                        // @ts-ignore
                        className={`block w-24 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('株高') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.ear_height}
                        onChange={(e) => handleFix(row.id, 'ear_height', e.target.value)}
                        // @ts-ignore
                        className={`block w-24 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('穗位高') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                   {row.fixed ? (
                     <span className="text-green-600 flex items-center gap-1">
                       <i className="ri-check-line"></i> 已修改
                     </span>
                   ) : row.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleDelete(row.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="删除此行"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            所有异常数据已处理
          </div>
        )}
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
          disabled={errorCount > 0}
          className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm transition-colors ${
            errorCount === 0 ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          确认无误，下一步
        </button>
      </div>
    </div>
  );
}
