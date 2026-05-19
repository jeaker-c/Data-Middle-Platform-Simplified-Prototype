import { useEffect, useMemo, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type DataTypeKey = 'material' | 'phenotype' | 'genotype' | 'image' | 'environment';

interface TrendPoint {
  timestamp: string;
  label: string;
  value: number;
  dayKey: string;
}

interface DataTypeMetric {
  key: DataTypeKey;
  label: string;
  icon: string;
  color: string;
  softColor: string;
  today: number;
  yesterday: number;
  trend: TrendPoint[];
}

interface UploaderMetric {
  id: string;
  name: string;
  unit: string;
  uploadCount: number;
}

interface UnitMetric {
  id: string;
  unitName: string;
  totalUploads: number;
  weeklyIncrement: number;
  memberCount: number;
}

const dataTypeSeed: Array<Omit<DataTypeMetric, 'trend'>> = [
  { key: 'material', label: '材料', icon: 'ri-seedling-line', color: '#0F766E', softColor: '#CCFBF1', today: 148, yesterday: 121 },
  { key: 'phenotype', label: '表型', icon: 'ri-plant-line', color: '#0D9488', softColor: '#CCFBF1', today: 216, yesterday: 198 },
  { key: 'genotype', label: '基因型', icon: 'ri-dna-line', color: '#0891B2', softColor: '#CFFAFE', today: 134, yesterday: 142 },
  { key: 'image', label: '图片', icon: 'ri-image-line', color: '#16A34A', softColor: '#DCFCE7', today: 382, yesterday: 341 },
  { key: 'environment', label: '环境', icon: 'ri-cloud-line', color: '#65A30D', softColor: '#ECFCCB', today: 89, yesterday: 76 },
];

const uploaderSeed: UploaderMetric[] = [
  { id: 'u1', name: '张研究员', unit: '杨凌育种部门', uploadCount: 438 },
  { id: 'u2', name: '李博士', unit: '德州试验部门', uploadCount: 392 },
  { id: 'u3', name: '王助理', unit: '杨凌育种部门', uploadCount: 361 },
  { id: 'u4', name: '赵教授', unit: '南繁研究部门', uploadCount: 344 },
  { id: 'u5', name: '周九', unit: '张掖农业部门', uploadCount: 326 },
  { id: 'u6', name: '吴十', unit: '德州试验部门', uploadCount: 301 },
  { id: 'u7', name: '钱一', unit: '南繁研究部门', uploadCount: 286 },
  { id: 'u8', name: '孙八', unit: '杨凌育种部门', uploadCount: 271 },
  { id: 'u9', name: '郑工', unit: '张掖农业部门', uploadCount: 244 },
  { id: 'u10', name: '冯敏', unit: '北京创新部门', uploadCount: 228 },
];

const unitSeed: UnitMetric[] = [
  { id: 'd1', unitName: '杨凌育种部门', totalUploads: 4280, weeklyIncrement: 368, memberCount: 12 },
  { id: 'd2', unitName: '德州试验部门', totalUploads: 3124, weeklyIncrement: 254, memberCount: 9 },
  { id: 'd3', unitName: '南繁研究部门', totalUploads: 2986, weeklyIncrement: 241, memberCount: 8 },
  { id: 'd4', unitName: '张掖农业部门', totalUploads: 2216, weeklyIncrement: 196, memberCount: 7 },
  { id: 'd5', unitName: '北京创新部门', totalUploads: 1889, weeklyIncrement: 143, memberCount: 6 },
  { id: 'd6', unitName: '五常试验部门', totalUploads: 1542, weeklyIncrement: 128, memberCount: 5 },
];

const overviewSeed = {
  total: 128476,
  yoy: 14.38,
  mom: -3.72,
};

const buildTrend = (base: number, bias: number) => {
  const points: TrendPoint[] = [];
  const start = new Date('2026-04-16T00:00:00');
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 6) {
      const current = new Date(start);
      current.setDate(start.getDate() + day);
      current.setHours(hour, 0, 0, 0);
      points.push({
        timestamp: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')} ${String(current.getHours()).padStart(2, '0')}:00`,
        label: `${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`,
        dayKey: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`,
        value: Math.max(12, Math.round(base + Math.sin((day + hour / 24) * 1.1) * 18 + bias + hour * 0.9)),
      });
    }
  }
  return points;
};

const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

const GrowthIndicator = ({ value }: { value: number }) => {
  const isPositive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
      <i className={isPositive ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}></i>
      {formatPercent(value)}
    </span>
  );
};

const TrendTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as TrendPoint;
  return (
    <div className="rounded-lg border border-teal-100 bg-white px-3 py-2 shadow-lg">
      <div className="text-xs font-medium text-gray-500">{point.timestamp}</div>
      <div className="mt-1 text-sm font-semibold text-gray-900">新增 {point.value} 条</div>
    </div>
  );
};

export default function RealtimeDashboard({ tabSlot }: { tabSlot?: ReactNode } = {}) {
  const navigate = useNavigate();
  const [refreshTick, setRefreshTick] = useState(0);
  const [lastRefreshAt, setLastRefreshAt] = useState(() => new Date());
  const [unitFilter, setUnitFilter] = useState('全部部门');
  const [selectedDataType, setSelectedDataType] = useState<DataTypeKey>('material');
  const [isTrendModalOpen, setIsTrendModalOpen] = useState(false);
  const [drilldownPoint, setDrilldownPoint] = useState<TrendPoint | null>(null);
  const [unitKeyword, setUnitKeyword] = useState('');
  const [sortField, setSortField] = useState<'unitName' | 'totalUploads' | 'weeklyIncrement' | 'perCapita'>('totalUploads');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRefreshTick((prev) => prev + 1);
      setLastRefreshAt(new Date());
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const dashboardMetrics = useMemo(() => {
    return dataTypeSeed.map((item, index) => {
      const delta = refreshTick % 7;
      return {
        ...item,
        today: item.today + delta * (index + 1),
        yesterday: item.yesterday + (delta % 3) * index,
        trend: buildTrend(item.today / 3, index * 5 + delta),
      };
    });
  }, [refreshTick]);

  const overviewStats = useMemo(() => {
    const totalIncrement = dashboardMetrics.reduce((sum, item) => sum + item.today, 0);
    return {
      total: overviewSeed.total + refreshTick * 96 + totalIncrement,
      yoy: overviewSeed.yoy + (refreshTick % 5) * 0.17,
      mom: overviewSeed.mom + (refreshTick % 4) * 0.09,
    };
  }, [dashboardMetrics, refreshTick]);

  const uploaderRank = useMemo(() => {
    return uploaderSeed
      .map((item, index) => ({
        ...item,
        uploadCount: item.uploadCount + ((refreshTick + index) % 6) * 4,
      }))
      .filter((item) => unitFilter === '全部部门' || item.unit === unitFilter)
      .sort((a, b) => b.uploadCount - a.uploadCount)
      .slice(0, 10);
  }, [refreshTick, unitFilter]);

  const unitOptions = useMemo(() => ['全部部门', ...Array.from(new Set(uploaderSeed.map((item) => item.unit)))], []);

  const unitRows = useMemo(() => {
    const rows = unitSeed
      .map((item, index) => {
        const totalUploads = item.totalUploads + (refreshTick % 5) * (index + 3);
        const weeklyIncrement = item.weeklyIncrement + (refreshTick % 3) * (index + 1);
        return {
          ...item,
          totalUploads,
          weeklyIncrement,
          perCapita: Number((totalUploads / item.memberCount).toFixed(1)),
        };
      })
      .filter((item) => item.unitName.includes(unitKeyword.trim()));

    return rows.sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'unitName') return a.unitName.localeCompare(b.unitName, 'zh-CN') * direction;
      return ((a as any)[sortField] - (b as any)[sortField]) * direction;
    });
  }, [refreshTick, unitKeyword, sortField, sortOrder]);

  const selectedMetric = dashboardMetrics.find((item) => item.key === selectedDataType) || dashboardMetrics[0];
  const selectedDrillPoint = drilldownPoint || selectedMetric.trend[selectedMetric.trend.length - 1];
  const selectedDayPoints = selectedMetric.trend.filter((item) => item.dayKey === selectedDrillPoint.dayKey);

  const openTrendModal = (metricKey: DataTypeKey, point?: TrendPoint) => {
    setSelectedDataType(metricKey);
    const targetMetric = dashboardMetrics.find((item) => item.key === metricKey) || dashboardMetrics[0];
    setDrilldownPoint(point || targetMetric.trend[targetMetric.trend.length - 1]);
    setIsTrendModalOpen(true);
  };

  const handleSort = (field: 'unitName' | 'totalUploads' | 'weeklyIncrement' | 'perCapita') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortOrder(field === 'unitName' ? 'asc' : 'desc');
  };

  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">实时数据监控</h2>
            <p className="mt-1 text-sm text-gray-500">围绕数据总量、分类增量、上传者和部门贡献进行持续监测与快速下钻。</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-teal-100 bg-white px-3 py-1.5 text-sm text-gray-600 shadow-sm">
              <i className="ri-time-line text-teal-600"></i>
              最近刷新：{lastRefreshAt.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
            {tabSlot}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
          <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-600 to-emerald-500 p-5 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-white/80">系统总数据量</div>
                <div className="mt-2 text-3xl font-bold tracking-tight">{overviewStats.total.toLocaleString()}</div>
                <div className="mt-1 text-xs text-white/80">自动刷新中，每 15 秒更新一次模拟数据</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <i className="ri-database-2-line text-2xl"></i>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <div className="text-xs text-white/70">年同比增长</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-semibold">{overviewStats.yoy.toFixed(2)}%</span>
                  <GrowthIndicator value={overviewStats.yoy} />
                </div>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <div className="text-xs text-white/70">年环比增长</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-semibold">{overviewStats.mom.toFixed(2)}%</span>
                  <GrowthIndicator value={overviewStats.mom} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {dashboardMetrics.slice(0, 4).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setSelectedDataType(item.key);
                  setDrilldownPoint(item.trend[item.trend.length - 1]);
                }}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  selectedDataType === item.key ? 'border-teal-300 ring-2 ring-teal-100' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: item.softColor, color: item.color }}>
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <span className="text-[11px] font-medium text-gray-400">今日新增</span>
                </div>
                <div className="mt-3 text-xl font-bold text-gray-900">{item.today}</div>
                <div className="mt-0.5 text-xs text-gray-500">{item.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr,300px]">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">分类数据监控</h3>
                <p className="mt-0.5 text-xs text-gray-500">展示 5 类数据的今日增量、昨日对比与 7 日趋势，点击图表点位可在弹窗中查看下钻结果。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {dashboardMetrics.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setSelectedDataType(item.key);
                      setDrilldownPoint(item.trend[item.trend.length - 1]);
                    }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedDataType === item.key ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {dashboardMetrics.map((item) => {
                const change = item.today - item.yesterday;
                return (
                  <div key={item.key} className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-3 shadow-sm">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: item.softColor, color: item.color }}>
                          <i className={`${item.icon} text-lg`}></i>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                          <div className="text-[10px] text-gray-500">7日趋势监控</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-white px-2.5 py-2 border border-gray-100">
                        <div className="text-[10px] text-gray-500">今日增量</div>
                        <div className="mt-1 text-xl font-bold text-gray-900">{item.today}</div>
                      </div>
                      <div className="rounded-xl bg-white px-2.5 py-2 border border-gray-100">
                        <div className="text-[10px] text-gray-500">昨日对比</div>
                        <div className={`mt-1 text-sm font-semibold ${change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {change >= 0 ? '+' : ''}{change} 条
                        </div>
                      </div>
                      <div className="rounded-xl bg-white px-2.5 py-2 border border-gray-100">
                        <div className="text-[10px] text-gray-500">昨日数据</div>
                        <div className="mt-1 text-sm font-semibold text-gray-800">{item.yesterday} 条</div>
                      </div>
                    </div>
                    <div className="h-40 rounded-xl bg-white px-1 py-2 border border-gray-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={item.trend} margin={{ top: 8, right: 10, left: -15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 10, fill: '#6B7280' }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={{ stroke: '#D1D5DB' }}
                            minTickGap={18}
                          />
                          <YAxis
                            tick={{ fontSize: 10, fill: '#6B7280' }}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickLine={{ stroke: '#D1D5DB' }}
                            width={32}
                            unit="条"
                          />
                          <Tooltip content={<TrendTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            name="新增量"
                            stroke={item.color}
                            strokeWidth={2}
                            dot={{ r: 1.5, strokeWidth: 1, fill: '#fff' }}
                            activeDot={{
                              r: 4,
                              stroke: item.color,
                              strokeWidth: 2,
                              fill: '#fff',
                              onClick: (_: any, payload: any) => {
                                if (payload?.payload) {
                                  openTrendModal(item.key, payload.payload);
                                }
                              }
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col h-full max-h-[800px]">
            <div className="mb-3 flex flex-col gap-2">
              <div>
                <h3 className="text-base font-bold text-gray-900">上传者TOP10</h3>
              </div>
              <select
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                {unitOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {uploaderRank.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-2 py-1.5">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    index < 3 ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-left text-sm font-semibold text-gray-900 block w-full">
                      {item.name}
                    </div>
                    <div className="mt-0.5 truncate text-[10px] text-gray-500">{item.unit}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900">{item.uploadCount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">部门维度汇总</h3>
              <p className="mt-0.5 text-xs text-gray-500">支持关键字搜索与按列排序，查看各部门数据贡献情况。</p>
            </div>
            <div className="relative w-full md:w-56">
                <input
                  type="text"
                  value={unitKeyword}
                  onChange={(e) => setUnitKeyword(e.target.value)}
                  placeholder="搜索部门名称"
                  className="w-full rounded-lg border border-gray-200 py-1.5 pl-8 pr-3 text-xs text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
                <i className="ri-search-line absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      ['unitName', '部门名称'],
                      ['totalUploads', '总上传量'],
                      ['weeklyIncrement', '本周增量'],
                      ['perCapita', '人均上传量'],
                    ].map(([field, label]) => (
                      <th key={field} className="px-3 py-2 text-left font-medium text-gray-500">
                        <button
                          type="button"
                          onClick={() => handleSort(field as any)}
                          className="inline-flex items-center gap-1 hover:text-teal-600"
                        >
                          {label}
                          {sortField === field && (
                            <i className={sortOrder === 'asc' ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
                          )}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {unitRows.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-medium text-gray-900">{item.unitName}</td>
                      <td className="px-3 py-2.5 text-gray-700">{item.totalUploads.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-gray-700">{item.weeklyIncrement.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-gray-700">{item.perCapita.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>

      {isTrendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/45 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  <i className={`${selectedMetric.icon}`}></i>
                  {selectedMetric.label}趋势下钻
                </div>
                <h4 className="mt-3 text-2xl font-bold text-gray-900">{selectedMetric.label}分类趋势详情</h4>
                <p className="mt-1 text-sm text-gray-500">查看 7 日趋势走势与当前选中小时的细粒度数据。</p>
              </div>
              <button
                type="button"
                onClick={() => setIsTrendModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid gap-6 overflow-y-auto px-6 py-6 lg:grid-cols-[1.6fr,1fr]">
              <div className="h-[460px] rounded-2xl border border-gray-100 bg-gray-50 p-4 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">7日折线趋势</div>
                    <div className="mt-1 text-xs text-gray-500">X 轴为日期，Y 轴为新增量（单位：条）</div>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-700 shadow-sm">
                    当前选中：{selectedDrillPoint.timestamp}
                  </div>
                </div>
                <div className="flex-1 min-h-[320px] rounded-xl bg-white p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedMetric.trend} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={{ stroke: '#D1D5DB' }}
                        tickLine={{ stroke: '#D1D5DB' }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={{ stroke: '#D1D5DB' }}
                        tickLine={{ stroke: '#D1D5DB' }}
                        width={42}
                        unit="条"
                      />
                      <Tooltip content={<TrendTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="新增量"
                        stroke={selectedMetric.color}
                        strokeWidth={3}
                        dot={{ r: 3, strokeWidth: 1.5, fill: '#fff' }}
                        activeDot={{
                          r: 6,
                          stroke: selectedMetric.color,
                          strokeWidth: 2,
                          fill: '#fff',
                          onClick: (_: any, payload: any) => {
                            if (payload?.payload) {
                              setDrilldownPoint(payload.payload);
                            }
                          }
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="h-[460px] flex flex-col gap-3 min-h-0">
                <div className="rounded-2xl border border-teal-100 bg-teal-50/60 px-4 py-3">
                  <div className="text-[11px] text-gray-500">选中时间</div>
                  <div className="mt-1 text-sm font-semibold text-gray-900 font-mono">{selectedDrillPoint.timestamp}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                    <div className="text-[11px] text-gray-500">该小时新增</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-gray-900">{selectedDrillPoint.value}</div>
                      <div className="text-xs text-gray-400">条</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                    <div className="text-[11px] text-gray-500">当日累计估算</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedDayPoints.reduce((sum, item) => sum + item.value, 0)}
                      </div>
                      <div className="text-xs text-gray-400">条</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-900">当日分时明细</div>
                    <div className="text-xs text-gray-400">点击可切换</div>
                  </div>
                  <div className="mt-3 space-y-2 overflow-auto pr-1">
                    {selectedDayPoints.map((item) => (
                      <div
                        key={item.timestamp}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                          item.timestamp === selectedDrillPoint.timestamp ? 'bg-teal-50 text-teal-700' : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setDrilldownPoint(item)}
                          className="text-left font-medium"
                        >
                          {item.timestamp.slice(11, 16)}
                        </button>
                        <span className="font-semibold">{item.value} 条</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
