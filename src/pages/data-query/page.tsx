import { useState, useMemo } from 'react';
import Navbar from '../home/components/Navbar';
import MaterialFilter from './components/MaterialFilter';
import MaterialList from './components/MaterialList';
import MaterialDrawer from './components/MaterialDrawer';
import ExperimentDrawer from './components/ExperimentDrawer';
import PhenotypeDrawer from './components/PhenotypeDrawer';
import BatchActionBar from './components/BatchActionBar';
import DataAgent from './components/DataAgent';
import { Material, Experiment, PhenotypeRecord, FilterState, initialFilterState } from './types';

// Mock Data
const MOCK_MATERIALS: Material[] = [
  { 
    id: 'M001', name: '陕丹1号', type: '自交系', experimentCount: 12, phenotypeCount: 45, hasGenotype: true, hasEnvironment: true, 
    genotypeSiteCount: 45230,
    tags: ['抗旱', '高产'], updateTime: '2025-01-20' 
  },
  { 
    id: 'M002', name: '郑单958', type: '杂交种', experimentCount: 28, phenotypeCount: 120, hasGenotype: true, hasEnvironment: true, 
    genotypeSiteCount: 45150,
    tags: ['广泛种植', '抗病'], updateTime: '2025-01-18' 
  },
  { 
    id: 'M003', name: 'B73', type: '自交系', experimentCount: 156, phenotypeCount: 500, hasGenotype: true, hasEnvironment: false, 
    genotypeSiteCount: 55200,
    tags: ['模式植物', '参考基因组'], updateTime: '2024-12-30' 
  },
  { 
    id: 'M004', name: 'Mo17', type: '自交系', experimentCount: 140, phenotypeCount: 480, hasGenotype: true, hasEnvironment: false, 
    genotypeSiteCount: 39800,
    tags: ['模式植物'], updateTime: '2024-12-29' 
  },
  { 
    id: 'M005', name: '西农979', type: '杂交种', experimentCount: 8, phenotypeCount: 0, hasGenotype: false, hasEnvironment: true, 
    tags: ['小麦', '抗寒'], updateTime: '2025-01-10' 
  },
  { 
    id: 'M006', name: 'KW7', type: '野生种', experimentCount: 3, phenotypeCount: 12, hasGenotype: true, hasEnvironment: true, 
    genotypeSiteCount: 12000,
    tags: ['种质资源', '稀有'], updateTime: '2024-11-15' 
  },
  { 
    id: 'M007', name: '豫玉22', type: '杂交种', experimentCount: 15, phenotypeCount: 30, hasGenotype: false, hasEnvironment: false, 
    tags: ['老品种'], updateTime: '2024-10-20' 
  },
  { 
    id: 'M008', name: '京科968', type: '杂交种', experimentCount: 45, phenotypeCount: 150, hasGenotype: true, hasEnvironment: true, 
    genotypeSiteCount: 46210,
    tags: ['高产', '多抗'], updateTime: '2025-01-25' 
  },
];

