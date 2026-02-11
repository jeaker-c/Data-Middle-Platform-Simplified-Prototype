import { useState, useCallback } from 'react';
import AddUserModal from './AddUserModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin: string;
}

const users: User[] = [
  { id: 1, name: '张研究员', email: 'zhang@example.com', role: '管理员', department: '育种研究部', status: '正常', lastLogin: '2025-01-15 14:30' },
  { id: 2, name: '李博士', email: 'li@example.com', role: '研究员', department: '基因组学部', status: '正常', lastLogin: '2025-01-15 11:20' },
  { id: 3, name: '王助理', email: 'wang@example.com', role: '助理研究员', department: '育种研究部', status: '正常', lastLogin: '2025-01-14 16:45' },
  { id: 4, name: '赵教授', email: 'zhao@example.com', role: '管理员', department: '表型组学部', status: '正常', lastLogin: '2025-01-14 09:15' },
  { id: 5, name: '刘工程师', email: 'liu@example.com', role: '技术员', department: '数据中心', status: '停用', lastLogin: '2025-01-10 15:30' }
];

export default function UserManagement() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleAddUserClick = useCallback(() => {
    setShowAddUserModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowAddUserModal(false);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="搜索用户..."
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <select className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
            <option>全部角色</option>
            <option>管理员</option>
            <option>研究员</option>
            <option>助理研究员</option>
            <option>技术员</option>
          </select>
        </div>
        <button
          onClick={handleAddUserClick}
          className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>
          添加用户
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">用户</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">角色</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">部门</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">状态</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">最后登录</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full whitespace-nowrap">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.department}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                    user.status === '正常' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal 
        show={showAddUserModal} 
        onClose={() => setShowAddUserModal(false)} 
      />
    </>
  );
}
