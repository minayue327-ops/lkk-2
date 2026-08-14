import React, { useState } from 'react';
import { 
  ArrowRight, 
  Plus, 
  Minus, 
  Lightbulb, 
  Rocket, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BrandInnovationConsultingPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (url: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

// Default Counter fallback if not provided
const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  return <span>{target}</span>;
};

export default function BrandInnovationConsultingPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent = DefaultCounter,
}: BrandInnovationConsultingPageProps) {
  // State for Section 1 (Pipeline Hover State)
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // State for Section 2 (Service Definition Cards Hover)
  const [hoveredServiceCard, setHoveredServiceCard] = useState<number | null>(null);

  // State for Section 7 (FAQ Accordion)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // ================= DATA DEFINITIONS =================

  // SECTION 1: 品牌策略四要素 (4个模块)
  const BRAND_STRATEGY_MODULES = [
    {
      num: '01',
      title: '品牌价值',
      desc: '提炼品牌的核心价值体系，并为品牌注入超越功能利益的精神内核，建立与用户深层情感共鸣的价值根基。',
      tags: ['核心价值体系', '精神内核', '情感共鸣']
    },
    {
      num: '02',
      title: '品牌定位',
      desc: '基于竞争与用户洞察，确立差异化品牌承诺与心智位置，让用户清楚理解品牌为何存在、为何值得选择。',
      tags: ['差异化承诺', '心智位置', '为何选择']
    },
    {
      num: '03',
      title: '品牌话语',
      desc: '建立易传播、易记忆的话语体系，包括品牌命名、Slogan、品牌故事与表达逻辑。',
      tags: ['品牌命名', 'Slogan口号', '品牌故事']
    },
    {
      num: '04',
      title: '品牌美学',
      desc: '将品牌价值转化为视觉风格、色彩、字体、图形与视觉识别系统，形成统一且有辨识度的品牌形象。',
      tags: ['视觉风格', '色彩与字体', 'VI识别系统']
    }
  ];

  // SECTION 2: 从产品到品牌 (4项协同服务)
  const FOUR_BRAND_SERVICES = [
    {
      num: '01',
      title: '品牌洞察',
      desc: '竞争洞察、趋势洞察、用户洞察与企业自身研究。',
      tags: ['竞争地图', '趋势洞察', '用户画像']
    },
    {
      num: '02',
      title: '品牌策略',
      desc: '品牌价值、品牌定位、命名与品牌话语体系。',
      tags: ['品牌定位', '品牌命名', '话语体系']
    },
    {
      num: '03',
      title: '品牌表达',
      desc: 'Logo、VI、包装、终端与传播内容系统。',
      tags: ['Logo与VI', '包装系统', '终端表达']
    },
    {
      num: '04',
      title: '品牌落地',
      desc: '应用规范、渠道适配、上市传播与持续优化。',
      tags: ['应用规范', '渠道适配', '上市传播']
    }
  ];

  // SECTION 3: 品牌卡在哪 (4大问题)
  const BRAND_CHALLENGES = [
    {
      num: '01',
      title: '品牌定位不清',
      desc: '用户不知道品牌是谁、适合谁、与同行有什么不同。'
    },
    {
      num: '02',
      title: '视觉缺少统一性',
      desc: 'Logo、包装、渠道物料各自表达，无法建立稳定识别。'
    },
    {
      num: '03',
      title: '产品有价值，品牌无溢价',
      desc: '用户只比较功能与价格，无法感知品牌价值。'
    },
    {
      num: '04',
      title: '传播缺少核心表达',
      desc: '有活动、有内容，却缺少一句能被复述的品牌话语。'
    }
  ];

  // SECTION 4: 品牌创新全案交付 (4行矩阵)
  const DELIVERABLES_MATRIX = [
    {
      num: '01',
      phase: '品牌洞察',
      deliverable: '竞争地图、趋势洞察、用户画像、企业基因诊断',
      outcome: '找到可占领的心智空位'
    },
    {
      num: '02',
      phase: '品牌策略',
      deliverable: '品牌价值、定位、命名、Slogan、品牌故事',
      outcome: '明确品牌为何存在、为何被选'
    },
    {
      num: '03',
      phase: '视觉系统',
      deliverable: 'Logo、VI、色彩字体、图形、包装与终端规范',
      outcome: '建立统一且可识别的品牌资产'
    },
    {
      num: '04',
      phase: '传播落地',
      deliverable: '品牌话语、上市内容、渠道应用、传播指引',
      outcome: '让品牌在市场中被看见与记住'
    }
  ];

  // SECTION 5: 哪些企业适合做 (5类企业 - 3+2 布局)
  const TARGET_ENTERPRISES = [
    {
      icon: Lightbulb,
      title: '从代工走向自有品牌',
      desc: '从白牌、OEM 或产品品牌走向自有品牌'
    },
    {
      icon: Rocket,
      title: '新品牌全面启动',
      desc: '新品牌启动，需要一次性搭建完整品牌系统'
    },
    {
      icon: RefreshCw,
      title: '老品牌形象与认知升级',
      desc: '老品牌形象老化，需要重新建立差异化认知'
    },
    {
      icon: TrendingUp,
      title: '破除内卷获取品牌溢价',
      desc: '产品已经具备竞争力，但难以获得品牌溢价'
    },
    {
      icon: CheckCircle2,
      title: '统一多渠道品牌表达',
      desc: '品牌表达分散，需要统一定位、视觉与传播口径'
    }
  ];

  // SECTION 6: 品牌创新案例 (3个精选案例)
  const CASES = [
    {
      id: 'tanmujiang',
      client: '谭木匠',
      subtitle: '从传统梳妆工具，转向东方木艺生活美学',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg',
      defaultResult: '从传统礼品梳具转向东方木艺美学，实现品牌高端溢价与年轻化跃升。',
      painPoint: '传统礼品梳具品类老化，消费场景局限于特定节庆与送礼。',
      action: '重构“东方木艺生活美学”品牌定位，全系迭代爆品体验、包装礼盒与品牌视觉。',
      result: '拓宽高端送礼与自我关爱场景，销量与品牌溢价同步提升。',
      url: '/case/tanmujiang'
    },
    {
      id: 'xiaoxiandun',
      client: '小仙炖',
      subtitle: '开创新鲜炖煮燕窝赛道，建立高端滋补年轻化心智',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png',
      defaultResult: '确立“鲜炖燕窝”高端心智定位，连续多年位列高端燕窝销量第一。',
      painPoint: '传统干燕窝烹饪繁琐、即食燕窝信任度低，缺乏现代年轻消费群体沟通语言。',
      action: '开创“鲜炖燕窝”高端心智定位，主导玻璃冷鲜包装、品牌视觉符号与全周期服务体验。',
      result: '连续多年稳居高端燕窝行业第一，成为新一代滋补品类头部代表品牌。',
      url: '/case/xiaoxiandun'
    },
    {
      id: 'miaokelanduo',
      client: '妙可蓝多',
      subtitle: '重塑儿童奶酪沟通表达，打造国民级大单品与超级IP',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png',
      defaultResult: '重塑儿童奶酪沟通表达，从细分赛道突围跃居行业销量第一。',
      painPoint: '外资品牌主导传统奶酪市场，国内消费者对奶酪认知度低、缺乏亲子情感连接。',
      action: '锁定儿童营养与趣味场景，构建高辨识度IP形象、超级包装识别与多场景传播体系。',
      result: '从细分赛道突围跃居行业销量第一，年营收与品牌声量实现跨越式增长。',
      url: '/case/miaokelanduo'
    }
  ];

  // SECTION 7: FAQ (6个问题)
  const FAQS = [
    {
      q: '1. 品牌创新全案与单独做 Logo 有什么区别？',
      a: '单独做 Logo 只是完成视觉标志的设计，而品牌创新 0–1 全案是从企业基因、用户洞察与竞争格局出发，先明确品牌的价值主张、心智定位与话语体系，再将这套逻辑统一转化为 Logo、VI、包装、终端物料与传播口径，帮助企业建立可持续积累的品牌资产与真实溢价，避免“空有标志却无用户心智”。'
    },
    {
      q: '2. 是否包含品牌命名、Slogan、VI 和包装？',
      a: '包含。品牌创新全案提供涵盖品牌命名（含商标初筛建议）、Slogan 品牌口号、品牌故事、核心话语体系、全套 VI 视觉识别规范、核心产品包装系统及应用物料指南的完整交付。'
    },
    {
      q: '3. 新品牌从 0 到 1 通常需要多久？',
      a: '标准全案周期通常为 2 至 3 个月。第一阶段（品牌洞察与策略定位）约需 3-4 周；第二阶段（视觉系统与核心表达）约需 4-5 周；第三阶段（应用规范与上市传播指引）约需 2-3 周。根据企业紧急程度和业务复杂度可进行针对性节奏匹配。'
    },
    {
      q: '4. 品牌升级是否必须更换 Logo？',
      a: '不一定。品牌升级的核心在于“心智重新定位”与“视觉统一表达”。如果原有 Logo 已经具备极高的市场知名度与正向资产积累，我们通常采取“微调优化与年轻化重构”策略，保留核心认知符号；若原有 Logo 严重限制了新品类拓展或形象老化，则会系统提案全新视觉方案。'
    },
    {
      q: '5. 是否提供传播内容和渠道应用规范？',
      a: '提供。全案交付中包含品牌上市传播指引、社交媒体内容视觉模板、电商详情页/线下门店终端物料规范以及品牌使用管理手册（Brand Book），确保后续在各渠道执行时视觉与话语高度统一。'
    },
    {
      q: '6. 产品还未最终确定，可以先启动品牌项目吗？',
      a: '可以，甚至非常推荐。在产品研发初期介入品牌策略，可以帮助企业更早明确目标客群痛点、核心卖点提炼与场景定位，从而反哺产品的外观美学定义与包装形态规划，实现“品牌定位”与“产品开发”同频共振。'
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#4D4D4D] font-sans antialiased">
      
      {/* ================= HERO SECTION ================= */}
      <section id="brand-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono">BRAND INNOVATION 0–1 CONSULTING</span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-[68px] font-black tracking-tight text-[#1A1A1A] leading-[1.15] font-display"
          >
            <span className="text-[#007BC7]">品牌创新</span>
            <span className="text-[#1A1A1A]"> · </span>
            <span className="text-[#1A1A1A]">0–1 全案咨询</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#8C8C8C] uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-[#4D4D4D] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            帮助新品牌或升级中的企业，完成品牌洞察、策略定位、视觉系统与传播表达，建立清晰的用户认知与品牌溢价。聚焦品牌心智与品牌资产搭建，打通从策略定位到市场表达的完整闭环。
          </p>

          <div className="mt-8">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
            >
              预约品牌创新专家咨询
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= QUANTIFIED ACHIEVEMENTS SECTION ================= */}
      <section className="achievement-section">
        <div className="max-w-[95%] w-full mx-auto">
          <div className="achievement-grid">
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={22} />年
              </div>
              <div className="achievement-label">行业经验积淀</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={600} />+
              </div>
              <div className="achievement-label">专业奖项认证</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={1000} />+
              </div>
              <div className="achievement-label">行业头部客户认可</div>
            </div>

            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={10000} />+
              </div>
              <div className="achievement-label">品牌与产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: 品牌策略四要素 (METHOD / 01) ================= */}
      <section id="section-brand-strategy-elements" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                METHOD / 01
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                品牌策略四要素
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              从品牌价值到视觉表达，为品牌建立清晰、统一且可持续积累的用户心智。
            </p>
          </div>

          {/* Big Container: Main Node + 4 Horizontal Modules */}
          <div className="bg-[#F0F0F0] rounded-3xl p-6 lg:p-10 border border-[#E5E5E5]">
            
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              
              {/* Top Central Hub Node: 品牌策略 */}
              <div className="flex flex-col items-center relative">
                <div className="bg-[#007BC7] text-white px-8 py-3 rounded-full font-display font-bold text-base tracking-wide shadow-xs flex items-center gap-2.5 z-20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>品牌策略</span>
                  <span className="text-xs font-mono font-normal opacity-80 uppercase tracking-widest">BRAND STRATEGY ARCHITECTURE</span>
                </div>

                {/* Vertical Central Line from Top Node to Horizontal Rail */}
                <div className="w-[1.5px] h-6 bg-[#E5E5E5]" />
              </div>

              {/* Branch Rail & Junctions Grid (Perfect 1:1 match with 4 cards below) */}
              <div className="grid grid-cols-4 gap-4 lg:gap-6 mb-0">
                {BRAND_STRATEGY_MODULES.map((_, idx) => (
                  <div key={idx} className="relative flex flex-col items-center h-7">
                    {/* Horizontal Rail Segment (Left Half) */}
                    {idx > 0 && (
                      <div 
                        className={`absolute top-0 right-1/2 left-[-16px] lg:left-[-24px] h-[1.5px] transition-colors duration-300 ${
                          (hoveredModule === idx || hoveredModule === idx - 1) ? 'bg-[#007BC7]' : 'bg-[#E5E5E5]'
                        }`} 
                      />
                    )}

                    {/* Horizontal Rail Segment (Right Half) */}
                    {idx < 3 && (
                      <div 
                        className={`absolute top-0 left-1/2 right-[-16px] lg:right-[-24px] h-[1.5px] transition-colors duration-300 ${
                          (hoveredModule === idx || hoveredModule === idx + 1) ? 'bg-[#007BC7]' : 'bg-[#E5E5E5]'
                        }`} 
                      />
                    )}

                    {/* Junction Dot (Aligned directly above column card center) */}
                    <div 
                      className={`absolute top-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-10 transition-all duration-300 ${
                        hoveredModule === idx 
                          ? 'bg-[#007BC7] ring-4 ring-[#007BC7]/20 scale-125' 
                          : 'bg-[#E5E5E5]'
                      }`} 
                    />

                    {/* Vertical Stem from Dot directly down to the card */}
                    <div 
                      className={`w-[1.5px] h-full transition-colors duration-300 ${
                        hoveredModule === idx ? 'bg-[#007BC7]' : 'bg-[#E5E5E5]'
                      }`} 
                    />
                  </div>
                ))}
              </div>

              {/* 4 Equal-width Modules Grid */}
              <div className="grid grid-cols-4 gap-4 lg:gap-6">
                {BRAND_STRATEGY_MODULES.map((item, idx) => {
                  const isHovered = hoveredModule === idx;
                  return (
                    <motion.div
                      key={item.num}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      onMouseEnter={() => setHoveredModule(idx)}
                      onMouseLeave={() => setHoveredModule(null)}
                      className={`group relative p-6 rounded-2xl transition-all duration-300 bg-white border flex flex-col justify-between min-h-[290px] ${
                        isHovered 
                          ? 'border-[#007BC7] shadow-sm -translate-y-1' 
                          : 'border-[#E5E5E5] hover:border-[#007BC7]'
                      }`}
                    >
                      <div>
                        {/* Number */}
                        <div className={`font-mono text-3xl font-extrabold transition-colors duration-300 mb-3 ${
                          isHovered ? 'text-[#007BC7]' : 'text-[#8C8C8C] group-hover:text-[#007BC7]'
                        }`}>
                          {item.num}
                        </div>

                        {/* Title */}
                        <h3 className={`text-lg font-bold transition-colors duration-300 mb-3 font-display ${
                          isHovered ? 'text-[#007BC7]' : 'text-[#1A1A1A] group-hover:text-[#007BC7]'
                        }`}>
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#4D4D4D] leading-relaxed mb-4">
                          {item.desc}
                        </p>
                      </div>

                      {/* Keywords List */}
                      <div className="space-y-1 pt-3 border-t border-[#E5E5E5]">
                        {item.tags.map((tag, tIdx) => (
                          <div 
                            key={tIdx} 
                            className="text-[11px] text-[#8C8C8C] group-hover:text-[#1A1A1A] transition-colors"
                          >
                            • {tag}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Mobile Vertical Layout */}
            <div className="block lg:hidden space-y-6">
              
              {/* Mobile Hub Node */}
              <div className="bg-[#007BC7] text-white p-4 rounded-2xl text-center font-display font-bold text-base flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>品牌策略 · 核心要素</span>
              </div>

              {/* Vertical Stems List */}
              <div className="relative pl-6 border-l-2 border-[#E5E5E5] space-y-5 ml-4">
                {BRAND_STRATEGY_MODULES.map((item) => (
                  <div 
                    key={item.num} 
                    className="relative bg-white p-5 rounded-2xl border border-[#E5E5E5] group"
                  >
                    {/* Node on left rail */}
                    <div className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full border-2 bg-white border-[#007BC7]" />

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xl font-extrabold text-[#007BC7]">
                          {item.num}
                        </span>
                        <h3 className="text-base font-bold text-[#1A1A1A] font-display">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-[#4D4D4D] leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E5E5E5]">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] bg-[#F0F0F0] text-[#4D4D4D] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: 从产品到品牌 (SERVICE / 02) ================= */}
      <section id="section-brand-service" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                SERVICE / 02
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                从产品到品牌
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              从竞争、用户与企业自身出发，完成品牌定位、视觉系统与传播表达，让好产品拥有被用户记住和选择的理由。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: CTA & Overview Card */}
            <div className="lg:col-span-4 bg-[#F0F0F0] rounded-3xl p-6 lg:p-8 border border-[#E5E5E5] flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#007BC7] text-white text-xs font-mono font-bold px-3 py-1 rounded-full mb-4">
                  BRAND 0–1
                </span>
                <h3 className="text-xl font-bold text-[#1A1A1A] font-display mb-3">
                  全链路品牌心智搭建
                </h3>
                <p className="text-sm text-[#4D4D4D] leading-relaxed">
                  打通品牌洞察、品牌策略、视觉系统与传播落地，避免策略与视觉脱节，为企业建立可持续积累的品牌无形资产与溢价空间。
                </p>
              </div>

              <div className="pt-6 border-t border-[#E5E5E5]">
                <button 
                  onClick={onOpenContactModal}
                  className="w-full bg-[#007BC7] hover:bg-[#005F96] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  预约品牌创新专家咨询
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right System Structure Cards Column (4 Services) */}
            <div className="lg:col-span-8">
              <div className="bg-[#F0F0F0] rounded-3xl p-6 lg:p-8 border border-[#E5E5E5] h-full flex flex-col justify-center">
                
                <div className="space-y-3.5">
                  {FOUR_BRAND_SERVICES.map((srv, idx) => {
                    const isHovered = hoveredServiceCard === idx;
                    return (
                      <div
                        key={srv.num}
                        onMouseEnter={() => setHoveredServiceCard(idx)}
                        onMouseLeave={() => setHoveredServiceCard(null)}
                        className={`p-5 rounded-xl bg-white transition-all duration-300 border cursor-pointer relative ${
                          isHovered ? 'border-[#007BC7] shadow-sm' : 'border-[#E5E5E5]'
                        }`}
                        style={{
                          marginLeft: `${idx * 12}px` // Staggered indent for 4-layer structure
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Number Badge */}
                          <span className="w-8 h-8 rounded-lg bg-[#007BC7] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                            {srv.num}
                          </span>

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#1A1A1A] font-display mb-1">
                              {srv.title}
                            </h3>
                            <p className="text-sm text-[#4D4D4D] leading-relaxed">
                              {srv.desc}
                            </p>

                            {/* Hover Expanded Keywords */}
                            <div className={`flex flex-wrap gap-2 transition-all duration-300 overflow-hidden ${
                              isHovered ? 'max-h-20 opacity-100 mt-3 pt-2.5 border-t border-[#E5E5E5]' : 'max-h-0 opacity-0'
                            }`}>
                              {srv.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-xs bg-[#F0F0F0] text-[#1A1A1A] px-2.5 py-0.5 rounded font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Connecting Line to next card */}
                        {idx < FOUR_BRAND_SERVICES.length - 1 && (
                          <div className={`absolute left-9 -bottom-3.5 w-[2px] h-3.5 z-10 transition-colors ${
                            isHovered ? 'bg-[#007BC7]' : 'bg-[#E5E5E5]'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: 品牌卡在哪 (CHALLENGES / 03) ================= */}
      <section id="section-brand-challenges" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CHALLENGES / 03
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                品牌卡在哪
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              品牌增长受限，通常不是缺少一次传播，而是缺少能被稳定识别与持续积累的品牌系统。
            </p>
          </div>

          {/* 4 Problem Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_CHALLENGES.map((item) => (
              <div 
                key={item.num}
                className="group flex flex-col justify-between p-6 rounded-xl bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#007BC7] transition-all duration-300 relative min-h-[220px]"
              >
                <div>
                  {/* Top Big Number */}
                  <div className="font-mono text-3xl lg:text-4xl font-extrabold text-[#8C8C8C] group-hover:text-[#007BC7] transition-colors duration-300 mb-4">
                    {item.num}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2 font-display">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-[#4D4D4D] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Fine Line with Hover Animation */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E5] relative overflow-hidden">
                  <div className="w-full h-[2px] bg-[#E5E5E5]" />
                  <div className="absolute top-4 left-0 w-full h-[2px] bg-[#007BC7] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 4: 品牌从 0 到 1 的交付 (DELIVERABLES / 04) ================= */}
      <section id="section-brand-deliverables" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                DELIVERABLES / 04
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                品牌从 0 到 1 的交付
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              从发现心智机会，到建立品牌资产与市场表达，让每个阶段都有清晰成果。
            </p>
          </div>

          {/* 4 Deliverable Matrix Rows */}
          <div className="border-t border-[#E5E5E5] divide-y divide-[#E5E5E5]">
            {DELIVERABLES_MATRIX.map((row) => (
              <div 
                key={row.num}
                className="group py-6 lg:py-8 px-4 hover:bg-[#F0F0F0]/50 transition-colors duration-300 relative"
              >
                {/* Left Hover Accent Indicator Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#007BC7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  
                  {/* Col 1: Phase Number & Title */}
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <span className="font-mono text-2xl font-bold text-[#8C8C8C] group-hover:text-[#007BC7] transition-colors">
                      {row.num}
                    </span>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] group-hover:text-[#007BC7] transition-colors font-display">
                      {row.phase}
                    </h3>
                  </div>

                  {/* Col 2: Key Deliverables */}
                  <div className="lg:col-span-5 text-base text-[#4D4D4D] leading-relaxed">
                    <span className="text-xs text-[#8C8C8C] block lg:hidden mb-1">关键交付：</span>
                    {row.deliverable}
                  </div>

                  {/* Col 3: Solution Outcome */}
                  <div className="lg:col-span-3 text-base font-medium text-[#1A1A1A] group-hover:-translate-y-0.5 transition-transform duration-300">
                    <span className="text-xs text-[#8C8C8C] block lg:hidden mb-1">解决结果：</span>
                    {row.outcome}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: 哪些企业适合做 (WHO IT IS FOR / 05) ================= */}
      <section id="section-brand-who-it-is-for" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                WHO IT IS FOR / 05
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                哪些企业适合做
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              适合需要从 0 建立品牌，或通过系统升级重新获得用户认知与品牌溢价的企业。
            </p>
          </div>

          {/* 5 Enterprise Cards (3+2 Layout for Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
            
            {/* Top 3 Cards (Span 2 cols each in a 6-col grid = 3 equal columns) */}
            {TARGET_ENTERPRISES.slice(0, 3).map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="lg:col-span-2 group p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#007BC7] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Circle Icon */}
                    <div className="w-12 h-12 rounded-full border border-[#E5E5E5] group-hover:border-[#007BC7] flex items-center justify-center mb-6 transition-colors duration-300">
                      <IconComp className="w-6 h-6 text-[#8C8C8C] group-hover:text-[#007BC7] transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 font-display">
                      {item.title}
                    </h3>

                    <p className="text-base text-[#4D4D4D] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom 2 Cards (Span 3 cols each in a 6-col grid = 2 equal wide columns) */}
            {TARGET_ENTERPRISES.slice(3, 5).map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx + 3} 
                  className="lg:col-span-3 group p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#007BC7] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Circle Icon */}
                    <div className="w-12 h-12 rounded-full border border-[#E5E5E5] group-hover:border-[#007BC7] flex items-center justify-center mb-6 transition-colors duration-300">
                      <IconComp className="w-6 h-6 text-[#8C8C8C] group-hover:text-[#007BC7] transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 font-display">
                      {item.title}
                    </h3>

                    <p className="text-base text-[#4D4D4D] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ================= SECTION 6: 品牌创新案例 (CASE STUDIES / 06) ================= */}
      <section id="section-brand-cases" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CASE STUDIES / 06
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                从认知到选择
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              选择品牌从 0 到 1、品牌升级与心智建立案例，展示从定位到表达再到市场应用的完整能力。
            </p>
          </div>

          {/* 3 Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {CASES.map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigateDetail && onNavigateDetail(item.url)}
                className="group relative rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#007BC7] hover:shadow-lg flex flex-col h-full"
              >
                {/* Image Container (4:3) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0F0F0]">
                  <img 
                    src={item.image} 
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-90"
                  />

                  {/* Dark Semi-transparent Overlay on Hover (Desktop) */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/90 p-6 lg:p-7 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex">
                    <div className="space-y-4">
                      <div>
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8C8C8C] mb-1">原有品牌问题</div>
                        <p className="text-xs md:text-sm leading-relaxed text-neutral-200">{item.painPoint}</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#007BC7] mb-1">洛可可策略与表达动作</div>
                        <p className="text-xs md:text-sm leading-relaxed text-white">{item.action}</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-1">品牌认知与市场结果</div>
                        <p className="text-xs md:text-sm leading-relaxed text-neutral-200">{item.result}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Line: Client Title & Category Tag */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-display tracking-tight group-hover:text-[#007BC7] transition-colors leading-snug line-clamp-1">
                        {item.client}
                      </h3>
                      <span className="shrink-0 text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-[#007BC7]/10 text-[#007BC7] border border-[#007BC7]/20">
                        品牌全案
                      </span>
                    </div>

                    {/* Subtitle / Positioning (1 line fixed height for perfect desktop row alignment) */}
                    <p className="text-xs md:text-sm text-[#8C8C8C] mb-3 font-medium line-clamp-1">
                      {item.subtitle}
                    </p>

                    {/* Default Result Description (2 lines clamp with min-h for perfect vertical alignment across 3 parallel cards) */}
                    <p className="text-sm text-[#4D4D4D] leading-relaxed line-clamp-2 min-h-[44px]">
                      {item.defaultResult}
                    </p>
                  </div>

                  {/* Mobile Summary */}
                  <div className="block lg:hidden mt-4 pt-3.5 border-t border-[#E5E5E5] text-xs space-y-1.5 text-[#4D4D4D]">
                    <div><span className="text-[#8C8C8C] font-mono">动作：</span>{item.action}</div>
                    <div><span className="text-emerald-600 font-mono font-medium">结果：</span>{item.result}</div>
                  </div>

                  {/* Card Bottom: Clear visual divider & CTA indicator aligned across the row */}
                  <div className="mt-5 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#8C8C8C] group-hover:text-[#007BC7] tracking-wider uppercase transition-colors">
                      VIEW CASE STUDY
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#E5E5E5] group-hover:border-[#007BC7] group-hover:bg-[#007BC7] flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 7: 常见问题 (FAQ / 07) ================= */}
      <section id="section-brand-faq" className="py-20 lg:py-24 bg-[#FFFFFF]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                FAQ / 07
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                合作前，先把问题说清
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              围绕品牌策略、视觉系统与落地方式，提前回答企业最常见的问题。
            </p>
          </div>

          {/* Accordion List (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-[#007BC7] bg-white shadow-sm' : 'border-[#E5E5E5] bg-white hover:border-[#8C8C8C]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer relative"
                  >
                    {/* Active Left Indicator Bar */}
                    {isOpen && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#007BC7]" />
                    )}

                    <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A] font-display pr-4">
                      {faq.q}
                    </h3>

                    <div className="w-6 h-6 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#007BC7]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#8C8C8C]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-sm md:text-base text-[#4D4D4D] leading-relaxed border-t border-[#E5E5E5]/60 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="py-16 md:py-20 bg-[#F0F0F0] border-t border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto text-center flex flex-col items-center">
          <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono mb-3 block">
            GET STARTED WITH BRAND INNOVATION
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#1A1A1A] font-display mb-4">
            准备好为您的企业建立强有力的品牌认知与溢价了吗？
          </h2>
          <p className="text-sm md:text-base text-[#4D4D4D] max-w-2xl mb-8 leading-relaxed">
            与洛可可资深品牌战略专家和视觉创意总监深入探讨，获取定制化品牌 0–1 落地全案规划。
          </p>
          <button 
            onClick={onOpenContactModal}
            className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
          >
            预约品牌创新专家咨询
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </section>

    </div>
  );
}
