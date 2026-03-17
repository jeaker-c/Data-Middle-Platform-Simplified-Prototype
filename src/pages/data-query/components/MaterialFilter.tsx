import { useState } from 'react';
import { FilterState } from '../types';

interface MaterialFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  isOpen: boolean;
  onDimensionChange?: (dimension: string) => void; // New prop
}

export default function MaterialFilter({ filters, onFilterChange, isOpen, onDimensionChange }: MaterialFilterProps) {
  const [activeDimension, setActiveDimension] = useState<string>('material'); 

  if (!isOpen) return null;

  const handleChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleDimensionCheck = (dimension: string) => {
    setActiveDimension(dimension);
    if (onDimensionChange) {
      onDimensionChange(dimension);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 mb-4 shadow-sm animate-in slide-in-from-top-2 duration-200 flex">
      {/* Left Sidebar: Dimensions Checkboxes */}
      <div className="w-48 border-r border-gray-100 pr-4 space-y-3 shrink-0">
        <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${activeDimension === 'material' ? 'bg-teal-50' : 'hover:bg-gray-50'}`}>
          <input 
            type="radio" 
            name="dimension"
            className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
            checked={activeDimension === 'material'}
            onChange={() => handleDimensionCheck('material')}
          />
          <span className={`text-sm font-medium ${activeDimension === 'material' ? 'text-teal-700' : 'text-gray-700'}`}>材料维度</span>
        </label>

        <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${activeDimension === 'experiment' ? 'bg-teal-50' : 'hover:bg-gray-50'}`}>
          <input 
            type="radio" 
            name="dimension"
            className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
            checked={activeDimension === 'experiment'}
            onChange={() => handleDimensionCheck('experiment')}
          />
          <span className={`text-sm font-medium ${activeDimension === 'experiment' ? 'text-teal-700' : 'text-gray-700'}`}>试验维度</span>
        </label>

        <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${activeDimension === 'phenotype' ? 'bg-teal-50' : 'hover:bg-gray-50'}`}>
          <input 
            type="radio" 
            name="dimension"
            className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
            checked={activeDimension === 'phenotype'}
            onChange={() => handleDimensionCheck('phenotype')}
          />
          <span className={`text-sm font-medium ${activeDimension === 'phenotype' ? 'text-teal-700' : 'text-gray-700'}`}>表型维度</span>
        </label>

        <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${activeDimension === 'environment' ? 'bg-teal-50' : 'hover:bg-gray-50'}`}>
          <input 
            type="radio" 
            name="dimension"
            className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
            checked={activeDimension === 'environment'}
            onChange={() => handleDimensionCheck('environment')}
          />
          <span className={`text-sm font-medium ${activeDimension === 'environment' ? 'text-teal-700' : 'text-gray-700'}`}>环境数据</span>
        </label>
      </div>

      {/* Right Content: Dynamic Filters */}
      <div className="flex-1 pl-6 pt-1">
        {/* Material Dimension Content */}
        {activeDimension === 'material' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">基础属性</span>
              <div className="flex flex-wrap gap-4">
                <select 
                  className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                  value={filters.materialType}
                  onChange={(e) => handleChange('materialType', e.target.value)}
                >
                  <option value="">所有材料类型</option>
                  <option value="自交系">自交系</option>
                  <option value="杂交种">杂交种</option>
                  <option value="野生种">野生种</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">数据覆盖度</span>
              <div className="flex flex-wrap gap-4 items-start">
                <div className="flex flex-col gap-3">
                  <select 
                     className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                     value={filters.hasGenotype}
                     onChange={(e) => handleChange('hasGenotype', e.target.value)}
                  >
                     <option value="all">是否有基因型数据</option>
                     <option value="yes">是</option>
                     <option value="no">否</option>
                  </select>

                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-48">
                    <span className="text-sm text-gray-500 whitespace-nowrap">位点数 ≥</span>
                    <input 
                      type="number" 
                      className="w-full text-sm border-transparent bg-transparent focus:ring-0 text-gray-900 font-medium p-0"
                      value={filters.siteCountMin}
                      onChange={(e) => handleChange('siteCountMin', e.target.value)}
                    />
                  </div>
                </div>

                <select 
                   className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                   value={filters.hasPhenotype}
                   onChange={(e) => handleChange('hasPhenotype', e.target.value)}
                >
                   <option value="all">是否有表型数据</option>
                   <option value="yes">是</option>
                   <option value="no">否</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Experiment Dimension Content */}
        {activeDimension === 'experiment' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">试验筛选</span>
              <div className="flex flex-wrap gap-4">
                <select 
                  className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                  value={filters.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                >
                  <option value="">所有试验年份</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                
                <select 
                  className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                  value={filters.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                >
                  <option value="">所有试验地点</option>
                  <option value="杨凌">杨凌</option>
                  <option value="海南">海南</option>
                  <option value="张掖">张掖</option>
                </select>

                <div className="flex items-center gap-2 bg-gray-50 px-3 rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-500">关联试验数 ≥</span>
                  <input 
                    type="number" 
                    className="w-20 text-sm border-transparent bg-transparent focus:ring-0 text-gray-900 font-medium"
                    value={filters.minExpCount}
                    onChange={(e) => handleChange('minExpCount', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phenotype Dimension Content */}
        {activeDimension === 'phenotype' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">性状筛选</span>
              <div className="flex flex-wrap gap-4">
                <select 
                  className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                  value={filters.phenotypeTrait}
                  onChange={(e) => handleChange('phenotypeTrait', e.target.value)}
                >
                  <option value="">所有性状</option>
                  <option value="株高">株高 (Plant Height)</option>
                  <option value="穗位高">穗位高 (Ear Height)</option>
                  <option value="穗长">穗长 (Ear Length)</option>
                  <option value="产量">产量 (Yield)</option>
                  <option value="倒折率">倒折率 (Stalk Lodging)</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">按性状名称查看统计数据。</p>
            </div>
          </div>
        )}

        {/* Environment Dimension Content */}
        {activeDimension === 'environment' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">环境筛选</span>
              <div className="flex flex-wrap gap-4">
                 <select 
                   className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                   value={filters.location}
                   onChange={(e) => handleChange('location', e.target.value)}
                >
                   <option value="">所有试验点</option>
                   <option value="青岛研发中心-基地A">青岛研发中心-基地A</option>
                   <option value="德州育种实验基地">德州育种实验基地</option>
                   <option value="南繁中心-12号试验地">南繁中心-12号试验地</option>
                   <option value="甘肃平凉试验站">甘肃平凉试验站</option>
                </select>

                <select 
                  className="w-48 text-sm border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2.5"
                  value={filters.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                >
                  <option value="">所有年份</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">按采集地点和年份筛选环境监测文件。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