export default function MaterialManagementPage() {
  // State
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDimension, setActiveDimension] = useState('material'); // State to track active dimension
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailDrawerMaterial, setDetailDrawerMaterial] = useState<Material | null>(null);
  const [detailDrawerExperiment, setDetailDrawerExperiment] = useState<Experiment | null>(null);
  const [detailDrawerPhenotype, setDetailDrawerPhenotype] = useState<PhenotypeRecord | null>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_MATERIALS.filter(item => {
      // Global Search
      if (filters.globalSearch) {
        const term = filters.globalSearch.toLowerCase();
        const matchName = item.name.toLowerCase().includes(term);
        const matchId = item.id.toLowerCase().includes(term);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(term));
        if (!matchName && !matchId && !matchTags) return false;
      }
      
      // Material Type
      if (filters.materialType && item.type !== filters.materialType) return false;
      
      // Genotype
      if (filters.hasGenotype === 'yes' && !item.hasGenotype) return false;
      if (filters.hasGenotype === 'no' && item.hasGenotype) return false;

      if (filters.siteCountMin) {
        const min = Number(filters.siteCountMin);
        if (Number.isFinite(min)) {
          if (!item.genotypeSiteCount) return false;
          if (item.genotypeSiteCount < min) return false;
        }
      }
      
      // Phenotype
      if (filters.hasPhenotype === 'yes' && item.phenotypeCount === 0) return false;
      if (filters.hasPhenotype === 'no' && item.phenotypeCount > 0) return false;

      // ... Add more filter logic as needed based on mockup ...

      return true;
    });
  }, [filters]);

  // Handlers
  const handleFilterUpdate = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
    if (updates.materialType || updates.hasGenotype || updates.siteCountMin || updates.experiments || updates.year) {
      setIsFilterOpen(true);
    }
  };

  const handleDimensionChange = (dimension: string) => {
    setActiveDimension(dimension);
    if (dimension === 'material') return;
    if (dimension === 'experiment') return;
    if (dimension === 'phenotype') return;
    if (dimension === 'environment') return;
    setActiveDimension('material');
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(item => item.id));
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Main Content Area - Full height minus Navbar */}
      <div className="flex-1 flex pt-16 overflow-hidden">
        
        {/* Left: Material Data Area (75%) */}
        <div className="w-3/4 flex flex-col relative border-r border-gray-200 bg-white">
          
          {/* 2.2.1 Top: Global Search + Quick Actions */}
          <div className="p-6 pb-2">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="搜索材料名称 / 编号 / 标签" 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  value={filters.globalSearch}
                  onChange={(e) => setFilters(prev => ({ ...prev, globalSearch: e.target.value }))}
                />
              </div>
              <button className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                搜索
              </button>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-4 py-2.5 border font-medium rounded-lg flex items-center gap-2 transition-colors ${
                  isFilterOpen 
                    ? 'bg-teal-50 border-teal-200 text-teal-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className="ri-filter-3-line"></i>
                高级筛选
                <i className={`ri-arrow-down-s-line transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}></i>
              </button>
            </div>
          </div>

          {/* 2.2.2 Advanced Filter Area */}
          <div className="px-6">
            <MaterialFilter 
              filters={filters} 
              onFilterChange={setFilters}
              isOpen={isFilterOpen} 
              onDimensionChange={handleDimensionChange} // Pass handler
            />
          </div>

          {/* 2.2.3 Material List Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-20">
            <MaterialList 
              data={filteredData}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onViewDetail={(item) => {
                setDetailDrawerExperiment(null);
                setDetailDrawerPhenotype(null);
                setDetailDrawerMaterial(item);
              }}
              onViewExperiment={(exp) => {
                setDetailDrawerMaterial(null);
                setDetailDrawerPhenotype(null);
                setDetailDrawerExperiment(exp);
              }}
              onViewPhenotype={(record) => {
                setDetailDrawerMaterial(null);
                setDetailDrawerExperiment(null);
                setDetailDrawerPhenotype(record);
              }}
              activeDimension={activeDimension} // Pass active dimension
            />
          </div>
          
          <MaterialDrawer 
            isOpen={!!detailDrawerMaterial}
            material={detailDrawerMaterial}
            onClose={() => setDetailDrawerMaterial(null)}
          />

          <ExperimentDrawer
            isOpen={!!detailDrawerExperiment}
            experiment={detailDrawerExperiment}
            onClose={() => setDetailDrawerExperiment(null)}
          />

          <PhenotypeDrawer
            isOpen={!!detailDrawerPhenotype}
            record={detailDrawerPhenotype}
            onClose={() => setDetailDrawerPhenotype(null)}
          />
          {/* ... */}
        </div>
        
        <div className="w-1/4 h-full">
          <DataAgent onFilterUpdate={handleFilterUpdate} />
        </div>
      </div>
    </div>
  );
}
