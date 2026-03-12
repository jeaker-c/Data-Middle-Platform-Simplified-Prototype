export interface Material {
  id: string;
  name: string;
  type: string; // e.g., '自交系', '杂交种'
  experimentCount: number;
  phenotypeCount: number; // 0 means no phenotype
  hasGenotype: boolean;
  hasEnvironment: boolean;
  tags: string[];
  // Additional details for drawer
  description?: string;
  updateTime?: string;
}

export interface Experiment {
  id: string;
  name: string;
  year: string;
  type: string;
  materialCount: number;
  siteCount: number;
  status: 'completed' | 'ongoing';
  sites: string[];
}

export interface FilterState {
  globalSearch: string;
  // Material Dimension
  materialType: string;
  materialTags: string[];
  hasGenotype: string; // 'all', 'yes', 'no'
  hasPhenotype: string; // 'all', 'yes', 'no'
  // Experiment Dimension
  experiments: string[];
  year: string;
  location: string;
  // Phenotype Dimension
  traits: string[];
  phenotypeMin: string;
  phenotypeMax: string;
  hasOutlier: boolean;
  // Genotype Dimension
  genotypeType: string;
  siteCountMin: string;
  isVCFComplete: string; // 'all', 'yes', 'no'
  // Environment Dimension
  envIndicators: string[];
  hasEnvData: string; // 'all', 'yes', 'no'
  // Advanced
  dateRange: [string, string];
  minExpCount: string;
  minVersionCount: string;
}

export const initialFilterState: FilterState = {
  globalSearch: '',
  materialType: '',
  materialTags: [],
  hasGenotype: 'all',
  hasPhenotype: 'all',
  experiments: [],
  year: '',
  location: '',
  traits: [],
  phenotypeMin: '',
  phenotypeMax: '',
  hasOutlier: false,
  genotypeType: '',
  siteCountMin: '',
  isVCFComplete: 'all',
  envIndicators: [],
  hasEnvData: 'all',
  dateRange: ['', ''],
  minExpCount: '',
  minVersionCount: ''
};
