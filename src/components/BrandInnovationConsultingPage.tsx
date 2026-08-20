import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Lightbulb, 
  Rocket, 
  RefreshCw, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CategorySection04 from './CategorySection04';

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
  // State for Section 5 (Pipeline Hover State)
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  // State for Section 6 (9 Cases Horizontal Swipe / Drag Carousel)
  const [currentGroup, setCurrentGroup] = useState(0); // 0, 1, 2 for the 3 groups
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const startXRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  const totalGroups = 3;

  const handleNextGroup = () => {
    if (currentGroup < totalGroups - 1) {
      setCurrentGroup((prev) => prev + 1);
    }
  };

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup((prev) => prev - 1);
    }
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setHasDragged(false);
    startXRef.current = clientX;
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startXRef.current;
    if (Math.abs(delta) > 6) {
      setHasDragged(true);
    }

    // Boundary resistance:
    // If at group 0 and dragging left (delta < 0, toward non-existent prev group), apply resistance
    // If at group 2 and dragging right (delta > 0, toward non-existent next group), apply resistance
    let effectiveDelta = delta;
    if (currentGroup === 0 && delta < 0) {
      effectiveDelta = delta * 0.15;
    } else if (currentGroup === totalGroups - 1 && delta > 0) {
      effectiveDelta = delta * 0.15;
    }
    setDragOffset(effectiveDelta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Direction Requirement:
    // User drags/swipes right (dragOffset >= 50) -> Switch to Next Case Group
    // User drags/swipes left (dragOffset <= -50) -> Return to Previous Case Group
    if (dragOffset >= 50) {
      handleNextGroup();
    } else if (dragOffset <= -50) {
      handlePrevGroup();
    }

    setDragOffset(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 450) {
        if (e.deltaX < -20) {
          // Trackpad swipe right (deltaX negative) -> Next Group
          handleNextGroup();
          lastWheelTimeRef.current = now;
        } else if (e.deltaX > 20) {
          // Trackpad swipe left (deltaX positive) -> Prev Group
          handlePrevGroup();
          lastWheelTimeRef.current = now;
        }
      }
    }
  };

  // ================= DATA DEFINITIONS =================

  // SECTION 01 (原05): 哪些企业适合做 (4类企业 - 4列布局)
  const TARGET_ENTERPRISES = [
    {
      icon: Lightbulb,
      title: '从代工走向自有品牌',
      desc: '从白牌、OEM 或代工制造走向自主品牌'
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
      icon: CheckCircle2,
      title: '统一多渠道品牌表达',
      desc: '品牌表达分散，需要统一定位、视觉与传播口径'
    }
  ];

  // SECTION 02 (原03): 品牌卡在哪 (4大问题)
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

  // SECTION 04: 服务定义 (3个核心服务卡片)
  const THREE_BRAND_SERVICES = [
    {
      num: '01',
      title: '品牌策略',
      desc: '品牌定位、核心价值、品牌命名、品牌故事与沟通主张。'
    },
    {
      num: '02',
      title: '视觉系统',
      desc: 'Logo 设计、VI 视觉识别系统、包装设计与终端应用规范。'
    },
    {
      num: '03',
      title: '传播落地',
      desc: '核心话语体系、营销物料设计、传播内容与多渠道触点协同。'
    }
  ];

  // SECTION 05: 交付成果 (4行交付结构)
  const FOUR_BRAND_DELIVERABLES = [
    {
      num: '01',
      title: '品牌洞察',
      actions: '市场研究、竞品分析、用户洞察、企业基因提炼',
      result: '找到品牌核心差异化机会'
    },
    {
      num: '02',
      title: '战略定位',
      actions: '品牌定位、价值主张、品牌命名、品牌故事体系',
      result: '明确品牌是谁、代表什么'
    },
    {
      num: '03',
      title: '视觉体系',
      actions: 'Logo 设计、VI 视觉识别系统、核心包装、终端应用',
      result: '建立高辨识度的品牌视觉资产'
    },
    {
      num: '04',
      title: '传播应用',
      actions: '品牌超级话语、关键触点物料、上市传播与落地规范',
      result: '实现多渠道统一输出与心智占领'
    }
  ];

  // SECTION 05 (原01): 品牌策略四要素 (4个模块)
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

  // SECTION 06: 8个真实品牌全案案例
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
    },
    {
      id: 'beidahuang',
      client: '北大荒亲民食品',
      subtitle: '从大宗农产品原粮输出，走向有机健康高端主食品牌',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.38.png',
      defaultResult: '确立黑土地有机大单品心智，实现从农业原料到高溢价消费品牌的转型。',
      painPoint: '拥有优质寒地黑土种植资源，但长期停留在原料初加工，产品缺少品牌附加值。',
      action: '提炼“亲民有机”品牌核心承诺，重构母子品牌架构与全系列有机粮油包装美学体系。',
      result: '入驻全国高端商超与精品电商，单品毛利率提升超40%，成为国民有机餐桌标杆。',
      url: '/case/case-4'
    },
    {
      id: 'gugong',
      client: '故宫文化文创',
      subtitle: '让传统国宝文物走进现代日常生活美学',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg',
      defaultResult: '打造国潮现象级超级文创IP，带动故宫文创文旅产业年销售额数十亿元。',
      painPoint: '传统宫廷历史文化晦涩厚重，年轻一代对传统博物馆文创缺乏共鸣与日常消费欲望。',
      action: '提炼宫廷生活哲学与经典纹样符号，系统规划文房、美妆与文创礼盒品牌话语及包装。',
      result: '引爆全网“国潮”风尚，开创博物馆IP商业化与文化传承全新典范。',
      url: '/case/tanmujiang'
    },
    {
      id: 'chaomei',
      client: '朝美科技',
      subtitle: '从工业防护老厂，升级为国民级专业健康呼吸防护品牌',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.34.png',
      defaultResult: '打破低价代工内卷，建立民用与医用专业防颗粒呼吸器第一品牌认知。',
      painPoint: '传统劳保防护企业形象粗放，缺乏针对大众消费市场的品牌辨识度与信任背书。',
      action: '重新定义“专业防尘防霾”品牌价值，系统打造CM朝美视觉超级符号与民用消费级包装。',
      result: '成为国家重大赛事与应急物资核心品牌，线上线下全渠道销量位列行业前茅。',
      url: '/case/chaomei'
    },
    {
      id: 'tianxiaxiu',
      client: '天下秀新媒体集团',
      subtitle: 'IMS 品牌全面年轻化升级，构建红人经济超级符号',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.37.png',
      defaultResult: '树立红人新经济第一股现代科技品牌形象，强化跨业务板块品牌凝聚力。',
      painPoint: '旗下数字营销、大数据与元宇宙创新业务多元，缺乏统一的集团级品牌核心认知。',
      action: '提炼“连接红人与品牌”的超级枢纽概念，设计极具动感与科技识别度的全新VI视觉系统。',
      result: '完成主板上市品牌重塑，全面赋能B端品牌主与C端创作者生态。',
      url: '/case/case-5'
    },
    {
      id: 'bapuda',
      client: '巴普达新材料',
      subtitle: '打造高端工业新材料专业品牌形象与行业话语权',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.36.png',
      defaultResult: '打破国际巨头垄断认知，树立国产高性能聚合物高端科技品牌标杆。',
      painPoint: '技术实力过硬但B端工业品牌形象陈旧，难以在国际展会和头部车企采购中建立高端信任。',
      action: '梳理“微观分子工程”品牌价值主张，打造极具精密科技感的VI视觉识别与技术白皮书。',
      result: '顺利进入全球顶尖新能源车企供应链体系，品牌估值与订单量实现大幅跃升。',
      url: '/case/estun'
    },
    {
      id: 'jingkelong',
      client: '京客隆连锁零售',
      subtitle: '重构老字号零售品牌心智，打造现代生鲜食品超市新标杆',
      image: '/src/assets/images/case_jingkelong.jpg',
      defaultResult: '从品牌定位、VI系统到全域空间动线与生鲜包装，系统性赋能老字号转型。',
      painPoint: '传统社区超市门店老化、客群流失，面对新零售竞争缺乏品牌年轻化与品类吸睛力。',
      action: '确立“新鲜·实惠·社区厨房”品牌主张，系统升级绿色超级符号、生鲜分区导视与自有品牌包装。',
      result: '客单价与年轻家庭客群进店率显著提升，重塑首都老字号零售新活力。',
      url: '/case/case-2'
    }
  ];

  const CASE_GROUPS = [
    CASES.slice(0, 3),
    CASES.slice(3, 6),
    CASES.slice(6, 9)
  ];
  const canPrev = currentGroup > 0;
  const canNext = currentGroup < totalGroups - 1;

  // SECTION 07: FAQ (6个问题)
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

      {/* ================= SECTION 01: 哪些企业适合做 (WHO IT IS FOR / 01) ================= */}
      <section id="section-brand-who-it-is-for" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                WHO IT IS FOR / 01
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                哪些企业适合做
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              适合需要从 0 建立品牌，或通过系统升级重新获得用户认知与品牌溢价的企业。
            </p>
          </div>

          {/* 4 Enterprise Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TARGET_ENTERPRISES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="group p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#007BC7] transition-all duration-300">
                  {/* Fine Line Circle Icon */}
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
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 02: 品牌卡在哪 (CHALLENGES / 02) ================= */}
      <section id="section-brand-challenges" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CHALLENGES / 02
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

      {/* ================= SECTION 03: 品牌策略四要素 (METHOD / 03) ================= */}
      <section id="section-brand-strategy-elements" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                METHOD / 03
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

      {/* ================= SECTION 04: 从产品到品牌 (SERVICE DEFINITION / 04) ================= */}
      <CategorySection04
        sectionId="section-brand-service"
        badge="SERVICE DEFINITION / 04"
        title="从产品到品牌"
        description="构建从定位洞察到视觉识别、传播落地的完整品牌体系，让好产品拥有强大品牌心智。"
        leftCard={{
          badgeTag: 'BRAND 0-1',
          badgeText: '全链路品牌心智搭建',
          title: '全链路品牌心智搭建',
          description: '从品牌洞察到战略定位，再到视觉体系与传播落地，构建企业持续增长的品牌资产。',
          image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1600&q=85',
          ctaText: '预约品牌创新专家咨询',
          onCtaClick: onOpenContactModal,
        }}
        rightServices={THREE_BRAND_SERVICES}
      />

      {/* ================= SECTION 05: 每一步都有明确交付 (DELIVERABLES / 05) ================= */}
      <section id="section-brand-deliverables" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                DELIVERABLES / 05
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#1A1A1A] font-display">
                每一步都有明确交付
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#4D4D4D] max-w-xl leading-relaxed font-normal">
              从品牌洞察、战略定位、视觉体系到传播应用，每一步成果均有清晰的标准与交付物。
            </p>
          </div>

          {/* Non-card 3-Column List with Horizontal Dividers */}
          <div className="border-t border-[#E5E5E5]">
            {FOUR_BRAND_DELIVERABLES.map((item) => (
              <div 
                key={item.num}
                className="py-6 sm:py-7 lg:py-8 border-b border-[#E5E5E5] flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8"
              >
                {/* Column 1: Number & Title */}
                <div className="flex items-center gap-4 min-w-[220px] lg:w-[240px] shrink-0">
                  <span className="text-base sm:text-lg font-mono font-bold text-[#007BC7] shrink-0">
                    {item.num}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-display">
                    {item.title}
                  </h3>
                </div>

                {/* Column 2: Content / Action Points */}
                <div className="flex-1 text-left lg:text-center text-sm md:text-[15px] text-[#4D4D4D] leading-relaxed">
                  {item.actions}
                </div>

                {/* Column 3: Expected Result */}
                <div className="shrink-0 lg:w-[280px] flex items-center lg:justify-end gap-2 text-sm md:text-[15px]">
                  <span className="text-xs font-mono font-semibold text-[#8C8C8C] shrink-0">结果：</span>
                  <span className="font-medium text-[#1A1A1A]">{item.result}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 06: 9个品牌创新案例横向滑动轮播 (CASE STUDIES / 06) ================= */}
      <section id="section-brand-cases" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden select-none">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header with Navigation Arrows & Swipe Hint */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CASE STUDIES / 06
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                从认知到选择
              </h2>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8C8C8C] hidden lg:inline-flex items-center gap-1.5 font-sans bg-[#F5F5F5] px-2.5 py-1 rounded-full border border-[#E5E5E5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7] animate-pulse" />
                  按住横向滑动 / 左右翻页
                </span>
                <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal hidden sm:block">
                  精选 9 个品牌从 0 到 1、品牌升级与心智建立案例，展示从定位到表达再到市场应用的完整能力。
                </p>
              </div>
              
              {/* Pagination Arrows & Page Counter */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-xs font-mono font-semibold text-[#8C8C8C] mr-1 hidden sm:block">
                  <span className="text-[#007BC7] font-bold">0{currentGroup + 1}</span>
                  <span className="mx-1 text-[#E5E5E5]">/</span>
                  <span>0{totalGroups}</span>
                </div>
                <button
                  onClick={handlePrevGroup}
                  disabled={!canPrev}
                  aria-label="Previous Page"
                  className={`w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-all duration-300 ${
                    canPrev
                      ? 'text-[#8C8C8C] hover:text-[#007BC7] hover:border-[#007BC7] hover:bg-white shadow-xs cursor-pointer'
                      : 'text-[#E5E5E5] border-[#E5E5E5] opacity-35 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextGroup}
                  disabled={!canNext}
                  aria-label="Next Page"
                  className={`w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-all duration-300 ${
                    canNext
                      ? 'text-[#8C8C8C] hover:text-[#007BC7] hover:border-[#007BC7] hover:bg-white shadow-xs cursor-pointer'
                      : 'text-[#E5E5E5] border-[#E5E5E5] opacity-35 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Viewport Container */}
          <div 
            className="w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
          >
            {/* Sliding Track */}
            <div 
              className="flex w-full will-change-transform"
              style={{
                transform: `translateX(calc(-${currentGroup * 100}% - ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {CASE_GROUPS.map((group, gIdx) => (
                <div 
                  key={gIdx} 
                  className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {group.map((item) => (
                    <div 
                      key={item.id}
                      id={`case-card-${item.id}`}
                      onClick={() => {
                        if (!hasDragged && onNavigateDetail) {
                          onNavigateDetail(item.url);
                        }
                      }}
                      className="w-full min-w-0 box-border group relative rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#007BC7] hover:shadow-lg flex flex-col h-full select-none"
                    >
                      {/* Image Container (16:9) */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F0F0F0] shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.client}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-90 pointer-events-none"
                          draggable={false}
                        />

                        {/* Dark Semi-transparent Overlay on Hover (Desktop) */}
                        <div className="absolute inset-0 bg-[#1A1A1A]/90 p-6 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex">
                          <div className="space-y-3 text-left">
                            <div>
                              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8C8C8C] mb-0.5">原有品牌问题</div>
                              <p className="text-xs md:text-sm leading-relaxed text-neutral-200 line-clamp-2">{item.painPoint}</p>
                            </div>
                            <div>
                              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#007BC7] mb-0.5">洛可可策略与表达动作</div>
                              <p className="text-xs md:text-sm leading-relaxed text-white line-clamp-2">{item.action}</p>
                            </div>
                            <div>
                              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-0.5">品牌认知与市场结果</div>
                              <p className="text-xs md:text-sm leading-relaxed text-neutral-200 line-clamp-2">{item.result}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content & Footer */}
                      <div className="p-6 flex-1 flex flex-col justify-between text-left">
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

                          {/* Subtitle / Positioning */}
                          <p className="text-xs md:text-sm text-[#8C8C8C] mb-3 font-medium line-clamp-1">
                            {item.subtitle}
                          </p>

                          {/* Default Result Description */}
                          <p className="text-sm text-[#4D4D4D] leading-relaxed line-clamp-2 min-h-[44px]">
                            {item.defaultResult}
                          </p>
                        </div>

                        {/* Mobile Summary */}
                        <div className="block lg:hidden mt-4 pt-3.5 border-t border-[#E5E5E5] text-xs space-y-1.5 text-[#4D4D4D]">
                          <div><span className="text-[#8C8C8C] font-mono">动作：</span>{item.action}</div>
                          <div><span className="text-emerald-600 font-mono font-medium">结果：</span>{item.result}</div>
                        </div>

                        {/* Card Bottom CTA (Fixed at Bottom with margin-top auto) */}
                        <div className="mt-auto pt-5 border-t border-[#E5E5E5] flex items-center justify-between">
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
              ))}
            </div>
          </div>

          {/* Bottom Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {CASE_GROUPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentGroup(idx)}
                aria-label={`Switch to case group ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentGroup === idx 
                    ? 'w-8 bg-[#007BC7]' 
                    : 'w-2 bg-[#D9D9D9] hover:bg-[#8C8C8C]'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 07: 常见问题 (FAQ / 07) ================= */}
      <section 
        id="section-brand-faq" 
        className="py-20 lg:py-24 bg-[#FFFFFF] w-full overflow-hidden border-b border-[#E5E5E5]"
      >
        {/* Title Area - Left aligned */}
        <div className="max-w-[95%] w-full mx-auto relative z-10 mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
        </div>

        {/* Full-width List Container */}
        <div className="flex flex-col border-t border-[#E5E5E5] w-full">
          {FAQS.map((item, index) => (
            <div 
              key={index} 
              className="w-full border-b border-[#E5E5E5]"
            >
              {/* Centered item content with 50% reduced side margins */}
              <div className="max-w-[92.5%] lg:max-w-[85%] w-full mx-auto px-3 py-6 flex flex-col text-left group">
                <h4 className="text-[16px] font-semibold text-[#1a1a1a] group-hover:text-[#007BC7] transition-colors duration-300">
                  {item.q}
                </h4>
                <p className="mt-2 text-[14px] text-[#4D4D4D] leading-[1.6]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
