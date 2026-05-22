import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
          alt="科技感数据背景"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
          <i className="ri-seedling-line text-teal-400"></i>
          <span className="text-white text-sm font-medium">专业育种数据管理平台</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          统一管理育种数据<br />
          <span className="text-teal-400">提升科研效率</span>
        </h1>

        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          解决育种家们分散的数据归集问题，提供结构化与非结构化数据的统一上传、预览、搜索及权限管理，让数据管理更高效、更安全
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-teal-600 text-white text-base font-semibold rounded-lg hover:bg-teal-700 transition-all hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
          >
            <i className="ri-rocket-line mr-2"></i>
            立即开始
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap cursor-pointer">
            <i className="ri-play-circle-line mr-2"></i>
            观看演示
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: 'ri-database-2-line', label: '数据归集', desc: '统一管理' },
            { icon: 'ri-search-line', label: '智能搜索', desc: '快速检索' },
            { icon: 'ri-shield-check-line', label: '权限控制', desc: '安全可靠' },
            { icon: 'ri-tools-line', label: '数据处理', desc: '高效便捷' }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 flex items-center justify-center bg-teal-500/20 rounded-lg mb-3 mx-auto">
                <i className={`${item.icon} text-2xl text-teal-400`}></i>
              </div>
              <h3 className="text-white font-semibold mb-1">{item.label}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
