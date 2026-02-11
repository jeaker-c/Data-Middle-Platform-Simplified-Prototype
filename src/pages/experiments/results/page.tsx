import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';

interface MaterialData {
  id: string;
  name: string;
  bloodLineage: {
    type: string;
    percentage: number;
    color: string;
  }[];
  groupName: string;
  p: number;
  ss: number;
  rd: number;
  tst: number;
  la: number;
  x: number;
  gr: number;
  idVal: number;
  ctst: number;
  hg: number;
  nss: number;
}

const MOCK_DATA: MaterialData[] = [
  {
    id: '1',
    name: 'zc7',
    bloodLineage: [
      { type: 'ID', percentage: 86.94, color: 'bg-orange-300' },
      { type: 'NSS', percentage: 10.5, color: 'bg-green-500' },
    ],
    groupName: 'ID',
    p: 0.00001, ss: 0.00662, rd: 0.01501, tst: 0.00001, la: 0.00001, x: 0.01977, gr: 0.00001, idVal: 0.86935, ctst: 0.03022, hg: 0.00001, nss: 0.05898
  },
  {
    id: '2',
    name: 'zc471',
    bloodLineage: [
      { type: 'NSS', percentage: 57.27, color: 'bg-green-500' },
      { type: 'ID', percentage: 22.71, color: 'bg-orange-300' },
      { type: 'P', percentage: 9.5, color: 'bg-red-500' },
      { type: 'other', percentage: 10.52, color: 'bg-gray-300' },
    ],
    groupName: 'Mixed',
    p: 0.09211, ss: 0.00001, rd: 0.00001, tst: 0.01952, la: 0.00350, x: 0.04214, gr: 0.01091, idVal: 0.22713, ctst: 0.01291, hg: 0.01911, nss: 0.57265
  },
  {
    id: '3',
    name: 'zc51022',
    bloodLineage: [
      { type: 'SS', percentage: 41.26, color: 'bg-red-300' },
      { type: 'X', percentage: 36.79, color: 'bg-purple-500' },
      { type: 'NSS', percentage: 21.91, color: 'bg-green-500' },
    ],
    groupName: 'Mixed',
    p: 0.00001, ss: 0.41284, rd: 0.00001, tst: 0.00001, la: 0.00001, x: 0.36794, gr: 0.00001, idVal: 0.00001, ctst: 0.00001, hg: 0.00001, nss: 0.21914
  },
  {
    id: '4',
    name: 'zc392',
    bloodLineage: [
      { type: 'SS', percentage: 68.24, color: 'bg-red-300' },
      { type: 'NSS', percentage: 15.5, color: 'bg-green-500' },
      { type: 'other', percentage: 16.26, color: 'bg-gray-300' },
    ],
    groupName: 'SS',
    p: 0.00001, ss: 0.68237, rd: 0.02983, tst: 0.01334, la: 0.02090, x: 0.05424, gr: 0.01074, idVal: 0.06074, ctst: 0.00001, hg: 0.00001, nss: 0.12781
  },
  {
    id: '5',
    name: 'zc2082',
    bloodLineage: [
      { type: 'ID', percentage: 72.98, color: 'bg-orange-300' },
      { type: 'CT', percentage: 10.5, color: 'bg-green-300' },
      { type: 'other', percentage: 16.52, color: 'bg-gray-300' },
    ],
    groupName: 'ID',
    p: 0.02431, ss: 0.00001, rd: 0.03228, tst: 0.02512, la: 0.02916, x: 0.03870, gr: 0.00284, idVal: 0.72980, ctst: 0.07811, hg: 0.01509, nss: 0.02459
  },
  {
    id: '6',
    name: 'zc4742',
    bloodLineage: [
      { type: 'ID', percentage: 45.78, color: 'bg-orange-300' },
      { type: 'GR', percentage: 18.07, color: 'bg-orange-500' },
      { type: 'TST', percentage: 10.5, color: 'bg-blue-500' },
      { type: 'other', percentage: 25.65, color: 'bg-gray-300' },
    ],
    groupName: 'Mixed',
    p: 0.00308, ss: 0.00001, rd: 0.08424, tst: 0.10581, la: 0.10079, x: 0.00001, gr: 0.18068, idVal: 0.45778, ctst: 0.02096, hg: 0.01264, nss: 0.03400
  },
  {
    id: '7',
    name: 'zc559',
    bloodLineage: [
      { type: 'ID', percentage: 32.31, color: 'bg-orange-300' },
      { type: 'NSS', percentage: 24.01, color: 'bg-green-500' },
      { type: 'CTST', percentage: 15.21, color: 'bg-green-300' },
      { type: 'other', percentage: 28.47, color: 'bg-gray-300' },
    ],
    groupName: 'Mixed',
    p: 0.02851, ss: 0.08723, rd: 0.10915, tst: 0.02022, la: 0.00905, x: 0.00001, gr: 0.00001, idVal: 0.32308, ctst: 0.15214, hg: 0.03054, nss: 0.24006
  },
  {
    id: '8',
    name: 'zc234',
    bloodLineage: [
      { type: 'NSS', percentage: 57.32, color: 'bg-green-500' },
      { type: 'ID', percentage: 20.30, color: 'bg-orange-300' },
      { type: 'other', percentage: 22.38, color: 'bg-gray-300' },
    ],
    groupName: 'Mixed',
    p: 0.04664, ss: 0.00001, rd: 0.00940, tst: 0.01693, la: 0.06659, x: 0.04320, gr: 0.00001, idVal: 0.20297, ctst: 0.02017, hg: 0.02086, nss: 0.57322
  },
  {
    id: '9',
    name: 'zc449',
    bloodLineage: [
      { type: 'HG', percentage: 31.45, color: 'bg-yellow-400' },
      { type: 'SS', percentage: 31.29, color: 'bg-red-300' },
      { type: 'X', percentage: 17.54, color: 'bg-purple-500' },
      { type: 'other', percentage: 19.72, color: 'bg-gray-300' },
    ],
    groupName: 'Mixed',
    p: 0.00001, ss: 0.31248, rd: 0.07615, tst: 0.01598, la: 0.00001, x: 0.17542, gr: 0.00001, idVal: 0.00001, ctst: 0.00001, hg: 0.31445, nss: 0.10547
  },
];

