import { useState, useCallback } from 'react';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: {
    dataUpload: boolean;
    dataView: boolean;
    dataEdit: boolean;
    dataDelete: boolean;
    dataExport: boolean;
    userManage: boolean;
    roleManage: boolean;
    systemConfig: boolean;
  };
}

const roles: Role[] = [
  {
    id: 1,
    name: '管理员',
    description: '拥有系统所有权限',
    userCount: 2,
    permissions: {
      dataUpload: true,
      dataView: true,
      dataEdit: true,
      dataDelete: true,
      dataExport: true,
      userManage: true,
      roleManage: true,
      systemConfig: true
    }
  },
  {
    id: 2,
    name: '研究员',
    description: '可以上传、查看、编辑和导出数据',
    userCount: 1,
    permissions: {
      dataUpload: true,
      dataView: true,
      dataEdit: true,
      dataDelete: false,
      dataExport: true,
      userManage: false,
      roleManage: false,
      systemConfig: false
    }
  },
  {
    id: 3,
    name: '助理研究员',
    description: '可以上传和查看数据',
    userCount: 1,
    permissions: {
      dataUpload: true,
      dataView: true,
      dataEdit: false,
      dataDelete: false,
      dataExport: false,
      userManage: false,
      roleManage: false,
      systemConfig: false
    }
  },
  {
    id: 4,
    name: '技术员',
    description: '仅可查看数据',
    userCount: 1,
    permissions: {
      dataUpload: false,
      dataView: true,
      dataEdit: false,
      dataDelete: false,
      dataExport: false,
      userManage: false,
      roleManage: false,
      systemConfig: false
    }
  }
];

const permissionLabels = {
  dataUpload: '数据上传',
  dataView: '数据查看',
  dataEdit: '数据编辑',
  dataDelete: '数据删除',
  dataExport: '数据导出',
  userManage: '用户管理',
  roleManage: '角色管理',
  systemConfig: '系统配置'
};

export default function RoleManagement() {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);

  const handleAddRoleClick = useCallback(() => {
    setShowAddRoleModal(true);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">配置不同角色的系统权限</p>
        <button
          onClick={handleAddRoleClick}
          className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          添加角色
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{role.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                <span className="text-xs text-gray-500">{role.userCount} 位用户</span>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer">
                <i className="ri-edit-line"></i>
              </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              {Object.entries(role.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{permissionLabels[key as keyof typeof permissionLabels]}</span>
                  <div className={`w-10 h-6 flex items-center justify-center rounded-full ${
                    value ? 'bg-teal-100' : 'bg-gray-200'
                  }`}>
                    <i className={`text-sm ${
                      value ? 'ri-check-line text-teal-600' : 'ri-close-line text-gray-400'
                    }`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
