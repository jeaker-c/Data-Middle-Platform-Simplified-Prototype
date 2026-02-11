
import { useState } from 'react';
import Navbar from '../home/components/Navbar';
import SettingsTabs from './components/SettingsTabs';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import SystemConfig from './components/SystemConfig';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
            <p className="text-sm text-gray-500 mt-1">管理用户、角色权限和系统配置</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="p-6">
              {activeTab === 'users' && <UserManagement />}
              {activeTab === 'roles' && <RoleManagement />}
              {activeTab === 'system' && <SystemConfig />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
