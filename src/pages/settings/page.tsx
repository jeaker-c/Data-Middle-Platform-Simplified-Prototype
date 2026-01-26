
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
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">系统设置</h1>
            <p className="text-gray-600">管理用户、角色权限和系统配置</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
