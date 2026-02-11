import { useState } from 'react';

interface GenotypeProcessingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GenotypeProcessingStep({ onNext, onBack }: GenotypeProcessingStepProps) {
  const [selectedSheet, setSelectedSheet] = useState('sheet1');
  const [sampleCol, setSampleCol] = useState('A');
  const [markerDirection, setMarkerDirection] = useState<'row' | 'col'>('row');

  return (
    <div className="flex h-full gap-6">
      {/* Left: Configuration Panel */}
      <div className="w-1/3 space-y-6">
        {/* 1. Sheet Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-file-excel-line text-green-600"></i>
            1. 选择基因型数据 Sheet
          </h3>
          <div className="space-y-3">
            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedSheet === 'sheet1' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="sheet" checked={selectedSheet === 'sheet1'} onChange={() => setSelectedSheet('sheet1')} className="text-teal-600 focus:ring-teal-500" />
                <span className="font-medium text-gray-700">Genotype_Matrix</span>
              </div>
              <span className="text-xs text-gray-500">2400 行</span>
            </label>
            <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedSheet === 'sheet2' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="sheet" checked={selectedSheet === 'sheet2'} onChange={() => setSelectedSheet('sheet2')} className="text-teal-600 focus:ring-teal-500" />
                <span className="font-medium text-gray-700">Sample_Info</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">忽略</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            <i className="ri-information-line mr-1"></i>
            基因型数据通常较大，仅支持选择一个主 Sheet 进行转换。
          </p>
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
                <option value="A">第一列 (Column A)</option>
                <option value="B">第二列 (Column B)</option>
                <option value="1">第一行 (Row 1)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marker 排列方向</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer text-center ${markerDirection === 'row' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="direction" checked={markerDirection === 'row'} onChange={() => setMarkerDirection('row')} className="hidden" />
                  <i className="ri-layout-row-line text-xl mb-1"></i>
                  <span className="text-sm font-medium">按行排列</span>
                  <span className="text-xs opacity-75 mt-1">每行一个 SNP</span>
                </label>
                <label className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer text-center ${markerDirection === 'col' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="direction" checked={markerDirection === 'col'} onChange={() => setMarkerDirection('col')} className="hidden" />
                  <i className="ri-layout-column-line text-xl mb-1"></i>
                  <span className="text-sm font-medium">按列排列</span>
                  <span className="text-xs opacity-75 mt-1">每列一个 SNP</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onNext}
          className="w-full py-3 bg-teal-600 text-white rounded-lg font-medium shadow-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          开始格式转换
          <i className="ri-arrow-right-line"></i>
        </button>
        
        <button
          onClick={onBack}
          className="w-full py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          返回上一步
        </button>
      </div>

      {/* Right: Preview Area */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">数据预览 (前 20 行)</h3>
          <span className="text-xs text-gray-500">文件: maize_genotype_raw.xlsx</span>
        </div>
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
             {/* Mock Table Preview */}
             <table className="w-full text-sm text-left whitespace-nowrap">
               <thead className="bg-gray-50 text-gray-500">
                 <tr>
                   <th className="px-4 py-2 border-b border-gray-200 w-16 bg-gray-100">#</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium">A (RS#)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium">B (alleles)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium">C (chrom)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium">D (pos)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium bg-yellow-50">E (Sample1)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium bg-yellow-50">F (Sample2)</th>
                   <th className="px-4 py-2 border-b border-gray-200 font-medium bg-yellow-50">G (Sample3)</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {[...Array(15)].map((_, i) => (
                   <tr key={i} className="hover:bg-gray-50">
                     <td className="px-4 py-2 border-r border-gray-100 bg-gray-50 text-gray-400 text-xs">{i + 1}</td>
                     <td className="px-4 py-2">snp_100{i+1}</td>
                     <td className="px-4 py-2">A/G</td>
                     <td className="px-4 py-2">1</td>
                     <td className="px-4 py-2">{15000 + i * 150}</td>
                     <td className="px-4 py-2 bg-yellow-50/30">AA</td>
                     <td className="px-4 py-2 bg-yellow-50/30">AG</td>
                     <td className="px-4 py-2 bg-yellow-50/30">GG</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