const LEGEND_ITEMS = [
  { label: 'TST-热带群', color: 'bg-blue-500' },
  { label: 'HG-黄改群', color: 'bg-yellow-400' },
  { label: 'GR-灰色瑞德群', color: 'bg-orange-500' },
  { label: 'ID-Iodent群', color: 'bg-orange-300' },
  { label: 'NSS-NSS群', color: 'bg-green-500' },
  { label: 'CTST-中国温带', color: 'bg-green-300' },
  { label: 'P-P群', color: 'bg-red-500' },
  { label: 'SS-SS群', color: 'bg-red-300' },
  { label: 'X-X群', color: 'bg-purple-500' },
  { label: 'LA-Lancaster群', color: 'bg-purple-300' },
  { label: 'RD-瑞德群', color: 'bg-amber-800' },
];

// --- New Data for Functional Gene Diagnosis ---

interface FunctionalGeneData {
  id: string;
  name: string;
  excellent: number;
  heterozygous: number;
  nonDominant: number;
  rank: number;
  genotypes: Record<string, 'excellent' | 'non-dominant' | 'heterozygous'>;
}

const GENE_CATEGORIES = [
  { name: '产量', color: 'bg-red-300', genes: ['YIGE1', 'KRN2', 'KRN4', 'KNR6', 'ZmGRAS11'] },
  { name: '开花期', color: 'bg-blue-300', genes: ['ZmCOL3', 'ZCN8', 'VGT1'] },
  { name: '抗病性', color: 'bg-green-300', genes: ['ZmFUT1', 'RppK', 'ZmGLK36', 'ZmREM1.3', 'MYBR92', 'ZmNANMT', 'ZmMMM1', 'Htn1'] },
  { name: '抗逆性', color: 'bg-purple-300', genes: ['ZmABH2', 'ZmPP2C-A10'] },
  { name: '品质', color: 'bg-orange-300', genes: ['ZmNAC075', 'ZmFAD2', 'ZmNAS4', 'THP9', 'ZmMADS8'] },
  { name: '水分', color: 'bg-orange-200', genes: ['microRPG1', 'ZmGAR2'] },
  { name: '株型', color: 'bg-blue-300', genes: ['Br2', 'ZmPIF3.3', 'ZmRAVL1', 'ZmPYL10', 'CT3'] }
];

