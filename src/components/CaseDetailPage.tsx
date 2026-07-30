import React, { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
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
  industry: string;
  description: string;
  image?: string;
}

// 对应四、按原始页面要求精准纠正的固定5项相关案例列表（内容和顺序严格保留原文）
const EXACT_RELATED_CASES: RelatedCaseItem[] = [
  {
    id: 'case-v2-1',
    brand: '悦鲜活',
    title: '悦鲜活年轻化产品包装创新',
    category: '包装设计',
    industry: '食品酒饮',
    description: '打造差异化视觉识别，助力新品牌抢占年...',
    image: '/src/assets/images/case_yuexianhuo.jpg'
  },
  {
    id: 'case-v2-2',
    brand: '良品铺子',
    title: '良品铺子产品包装创新咨询',
    category: '包装设计',
    industry: '食品酒饮',
    description: '从线下走到线上的零食新零售',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/liangpin.jpg'
  },
  {
    id: 'case-category-3',
    brand: '三泉冷面',
    title: '三泉冷面品牌包装创新咨询',
    category: '品牌全案设计',
    industry: '食品酒饮',
    description: '开启美味即享清爽',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png'
  },
  {
    id: 'case-category-4',
    brand: '飞鹤茁然',
    title: '飞鹤茁然品牌&产品包装创',
    category: 'IP设计',
    industry: '食品酒饮',
    description: '打造三至六岁儿童专属奶粉品牌',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png'
  },
  {
    id: 'case-category-5',
    brand: '庐阳文创',
    title: '庐阳城市品牌文创整案创新',
    category: '品牌全案设计',
    industry: '文化创意',
    description: '创新设计带动文旅产业发展',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg'
  }
];

// 纠正后的筛选分类数据（按要求精确排列，垂直行业13项 + 产品分类6项）
const INDUSTRY_TAGS = [
  '全部',
  '工业装备',
  '机器人',
  '新能源',
  '家居家电',
  '智能3C',
  '医疗健康',
  '食品酒饮',
  '连锁零售',
  '美妆个护',
  '文化创意',
  '宠物经济',
  '交通工具',
  '综合行业'
];

const CATEGORY_TAGS = [
  '全部',
  '工业设计',
  '结构设计',
  '生产落地',
  '品牌全案设计',
  'IP设计',
  '包装设计'
];

