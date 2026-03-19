import { useState, useEffect } from 'react';

interface SheetNode {
  id: string;
  name: string;
  rowCount: number;
  status: 'pending' | 'mapped' | 'skipped';
  type?: 'phenotype' | 'environment' | 'genotype';
}

interface FileNode {
  id: string;
  name: string;
  sheets: SheetNode[];
}

interface FieldMapping {
  original: string;
  example: string;
  mapped: string;
  required: boolean;
  unique: boolean;
}

interface SheetSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'material' | 'phenotype' | 'environment' | 'genotype';
}

const MOCK_FILES: FileNode[] = [
  {
    id: 'f1',
    name: '2024_phenotype_data.xlsx',
    sheets: [
      { id: 's1', name: 'Sheet1', rowCount: 1200, status: 'pending' },
      { id: 's2', name: 'Sheet2', rowCount: 0, status: 'skipped' },
      { id: 's3', name: 'DUS_Data', rowCount: 350, status: 'mapped', type: 'phenotype' },
    ]
  }
];

const MOCK_MATERIAL_MAPPINGS: FieldMapping[] = [
  { original: '材料名称', example: 'E9638', mapped: 'material_id', required: true, unique: true },
  { original: '系谱', example: 'QQ101×PB277', mapped: 'pedigree', required: true, unique: false },
  { original: '材料类型', example: '自交系', mapped: 'Material_type', required: true, unique: false },
  { original: '穗轴颜色', example: '红色', mapped: 'Rachis_color', required: false, unique: false },
  { original: '籽粒颜色', example: '白色', mapped: 'Grain_color', required: false, unique: false },
  { original: '籽粒类型', example: '马齿', mapped: 'Grain_type', required: false, unique: false },
  { original: '转基因', example: '否', mapped: 'Genetically_modified', required: false, unique: false }
];

const MOCK_PHENOTYPE_MAPPINGS: FieldMapping[] = [
  { original: 'Accession_ID', example: 'KA134', mapped: 'material_id', required: true, unique: true },
  { original: 'Plot_No', example: 'P01-01', mapped: 'plot_id', required: true, unique: true },
  { original: 'Rep', example: '1', mapped: 'replication', required: true, unique: false },
  { original: 'Plant_Height_cm', example: '120.5', mapped: 'plant_height', required: true, unique: false },
  { original: 'Ear_Height_cm', example: '45.2', mapped: 'ear_height', required: false, unique: false },
  { original: 'Yield_kg_ha', example: '8500', mapped: 'yield', required: true, unique: false },
  { original: 'Moisture_%', example: '14.5', mapped: 'moisture', required: true, unique: false },
  { original: 'Harvest_Date', example: '2024-09-15', mapped: 'harvest_date', required: false, unique: false },
  { original: 'Note', example: 'Lodging observed', mapped: 'remarks', required: false, unique: false },
];

const MOCK_ENVIRONMENT_MAPPINGS: FieldMapping[] = [
  { original: 'Station_ID', example: 'ST_001', mapped: 'station_id', required: true, unique: false },
  { original: 'Date', example: '2024-06-01', mapped: 'record_date', required: true, unique: false },
  { original: 'Temp_Max', example: '32.5', mapped: 'temperature_max', required: true, unique: false },
  { original: 'Temp_Min', example: '18.2', mapped: 'temperature_min', required: true, unique: false },
  { original: 'Precipitation_mm', example: '0.0', mapped: 'precipitation', required: false, unique: false },
  { original: 'Humidity_%', example: '65', mapped: 'humidity', required: false, unique: false },
  { original: 'Solar_Rad', example: '24.5', mapped: 'solar_radiation', required: false, unique: false },
];

const MOCK_GENOTYPE_MAPPINGS: FieldMapping[] = [
  { original: 'Sample_ID', example: 'KA134', mapped: 'material_id', required: true, unique: true },
  { original: 'DNA_Conc', example: '50.2', mapped: 'dna_concentration', required: false, unique: false },
  { original: 'Well_Position', example: 'A01', mapped: 'well_position', required: false, unique: true },
];

