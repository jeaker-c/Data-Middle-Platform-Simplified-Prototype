import { Material, Experiment, PhenotypeRecord } from '../types';

interface MaterialListProps {
  data: Material[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetail: (material: Material) => void;
  onViewExperiment?: (experiment: Experiment) => void;
  onViewPhenotype?: (record: PhenotypeRecord) => void;
  activeDimension?: string; // New prop to control table view
}

const getMockExperiment = (idx: number): Experiment => ({
  id: `1001${39 + idx * 6}`,
  name: idx === 0 ? 'WMSPMDC1LJ03' : (idx === 1 ? 'ZMS24_NORTH_01' : 'GMS_TEST_V2'),
  year: idx === 1 ? '2025' : '2026',
  type: idx === 0 ? '产量试验' : (idx === 1 ? '抗性鉴定' : '品比试验'),
  materialCount: idx === 0 ? 150 : (idx === 1 ? 80 : 200),
  siteCount: idx === 0 ? 12 : (idx === 1 ? 5 : 8),
  status: 'completed',
  sites: idx === 0 
    ? ['青岛研发基地', '德州试验站', '三亚南繁中心', '甘肃平凉基地', '杨凌示范区'] 
    : ['海南三亚', '甘肃张掖']
});

export default function MaterialList({ data, selectedIds, onSelect, onSelectAll, onViewDetail, onViewExperiment, onViewPhenotype, activeDimension = 'material' }: MaterialListProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const phenotypePreviewRows = [
    { experimentName: '试验A', siteName: '试验点1', dataPoint: 24 },
    { experimentName: '试验A', siteName: '试验点2', dataPoint: 35 },
    { experimentName: '试验A', siteName: '试验点3', dataPoint: 456 },
    { experimentName: '试验A', siteName: '试验点4', dataPoint: 3 },
    { experimentName: '试验A', siteName: '试验点5', dataPoint: 12 },
    { experimentName: '试验B', siteName: '试验点1', dataPoint: 2 },
    { experimentName: '试验B', siteName: '试验点3', dataPoint: 56 },
    { experimentName: '试验B', siteName: '试验点4', dataPoint: 2 },
    { experimentName: '试验B', siteName: '试验点5', dataPoint: 4 }
  ];

  // Phenotype View
  if (activeDimension === 'phenotype') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-10">
                  <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  性状
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  年份
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验名称
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验点
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  数据点
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  查看
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  下载
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {phenotypePreviewRows.map((row, idx) => (
                <tr key={`${row.experimentName}_${row.siteName}_${idx}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-700">株高</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-700">2025年</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                        <i className="ri-flask-line"></i>
                      </div>
                      <span className="text-base font-bold text-gray-900">{row.experimentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-gray-700">{row.siteName}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-gray-700">{row.dataPoint}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          onViewPhenotype?.({
                            traitName: '株高',
                            year: '2025年',
                            experimentName: row.experimentName,
                            siteName: row.siteName,
                            dataPoint: row.dataPoint
                          })
                        }
                        className="w-8 h-8 rounded-full border border-gray-200 inline-flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 inline-flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all">
                      <i className="ri-download-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Environment View
  if (activeDimension === 'environment') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-10">
                  <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  文件名
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  年份
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验点名称
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  文件大小
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  下载
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, 4).map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${idx === 3 ? 'bg-orange-50 text-orange-600' : 'bg-orange-50 text-orange-600'}`}>
                        <i className={`ri-file-${idx === 3 ? 'zip' : (idx === 1 ? 'excel' : 'excel')}-2-line`}></i>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {idx === 0 ? '2026_青岛基地_气象月报.xlsx' : 
                         idx === 1 ? '2025_德州试验站_土壤监测.csv' : 
                         idx === 2 ? '2026_三亚南繁_光照汇总.xlsx' : '2024_甘肃平凉_环境原始数据.zip'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600">
                      {idx === 0 ? '2026' : idx === 1 ? '2025' : idx === 2 ? '2026' : '2024'}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span className="text-sm font-medium">
                        {idx === 0 ? '青岛研发中心-基地A' : 
                         idx === 1 ? '德州育种实验基地' : 
                         idx === 2 ? '南繁中心-12号试验地' : '甘肃平凉试验站'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-gray-400">
                      {idx === 0 ? '2.4 MB' : idx === 1 ? '1.8 MB' : idx === 2 ? '3.1 MB' : '15.6 MB'}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all">
                      <i className="ri-download-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Experiment View
  if (activeDimension === 'experiment') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-32">
                  试验编号
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  名称
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  年份
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验类型
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  参试材料数
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验地点数
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  查看
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  下载
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[0, 1, 2].map((idx) => {
                const experiment = getMockExperiment(idx);
                return (
                  <tr key={experiment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-bold text-indigo-600">#{experiment.id}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-base font-bold text-gray-900">
                          {experiment.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm font-bold text-gray-600">
                          {experiment.year}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className="text-sm font-bold text-gray-800">
                          {experiment.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold w-16">
                          {experiment.materialCount}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-bold w-16">
                          {experiment.siteCount}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <button 
                        onClick={() => onViewExperiment?.(experiment)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-all inline-flex"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all ml-auto">
                        <i className="ri-download-line"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Default Material View
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input
                  type="checkbox"
                  className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
                  checked={allSelected}
                  onChange={onSelectAll}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                材料名称
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                类型
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                试验数
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                表型
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                基因型
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                环境
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图像
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                标签
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                下载
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onSelect(item.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <span className="ml-2 text-xs text-gray-400">#{item.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.experimentCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.phenotypeCount > 0 ? (
                    <span className="text-green-600 font-medium">{item.phenotypeCount} 项</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasGenotype ? (
                    <i className="ri-check-line text-green-500 text-lg"></i>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasEnvironment ? (
                    <i className="ri-check-line text-green-500 text-lg"></i>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <i className="ri-check-line text-green-500 text-lg"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-1 flex-wrap">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onViewDetail(item)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all inline-flex ml-auto"
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all ml-auto">
                    <i className="ri-download-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            暂无相关材料数据
          </div>
        )}
      </div>
    </div>
  );
}
