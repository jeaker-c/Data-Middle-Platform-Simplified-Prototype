import { useState } from 'react';
import { FilterState } from '../types';

interface MaterialFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  isOpen: boolean;
}

export default function MaterialFilter({ filters, onFilterChange, isOpen }: MaterialFilterProps) {
  if (!isOpen) return null;

  const handleChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 mb-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
      <div className="grid grid-cols-1 gap-4">
        {/* Row 1: Material Dimension */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">材料维度</span>
          <select 
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.materialType}
            onChange={(e) => handleChange('materialType', e.target.value)}
          >
            <option value="">所有类型</option>
            <option value="自交系">自交系</option>
            <option value="杂交种">杂交种</option>
            <option value="野生种">野生种</option>
          </select>
          
          <select 
             className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
             value={filters.hasGenotype}
             onChange={(e) => handleChange('hasGenotype', e.target.value)}
          >
             <option value="all">是否有基因型数据</option>
             <option value="yes">是</option>
             <option value="no">否</option>
          </select>

          <select 
             className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
             value={filters.hasPhenotype}
             onChange={(e) => handleChange('hasPhenotype', e.target.value)}
          >
             <option value="all">是否有表型数据</option>
             <option value="yes">是</option>
             <option value="no">否</option>
          </select>
        </div>

        {/* Row 2: Experiment Dimension */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">试验维度</span>
          <select 
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.year}
            onChange={(e) => handleChange('year', e.target.value)}
          >
            <option value="">试验年份</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          
          <select 
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            <option value="">试验地点</option>
            <option value="杨凌">杨凌</option>
            <option value="海南">海南</option>
            <option value="张掖">张掖</option>
          </select>
        </div>

        {/* Row 3: Phenotype Dimension */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">表型维度</span>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-20 text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={filters.phenotypeMin}
              onChange={(e) => handleChange('phenotypeMin', e.target.value)}
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-20 text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={filters.phenotypeMax}
              onChange={(e) => handleChange('phenotypeMax', e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input 
              type="checkbox" 
              className="rounded text-teal-600 focus:ring-teal-500"
              checked={filters.hasOutlier}
              onChange={(e) => handleChange('hasOutlier', e.target.checked)}
            />
            存在异常值
          </label>
        </div>

        {/* Row 4: Genotype Dimension */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">基因型维度</span>
          <select 
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.genotypeType}
            onChange={(e) => handleChange('genotypeType', e.target.value)}
          >
            <option value="">基因型类型</option>
            <option value="SNP">SNP</option>
            <option value="Indel">Indel</option>
          </select>
          <input 
            type="number" 
            placeholder="位点数 ≥" 
            className="w-24 text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.siteCountMin}
            onChange={(e) => handleChange('siteCountMin', e.target.value)}
          />
          <select 
             className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
             value={filters.isVCFComplete}
             onChange={(e) => handleChange('isVCFComplete', e.target.value)}
          >
             <option value="all">VCF是否完整</option>
             <option value="yes">是</option>
             <option value="no">否</option>
          </select>
        </div>

        {/* Row 5: Environment Data */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">环境数据</span>
           <select 
             className="text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
             value={filters.hasEnvData}
             onChange={(e) => handleChange('hasEnvData', e.target.value)}
          >
             <option value="all">是否有关联环境数据</option>
             <option value="yes">是</option>
             <option value="no">否</option>
          </select>
        </div>
        
         {/* Row 6: Advanced (Simplified for demo) */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 w-16">高级筛选</span>
          <input 
            type="number" 
            placeholder="关联试验数 ≥" 
            className="w-28 text-sm border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
            value={filters.minExpCount}
            onChange={(e) => handleChange('minExpCount', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
