import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const uploaderProfiles = [
  {
    id: 'u1',
    name: '张研究员',
    unit: '杨凌育种中心',
    title: '表型数据平台主管',
    totalUploads: 438,
    weeklyUploads: 72,
    successRate: 98.6,
    recentTasks: ['2026年表型春播数据上传', '重复材料的表型数据修正', '杨凌基地环境联动补录'],
  },
  {
    id: 'u2',
    name: '李博士',
    unit: '德州试验基地',
    title: '基因型数据分析师',
    totalUploads: 392,
    weeklyUploads: 65,
    successRate: 97.8,
    recentTasks: ['德州基地Q2环境监测上传', '玉米基因型批次校验', '图像采集结果同步'],
  },
  {
    id: 'u3',
    name: '王助理',
    unit: '杨凌育种中心',
    title: '材料数据专员',
    totalUploads: 361,
    weeklyUploads: 54,
    successRate: 96.9,
    recentTasks: ['材料谱系补录', '2026年材料台账纠错', '材料维度批量映射'],
  },
  {
    id: 'u4',
    name: '赵教授',
    unit: '南繁研究院',
    title: '环境试验负责人',
    totalUploads: 344,
    weeklyUploads: 48,
    successRate: 99.1,
    recentTasks: ['南繁站环境日监测', '表型站点复核', '试验维度成果归档'],
  },
];

export default function UploaderDetailPage() {
  const navigate = useNavigate();
  const { uploaderId } = useParams();

  const profile = useMemo(
    () => uploaderProfiles.find((item) => item.id === uploaderId) || uploaderProfiles[0],
    [uploaderId]
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-teal-200 hover:text-teal-600"
        >
          <i className="ri-arrow-left-line"></i>
          返回上一页
        </button>

        <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-3xl font-bold text-teal-700">
                {profile.name.slice(0, 1)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <div className="mt-2 text-sm text-gray-500">{profile.title}</div>
                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                  <i className="ri-building-line"></i>
                  {profile.unit}
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-5 py-4">
                <div className="text-xs text-gray-500">累计上传</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">{profile.totalUploads}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-5 py-4">
                <div className="text-xs text-gray-500">本周上传</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">{profile.weeklyUploads}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-5 py-4">
                <div className="text-xs text-gray-500">成功率</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">{profile.successRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900">近期任务</h2>
              <div className="mt-4 space-y-3">
                {profile.recentTasks.map((task) => (
                  <div key={task} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {task}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900">个人说明</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                当前页面为上传者详情 mock 页面，用于承接首页实时数据看板中的上传者点击跳转。
                可继续扩展个人上传记录、异常处理效率、近 30 日趋势等更细粒度统计。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
