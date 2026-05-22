import logo from '../../../assets/logo.png';

export default function Footer() {
  const footerLinks = {
    product: {
      title: '产品功能',
      links: ['数据上传', '数据预览', '智能搜索', '权限管理', '处理工具', '数据分析']
    },
    resources: {
      title: '资源中心',
      links: ['使用文档', '视频教程', '最佳实践', 'API文档', '常见问题', '更新日志']
    },
    support: {
      title: '支持服务',
      links: ['技术支持', '在线客服', '提交反馈', '功能建议', '报告问题', '联系我们']
    },
    company: {
      title: '关于我们',
      links: ['公司介绍', '团队成员', '合作伙伴', '新闻动态', '加入我们', '隐私政策']
    }
  };

  return (
    <footer className="bg-gradient-to-br from-teal-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-5 gap-12 mb-12">
          {/* 品牌信息 */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="数据中台" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold">数据中台</span>
            </div>
            <p className="text-teal-100 text-sm mb-6 leading-relaxed">
              专业的育种数据管理平台，为育种家提供高效的数据归集和管理解决方案
            </p>
            <div className="flex items-center gap-3">
              {['ri-wechat-line', 'ri-qq-line', 'ri-mail-line', 'ri-phone-line'].map((icon, index) => (
                <button
                  key={index}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className={`${icon} text-lg`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* 链接列 */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-teal-100 text-sm hover:text-white transition-colors cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部信息 */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="text-teal-100 text-sm">
              © 2024 育种数据中台. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-teal-100 text-sm hover:text-white transition-colors cursor-pointer">
                服务条款
              </a>
              <a href="#" className="text-teal-100 text-sm hover:text-white transition-colors cursor-pointer">
                隐私政策
              </a>
              <a href="#" className="text-teal-100 text-sm hover:text-white transition-colors cursor-pointer">
                Cookie政策
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
