import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 判断是否在子页面
  const isSubPage = ['/settings', '/overview', '/upload', '/data-query', '/tools'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE(path);
    }
  }, []);

  // 子页面始终显示白色背景
  const showWhiteBg = isSubPage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logo} 
              alt="数据中台" 
              className="h-10 w-auto object-contain"
            />
            <span className={`text-xl font-bold ${showWhiteBg ? 'text-gray-900' : 'text-white'}`}>
              数据中台
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/overview')}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showWhiteBg ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'
              } ${location.pathname === '/overview' ? 'text-teal-600' : ''}`}
            >
              数据概览
            </button>
            <button
              onClick={() => navigate('/upload')}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showWhiteBg ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'
              } ${location.pathname === '/upload' ? 'text-teal-600' : ''}`}
            >
              数据上传
            </button>
            <button
              onClick={() => navigate('/data-query')}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showWhiteBg ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'
              } ${location.pathname === '/data-query' ? 'text-teal-600' : ''}`}
            >
              数据查询与管理
            </button>
            <button
              onClick={() => navigate('/tools')}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showWhiteBg ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'
              } ${location.pathname === '/tools' ? 'text-teal-600' : ''}`}
            >
              文件工具
            </button>
            <button
              onClick={() => navigate('/settings')}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showWhiteBg ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'
              } ${location.pathname === '/settings' ? 'text-teal-600' : ''}`}
            >
              系统设置
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
              showWhiteBg ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              <i className="ri-notification-3-line text-xl"></i>
            </button>
            <button className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
              showWhiteBg ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              <i className="ri-user-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