// Helper to generate a consistent mock genotype based on name and gene
const getMockGenotype = (name: string, gene: string): 'excellent' | 'non-dominant' | 'heterozygous' => {
  const hash = (name + gene).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (hash % 5 === 0) return 'heterozygous';
  if (hash % 3 === 0) return 'non-dominant';
  return 'excellent';
};

const FUNCTIONAL_MOCK_DATA: FunctionalGeneData[] = [
  { id: '1', name: 'zc312', excellent: 17, heterozygous: 0, nonDominant: 13, rank: 1, genotypes: {} },
  { id: '2', name: 'zc170', excellent: 17, heterozygous: 0, nonDominant: 13, rank: 2, genotypes: {} },
  { id: '3', name: 'zc169', excellent: 15, heterozygous: 0, nonDominant: 15, rank: 3, genotypes: {} },
  { id: '4', name: 'zc5162', excellent: 14, heterozygous: 0, nonDominant: 16, rank: 4, genotypes: {} },
  { id: '5', name: 'zc168', excellent: 13, heterozygous: 0, nonDominant: 17, rank: 5, genotypes: {} },
].map(item => {
  const genotypes: Record<string, 'excellent' | 'non-dominant' | 'heterozygous'> = {};
  GENE_CATEGORIES.forEach(cat => {
    cat.genes.forEach(gene => {
      // Manual overrides to match screenshot partially for visual effect
      if (item.name === 'zc312' && ['YIGE1', 'KRN2', 'KRN4', 'KNR6', 'ZmGRAS11'].includes(gene)) genotypes[gene] = 'excellent';
      else if (item.name === 'zc312' && ['ZmCOL3', 'ZCN8'].includes(gene)) genotypes[gene] = 'excellent';
      else if (item.name === 'zc312' && ['VGT1'].includes(gene)) genotypes[gene] = 'non-dominant';
      else genotypes[gene] = getMockGenotype(item.name, gene);
    });
  });
  return { ...item, genotypes };
});

// --- New Data for Breeding Value Prediction ---

interface BreedingValueData {
  id: string;
  materialName: string;
  yield: number;
  remark: string;
}

const BREEDING_VALUE_MOCK_DATA: BreedingValueData[] = [
  { id: '1', materialName: 'zc170', yield: 0.44, remark: '' },
  { id: '2', materialName: 'zc5162', yield: -1.11, remark: '' },
  { id: '3', materialName: 'zc169', yield: -4.71, remark: '' },
  { id: '4', materialName: 'zc168', yield: -3.66, remark: '' },
  { id: '5', materialName: 'zc312', yield: -1.13, remark: '' },
];

// --- New Data for Best Parent Matching ---

interface BestParentMatchingData {
  id: string;
  rank: number;
  femaleParent: string;
  maleParent: string;
  predictedYield: number;
  remark: string;
}

const BEST_PARENT_MATCHING_MOCK_DATA: BestParentMatchingData[] = [
  { id: '1', rank: 1, femaleParent: 'zc170', maleParent: 'zc5162', predictedYield: 12.5, remark: '' },
  { id: '2', rank: 2, femaleParent: 'zc170', maleParent: 'zc169', predictedYield: 11.8, remark: '' },
  { id: '3', rank: 3, femaleParent: 'zc170', maleParent: 'zc168', predictedYield: 10.2, remark: '' },
  { id: '4', rank: 4, femaleParent: 'zc5162', maleParent: 'zc312', predictedYield: 9.5, remark: '' },
  { id: '5', rank: 5, femaleParent: 'zc169', maleParent: 'zc312', predictedYield: 8.9, remark: '' },
];


