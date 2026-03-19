import React, { useState } from 'react';

interface DataCorrectionStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'material' | 'phenotype' | 'genotype' | 'image' | 'directory_scan' | 'environment';
}

export default function DataCorrectionStep({ onNext, onBack, taskType = 'phenotype' }: DataCorrectionStepProps) {
  const [errorCount, setErrorCount] = useState(15);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [phenotypeRows, setPhenotypeRows] = useState([
    { id: 102, crop_id: 'CROP-2025102', height: '350', ear_height: '85', reason: '株高超出正常范围 (0-300)', fixed: false },
    { id: 145, crop_id: 'CROP-2025145', height: '175', ear_height: '', reason: '必填字段缺失：穗位高', fixed: false },
    { id: 288, crop_id: 'CROP-2025001', height: '160', ear_height: '80', reason: '作物编号重复', fixed: false },
    { id: 289, crop_id: 'CROP-2025289', height: 'abc', ear_height: '82', reason: '株高必须为数值', fixed: false },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: 300 + i,
      crop_id: `CROP-2025${300 + i}`,
      height: String(100 + i * 10),
      ear_height: String(50 + i * 5),
      reason: '格式校验不通过',
      fixed: false
    }))
  ]);

  const [materialRows, setMaterialRows] = useState([
    { id: 1, name: 'XY25H3007', pedigree: 'XYNO_004/XYNO_624', type: '杂交种', rachis_color: '红', grain_color: '白', grain_type: '硬粒', gmo: '是', reason: '材料名称重复', fixed: false },
    { id: 11, name: 'XY25H3007', pedigree: 'XYNO_552/XYNO_615', type: '杂交种', rachis_color: '1', grain_color: '黄', grain_type: '半马齿', gmo: 'TRUE', reason: '转基因只能填写为是/否', fixed: false },
    { id: 111, name: 'SH000464', pedigree: '中垦玉21母本/NF119母本', type: '', rachis_color: '白', grain_color: '白', grain_type: '马齿', gmo: '', reason: '必填字段缺失', fixed: false },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: 200 + i,
      name: `TEST_MAT_${i}`,
      pedigree: 'A/B',
      type: '自交系',
      rachis_color: '白',
      grain_color: '黄',
      grain_type: '马齿',
      gmo: '否',
      reason: '未匹配到基础数据',
      fixed: false
    }))
  ]);

  const rows = taskType === 'material' ? materialRows : phenotypeRows;
  const setRows = taskType === 'material' ? setMaterialRows : setPhenotypeRows;

  // Pagination logic
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = rows.slice(pageStart, pageStart + pageSize);

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

  const [selectedFile, setSelectedFile] = useState('2024_phenotype_data.xlsx');
  const [selectedSheet, setSelectedSheet] = useState('DUS_Data');
  
  const mockFiles = [
    { name: '2024_phenotype_data.xlsx', sheets: ['Sheet1', 'DUS_Data'] },
    { name: '2025_environment_data.csv', sheets: ['Sheet1'] }
  ];

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Top Controls Area */}
      <div className="flex gap-4 shrink-0">
        {/* Warning Bar */}
        <div className={`flex-1 p-4 rounded-lg flex items-center justify-between ${errorCount > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center gap-3">
            <i className={`text-xl ${errorCount > 0 ? 'ri-error-warning-fill text-red-600' : 'ri-checkbox-circle-fill text-green-600'}`}></i>
            <div>
              <div className="flex items-center gap-3">
                <h4 className={`text-sm font-bold ${errorCount > 0 ? 'text-red-900' : 'text-green-900'}`}>
                  {errorCount > 0 ? `当前仍有 ${errorCount} 条数据异常` : '所有数据校验通过'}
                </h4>
              </div>
              <p className={`text-xs mt-1 ${errorCount > 0 ? 'text-red-700' : 'text-green-700'}`}>
                {errorCount > 0 ? '请直接在表格中修改数据，或删除无效行。' : '您可以进行下一步操作。'}
              </p>
            </div>
          </div>
          {errorCount > 0 && (
            <button 
              onClick={handleRevalidate}
              className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium shadow-sm hover:bg-red-50 transition-colors"
            >
              重新校验
            </button>
          )}
        </div>

        {/* File and Sheet Selector */}
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-sm">
          <div className="flex-1 flex items-center gap-2 px-2 border-r border-gray-200">
            <i className="ri-file-excel-line text-green-600 shrink-0"></i>
            <select 
              value={selectedFile}
              onChange={(e) => {
                setSelectedFile(e.target.value);
                const newFile = mockFiles.find(f => f.name === e.target.value);
                if (newFile) setSelectedSheet(newFile.sheets[0]);
              }}
              className="w-full border-none focus:ring-0 p-0 cursor-pointer bg-transparent text-gray-700 font-medium truncate"
            >
              {mockFiles.map(f => (
                <option key={f.name} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="w-32 flex items-center gap-2 pl-3">
            <i className="ri-table-line text-blue-500 shrink-0"></i>
            <select 
              value={selectedSheet}
              onChange={(e) => setSelectedSheet(e.target.value)}
              className="w-full border-none focus:ring-0 p-0 cursor-pointer bg-transparent text-gray-700 font-medium truncate"
            >
              {mockFiles.find(f => f.name === selectedFile)?.sheets.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Editable Table */}
      <div className="border rounded-lg overflow-hidden flex flex-col flex-1 min-h-0 bg-white">
        <div className="flex-1 overflow-auto">
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
            {pageRows.map((row) => (
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
        
        {/* Pagination */}
        {rows.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-500">
                第 {safePage} / {totalPages} 页，共 {total} 条
              </div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="text-xs border-gray-300 rounded-lg px-2 py-1 focus:ring-teal-500 focus:border-teal-500 bg-white"
              >
                <option value={10}>10 / 页</option>
                <option value={20}>20 / 页</option>
                <option value={50}>50 / 页</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  safePage <= 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                上一页
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  safePage >= totalPages ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                下一页
              </button>
            </div>
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