export default function CaseDetailPage({
  onOpenContactModal,
  onNavigate,
  onSelectRelatedCase
}: CaseDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndustryTag, setActiveIndustryTag] = useState('全部');
  const [activeCategoryTag, setActiveCategoryTag] = useState('全部');

  // Filter related cases logic
  const filteredRelatedCases = EXACT_RELATED_CASES.filter((item) => {
    const matchesIndustry =
      activeIndustryTag === '全部' || item.industry === activeIndustryTag;
    const matchesCategory =
      activeCategoryTag === '全部' || item.category === activeCategoryTag;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen">
      
      {/* 三（上）、案例标题 + Slogan (去除了 Banner，且项目资料信息已移至下方内容区) */}
      <div className="bg-neutral-50/70 border-b border-neutral-100 py-8 md:py-12">
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
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[1.5px] w-6 bg-[#007BC7]"></span>
                <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">
                  CASE STUDY · 案例详情
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight font-display">
                悦鲜活年轻化产品包装创新咨询设计
              </h1>
              {/* 一句话 Slogan（照搬品类创新咨询页Slogan排版） */}
              <p className="text-xs md:text-sm font-semibold tracking-wider text-[#007BC7] uppercase mt-3 font-mono">
                打造差异化视觉识别，助力新品牌抢占年轻消费市场
              </p>
            </div>

            <p className="text-sm text-neutral-500 max-w-xl leading-relaxed">
              基于洛可可“三品合一”品类创新战略，为君乐宝旗下“悦鲜活”品牌提供全新的年轻化包装与品牌视觉重构方案。通过0.09s黄金保鲜视觉叙事与锁鲜瓶型结构创新，帮助悦鲜活迅速打入年轻一代白领圈层，实现了销量与品牌的双重突破。
            </p>
          </div>
        </div>
      </div>

      {/* 四 + 五、主内容区域：左侧筛选与相关案例栏（纯CSS sticky悬浮固定） + 右侧案例详情分节内容（项目资料信息为右侧第1块） */}
      <div className="max-w-[95%] w-full mx-auto pt-6 md:pt-8 pb-12 md:pb-16">
        <div className="anli-content-container relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* 四、左侧筛选与相关案例栏——纯CSS position: sticky + 组内可滑动 (anli-content-left) */}
          <aside className="lg:col-span-4 w-full relative">
            <div className="anli-content-left space-y-6 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-xs lg:sticky lg:top-[20px] z-10 lg:max-h-[calc(100vh-40px)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-200 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              <div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-4 font-display flex items-center justify-between">
                  <span>探索相关案例</span>
                  <span className="text-xs font-mono text-[#007BC7] font-semibold">RELATED</span>
                </h3>

                {/* 搜索框：浅灰边框 #E5E5E5，focus态 #007BC7 边框 */}
                <div className="relative mb-5">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索案例名称或关键词..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50/80 focus:bg-white text-sm text-[#1A1A1A] placeholder-neutral-400 rounded-xl border border-[#E5E5E5] focus:border-[#007BC7] focus:shadow-[0_0_0_3px_rgba(0,123,199,0.12)] outline-none transition-all duration-200"
                  />
                </div>

                {/* 筛选内容（分两组：垂直行业13项 + 产品分类6项） */}
                <div className="space-y-4 mb-6">
                  {/* 第一组：垂直行业 */}
                  <div>
                    <div className="text-[13px] text-[#8C8C8C] font-medium mb-2">
                      垂直行业：
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {INDUSTRY_TAGS.map((tag) => {
                        const isActive = activeIndustryTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              setActiveIndustryTag(tag);
                              if (tag !== '全部') setActiveCategoryTag('全部');
                            }}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer border-none ${
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

                  {/* 第二组：产品分类 */}
                  <div>
                    <div className="text-[13px] text-[#8C8C8C] font-medium mb-2">
                      产品分类：
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORY_TAGS.map((tag) => {
                        const isActive = activeCategoryTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              setActiveCategoryTag(tag);
                              if (tag !== '全部') setActiveIndustryTag('全部');
                            }}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer border-none ${
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
                </div>
              </div>

              {/* 相关案例列表 (固定5项原文，分割线 #E5E5E5，悬停标题 #007BC7 + 箭头右上移) */}
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
                          洛可可设计
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#007BC7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                      </div>

                      <h4 className="text-[16px] font-semibold text-[#1A1A1A] group-hover:text-[#007BC7] transition-colors duration-200 leading-snug line-clamp-1">
                        {item.title}
                      </h4>

                      <p className="text-[14px] text-[#4D4D4D] mt-1 line-clamp-1 leading-relaxed">
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

          {/* 五、案例详情内容（anli-content-right）—— 第1个板块为“项目资料信息” */}
          <main className="anli-content-right lg:col-span-8 space-y-12 md:space-y-16">
            
            {/* 【板块 0】项目资料信息 (现已作为右侧内容区第1块，与左侧筛选栏处于同一行并排) */}
            <section className="bg-[#007BC7] text-white rounded-2xl p-6 md:p-8 border border-[#0066A6] shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* 左侧键值对列表 (字段名 text-white/80，内容 text-white，间距 16px) */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <h3 className="text-lg font-bold text-white font-display mb-4 border-b border-white/20 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    项目资料信息
                  </h3>

                  <div className="space-y-[16px]">
                    <div className="flex items-start text-sm">
                      <span className="text-white/80 w-24 shrink-0 font-medium">品牌名称</span>
                      <span className="text-white font-semibold">君乐宝 · 悦鲜活 (YueXianHuo)</span>
                    </div>

                    <div className="flex items-start text-sm">
                      <span className="text-white/80 w-24 shrink-0 font-medium">所属行业</span>
                      <span className="text-white font-semibold">食品酒饮 / 高端快消乳品</span>
                    </div>

                    <div className="flex items-start text-sm">
                      <span className="text-white/80 w-24 shrink-0 font-medium">咨询服务</span>
                      <span className="text-white font-semibold">三品合一类创新咨询 / 0-1爆品打造</span>
                    </div>

                    <div className="flex items-start text-sm">
                      <span className="text-white/80 w-24 shrink-0 font-medium">设计服务</span>
                      <span className="text-white font-semibold">瓶型结构设计 / 品牌视觉重构 / 包装创新</span>
                    </div>
                  </div>
                </div>

                {/* 右侧产品配图 (圆角 8px，不拉伸) */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-white/10 border border-white/20 shadow-xs">
                    <img 
                      src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                      alt="悦鲜活项目产品特征配图"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 板块 1: 项目背景 (样式 1: 上图下文) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="BACKGROUND & CHALLENGES"
                title="项目背景与行业挑战"
              />

              {/* 样式 1: 上图下文 (单列布局) */}
              <div className="content-block-1 space-y-4 pt-2">
                {/* 图片在上 (圆角 8px) */}
                <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="悦鲜活包装创新项目背景"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 下方标题 + 描述文字 (#4D4D4D, 15-16px, 行高 1.7) */}
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

            {/* 板块 2: 咨询服务 —— 内部包含 4 个子部分 (逐一展示各种排版样式) */}
            
            {/* 子部分 ①: 用户咨询 (样式 3: 左图右文) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="USER INSIGHTS"
                title="咨询服务 · 用户洞察"
              />

              {/* 样式 3: 左图右文 (图片在左，文字在右，对半分栏) */}
              <div className="content-block-split grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-2">
                {/* 左图 (圆角 8px) */}
                <div className="split-img w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png" 
                    alt="0.09s黄金保鲜视觉叙事"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 右文 */}
                <div className="split-text space-y-3">
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

            {/* 子部分 ②: 品类创新 (样式 5: 上图下文，文字部分并排三组) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="CATEGORY INNOVATION"
                title="咨询服务 · 品类创新"
              />

              {/* 样式 5: 上图下文（文字三栏并排） */}
              <div className="space-y-6 pt-2">
                <div className="w-full aspect-[21/9] md:aspect-[24/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="品类创新战略架构"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 文字部分三栏并排 */}
                <div className="content-block-5-text grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="text-[16px] font-bold text-[#007BC7] mb-2 font-mono">01 / 品类定位</h4>
                    <p className="text-[#4D4D4D] text-sm leading-relaxed">
                      差异化占位“高端黄金锁鲜乳”，拉开与常规高温奶与传统鲜奶的代际差距。
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="text-[16px] font-bold text-[#007BC7] mb-2 font-mono">02 / 技术话语</h4>
                    <p className="text-[#4D4D4D] text-sm leading-relaxed">
                      将复杂杀菌专利转化为“0.09秒极速锁鲜”，形成消费者直观信任资产。
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="text-[16px] font-bold text-[#007BC7] mb-2 font-mono">03 / 人群锚定</h4>
                    <p className="text-[#4D4D4D] text-sm leading-relaxed">
                      精准锁定都市白领与Z世代，满足精致健康、高颜值即饮的社交属性。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 子部分 ③: 爆品打造 (样式 4: 右图左文，与样式 3 交替) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="EXPLOSIVE PRODUCT"
                title="咨询服务 · 爆品打造"
              />

              {/* 样式 4: 右图左文 (文字在左，图片在右) */}
              <div className="content-block-split reverse grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-2">
                {/* 左文 */}
                <div className="split-text space-y-3 order-2 md:order-1">
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

                {/* 右图 (圆角 8px) */}
                <div className="split-img w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs order-1 md:order-2">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                    alt="悦鲜活年轻化瓶口结构设计"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* 子部分 ④: 品牌升级 (样式 2: 纯文) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="BRAND UPGRADE"
                title="咨询服务 · 品牌升级"
              />

              {/* 样式 2: 纯文 (无配图，只有标题 + 多段较长的说明性文字，段落间距加大) */}
              <div className="content-block-2 bg-neutral-50/80 rounded-2xl p-6 md:p-8 border border-neutral-200/60 space-y-4">
                <h3 className="text-[18px] font-bold text-[#1A1A1A]">
                  极简流线视觉重构，打响高端鲜乳品牌声量
                </h3>
                <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.8] space-y-4">
                  <p>
                    在品牌视觉升级维度，洛可可设计团队提炼出悦鲜活标志性的“鲜活水滴”超级符号，将其巧妙融入瓶身浮雕与瓶标侧边渐变线条中。
                  </p>
                  <p>
                    统一的极简科技白与活力天蓝色彩系统，搭配清新自然的插画风辅助图形，赋予包装强烈的货架视觉张力。无论是在电商平台详情页还是便利店冰柜，均能在一秒内抓住消费者眼球，显著提升品牌的认知效率与复购意愿。
                  </p>
                </div>
              </div>
            </section>

            {/* 板块 3: 创新设计 · 设计理念 (样式 7: 纯图单张展示) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="INNOVATION DESIGN"
                title="创新设计 · 设计理念"
              />

              {/* 样式 7: 纯图单张 (无文字，独立全宽大图，圆角 8px) */}
              <div className="content-block-7 w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                <img 
                  src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png" 
                  alt="创新设计概念画卷"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            {/* 板块 4: 价值展现 (样式 1: 上图下文) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="COMMERCIAL VALUE"
                title="价值展现"
              />

              {/* 样式 1: 上图下文 */}
              <div className="content-block-1 space-y-4 pt-2">
                <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="悦鲜活商业成果"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

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

            {/* 板块 5: 成果展示 (样式 6: 纯图两张并排 / 网格并排) */}
            <section className="space-y-6 text-left">
              <ScrollSectionTitle 
                badge="ACHIEVEMENTS GALLERY"
                title="成果展示"
              />

              {/* 样式 6: 纯图两张并排 (网格排列，圆角 8px，间距 20px) */}
              <div className="content-block-6 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="/src/assets/images/case_yuexianhuo.jpg" 
                    alt="成果展示 1"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif" 
                    alt="成果展示 2"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png" 
                    alt="成果展示 3"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png" 
                    alt="成果展示 4"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
            </section>

            {/* 板块 6: 价值展现 (第二次出现，原内容末尾再次出现，按原样保留，样式 2: 纯文) */}
            <section className="space-y-4 text-left">
              <ScrollSectionTitle 
                badge="MARKET IMPACT"
                title="价值展现 · 持续市场影响力"
              />

              {/* 样式 2: 纯文 */}
              <div className="content-block-2 bg-blue-50/40 rounded-2xl p-6 md:p-8 border border-blue-100/80 space-y-3">
                <h3 className="text-[18px] font-bold text-[#1A1A1A]">
                  以工业设计赋能快消新零售，树立乳品行业创新标杆
                </h3>
                <div className="text-[#4D4D4D] text-[15px] md:text-[16px] leading-[1.8] space-y-3">
                  <p>
                    悦鲜活项目的成功落地，不仅验证了洛可可“三品合一”品类创新模型的强大爆发力，也为传统快消乳企提供了产品年轻化升级的范本。
                  </p>
                  <p>
                    通过将前沿科技、人文洞察与极致工业设计相融合，洛可可将持续赋能中国消费品牌突破同质化竞争，打造兼具商业回报与社会美誉度的长青爆品。
                  </p>
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

    </div>
  );
}