export default function MaterialDiagnosisResultsPage() {
  const navigate = useNavigate();
  const [currentStrategy, setCurrentStrategy] = useState('育种群体预测');
  const [activeTab, setActiveTab] = useState('材料基因诊断');

  const TABS = [
    '材料基因诊断',
    '功能基因诊断',
    '育种值预测',
    '最佳亲本匹配',
    '多性状协同筛选',
    '特定产区性状预测'
  ];

  const handleBack = () => {
    navigate('/experiments');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-8 pt-24">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">材料基因型分析结果</h1>
          <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
            <nav className="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                            ${activeTab === tab
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        {activeTab === '材料基因诊断' && (
           <>
            {/* Current Strategy */}
            <div className="bg-white p-4 rounded-t-lg border-b border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">当前策略：</span>
                  <span className="font-medium text-gray-900">育种群体预测</span>
                 </div>
            </div>

            {/* Legend */}
            <div className="bg-white p-6 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Group-血缘分组图例</h3>
              <div className="flex flex-wrap gap-4">
                {LEGEND_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={`w-8 h-2 rounded-full ${item.color}`}></span>
                    <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="请输入材料..." 
                    className="pl-3 pr-10 py-1.5 border border-gray-200 rounded text-sm w-48 focus:outline-none focus:border-green-500"
                  />
                </div>
                <button className="px-6 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors">
                  搜索
                </button>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1">
                  进入群体预测 <span className="text-xs">→</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">主要血缘占比阈值：</span>
                <div className="relative">
                    <select className="appearance-none bg-transparent border border-gray-200 rounded px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-green-500">
                        <option>60.00%</option>
                        <option>50.00%</option>
                        <option>40.00%</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1">
                  调整 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">材料</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-[300px]">GROUP-血缘</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                      群名称 <span className="text-gray-400">▼</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">P <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">SS <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">RD <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">TST <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">LA <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">X <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">GR <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">CTST <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">HG <span className="text-gray-300 text-[10px]">◆</span></th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">NSS <span className="text-gray-300 text-[10px]">◆</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {MOCK_DATA.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{row.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex h-5 w-full rounded-full overflow-hidden bg-gray-100 relative">
                          {row.bloodLineage.map((segment, idx) => (
                            <div 
                              key={idx}
                              className={`${segment.color} h-full flex items-center justify-center text-[10px] text-white font-medium whitespace-nowrap overflow-hidden px-1`}
                              style={{ width: `${segment.percentage}%` }}
                            >
                              {segment.percentage > 10 && `${segment.type} ${segment.percentage}%`}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{row.groupName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.p.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.ss.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.rd.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.tst.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.la.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.x.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.gr.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.idVal.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.ctst.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.hg.toFixed(5)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">{row.nss.toFixed(5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-100 rounded-b-lg gap-4">
              <div className="flex items-center gap-1">
                 <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <button className="px-2 py-0.5 border border-gray-200 rounded text-sm font-medium hover:border-green-500 hover:text-green-600">1</button>
                 <span className="text-sm text-gray-500">/ 2</span>
                 <button className="p-1 text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
              <select className="text-sm border-none text-gray-600 focus:ring-0 cursor-pointer">
                <option>10条/页</option>
                <option>20条/页</option>
              </select>
              <span className="text-sm text-gray-500">共 13 条记录</span>
            </div>
           </>
        )}

        {activeTab === '功能基因诊断' && (
           <>
            {/* Header / Current Strategy */}
            <div className="bg-white p-4 rounded-t-lg border-b border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">当前策略：</span>
                  <span className="font-medium text-gray-900">品种开发</span>
                 </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入材料名称" 
                    className="pl-3 pr-10 py-1.5 border border-gray-200 rounded text-sm w-48 focus:outline-none focus:border-green-500"
                  />
                </div>
                <button className="px-6 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors">
                  搜索
                </button>
                <button className="px-6 py-1.5 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                  重置
                </button>
                <button className="px-6 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1">
                  绘制 <span className="text-xs">→</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left w-12">
                        <input type="checkbox" className="rounded border-gray-300 text-green-500 focus:ring-green-500" defaultChecked />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">材料</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">优秀基因</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">杂合基因</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">非优势纯合基因</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">株优良基因比例排名</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {FUNCTIONAL_MOCK_DATA.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                       <td className="px-4 py-3">
                           <input type="checkbox" className="rounded border-gray-300 text-green-500 focus:ring-green-500" defaultChecked />
                       </td>
                       <td className="px-4 py-3 text-sm text-gray-700">{row.name}</td>
                       <td className="px-4 py-3 text-sm text-gray-700">{row.excellent}</td>
                       <td className="px-4 py-3 text-sm text-gray-700">{row.heterozygous}</td>
                       <td className="px-4 py-3 text-sm text-gray-700">{row.nonDominant}</td>
                       <td className="px-4 py-3 text-sm text-gray-700">{row.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Pagination */}
             <div className="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-100 gap-4">
               <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="px-2 py-0.5 border border-gray-200 rounded text-sm font-medium hover:border-green-500 hover:text-green-600">1</button>
                  <span className="text-sm text-gray-500">/ 1</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
               </div>
               <select className="text-sm border-none text-gray-600 focus:ring-0 cursor-pointer">
                 <option>10条/页</option>
                 <option>20条/页</option>
               </select>
               <span className="text-sm text-gray-500">共 5 条记录</span>
             </div>

            {/* Chart Section */}
            <div className="bg-white mt-4 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-base font-bold text-gray-800 mx-auto">关键基因-样本基因型分布</h3>
                    <button className="px-4 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-1">
                        导出图片 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                </div>

                {/* Legend for Chart */}
                <div className="flex items-center gap-6 justify-end mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-700"></div>
                        <span className="text-sm text-gray-700">优秀</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-700">非优势纯合</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-700 to-blue-600"></div>
                        <span className="text-sm text-gray-700">杂合</span>
                    </div>
                </div>

                <div className="overflow-x-auto pb-12">
                    <div className="min-w-max">
                        {/* Header Row (Categories) */}
                        <div className="flex">
                            <div className="w-24 shrink-0"></div> {/* Spacer for row labels */}
                            {GENE_CATEGORIES.map((cat, idx) => (
                                <div key={idx} className={`${cat.color} text-center py-1 text-sm font-medium text-gray-800`} style={{ width: `${cat.genes.length * 36}px`, margin: '0 4px' }}>
                                    {cat.name}
                                </div>
                            ))}
                        </div>

                        {/* Data Rows */}
                        {FUNCTIONAL_MOCK_DATA.map((row) => (
                            <div key={row.id} className="flex items-center py-3 hover:bg-gray-50">
                                <div className="w-24 shrink-0 text-right pr-4 text-sm font-medium text-gray-700">{row.name}</div>
                                {GENE_CATEGORIES.map((cat, catIdx) => (
                                    <div key={catIdx} className="flex justify-center" style={{ width: `${cat.genes.length * 36}px`, margin: '0 4px' }}>
                                        {cat.genes.map((gene, geneIdx) => {
                                            const status = row.genotypes[gene];
                                            let bgClass = 'bg-gray-200';
                                            if (status === 'excellent') bgClass = 'bg-red-700';
                                            else if (status === 'non-dominant') bgClass = 'bg-blue-600';
                                            else if (status === 'heterozygous') bgClass = 'bg-gradient-to-r from-red-700 to-blue-600';

                                            return (
                                                <div key={geneIdx} className="w-9 flex justify-center">
                                                    <div className={`w-5 h-5 rounded-full ${bgClass}`} title={`${gene}: ${status}`}></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* X-axis Labels */}
                        <div className="flex mt-2">
                            <div className="w-24 shrink-0"></div>
                            {GENE_CATEGORIES.map((cat, catIdx) => (
                                <div key={catIdx} className="flex justify-center" style={{ width: `${cat.genes.length * 36}px`, margin: '0 4px' }}>
                                    {cat.genes.map((gene, geneIdx) => (
                                        <div key={geneIdx} className="w-9 flex justify-center relative h-32">
                                            <span className="absolute top-0 left-1/2 -translate-x-1/2 origin-top-left rotate-90 whitespace-nowrap text-xs text-gray-600 mt-2">
                                                {gene}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           </>
        )}

        {activeTab === '育种值预测' && (
           <>
            {/* Header / Current Strategy */}
            <div className="bg-white p-4 rounded-t-lg border-b border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">当前策略：</span>
                  <span className="font-medium text-gray-900">品种开发</span>
                 </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入材料名称" 
                    className="pl-3 pr-10 py-1.5 border border-gray-200 rounded text-sm w-48 focus:outline-none focus:border-green-500"
                  />
                </div>
                <button className="px-6 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors">
                  搜索
                </button>
                <button className="px-6 py-1.5 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                  重置
                </button>
            </div>

            {/* Table */}
            <div className="bg-white overflow-x-auto min-h-[400px]">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 w-16">序号</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200">材料</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-1">
                            产量
                            <div className="flex flex-col">
                                <svg className="w-2 h-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-8 8h16l-8-8z"/></svg>
                                <svg className="w-2 h-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20l8-8H4l8 8z"/></svg>
                            </div>
                        </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200 w-1/3">备注</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {BREEDING_VALUE_MOCK_DATA.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                       <td className="px-4 py-4 text-sm text-gray-500">{index + 1}</td>
                       <td className="px-4 py-4 text-sm text-gray-700 font-medium border-l border-gray-50">{row.materialName}</td>
                       <td className="px-4 py-4 text-sm text-gray-700 border-l border-gray-50">{row.yield}</td>
                       <td className="px-4 py-3 border-l border-gray-50">
                           <input 
                            type="text" 
                            placeholder="请输入备注" 
                            className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500 transition-colors"
                            defaultValue={row.remark}
                           />
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Pagination */}
             <div className="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-100 gap-4">
               <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="px-2 py-0.5 border border-gray-200 rounded text-sm font-medium hover:border-green-500 hover:text-green-600">1</button>
                  <span className="text-sm text-gray-500">/ 1</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
               </div>
               <select className="text-sm border-none text-gray-600 focus:ring-0 cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
               </select>
               <span className="text-sm text-gray-500">共 5 条记录</span>
             </div>
           </>
        )}

        {activeTab === '最佳亲本匹配' && (
           <>
            {/* Header / Current Strategy */}
            <div className="bg-white p-4 rounded-t-lg border-b border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700">当前策略：</span>
                  <span className="font-medium text-gray-900">品种开发</span>
                 </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入材料名称" 
                    className="pl-3 pr-10 py-1.5 border border-gray-200 rounded text-sm w-48 focus:outline-none focus:border-green-500"
                  />
                </div>
                <button className="px-6 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors">
                  搜索
                </button>
                <button className="px-6 py-1.5 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                  重置
                </button>
            </div>

            {/* Table */}
            <div className="bg-white overflow-x-auto min-h-[400px]">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 w-16">排名</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200">母本</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200">父本</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-1">
                            预测产量
                            <div className="flex flex-col">
                                <svg className="w-2 h-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-8 8h16l-8-8z"/></svg>
                                <svg className="w-2 h-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20l8-8H4l8 8z"/></svg>
                            </div>
                        </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 border-l border-gray-200 w-1/3">备注</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {BEST_PARENT_MATCHING_MOCK_DATA.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                       <td className="px-4 py-4 text-sm text-gray-500">{row.rank}</td>
                       <td className="px-4 py-4 text-sm text-gray-700 font-medium border-l border-gray-50">{row.femaleParent}</td>
                       <td className="px-4 py-4 text-sm text-gray-700 font-medium border-l border-gray-50">{row.maleParent}</td>
                       <td className="px-4 py-4 text-sm text-gray-700 border-l border-gray-50">{row.predictedYield}</td>
                       <td className="px-4 py-3 border-l border-gray-50">
                           <input 
                            type="text" 
                            placeholder="请输入备注" 
                            className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500 transition-colors"
                            defaultValue={row.remark}
                           />
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             {/* Pagination */}
             <div className="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-100 gap-4">
               <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="px-2 py-0.5 border border-gray-200 rounded text-sm font-medium hover:border-green-500 hover:text-green-600">1</button>
                  <span className="text-sm text-gray-500">/ 1</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600" disabled>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
               </div>
               <select className="text-sm border-none text-gray-600 focus:ring-0 cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
               </select>
               <span className="text-sm text-gray-500">共 5 条记录</span>
             </div>
           </>
        )}

        {!['材料基因诊断', '功能基因诊断', '育种值预测', '最佳亲本匹配'].includes(activeTab) && (
             <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-100">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">{activeTab} 功能开发中</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
