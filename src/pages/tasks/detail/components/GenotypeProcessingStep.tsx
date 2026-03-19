import { useEffect, useRef, useState } from 'react';

interface GenotypeProcessingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GenotypeProcessingStep({ onNext, onBack }: GenotypeProcessingStepProps) {
  const [selectedSheets, setSelectedSheets] = useState<string[]>(['sheet1']);
  const [currentFile, setCurrentFile] = useState('maize_genotype_v3.xlsx');
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [sampleCol, setSampleCol] = useState('1');
  const [markerDirection, setMarkerDirection] = useState<'row' | 'col'>('row');

  const fileMenuRef = useRef<HTMLDivElement>(null);
  const fileOptions = [
    { value: 'maize_genotype_v3.xlsx', label: 'maize_genotype_v3.xlsx', showStatus: true },
    { value: 'maize_genotype_v1.xlsx', label: 'maize_genotype_v1.xlsx', showStatus: false }
  ];

  const previewSampleColumns = [
    '24CSN0019',
    '24RSN0276',
    '24BSN0271',
    '24BSN0264',
    '24BSN0197',
    '24BSN0211',
    '24BSN0198',
    '24BSN0308',
    '24BSN0079',
    '24BSN0069'
  ];

  const previewRows = [
    { chrom: '1', position: '49527', ref: 'A', values: ['GG', 'GG', 'GG', 'AA', 'GG', 'AA', 'AG', 'GG', 'GG', 'AG'] },
    { chrom: '1', position: '172921', ref: 'T', values: ['CC', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'CC', 'TT'] },
    { chrom: '1', position: '277229', ref: 'A', values: ['AA', 'GG', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA'] },
    { chrom: '1', position: '277887', ref: 'T', values: ['TT', 'CC', 'TT', 'TT', 'TT', 'TT', 'TT', 'CC', 'TT', 'TT'] },
    { chrom: '1', position: '279929', ref: 'T', values: ['TT', 'AA', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT'] },
    { chrom: '1', position: '346780', ref: 'C', values: ['CC', 'CC', 'CC', 'CC', 'CC', 'CC', 'CC', 'CC', 'CC', 'CC'] },
    { chrom: '1', position: '559641', ref: 'C', values: ['CT', 'TT', 'CC', 'CC', 'CC', 'CC', 'CC', 'CC', 'TT', 'CC'] },
    { chrom: '1', position: '566425', ref: 'C', values: ['TT', 'TT', 'TT', 'CC', 'TT', 'CC', 'CT', 'TT', 'TT', 'CT'] },
    { chrom: '1', position: '715140', ref: 'A', values: ['AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AA'] },
    { chrom: '1', position: '715833', ref: 'G', values: ['TT', 'TT', 'TT', 'GG', 'TT', 'GG', 'TT', 'TT', 'TT', 'GT'] },
    { chrom: '1', position: '717042', ref: 'C', values: ['CC', 'CC', 'TT', 'CC', 'TT', 'CC', 'CT', 'TT', 'CC', 'CC'] },
    { chrom: '1', position: '1014658', ref: 'T', values: ['CC', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'CC', 'TT'] },
    { chrom: '1', position: '1014879', ref: 'G', values: ['AA', 'AA', 'AA', 'GG', 'AA', 'GG', 'GA', 'AA', 'AA', 'GA'] },
    { chrom: '1', position: '1017052', ref: 'G', values: ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'] },
    { chrom: '1', position: '1022873', ref: 'C', values: ['GG', 'GG', 'GG', 'CC', 'GG', 'CC', 'CG', 'GG', 'GG', 'CC'] },
    { chrom: '1', position: '1023490', ref: 'C', values: ['TT', 'TT', 'TT', 'CC', 'TT', 'CC', 'TT', 'TT', 'TT', 'CT'] },
    { chrom: '1', position: '1030066', ref: 'A', values: ['AA', 'AA', 'AA', 'AA', 'AA', 'AA', 'AG', 'AA', 'AA', 'AA'] },
    { chrom: '1', position: '1033843', ref: 'G', values: ['GG', 'AA', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'] },
    { chrom: '1', position: '1058471', ref: 'G', values: ['GA', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'AA', 'GG'] },
    { chrom: '1', position: '1206406', ref: 'T', values: ['AA', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'AA', 'TT'] }
  ];

  const previewMarkerIds = previewRows.map(row => `${row.chrom}_${row.position}_${row.ref}`);
  const previewColumnMetaRows = [
    { label: 'chrom', values: previewRows.map(r => r.chrom) },
    { label: 'position', values: previewRows.map(r => r.position) },
    { label: 'ref', values: previewRows.map(r => r.ref) }
  ];
  const previewColumnSampleRows = previewSampleColumns.map((sample, sampleIdx) => ({
    label: sample,
    values: previewRows.map(r => r.values[sampleIdx] ?? '')
  }));

  const toggleSheet = (sheet: string) => {
    setSelectedSheets(prev => {
      const exists = prev.includes(sheet);
      if (exists && prev.length === 1) return prev;
      return exists ? prev.filter(s => s !== sheet) : [...prev, sheet];
    });
  };

  useEffect(() => {
    if (!isFileMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!fileMenuRef.current) return;
      if (fileMenuRef.current.contains(e.target as Node)) return;
      setIsFileMenuOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFileMenuOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFileMenuOpen]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 gap-6 min-h-0">
        <div className="w-1/3 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-3 relative" ref={fileMenuRef}>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">当前文件</span>
            <button
              type="button"
              onClick={() => setIsFileMenuOpen(v => !v)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
            >
              <span className="truncate">{currentFile}</span>
              <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${isFileMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isFileMenuOpen && (
              <div className="absolute left-24 right-4 top-[calc(100%+8px)] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                {fileOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setCurrentFile(opt.value);
                      setIsFileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-sm flex items-center justify-between gap-3 transition-colors ${
                      currentFile === opt.value ? 'bg-teal-50 text-teal-800' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="truncate font-medium">{opt.label}</span>
                    {opt.showStatus ? (
                      <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <i className="ri-check-line text-green-600 text-2xl"></i>
                      </span>
                    ) : (
                      <span className="w-10 h-10 shrink-0"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-file-excel-line text-green-600"></i>
            1. 选择基因型数据 Sheet
          </h3>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedSheets.includes('sheet1') ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={selectedSheets.includes('sheet1')} onChange={() => toggleSheet('sheet1')} className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                <span className="font-medium text-gray-700">Genotype_Matrix</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">2400 行</span>
                <span className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1"><i className="ri-eye-line"></i>预览</span>
              </div>
            </label>
            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedSheets.includes('sheet2') ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={selectedSheets.includes('sheet2')} onChange={() => toggleSheet('sheet2')} className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                <span className="font-medium text-gray-700">Sample_Info</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">120 行</span>
                <span className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1"><i className="ri-eye-line"></i>预览</span>
              </div>
            </label>
          </div>
        </div>

        {/* 2. Format Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-settings-line text-blue-600"></i>
            2. 数据结构定义
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">材料名称 (Sample ID) 所在列/行</label>
              <select 
                value={sampleCol} 
                onChange={(e) => setSampleCol(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm"
              >
                <option value="1">第一行 (Row 1) ⚡默认</option>
                <option value="A">第一列 (Column A)</option>
                <option value="B">第二列 (Column B)</option>
              </select>
            </div>
          </div>
        </div>

        </div>

        <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shadow-sm min-h-0">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">数据结构预览</h3>
        </div>
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {markerDirection === 'row' ? (
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200 font-medium">ID</th>
                    <th className="px-4 py-2 border-b border-gray-200 font-medium">chrom</th>
                    <th className="px-4 py-2 border-b border-gray-200 font-medium">position</th>
                    <th className="px-4 py-2 border-b border-gray-200 font-medium">ref</th>
                    {previewSampleColumns.map((c) => (
                      <th key={c} className="px-4 py-2 border-b border-gray-200 font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {previewRows.map((row) => (
                    <tr key={`${row.chrom}_${row.position}_${row.ref}`} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{`${row.chrom}_${row.position}_${row.ref}`}</td>
                      <td className="px-4 py-2">{row.chrom}</td>
                      <td className="px-4 py-2">{row.position}</td>
                      <td className="px-4 py-2">{row.ref}</td>
                      {row.values.map((v, idx) => (
                        <td key={idx} className="px-4 py-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200 font-medium">ID</th>
                    {previewMarkerIds.map((id) => (
                      <th key={id} className="px-4 py-2 border-b border-gray-200 font-medium">
                        {id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {previewColumnMetaRows.map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-700">{row.label}</td>
                      {row.values.map((v, idx) => (
                        <td key={idx} className="px-4 py-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {previewColumnSampleRows.map((row) => (
                    <tr key={row.label} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-700">{row.label}</td>
                      {row.values.map((v, idx) => (
                        <td key={idx} className="px-4 py-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white flex justify-center">
          <div className="w-[520px] max-w-full flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors text-base"
            >
              返回上一步
            </button>
            <button
              onClick={onNext}
              className="flex-1 py-3 bg-teal-600 text-white rounded-full font-semibold shadow-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-base"
            >
              开始格式转换
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}
