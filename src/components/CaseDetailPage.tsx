import React, { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollSectionTitle } from './ScrollSectionTitle';

interface CaseDetailPageProps {
  onOpenContactModal: () => void;
  onNavigate: (url: string) => void;
  onSelectRelatedCase?: (caseId: string) => void;
}

interface RelatedCaseItem {
  id: string;
  brand: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const ALL_RELATED_CASES: RelatedCaseItem[] = [
  {
    id: 'case-v2-2',
    brand: '良品铺子',
    title: '良品铺子产品包装创新咨询设计',
    category: '快消包装',
    description: '打造高品质健康零食视觉体系与全新品牌超级符号，实现全渠道爆品复购跨越。',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/liangpin.jpg'
  },
  {
    id: 'case-4',
    brand: '小仙炖',
    title: '小仙炖品类创新全案咨询与包装升级',
    category: '品牌升级',
    description: '确立“鲜炖燕窝”高端红利赛道，全维度打造冰温保鲜及精巧包装新品类标杆。',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png'
  },
  {
    id: 'case-5',
    brand: '海底捞',
    title: '海底捞品类创新全案咨询与便携即食产品',
    category: '食品酒饮',
    description: '开辟露营、夜市等多场景便携即食产品，实现海底捞正宗火锅味随时随地即刻享。',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png'
  },
  {
    id: 'case-3',
    brand: '库迪咖啡',
    title: '库迪品牌战略咨询&爆品打造',
    category: '食品酒饮',
    description: '塑造库迪“全民咖啡”品类创新概念，助力跨界爆款孵化与包装美学升级。',
    image: '/src/assets/images/lkk_coffee_mockup_1783302972120.jpg'
  },
  {
    id: 'case-v2-3',
    brand: '故宫博物院',
    title: '故宫博物院"故宫猫"IP形象打造&文创创新设计',
    category: '品牌升级',
    description: '赋能宫廷文化符号年轻化，重塑故宫景区文创品类商业价值。',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg'
  }
];

const FILTER_TAGS = ['全部', '食品酒饮', '快消包装', '品牌升级', '结构工程'];

export default function CaseDetailPage({
  onOpenContactModal,
  onNavigate,
  onSelectRelatedCase
}: CaseDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('全部');

  // Filter related cases
  const filteredRelatedCases = ALL_RELATED_CASES.filter((item) => {
    const matchesTag = activeTag === '全部' || item.category === activeTag;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  }).slice(0, 5);

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      
      {/* 三、Slogan & Header 板块 (完全参照"品类创新咨询"页/案例页 Slogan 排版规范) */}
      <div className="bg-neutral-50/70 border-b border-neutral-100 py-10 md:py-14">
        <div className="max-w-[95%] w-full mx-auto">
          {/* 面包屑导航 */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 font-mono">
            <button 
              onClick={() => onNavigate('/home')} 
              className="hover:text-[#007BC7] transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              首页
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('/cases')} 
              className="hover:text-[#007BC7] transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              精选案例
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">案例详情</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">
                CASE STUDY · CASE DETAIL
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mt-2 tracking-tight font-display">
                悦鲜活年轻化产品包装创新咨询设计
              </h1>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-[#007BC7] uppercase mt-2 font-mono">
                打造差异化视觉识别，助力新品牌抢占年轻消费市场
              </p>
            </div>
            <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
              基于洛可可“三品合一”品类创新战略，为君乐宝旗下“悦鲜活”品牌提供全新的年轻化包装与品牌视觉重构方案。通过0.09s黄金保鲜视觉叙事与锁鲜瓶型结构创新，帮助悦鲜活迅速打入年轻一代白领圈层，实现了销量与品牌的双重突破。
            </p>
          </div>
        </div>
      </div>

      {/* 项目资料区 */}
      <div className="max-w-[95%] w-full mx-auto pt-8 md:pt-10 pb-12 border-b border-neutral-200/60">
        <div className="bg-neutral-50/60 rounded-2xl p-6 md:p-8 border border-neutral-200/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* 左侧项目资料信息 (键值对列表) */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 font-display mb-4 border-b border-neutral-200/80 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#007BC7]"></span>
              项目资料信息
            </h3>

            <div className="space-y-4">
              <div className="flex items-start text-sm">
                <span className="text-[#8C8C8C] w-28 shrink-0 font-medium">品牌名称</span>
                <span className="text-[#1A1A1A] font-semibold">君乐宝 · 悦鲜活 (YueXianHuo)</span>
              </div>

              <div className="flex items-start text-sm">
                <span className="text-[#8C8C8C] w-28 shrink-0 font-medium">所属行业</span>
                <span className="text-[#1A1A1A] font-semibold">食品酒饮 / 高端快消乳品</span>
              </div>

              <div className="flex items-start text-sm">
                <span className="text-[#8C8C8C] w-28 shrink-0 font-medium">咨询服务</span>
                <span className="text-[#1A1A1A] font-semibold">三品合一类创新咨询 / 0-1爆品打造</span>
              </div>

              <div className="flex items-start text-sm">
                <span className="text-[#8C8C8C] w-28 shrink-0 font-medium">设计服务</span>
                <span className="text-[#1A1A1A] font-semibold">瓶型结构设计 / 品牌视觉重构 / 包装创新</span>
              </div>
            </div>
          </div>

          {/* 右侧配一张产品/项目相关配图 (圆角8px，不拉伸) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full aspect-[4/3] max-w-sm rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
              <img 
                src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                alt="悦鲜活项目产品特征配图"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 四 + 五、主区域：左侧筛选与相关案例栏 + 右侧案例详情内容 */}
      <div className="max-w-[95%] w-full mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* 四、左侧筛选与相关案例栏 */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-xs">
              
              <div>
                <h3 className="text-base font-bold text-neutral-900 mb-4 font-display flex items-center justify-between">
                  <span>探索相关案例</span>
                  <span className="text-xs font-mono text-[#007BC7] font-semibold">RELATED</span>
                </h3>

                {/* 搜索框 (浅灰边框 #E5E5E5，focus态 #007BC7 边框) */}
                <div className="relative mb-4">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索案例名称或关键词..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50/80 focus:bg-white text-sm text-neutral-800 placeholder-neutral-400 rounded-xl border border-[#E5E5E5] focus:border-[#007BC7] focus:shadow-[0_0_0_3px_rgba(0,123,199,0.12)] outline-none transition-all duration-200"
                  />
                </div>

                {/* 筛选标签 (横向排列，未激活 #8C8C8C+#F5F5F5，激活态 #007BC7+#E8F0FF) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                  {FILTER_TAGS.map((tag) => {
                    const isActive = activeTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer border-none ${
                          isActive
                            ? 'bg-[#E8F0FF] text-[#007BC7] font-semibold'
                            : 'bg-[#F5F5F5] text-[#8C8C8C] hover:text-neutral-700 hover:bg-neutral-200/60'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 相关案例列表 (5项，分割线 #E5E5E5，悬停箭头动效) */}
              <div className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
                {filteredRelatedCases.length > 0 ? (
                  filteredRelatedCases.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        if (onSelectRelatedCase) {
                          onSelectRelatedCase(item.id);
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="py-4 group cursor-pointer text-left block"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-[#007BC7] bg-blue-50 px-2 py-0.5 rounded font-mono">
                          洛可可设计 · {item.brand}
                        </span>
                        {/* 悬浮箭头图标做轻微位移动效（向右上方向滑动） */}
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#007BC7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                      </div>

                      <h4 className="text-[16px] font-semibold text-[#1A1A1A] group-hover:text-[#007BC7] transition-colors duration-200 leading-snug line-clamp-1">
                        {item.title}
                      </h4>

                      <p className="text-[14px] text-[#4D4D4D] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-neutral-400 text-xs">
                    未找到匹配的相关案例
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* 五、案例详情内容 —— 多个分节板块，保留三种呈现形式 */}
          <main className="lg:col-span-8 space-y-12 md:space-y-16">
            
            {/* 分节 1: 项目背景与行业挑战 (形式 1: 单图 + 标题 + 描述) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="BACKGROUND & CHALLENGES"
                title="项目背景与行业挑战"
              />

              <div className="space-y-4">
                {/* 图片在上 (圆角8px) */}
                <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="悦鲜活包装创新项目背景"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 下方小标题 (18px, 字重600) + 描述文字 (#4D4D4D, 15-16px, 行高1.7，多段落) */}
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] pt-2">
                  突破传统鲜奶同质化瓶颈，开启年轻化品质红利
                </h3>

                <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.7] space-y-3">
                  <p>
                    快消乳品市场竞争极其激烈，传统低温鲜奶包装长期陷入同质化的方瓶与塑料袋形态，难以引起Z世代与年轻白领群体的审美共鸣。君乐宝推出高端鲜奶品牌“悦鲜活”，急需通过创新的包装与品牌视觉拉开与竞品的差距。
                  </p>
                  <p>
                    洛可可受邀为“悦鲜活”提供从品类战略、包装结构到品牌视觉重构的“三品合一”整合创新服务，旨在赋予产品极具辨识度的科技感与高颜值形象，抢占高端鲜乳红利赛道。
                  </p>
                </div>
              </div>
            </section>

            {/* 分节 2: 用户洞察与品类创新 (形式 2: 图文左右分栏 - 图左文右) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="INSIGHT & CATEGORY"
                title="用户洞察与品类创新"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-2">
                {/* 图在左 (圆角8px) */}
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png" 
                    alt="0.09s黄金保鲜视觉叙事"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 文在右 */}
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold text-[#1A1A1A]">
                    0.09s 黄金保鲜，视觉叙事化传递科技锁鲜
                  </h3>
                  <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.7] space-y-3">
                    <p>
                      深入洞察年轻白领对“极致新鲜”与“健康生活方式”的强诉求，洛可可将悦鲜活专利的“INF 0.09s 超瞬时杀菌技术”转化为直观的视觉语言。
                    </p>
                    <p>
                      我们通过透亮优雅的瓶身线条与极简科技蓝白配色，将无形的“0.09s 黄金锁鲜”转化为有形的可视化体验，让消费者在货架前一秒识别产品的核心科技溢价。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 分节 3: 瓶口阻气锁鲜结构创新 (形式 2: 图文左右分栏 - 文左图右，交替排布) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="STRUCTURAL INNOVATION"
                title="瓶口阻气锁鲜结构创新"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-2">
                {/* 文在左 */}
                <div className="space-y-3 order-2 md:order-1">
                  <h3 className="text-[18px] font-semibold text-[#1A1A1A]">
                    专利瓶型结构设计，兼顾人机握持与密封防漏
                  </h3>
                  <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.7] space-y-3">
                    <p>
                      针对常规鲜奶瓶易滴漏、倾倒握持手感差等体验痛点，洛可可结构工程团队研发了年轻化瓶口阻气锁鲜专利结构。
                    </p>
                    <p>
                      瓶身中间采用符合人体工程学的微凹弧度设计，极大提升单手握持舒适度；配合防漏易拉盖与高密封阻气阻光材质，确保饮用全程纯净新鲜。
                    </p>
                  </div>
                </div>

                {/* 图在右 (圆角8px) */}
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs order-1 md:order-2">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                    alt="悦鲜活年轻化瓶口结构设计"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* 分节 4: 品牌升级与超级视觉符号 (形式 2: 图文左右分栏 - 图左文右) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="BRAND UPGRADE"
                title="品牌升级与超级视觉符号"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-2">
                {/* 图在左 (圆角8px) */}
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="超级视觉符号重构"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 文在右 */}
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold text-[#1A1A1A]">
                    极简流线视觉重构，打响高端鲜乳品牌声量
                  </h3>
                  <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.7] space-y-3">
                    <p>
                      洛可可设计团队提炼出悦鲜活标志性的“鲜活水滴”超级符号，将其巧妙融入瓶身浮雕与标签设计中。
                    </p>
                    <p>
                      统一的品牌色彩系统与清新自然的插画风辅助图形，赋予包装强烈的视觉张力，使其在电商平台与便利店冰柜中均能脱颖而出。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 分节 5: 商业价值展现 (形式 1: 单图 + 标题 + 描述) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="COMMERCIAL VALUE"
                title="商业价值展现"
              />

              <div className="space-y-4">
                {/* 图片在上 (圆角8px) */}
                <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png" 
                    alt="悦鲜活商业成果展现"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 下方小标题与描述 */}
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] pt-2">
                  荣誉大满贯与销量爆发，跻身高端鲜奶市场头部
                </h3>

                <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.7] space-y-3">
                  <p>
                    洛可可打造的悦鲜活高端鲜乳包装，成功斩获2023德国iF设计奖（iF Design Award）等国际顶级设计大奖。
                  </p>
                  <p>
                    上市后，悦鲜活凭借极高的颜值与极致的锁鲜体验，迅速覆盖全国重点城市超便利体系与高端超市，助力君乐宝实现了高端鲜奶领域的几何级销量增长，成为年轻消费者最喜爱的鲜奶新星品牌。
                  </p>
                </div>
              </div>
            </section>

            {/* 分节 6: 成果展示 (形式 3: 纯图片展示，网格排列，圆角8px，无文字叠加) */}
            <section className="space-y-6 text-left">
              <ScrollSectionTitle 
                badge="ACHIEVEMENTS GALLERY"
                title="成果展示"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-2">
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="悦鲜活成果展示 1"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                    alt="悦鲜活成果展示 2"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png" 
                    alt="悦鲜活成果展示 3"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png" 
                    alt="悦鲜活成果展示 4"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

    </div>
  );
}
