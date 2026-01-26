interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'users', label: '用户管理', icon: 'ri-user-line' },
  { id: 'roles', label: '角色权限', icon: 'ri-shield-user-line' },
  { id: 'system', label: '系统配置', icon: 'ri-settings-3-line' }
];

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-1 p-1 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-all whitespace-nowrap cursor-pointer rounded-lg ${
              activeTab === tab.id
                ? 'text-teal-700 bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
