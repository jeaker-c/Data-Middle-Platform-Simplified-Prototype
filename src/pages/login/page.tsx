import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username && !password) {
      alert('请输入账号和密码');
      return;
    }
    
    setIsLoading(true);
    // 模拟登录延迟，增加交互感
    setTimeout(() => {
      setIsLoading(false);
      navigate('/overview');
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* 左侧背景区域 - 仅在大屏显示 */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-teal-900/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
          alt="Login Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-20 flex flex-col justify-center px-12 text-white">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6">
              <i className="ri-seedling-line text-4xl text-teal-300"></i>
            </div>
            <h1 className="text-4xl font-bold mb-4">专业育种数据管理平台</h1>
            <p className="text-lg text-teal-100 leading-relaxed max-w-md">
              统一管理海量育种数据，赋能科研创新，<br/>让数据价值触手可及。
            </p>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-white/80 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
              <i className="ri-shield-check-line text-teal-400"></i>
              <span>企业级安全</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
              <i className="ri-speed-line text-teal-400"></i>
              <span>极速响应</span>
            </div>
          </div>
        </div>
        {/* 装饰圆圈 */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl z-10"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-10"></div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-12 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">欢迎回来</h2>
            <p className="text-gray-500 mt-2 text-sm">请登录您的账号以继续使用</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block ml-1">
                账号
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-user-3-line text-gray-400 group-focus-within:text-teal-500 transition-colors"></i>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200"
                  placeholder="请输入用户名/手机号"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-gray-700">
                  密码
                </label>
                <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                  忘记密码？
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-lock-2-line text-gray-400 group-focus-within:text-teal-500 transition-colors"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg shadow-teal-500/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer ${
                isLoading ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </>
              ) : (
                <>
                  登录
                  <i className="ri-arrow-right-line ml-2"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              还没有账号？
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1 transition-colors">
                联系管理员申请
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