export default function SheetSelectionStep({ onNext, onBack, taskType = 'phenotype' }: SheetSelectionStepProps) {
  const [selectedSheetId, setSelectedSheetId] = useState<string>('s1');
  const [sheetUsage, setSheetUsage] = useState<'data' | 'ignore'>('data');
  const dataType: 'phenotype' | 'environment' | 'genotype' = taskType === 'material' ? 'phenotype' : taskType;
  const [hasHeader, setHasHeader] = useState(true);
  const [headerRow, setHeaderRow] = useState<number>(1);
  const [activeMappings, setActiveMappings] = useState<FieldMapping[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const selectedFile = MOCK_FILES[0];
  const selectedSheet = selectedFile.sheets.find(s => s.id === selectedSheetId) || selectedFile.sheets[0];
  
  // Initialize mappings when dataType changes
  useEffect(() => {
    const mappings = taskType === 'material'
      ? MOCK_MATERIAL_MAPPINGS
      : dataType === 'environment' 
        ? MOCK_ENVIRONMENT_MAPPINGS 
        : dataType === 'genotype' 
          ? MOCK_GENOTYPE_MAPPINGS 
          : MOCK_PHENOTYPE_MAPPINGS;
    setActiveMappings(JSON.parse(JSON.stringify(mappings))); // Deep copy to allow editing
  }, [dataType, taskType]);

  const handleMappingChange = (index: number, field: keyof FieldMapping, value: any) => {
    const newMappings = [...activeMappings];
    newMappings[index] = { ...newMappings[index], [field]: value };
    setActiveMappings(newMappings);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Left Sidebar: File & Sheet Tree */}
      <div className="w-64 bg-white rounded-lg border border-gray-200 flex flex-col shrink-0">
        <div className="p-3 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-900 text-sm">文件结构</h3>
        </div>
        <div className="p-3 overflow-y-auto flex-1">
          {MOCK_FILES.map(file => (
            <div key={file.id} className="mb-3">
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-1.5 text-sm">
                <i className="ri-file-excel-line text-green-600"></i>
                <span className="truncate" title={file.name}>{file.name}</span>
              </div>
              <div className="ml-5 space-y-0.5">
                {file.sheets.map(sheet => (
                  <div
                    key={sheet.id}
                    onClick={() => setSelectedSheetId(sheet.id)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded cursor-pointer transition-colors text-sm ${
                      selectedSheetId === sheet.id 
                        ? 'bg-teal-50 text-teal-700 border border-teal-100' 
                        : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <i className="ri-table-line text-gray-400 text-xs"></i>
                      <span className="truncate" title={sheet.name}>{sheet.name}</span>
                    </div>
                    <div className="shrink-0 flex items-center">
                       {sheet.status === 'mapped' && <span className="text-[10px] font-medium text-[#008000]" title="已映射">已映射</span>}
                       {sheet.status === 'skipped' && <span className="text-[10px] font-medium text-gray-400" title="已跳过">已跳过</span>}
                       {sheet.status === 'pending' && <span className="text-[10px] font-medium text-[#FFA500]" title="待处理">待处理</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content: Sheet Processing */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Top Config Area - Compact */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/30">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-settings-4-line text-teal-600"></i>
                  配置: {selectedSheet.name}
                </h2>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                   selectedSheet.rowCount > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {selectedSheet.rowCount > 0 ? `${selectedSheet.rowCount} 行数据` : '空表'}
                </span>
             </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* 1. Sheet Usage */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">用途:</label>
              <div className="flex bg-white rounded-md border border-gray-300 p-0.5">
                <button
                  onClick={() => setSheetUsage('data')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
                    sheetUsage === 'data' 
                      ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-database-2-line"></i> 导入数据
                </button>
                <button
                  onClick={() => setSheetUsage('ignore')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
                    sheetUsage === 'ignore' 
                      ? 'bg-gray-100 text-gray-700 shadow-sm border border-gray-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-prohibited-line"></i> 忽略
                </button>
              </div>
            </div>

            {/* 3. Header Handling */}
            {sheetUsage === 'data' && (
               <div className="flex items-center gap-4 pl-4 border-l border-gray-200 ml-2">
                 <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">表头行:</label>
                    <input 
                      type="number" 
                      min="1"
                      value={headerRow}
                      onChange={(e) => setHeaderRow(Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={!hasHeader}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-center disabled:bg-gray-100 disabled:text-gray-400" 
                    />
                 </div>
                 <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={!hasHeader} 
                      onChange={(e) => {
                        setHasHeader(!e.target.checked);
                        if (e.target.checked) setHeaderRow(0);
                        else setHeaderRow(1);
                      }}
                      className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 border-gray-300" 
                    />
                    <span className="text-sm text-gray-700">无表头</span>
                 </label>
               </div>
            )}
          </div>
        </div>

        {/* 4. Field Mapping Area - Maximized */}
        {sheetUsage === 'data' ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Table Header (Fixed) */}
            <div className="px-6 py-2 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
               <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                 <i className="ri-table-2 text-teal-600"></i>
                 字段映射表
               </h3>
               <div className="text-xs text-gray-500">
                 共 {activeMappings.length} 个字段需映射
               </div>
            </div>
            
            {/* Table Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
               <table className="w-full text-sm text-left border-collapse">
                 <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                   <tr>
                     <th className="py-2 px-4 border-b border-gray-200 text-gray-500 font-semibold w-1/4 text-xs uppercase tracking-wider">
                       原始列名
                     </th>
                     <th className="py-2 px-4 border-b border-gray-200 text-gray-500 font-semibold w-1/4 text-xs uppercase tracking-wider">
                        数据示例 {hasHeader ? `(Row ${headerRow + 1})` : '(Row 1)'}
                     </th>
                     <th className="py-2 px-4 border-b border-gray-200 text-gray-500 font-semibold w-1/3 text-xs uppercase tracking-wider">映射系统字段</th>
                     <th className="py-2 px-4 border-b border-gray-200 text-gray-500 font-semibold text-center text-xs uppercase tracking-wider w-16">必填</th>
                     <th className="py-2 px-4 border-b border-gray-200 text-gray-500 font-semibold text-center text-xs uppercase tracking-wider w-16">唯一</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {activeMappings.map((row, idx) => (
                     <tr key={idx} className="hover:bg-teal-50/30 transition-colors group">
                       <td className="py-2.5 px-4 border-b border-gray-50 font-medium text-gray-900 group-hover:text-teal-900">
                         <div className="flex items-center gap-2 group/edit relative">
                           <input 
                              type="text" 
                              value={row.original}
                              onChange={(e) => handleMappingChange(idx, 'original', e.target.value)}
                              className="bg-transparent border-b border-dashed border-gray-300 hover:border-teal-400 focus:border-teal-600 focus:ring-0 px-0 py-0.5 w-full text-gray-900 font-medium transition-colors outline-none placeholder-gray-400"
                              placeholder="输入列名..."
                           />
                           <i className="ri-edit-2-line text-gray-300 opacity-0 group-hover/edit:opacity-100 text-xs absolute right-0 pointer-events-none"></i>
                         </div>
                       </td>
                       <td className="py-2.5 px-4 border-b border-gray-50 text-gray-500 font-mono text-xs bg-gray-50/30">
                         {row.example}
                       </td>
                       <td className="py-2.5 px-4 border-b border-gray-50">
                         <select 
                            value={row.mapped}
                            onChange={(e) => handleMappingChange(idx, 'mapped', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 hover:border-gray-300 transition-colors bg-white"
                         >
                           <option value={row.mapped}>{row.mapped} ({row.original})</option>
                           <option value="ignore">-- 不导入 --</option>
                         </select>
                       </td>
                       <td className="py-2.5 px-4 border-b border-gray-50 text-center">
                         {row.required ? <i className="ri-star-fill text-orange-400 text-xs" title="必填"></i> : <span className="text-gray-200">-</span>}
                       </td>
                       <td className="py-2.5 px-4 border-b border-gray-50 text-center">
                         {row.unique ? <i className="ri-key-2-line text-blue-400 text-xs" title="唯一值"></i> : <span className="text-gray-200">-</span>}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
             <i className="ri-prohibited-line text-4xl mb-2 text-gray-300"></i>
             <p className="text-sm">此 Sheet 已被标记为“忽略”</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium shadow-sm transition-colors text-sm"
          >
            上一步
          </button>
          <div className="flex items-center gap-4">
             <span className="text-xs text-gray-500">已配置 <span className="font-medium text-gray-900">1</span> / 3 个 Sheet</span>
             <button
               onClick={() => setShowConfirmModal(true)}
               className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-medium shadow-sm transition-colors flex items-center gap-2 text-sm"
             >
               保存并继续
               <i className="ri-arrow-right-line"></i>
             </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-[400px] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 text-orange-500 mb-4">
                <i className="ri-error-warning-fill text-4xl"></i>
                <h3 className="text-lg font-bold text-gray-900">存在未完成映射</h3>
              </div>
              <p className="text-sm text-gray-600 pl-14">
                当前任务中存在未完成字段映射的文件或Sheet表，是否继续执行下一步？
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  onNext();
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
              >
                继续
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
