import React, { useState } from 'react';

interface DataCorrectionStepProps {
  onNext: () => void;
  onBack: () => void;
  taskType?: 'material' | 'phenotype' | 'genotype' | 'image' | 'directory_scan' | 'environment';
}

export default function DataCorrectionStep({ onNext, onBack, taskType = 'phenotype' }: DataCorrectionStepProps) {
  const [errorCount, setErrorCount] = useState(18);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const phenotypeMaterialNames = ['中华寿桃', '春雪', '映霜红', '突围', '曙光', '锦绣黄桃'];
  const phenotypeExperiments = ['2024年度桃抗旱试验', '2025年度桃高产试验', '2025年度桃区域试验'];
  const phenotypePlotNos = ['A-01', 'A-02', 'B-03', 'C-05', 'D-07', 'E-09', 'F-11'];

  const [phenotypeRows, setPhenotypeRows] = useState<any[]>([
    { id: 901, line_no: '208', material_name: '春雪', experiment: '2025年度桃高产试验', plot_no: 'A-02', tree_id: 'PEACH-2025208', height: '168', crown_width: '82', reason: '唯一字段「材料名称、试验、排号、行号、桃树编号」重复。', fixed: false, duplicate_group: 'phenotype-dup-1', duplicate_index: 1, duplicate_origin: 'phenotype-dup-1' },
    { id: 902, line_no: '208', material_name: '春雪', experiment: '2025年度桃高产试验', plot_no: 'A-02', tree_id: 'PEACH-2025208', height: '529', crown_width: '84', reason: '唯一字段「材料名称、试验、排号、行号、桃树编号」重复。；树高超出正常范围 (0-300)', fixed: false, duplicate_group: 'phenotype-dup-1', duplicate_index: 2, duplicate_origin: 'phenotype-dup-1', needsHeightValidation: true },
    { id: 903, line_no: '208', material_name: '春雪', experiment: '2025年度桃高产试验', plot_no: 'A-02', tree_id: 'PEACH-2025208', height: '526', crown_width: '79', reason: '唯一字段「材料名称、试验、排号、行号、桃树编号」重复。；树高超出正常范围 (0-300)', fixed: false, duplicate_group: 'phenotype-dup-1', duplicate_index: 3, duplicate_origin: 'phenotype-dup-1', needsHeightValidation: true },
    { id: 904, line_no: '208', material_name: '春雪', experiment: '2025年度桃高产试验', plot_no: 'A-02', tree_id: 'PEACH-2025208', height: '173', crown_width: '86', reason: '唯一字段「材料名称、试验、排号、行号、桃树编号」重复。', fixed: false, duplicate_group: 'phenotype-dup-1', duplicate_index: 4, duplicate_origin: 'phenotype-dup-1' },
    { id: 102, line_no: '102', material_name: '中华寿桃', experiment: '2024年度桃抗旱试验', plot_no: 'A-01', tree_id: 'PEACH-2025102', height: '350', crown_width: '85', reason: '树高超出正常范围 (0-300)', fixed: false },
    { id: 145, line_no: '145', material_name: '春雪', experiment: '2025年度桃高产试验', plot_no: 'B-03', tree_id: 'PEACH-2025145', height: '175', crown_width: '', reason: '必填字段缺失：冠幅', fixed: false },
    { id: 288, line_no: '288', material_name: '映霜红', experiment: '2025年度桃区域试验', plot_no: 'C-05', tree_id: 'PEACH-2025001', height: '160', crown_width: '80', reason: '桃树编号重复', fixed: false },
    { id: 289, line_no: '289', material_name: '突围', experiment: '2024年度桃抗旱试验', plot_no: 'D-07', tree_id: 'PEACH-2025289', height: 'abc', crown_width: '82', reason: '树高必须为数值', fixed: false },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: 300 + i,
      line_no: String(300 + i),
      material_name: phenotypeMaterialNames[(300 + i) % phenotypeMaterialNames.length],
      experiment: phenotypeExperiments[(300 + i) % phenotypeExperiments.length],
      plot_no: phenotypePlotNos[(300 + i) % phenotypePlotNos.length],
      tree_id: `PEACH-2025${300 + i}`,
      height: String(100 + i * 10),
      crown_width: String(50 + i * 5),
      reason: '格式校验不通过',
      fixed: false
    }))
  ]);

  const [materialRows, setMaterialRows] = useState<any[]>([
    { id: 1, name: 'XY25H3007', pedigree: 'XYNO_004/XYNO_624', type: '杂交种', rachis_color: '红', grain_color: '白', grain_type: '扁平形', grafted: '是', reason: '材料名称重复', fixed: false },
    { id: 11, name: 'XY25H3007', pedigree: 'XYNO_552/XYNO_615', type: '杂交种', rachis_color: '1', grain_color: '黄', grain_type: '椭圆形', grafted: 'TRUE', reason: '是否嫁接只能填写为是/否', fixed: false },
    { id: 111, name: 'SH000464', pedigree: '春雪母本/映霜红母本', type: '', rachis_color: '白', grain_color: '白', grain_type: '圆形', grafted: '', reason: '必填字段缺失', fixed: false },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: 200 + i,
      name: `TEST_MAT_${i}`,
      pedigree: 'A/B',
      type: '自交系',
      rachis_color: '白',
      grain_color: '黄',
      grain_type: '圆形',
      grafted: '否',
      reason: '未匹配到基础数据',
      fixed: false
    }))
  ]);

  const rows = taskType === 'material' ? materialRows : phenotypeRows;
  const setRows = taskType === 'material' ? setMaterialRows : setPhenotypeRows;

  const visibleRows = taskType === 'material'
    ? rows
    : (() => {
        const seenGroups = new Set<string>();
        return phenotypeRows.reduce<any[]>((acc, row: any) => {
          if (!row.duplicate_group) {
            acc.push(row);
            return acc;
          }

          if (expandedGroups[row.duplicate_group]) {
            acc.push(row);
            return acc;
          }

          if (!seenGroups.has(row.duplicate_group)) {
            seenGroups.add(row.duplicate_group);
            acc.push({
              ...row,
              __duplicateSummary: true,
              duplicate_count: phenotypeRows.filter((item: any) => item.duplicate_group === row.duplicate_group).length
            });
          }

          return acc;
        }, []);
      })();

  // Pagination logic
  const total = visibleRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageRows = visibleRows
    .slice(pageStart, pageStart + pageSize)
    .map((row: any, index: number) => ({
      ...row,
      __serial: pageStart + index + 1
    }));

  const duplicateReason = '唯一字段「材料名称、试验、排号、行号、桃树编号」重复。';
  const heightLimitReason = '树高超出正常范围 (0-300)';
  const getCompositeKey = (row: any) =>
    `${row.material_name}__${row.line_no || row.id}__${row.experiment}__${row.plot_no}__${row.tree_id}`;
  const isHeightInNormalRange = (row: any) => {
    const heightValue = Number(row.height);
    return Number.isFinite(heightValue) && heightValue > 0 && heightValue <= 300;
  };
  const getDuplicateRowReason = (row: any, includeDuplicate: boolean) => {
    const reasons: string[] = [];
    if (includeDuplicate) reasons.push(duplicateReason);
    if (row.needsHeightValidation && !isHeightInNormalRange(row)) reasons.push(heightLimitReason);
    return reasons.join('；');
  };
  const getManagedDuplicateState = (row: any, allRows: any[]) => {
    const hasDuplicate = allRows.some((item: any) => item.id !== row.id && getCompositeKey(item) === getCompositeKey(row));
    const hasHeightError = !!row.needsHeightValidation && !isHeightInNormalRange(row);
    return {
      fixed: !hasDuplicate && !hasHeightError,
      reason: getDuplicateRowReason(row, hasDuplicate),
    };
  };
  const syncManagedDuplicateRows = (sourceRows: any[]) =>
    sourceRows.map((row: any) => {
      if (!row.duplicate_origin) {
        return row;
      }
      const state = getManagedDuplicateState(row, sourceRows);
      return {
        ...row,
        fixed: state.fixed,
        reason: state.fixed ? row.reason : state.reason,
      };
    });

  const handleFix = (id: number, field: string, value: string) => {
    if (taskType === 'material') {
      setMaterialRows(prev =>
        prev.map(row =>
          row.id === id ? { ...row, [field]: value, fixed: true } : row
        )
      );
      return;
    }

    setPhenotypeRows(prev => {
      const updatedRows = prev.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      const syncedRows = syncManagedDuplicateRows(updatedRows);

      const targetRow = syncedRows.find((row: any) => row.id === id);
      if (!targetRow?.duplicate_origin) {
        if (targetRow?.reason === heightLimitReason) {
          return syncedRows.map((row: any) =>
            row.id === id
              ? {
                  ...row,
                  fixed: isHeightInNormalRange(row),
                  reason: isHeightInNormalRange(row) ? row.reason : heightLimitReason,
                }
              : row
          );
        }

        return syncedRows.map((row: any) =>
          row.id === id ? { ...row, fixed: true } : row
        );
      }

      return syncedRows;
    });
  };

  const handleDelete = (id: number) => {
    if (taskType === 'material') {
      setMaterialRows(prev => prev.filter(row => row.id !== id));
      return;
    }

    setPhenotypeRows(prev => {
      const targetRow = prev.find((row: any) => row.id === id);
      const nextRows = prev.filter((row: any) => row.id !== id);

      if (!targetRow?.duplicate_group) {
        return nextRows;
      }

      const sameGroupRows = nextRows.filter((row: any) => row.duplicate_group === targetRow.duplicate_group);

      if (sameGroupRows.length === 1) {
        return nextRows.map((row: any) =>
          row.id === sameGroupRows[0].id
            ? {
                ...row,
                fixed: isHeightInNormalRange(row),
                reason: isHeightInNormalRange(row) ? row.reason : heightLimitReason,
                duplicate_group: undefined,
                duplicate_index: undefined,
              }
            : row
        );
      }

      return nextRows;
    });
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleRevalidate = () => {
    // Simulate validation
    if (taskType === 'material') {
      const remainingErrors = rows.filter(r => !r.fixed).length;
      setErrorCount(remainingErrors);
      return;
    }

    setPhenotypeRows(prev => {
      const syncedRows = syncManagedDuplicateRows(prev);
      const detachedRows = syncedRows.map((row: any) =>
        row.duplicate_origin && row.fixed && row.duplicate_group
          ? {
              ...row,
              duplicate_group: undefined,
              duplicate_index: undefined,
            }
          : row
      );
      setErrorCount(detachedRows.filter((row: any) => !row.fixed).length);
      return detachedRows;
    });
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
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[64px]">序号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">系谱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">材料类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果肉颜色</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果皮颜色</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">果形</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">是否嫁接</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误原因</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            ) : (
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[64px]">序号</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">材料名称</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[72px]">行号</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[170px]">试验</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">排号</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[130px]">桃树编号</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[88px]">树高(cm)</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[88px]">冠幅</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[220px]">错误原因</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[64px]">操作</th>
              </tr>
            )}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pageRows.map((row: any) => (
              row.__duplicateSummary ? (
                <tr key={`summary-${row.duplicate_group}`} className="bg-amber-50/40 hover:bg-amber-50/60">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleGroup(row.duplicate_group)}
                        className="w-5 h-5 inline-flex items-center justify-center rounded text-amber-700 hover:bg-amber-100 transition-colors shrink-0"
                        title="展开重复数据"
                      >
                        <i className="ri-arrow-right-s-line text-base"></i>
                      </button>
                      <span>{row.__serial}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                    <div className="text-left text-amber-900">{row.material_name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">{row.line_no || row.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.experiment}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.plot_no}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.tree_id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">--</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">--</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-700">
                    <div
                      className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
                      title={`${row.reason} 当前共 ${row.duplicate_count} 条。`}
                    >
                      {row.reason} 当前共 {row.duplicate_count} 条。
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleDelete(row.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="删除此行"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </td>
                </tr>
              ) : (
              <tr key={row.id} className={row.duplicate_group ? 'bg-amber-50/20 hover:bg-amber-50/40' : 'hover:bg-gray-50'}>
                {taskType === 'material' ? (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {row.__serial}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
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
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('果肉颜色') || row.rachis_color === '1' ? 'border-red-300 bg-red-50' : ''}`}
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
                        value={row.grafted}
                        onChange={(e) => handleFix(row.id, 'grafted', e.target.value)}
                        // @ts-ignore
                        className={`block w-full text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('是否嫁接') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                      <div className="flex items-center gap-1">
                        {row.duplicate_group && row.duplicate_index === 1 ? (
                          <button
                            type="button"
                            onClick={() => toggleGroup(row.duplicate_group)}
                            className="w-5 h-5 inline-flex items-center justify-center rounded text-amber-700 hover:bg-amber-100 transition-colors shrink-0"
                            title="收起重复数据"
                          >
                            <i className="ri-arrow-down-s-line text-base"></i>
                          </button>
                        ) : row.duplicate_group ? (
                          <span className="w-5 h-5 shrink-0"></span>
                        ) : null}
                        <span>{row.__serial}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        // @ts-ignore
                        value={row.material_name}
                        onChange={(e) => handleFix(row.id, 'material_name', e.target.value)}
                        className={`block w-32 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.duplicate_group ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        // @ts-ignore
                        value={row.line_no || row.id}
                        onChange={(e) => handleFix(row.id, 'line_no', e.target.value)}
                        className={`block w-20 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.duplicate_group ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        // @ts-ignore
                        value={row.experiment}
                        onChange={(e) => handleFix(row.id, 'experiment', e.target.value)}
                        className={`block w-44 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.duplicate_group ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        // @ts-ignore
                        value={row.plot_no}
                        onChange={(e) => handleFix(row.id, 'plot_no', e.target.value)}
                        className={`block w-20 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.duplicate_group ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.tree_id}
                        onChange={(e) => handleFix(row.id, 'tree_id', e.target.value)}
                        // @ts-ignore
                        className={`block w-32 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('桃树编号') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.height}
                        onChange={(e) => handleFix(row.id, 'height', e.target.value)}
                        // @ts-ignore
                        className={`block w-20 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('树高') || !isHeightInNormalRange(row) ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <input 
                        type="text"
                        // @ts-ignore
                        value={row.crown_width}
                        onChange={(e) => handleFix(row.id, 'crown_width', e.target.value)}
                        // @ts-ignore
                        className={`block w-20 text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 ${row.reason.includes('冠幅') ? 'border-red-300 bg-red-50' : ''}`}
                      />
                    </td>
                  </>
                )}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                   {row.fixed ? (
                     <span className="text-green-600 flex items-center gap-1 whitespace-nowrap">
                       <i className="ri-check-line"></i> 已修改
                     </span>
                   ) : (
                     <div
                       className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
                       title={row.reason}
                     >
                       {row.reason}
                     </div>
                   )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleDelete(row.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="删除此行"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </td>
              </tr>
            )))}
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
