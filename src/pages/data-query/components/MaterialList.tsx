import { Material, Experiment } from '../types';

interface MaterialListProps {
  data: Material[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetail: (material: Material) => void;
  onViewExperiment?: (experiment: Experiment) => void;
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

export default function MaterialList({ data, selectedIds, onSelect, onSelectAll, onViewDetail, onViewExperiment, activeDimension = 'material' }: MaterialListProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;

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
                  性状名称
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  材料数量
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验数量
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  试验点数量
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  下载
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {['株高 (Plant Height)', '穗位高 (Ear Height)', '穗长 (Ear Length)', '产量 (Yield)', '倒折率 (Stalk Lodging)'].map((trait, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                        <i className="ri-bar-chart-fill"></i>
                      </div>
                      <span className="text-base font-bold text-gray-900">{trait}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm font-bold text-gray-700">
                      {idx === 3 ? '2100' : (idx === 2 ? '950' : (idx === 4 ? '840' : '1280'))}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-indigo-600">
                      {idx === 3 ? '68' : (idx === 2 ? '32' : (idx === 4 ? '20' : '45'))}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className="text-sm font-bold text-green-600">
                      {idx === 3 ? '15' : (idx === 2 ? '8' : (idx === 4 ? '6' : '12'))}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all">
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Genotype View
  if (activeDimension === 'genotype') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-10">
                  <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-32">
                  DNA 样本编号
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  材料名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  SNP 总数
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  缺失率
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  杂合率
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                  下载
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-700">DNA_{String.fromCharCode(65 + (idx % 3))}{String(idx + 1).padStart(2, '0')}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-base font-bold text-gray-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-800">55,432</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1 w-20">
                      <span className={`text-sm font-bold ${idx === 2 ? 'text-red-500' : 'text-slate-600'}`}>
                         {idx === 2 ? '8.92%' : (idx === 1 ? '1.45%' : '0.82%')}
                      </span>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${idx === 2 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                          style={{ width: idx === 2 ? '40%' : '10%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1 w-20">
                      <span className={`text-sm font-bold ${idx === 2 ? 'text-orange-500' : 'text-slate-600'}`}>
                         {idx === 2 ? '15.2%' : (idx === 1 ? '0.4%' : '2.5%')}
                      </span>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div 
                          className={`h-full rounded-full ${idx === 2 ? 'bg-orange-500' : 'bg-teal-500'}`} 
                          style={{ width: idx === 2 ? '60%' : '15%' }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                     {idx === 2 ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">待复核</span>
                     ) : (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600">已质检</span>
                     )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all">
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
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all inline-flex"
                  >
                    <i className="ri-eye-line"></i>
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
