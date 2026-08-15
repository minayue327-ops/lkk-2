import React, { useState, useRef } from 'react';
import { ArrowRight, Compass, Layers, ShieldCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreeInOneCategoryConsultingPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (url: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

// Default Counter fallback if not provided
const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  return <span>{target}</span>;
};

export default function ThreeInOneCategoryConsultingPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent = DefaultCounter,
}: ThreeInOneCategoryConsultingPageProps) {
  // State for Section 3 (Service Definition Cards Hover)
  const [hoveredServiceCard, setHoveredServiceCard] = useState<number | null>(null);

  // State for Category Life Cycle Section (Stage selection & hover)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // State for Section 7 (9 Cases Horizontal Drag / Touch Swipe Carousel - 3 Groups)
  const [currentGroup, setCurrentGroup] = useState(0);
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

  // SECTION 01 (原05): 适合哪些企业 (4类企业)
  const TARGET_ENTERPRISES = [
    {
      icon: Compass,
      title: '开辟第二曲线',
      desc: '想开辟新赛道、寻找第二增长曲线的企业'
    },
    {
      icon: Layers,
      title: '突破制造代工',
      desc: '有制造和供应链能力，但缺少品类与品牌溢价的企业'
    },
    {
      icon: ShieldCheck,
      title: '跨越同质陷阱',
      desc: '已有产品或品牌，却被同质化竞争限制增长的企业'
    },
    {
      icon: TrendingUp,
      title: '统筹全案增长',
      desc: '需要统筹战略、产品、品牌，而非采购单点设计服务的企业'
    }
  ];

  // SECTION 02 (原03): 4大增长瓶颈问题
  const CHALLENGES = [
    {
      num: '01',
      title: '只能打价格战',
      desc: '产品同质化严重，竞争持续压低利润空间。'
    },
    {
      num: '02',
      title: '增长没有新方向',
      desc: '原有市场接近天花板，找不到第二增长曲线。'
    },
    {
      num: '03',
      title: '产品和品牌没有形成合力',
      desc: '产品持续迭代，但用户无法感知明确价值与差异。'
    },
    {
      num: '04',
      title: '想做新品类，却缺少路径',
      desc: '有资源和想法，却不知道从哪里切入、如何降低试错风险。'
    }
  ];

  // SECTION 03 (原02): 三项协同服务 (阶梯式结构)
  const THREE_SERVICES = [
    {
      num: '01',
      title: '品类战略',
      desc: '洞察机会，定义赛道，建立品类标准与增长策略。',
      tags: ['洞察机会', '定义赛道', '增长策略']
    },
    {
      num: '02',
      title: '产品创新',
      desc: '规划产品矩阵，定义核心体验，推进设计研发与量产落地。',
      tags: ['产品矩阵', '核心体验', '量产落地']
    },
    {
      num: '03',
      title: '品牌创新',
      desc: '建立价值定位、品牌话语、视觉体系与市场传播表达。',
      tags: ['价值定位', '超级话语', '传播表达']
    }
  ];

  // SECTION 04 (原04): 交付矩阵 (4行)
  const DELIVERABLES_MATRIX = [
    {
      num: '01',
      phase: '机会判断',
      deliverable: '趋势洞察、用户研究、竞争地图、技术扫描',
      outcome: '找到值得进入的品类机会'
    },
    {
      num: '02',
      phase: '品类定义',
      deliverable: '品类定位、价值主张、品类标准、战略推演',
      outcome: '明确新赛道的竞争规则'
    },
    {
      num: '03',
      phase: '产品与品牌构建',
      deliverable: '产品矩阵、产品定义、品牌定位、话语与视觉系统',
      outcome: '让品类价值可体验、可识别'
    },
    {
      num: '04',
      phase: '上市与引爆',
      deliverable: '上市策略、传播主题、渠道策略、营销节奏',
      outcome: '让新品类进入市场并形成认知'
    }
  ];

  // SECTION 05 (原01): 品类创新七步流程
  const SEVEN_STEPS = [
    {
      num: '01',
      title: '品类竞争',
      keywords: ['企业自身研究', '品类趋势洞察', '品类竞争地图', '品类机会识别'],
      phase: '开 / 01–04'
    },
    {
      num: '02',
      title: '用户洞察',
      keywords: ['用户画像', '用户场景', '用户痛点', '用户定位'],
      phase: '开 / 01–04'
    },
    {
      num: '03',
      title: '技术规划',
      keywords: ['技术扫描', '技术整合', '技术路径', '技术研发'],
      phase: '开 / 01–04'
    },
    {
      num: '04',
      title: '品类战略',
      keywords: ['品类机会', '品类定义', '品类标准', '战略推演'],
      phase: '开 / 01–04'
    },
    {
      num: '05',
      title: '品类品牌',
      keywords: ['品牌价值', '品牌定位', '品牌话语', '品牌美学'],
      phase: '创 / 05–06'
    },
    {
      num: '06',
      title: '品类产品',
      keywords: ['产品线规划', '产品家族化', '产品定义', '产品美学', '产品落地'],
      phase: '创 / 05–06'
    },
    {
      num: '07',
      title: '品类营销',
      keywords: ['行业引爆', '社会化引爆', '渠道引爆'],
      phase: '引爆 / 07'
    }
  ];

  // SECTION 06: 8个真实全案案例
  const CASES = [
    {
      id: 'tanmujiang',
      client: '谭木匠',
      subtitle: '从传统梳妆工具，转向东方木艺生活美学',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      defaultResult: '从传统礼品转型东方木艺美学，实现品牌高端溢价跃升。',
      painPoint: '传统礼品梳具品类老化，消费场景局限于特定节庆。',
      action: '重构“东方木艺美学”品类定义，全系迭代爆品体验与品牌视觉。',
      result: '拓宽高端送礼与自我关爱场景，销量与品牌溢价同步提升。',
      url: '/cases/tanmujiang'
    },
    {
      id: '55degree',
      client: '55度杯',
      subtitle: '以产品创新建立新的使用体验与品类认知',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      defaultResult: '开创“快速降温杯”品类，上市即引发全网现象级热销。',
      painPoint: '保温杯市场同质化白热化，缺乏突破性功能使用场景。',
      action: '发现摇摇降温核心体验，一体化打造品类爆品与超级符号。',
      result: '创造数亿元销售神话，奠定降温杯品类霸主地位。',
      url: '/cases/55degree'
    },
    {
      id: 'miaokelanduo',
      client: '妙可蓝多',
      subtitle: '通过产品、品牌与品类协同建立增长势能',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      defaultResult: '开创儿童奶酪棒黄金品类，助力品牌问鼎行业销量冠军。',
      painPoint: '国内奶酪市场被外资垄断，缺乏适合中国儿童的奶酪品类。',
      action: '重新定义“儿童奶酪棒”品类，主导产品造型阻隔包装与品牌IP化。',
      result: '3年实现数十倍爆发式增长，跻身百亿级乳品领军企业。',
      url: '/cases/miaokelanduo'
    },
    {
      id: 'case-1',
      client: '糯宝 Pophie',
      subtitle: '三品合一，打造类生命体情感陪伴机器人',
      image: '/src/assets/images/case_pophie.jpg',
      defaultResult: '融合AI算法与温润触感，定义家庭情感机器人新品类。',
      painPoint: '传统陪伴硬件机械冰冷，缺少情感交互与持续陪伴粘性。',
      action: '软硬一体化定义生命感造型、微表情反馈与亲和力品牌语言。',
      result: '上市即获科技与母婴圈层高度认可，荣获多项国际顶级设计大奖。',
      url: '/cases/case-1'
    },
    {
      id: 'xiaoxiandun',
      client: '小仙炖',
      subtitle: '确立“鲜炖燕窝”高端赛道，全维度打造保鲜标杆',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png',
      defaultResult: '开创即食滋补冷鲜新品类，连续多年位列全网销量第一。',
      painPoint: '传统燕窝繁琐耗时，即食燕窝品质存疑，亟需信任新支点。',
      action: '定义“鲜炖”品类标准，主导冷鲜包装容器与高端视觉符号。',
      result: '建立国民级鲜炖燕窝第一认知，引爆数十亿级高端滋补赛道。',
      url: '/cases/xiaoxiandun'
    },
    {
      id: 'haidilao',
      client: '海底捞',
      subtitle: '堂食体验延伸至家庭即食，开创便携自热火锅',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.37.png',
      defaultResult: '拓宽火锅消费场景，自热即食系列年销售额破数亿元。',
      painPoint: '堂食场景受物理空间与就餐时段限制，外带即食体验严重脱节。',
      action: '定义自加热火锅结构安全与包装模块，沉淀家族化零售视觉。',
      result: '成为快消零售第二增长曲线，引领行业即食火锅标准化浪潮。',
      url: '/cases/case-5'
    },
    {
      id: 'musinno',
      client: '慢阶 Musinno',
      subtitle: '全球首款工作站属性乐谱台，斩获红点至尊奖',
      image: '/src/assets/images/musinno_hero_banner_1785826677156.jpg',
      defaultResult: '从概念草图到批量量产，打通专业音乐设备新品类。',
      painPoint: '专业音乐演奏家排练设备杂乱，传统谱架无法融合现代数字设备。',
      action: '品类定义乐谱工作站形态，完成全套精密机械架构与极简美学。',
      result: '荣获2023红点至尊奖，进驻国内外数十所顶级音乐学府。',
      url: '/cases/musinno'
    },
    {
      id: 'yuexianhuo',
      client: '悦鲜活',
      subtitle: '超瞬时锁鲜技术赋能，打造年轻化高端鲜乳爆品',
      image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif',
      defaultResult: '0.09s黄金保鲜叙事，助力品牌跃升高端鲜奶第一梯队。',
      painPoint: '常温奶同质化严重，传统鲜奶保质期短且包装视觉老化。',
      action: '聚焦0.09s瞬时锁鲜科技心智，重构人体工学瓶身与年轻化视觉。',
      result: '销量年复合增长超100%，成为新一代高端鲜奶现象级单品。',
      url: '/cases/case-v2-1'
    },
    {
      id: 'cotti',
      client: '库迪咖啡 Cotti',
      subtitle: '塑造全民咖啡品类创新概念，打通全链路商业闭环',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      defaultResult: '打造爆品咖啡家族化视觉与包装体验，助力全国万店规模快速扩张。',
      painPoint: '新消费咖啡赛道同质化严重，亟需高辨识度与极强亲和力的年轻化爆品体验。',
      action: '提炼全民咖啡品类价值，一体化定义爆品杯型结构、环保包材与超级视觉识别。',
      result: '达成数千家门店开业爆单，成为咖啡零售增长最快的现象级独角兽品牌之一。',
      url: '/cases/case-3'
    }
  ];

  const CASE_GROUPS = [
    CASES.slice(0, 3), // [Case 1, Case 2, Case 3]
    CASES.slice(3, 6), // [Case 4, Case 5, Case 6]
    CASES.slice(6, 9), // [Case 7, Case 8, Case 9]
  ];

  const canPrev = currentGroup > 0;
  const canNext = currentGroup < totalGroups - 1;

  // SECTION 07: FAQ (6个问题)
  const FAQS = [
    {
      q: '1. 三品合一全案和只做产品／品牌设计有什么区别？',
      a: '传统单点设计解决“好看”或“好用”的局部痛点，而“三品合一”全案从顶层品类战略开始，将赛道机会、爆品产品研发与品牌定位体系紧密绑在一起。确保每一个设计动作都指向明确的爆品打造与商业增长，避免“策略落不下去”或“设计无法赋能增长”的问题。'
    },
    {
      q: '2. 什么阶段的企业适合启动品类创新？',
      a: '适合面临三类状况的企业：一是原有产品面临价格战同质化内卷；二是希望开辟第二增长曲线的成熟企业；三是具备制造与供应链优势但缺乏品类与品牌溢价的企业。'
    },
    {
      q: '3. 项目周期通常如何安排？',
      a: '典型全案合作周期为 3 至 6 个月。通常分为三大阶段：第 1 个月完成品类机会诊断与竞争地图排查；第 2-3 个月完成品类战略定义、产品矩阵与品牌体系设计；第 4-6 个月推进工程结构样机与上市营销引爆落地。'
    },
    {
      q: '4. 是否包含产品研发、量产与供应链协同？',
      a: '包含。洛可可拥有业内领先的工业设计与供应链资源网络，提供从产品定义、外观结构工程、手板样机研发到对接优质生产供应链的完整量产落地支持。'
    },
    {
      q: '5. 是否包含品牌命名、VI、包装和传播？',
      a: '包含。品牌创新模块涵盖品类命名、品牌定位、超级话语体系、VI 视觉美学体系、爆品包装设计以及上市整合营销节奏规划。'
    },
    {
      q: '6. 可以先从品类战略诊断开始合作吗？',
      a: '可以。我们支持阶段式合作，企业可先启动为期 3-4 周的“品类创新战略诊断”，通过扫描竞争地图与扫描潜在赛道机会明确方向后，再推进后续的产品与品牌全案开发。'
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#4D4D4D] font-sans antialiased">
      
      {/* ================= HERO SECTION ================= */}
      <section id="three-in-one-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono">THREE-IN-ONE CATEGORY INNOVATION</span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-[68px] font-black tracking-tight text-[#1A1A1A] leading-[1.15] font-display"
          >
            <span className="text-[#007BC7]">三品合一</span>
            <span className="text-[#1A1A1A]"> · </span>
            <span className="text-[#1A1A1A]">品类创新咨询</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#8C8C8C] uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-[#4D4D4D] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            面向希望开辟新赛道、摆脱行业内卷、实现长期增长的企业。以“品类战略”为总纲，统筹推进“产品0-1”与“品牌0-1”协同落地，构建回答“做什么、如何被选择、如何被体验”的完整市场闭环，助力企业打造细分赛道品类标杆。
          </p>

          <div className="mt-8">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
            >
              即刻获取创新咨询方案
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* QUANTIFIED ACHIEVEMENTS SECTION */}
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
              <div className="achievement-label">产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 01: 适合哪些企业 (WHO IT IS FOR / 01) ================= */}
      <section id="section-who-it-is-for" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                WHO IT IS FOR / 01
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                适合需要系统突破的企业
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              不是所有项目都需要三品合一。它面向的是需要开辟新赛道、统筹产品与品牌长期增长的企业。
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

      {/* ================= SECTION 02: 你是否遇到这些增长问题 (CHALLENGES / 02) ================= */}
      <section id="section-growth-challenges" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CHALLENGES / 02
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                增长为什么停在原地
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              当企业持续投入却没有新增量，问题往往不在单点设计，而在于缺少一条清晰的品类增长路径。
            </p>
          </div>

          {/* 4 Problem Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CHALLENGES.map((item) => (
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

                  {/* 2-line Description */}
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

      {/* ================= SECTION 03: 方法论／核心服务结构 (METHOD / 03) ================= */}
      <section id="section-seven-steps" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                METHOD / 03
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                品类创新七步流程
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              从发现机会、定义新品类，到构建产品品牌系统并推动市场引爆，形成完整的品类创新闭环。
            </p>
          </div>

          {/* Strategic Roadmap */}
          <div className="w-full">
            
            {/* Desktop Horizontal Editorial Roadmap */}
            <div className="hidden lg:block">
              
              {/* Grouping Top Track */}
              <div className="grid grid-cols-7 gap-6 mb-6">
                <div className="col-span-4 flex items-center justify-between pr-4 pb-2 border-b border-[#E5E5E5]">
                  <span className="font-mono text-xs font-bold text-[#007BC7] tracking-wider uppercase">
                    开 / 01–04
                  </span>
                  <span className="text-xs text-[#8C8C8C]">机会洞察与战略确立</span>
                </div>
                <div className="col-span-2 flex items-center justify-between pr-4 pb-2 border-b border-[#E5E5E5]">
                  <span className="font-mono text-xs font-bold text-[#007BC7] tracking-wider uppercase">
                    创 / 05–06
                  </span>
                  <span className="text-xs text-[#8C8C8C]">产品与品牌协同构建</span>
                </div>
                <div className="col-span-1 flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                  <span className="font-mono text-xs font-bold text-[#007BC7] tracking-wider uppercase">
                    引爆 / 07
                  </span>
                  <span className="text-xs text-[#8C8C8C]">全域引爆</span>
                </div>
              </div>

              {/* Continuous Ultra-thin Connecting Line with Nodes */}
              <div className="relative mb-8">
                {/* Baseline Rail */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E5E5E5] -translate-y-1/2 z-0" />

                {/* 7 Columns for Nodes */}
                <div className="grid grid-cols-7 gap-6 relative z-10">
                  {SEVEN_STEPS.map((step) => (
                    <div key={step.num} className="flex items-center">
                      <div className="relative flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 bg-[#FFFFFF] border-[#E5E5E5] hover:border-[#007BC7] hover:bg-[#007BC7] transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7 Columns Editorial Content */}
              <div className="grid grid-cols-7 gap-6">
                {SEVEN_STEPS.map((step, idx) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      {/* Number */}
                      <div className="font-mono text-3xl lg:text-4xl font-extrabold text-[#8C8C8C] group-hover:text-[#007BC7] transition-colors duration-300 mb-3">
                        {step.num}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-3 font-display tracking-tight">
                        {step.title}
                      </h3>

                      {/* Keywords List */}
                      <div className="space-y-1.5 pt-3 border-t border-[#E5E5E5]">
                        {step.keywords.map((kw, kIdx) => (
                          <div 
                            key={kIdx} 
                            className="text-xs text-[#4D4D4D] group-hover:text-[#1A1A1A] transition-colors font-normal leading-relaxed"
                          >
                            • {kw}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom subtle hover indicator line */}
                    <div className="w-8 h-[1px] bg-transparent group-hover:bg-[#007BC7] transition-colors mt-6" />
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Mobile Vertical Editorial Roadmap */}
            <div className="block lg:hidden relative pl-6 border-l border-[#E5E5E5] space-y-8">
              {SEVEN_STEPS.map((step) => (
                <div key={step.num} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 bg-[#FFFFFF] border-[#E5E5E5]" />

                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-2xl font-extrabold text-[#8C8C8C]">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1A1A] font-display">
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#007BC7] bg-[#F0F0F0] px-2 py-0.5 rounded ml-auto">
                      {step.phase}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {step.keywords.map((kw, kIdx) => (
                      <span key={kIdx} className="text-xs bg-[#F0F0F0] text-[#4D4D4D] px-2.5 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 04: 品类有周期，创新要找准时机 (CATEGORY LIFE CYCLE / 04) ================= */}
      <section id="category-life-cycle" className="py-20 lg:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          
          {/* 一、Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6"
          >
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CATEGORY LIFE CYCLE / 04
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1A1A] font-display">
                品类有周期，创新要找准时机
              </h2>
            </div>
            <div className="max-w-xl text-left">
              <p className="text-sm md:text-base text-[#4D4D4D] leading-relaxed font-normal mb-1.5">
                从导入、成长、成熟到衰退，市场机会、用户心智与竞争问题不断变化。
              </p>
              <p className="text-xs md:text-sm text-[#007BC7] font-medium leading-relaxed">
                先找到你的品类阶段，再判断适合你的创新路径。
              </p>
            </div>
          </motion.div>

          {/* 二、生命周期曲线 (Desktop & Tablet) */}
          <div className="hidden md:block relative w-full mb-10 select-none">
            <svg viewBox="0 0 1000 86" className="w-full h-20 overflow-visible">
              {/* Base continuous sleek line: 导入 (低位) -> 成长 (快速上升) -> 成熟 (顶部平台) -> 衰退 (下降) */}
              <path
                d="M 20 66 C 140 66, 200 64, 250 48 C 300 32, 420 16, 500 16 C 580 16, 680 16, 750 36 C 820 56, 880 66, 980 68"
                fill="none"
                stroke="#E5E5E5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Active Highlight Segment based on hoveredStage */}
              {hoveredStage === 0 && (
                <path
                  d="M 20 66 C 140 66, 200 64, 250 48"
                  fill="none"
                  stroke="#007BC7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}
              {hoveredStage === 1 && (
                <path
                  d="M 220 54 C 290 36, 420 16, 500 16"
                  fill="none"
                  stroke="#007BC7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}
              {hoveredStage === 2 && (
                <path
                  d="M 480 16 C 580 16, 680 16, 750 36"
                  fill="none"
                  stroke="#007BC7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}
              {hoveredStage === 3 && (
                <path
                  d="M 720 28 C 800 50, 880 66, 980 68"
                  fill="none"
                  stroke="#007BC7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )}

              {/* 4 Center Stage Node Points */}
              {[
                { cx: 125, cy: 66, stage: 0, label: '01 导入期' },
                { cx: 375, cy: 30, stage: 1, label: '02 成长期' },
                { cx: 625, cy: 16, stage: 2, label: '03 成熟期' },
                { cx: 875, cy: 56, stage: 3, label: '04 衰退期' },
              ].map((node) => {
                const isActive = hoveredStage === node.stage;
                return (
                  <g 
                    key={node.stage} 
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredStage(node.stage)}
                    onMouseLeave={() => setHoveredStage(null)}
                    onClick={() => {
                      setHoveredStage(hoveredStage === node.stage ? null : node.stage);
                    }}
                  >
                    {/* Vertical connecting guideline down towards card */}
                    <line
                      x1={node.cx}
                      y1={node.cy}
                      x2={node.cx}
                      y2={86}
                      stroke={isActive ? '#007BC7' : '#E5E5E5'}
                      strokeWidth={isActive ? '1.5' : '1'}
                      strokeDasharray={isActive ? 'none' : '3 3'}
                      className="transition-colors duration-300"
                    />
                    {/* Node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isActive ? 6.5 : 4.5}
                      fill={isActive ? '#007BC7' : '#FFFFFF'}
                      stroke={isActive ? '#007BC7' : '#8C8C8C'}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className="transition-all duration-300"
                    />
                    {/* Stage Text Label */}
                    <text
                      x={node.cx}
                      y={node.stage === 2 ? node.cy - 10 : node.cy - 12}
                      textAnchor="middle"
                      className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-300 select-none ${
                        isActive ? 'fill-[#007BC7]' : 'fill-[#8C8C8C]'
                      }`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mobile Vertical Timeline Overview */}
          <div className="md:hidden flex items-center justify-between px-3.5 py-2.5 mb-6 bg-white border border-[#E5E5E5] rounded-xl text-xs font-mono text-[#4D4D4D]">
            <button 
              onClick={() => setHoveredStage(hoveredStage === 0 ? null : 0)}
              className={hoveredStage === 0 ? 'text-[#007BC7] font-bold underline' : ''}
            >
              01 导入
            </button>
            <span className="text-[#8C8C8C]">→</span>
            <button 
              onClick={() => setHoveredStage(hoveredStage === 1 ? null : 1)}
              className={hoveredStage === 1 ? 'text-[#007BC7] font-bold underline' : ''}
            >
              02 成长
            </button>
            <span className="text-[#8C8C8C]">→</span>
            <button 
              onClick={() => setHoveredStage(hoveredStage === 2 ? null : 2)}
              className={hoveredStage === 2 ? 'text-[#007BC7] font-bold underline' : ''}
            >
              03 成熟
            </button>
            <span className="text-[#8C8C8C]">→</span>
            <button 
              onClick={() => setHoveredStage(hoveredStage === 3 ? null : 3)}
              className={hoveredStage === 3 ? 'text-[#007BC7] font-bold underline' : ''}
            >
              04 衰退
            </button>
          </div>

          {/* 三、四阶段核心诊断卡片 (4-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            
            {/* STAGE 01: 导入期 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              onMouseEnter={() => setHoveredStage(0)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setHoveredStage(hoveredStage === 0 ? null : 0)}
              className={`flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                hoveredStage === 0 
                  ? 'border-[#007BC7] shadow-sm -translate-y-1 ring-1 ring-[#007BC7]/30' 
                  : hoveredStage !== null 
                    ? 'border-[#E5E5E5] opacity-60' 
                    : 'border-[#E5E5E5] hover:border-[#007BC7]/50'
              }`}
            >
              <div className="space-y-4">
                {/* Number & Stage Name */}
                <div className="flex items-baseline justify-between border-b border-[#E5E5E5] pb-3">
                  <span className={`text-3xl font-bold font-mono tracking-tight transition-colors duration-300 ${
                    hoveredStage === 0 ? 'text-[#007BC7]' : 'text-[#8C8C8C]'
                  }`}>
                    01
                  </span>
                  <span className="text-xl font-bold text-[#1A1A1A] font-display">
                    导入期
                  </span>
                </div>

                {/* 市场状态 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    市场状态
                  </span>
                  <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                    品类探索 · 需求萌芽 · 市场教育
                  </p>
                </div>

                {/* 用户心智 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    用户心智
                  </span>
                  <p className="text-xs text-[#4D4D4D] leading-relaxed">
                    认知有限 · 需求未明 · 尝试意愿
                  </p>
                </div>

                {/* 核心问题 (High Priority Highlight) */}
                <div className={`p-3.5 rounded-xl border-l-2 transition-all duration-300 ${
                  hoveredStage === 0 
                    ? 'bg-[#007BC7]/[0.08] border-[#007BC7]' 
                    : 'bg-[#007BC7]/[0.03] border-[#007BC7]/70'
                }`}>
                  <span className="text-[10px] font-mono tracking-widest text-[#007BC7] uppercase font-bold block mb-1.5">
                    核心问题
                  </span>
                  <div className="space-y-1 text-xs text-[#1A1A1A] font-medium leading-normal">
                    <p>· 需求从哪里来？</p>
                    <p>· 为什么是现在？</p>
                    <p>· 用户为什么选择？</p>
                  </div>
                </div>

                {/* 创新方向 */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    创新方向
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-relaxed">
                    发现机会 · 定义价值 · 建立认知
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-5 mt-5 border-t border-[#E5E5E5]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContactModal();
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-[#007BC7] hover:text-[#005F96] transition-colors group cursor-pointer"
                >
                  <span>匹配对应服务方案</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>

            {/* STAGE 02: 成长期 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onMouseEnter={() => setHoveredStage(1)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setHoveredStage(hoveredStage === 1 ? null : 1)}
              className={`flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                hoveredStage === 1 
                  ? 'border-[#007BC7] shadow-sm -translate-y-1 ring-1 ring-[#007BC7]/30' 
                  : hoveredStage !== null 
                    ? 'border-[#E5E5E5] opacity-60' 
                    : 'border-[#E5E5E5] hover:border-[#007BC7]/50'
              }`}
            >
              <div className="space-y-4">
                {/* Number & Stage Name */}
                <div className="flex items-baseline justify-between border-b border-[#E5E5E5] pb-3">
                  <span className={`text-3xl font-bold font-mono tracking-tight transition-colors duration-300 ${
                    hoveredStage === 1 ? 'text-[#007BC7]' : 'text-[#8C8C8C]'
                  }`}>
                    02
                  </span>
                  <span className="text-xl font-bold text-[#1A1A1A] font-display">
                    成长期
                  </span>
                </div>

                {/* 市场状态 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    市场状态
                  </span>
                  <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                    需求增长 · 竞争进入 · 品类扩张
                  </p>
                </div>

                {/* 用户心智 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    用户心智
                  </span>
                  <p className="text-xs text-[#4D4D4D] leading-relaxed">
                    认知形成 · 选择增多 · 偏好建立
                  </p>
                </div>

                {/* 核心问题 (High Priority Highlight) */}
                <div className={`p-3.5 rounded-xl border-l-2 transition-all duration-300 ${
                  hoveredStage === 1 
                    ? 'bg-[#007BC7]/[0.08] border-[#007BC7]' 
                    : 'bg-[#007BC7]/[0.03] border-[#007BC7]/70'
                }`}>
                  <span className="text-[10px] font-mono tracking-widest text-[#007BC7] uppercase font-bold block mb-1.5">
                    核心问题
                  </span>
                  <div className="space-y-1 text-xs text-[#1A1A1A] font-medium leading-normal">
                    <p>· 如何建立差异？</p>
                    <p>· 如何抢占认知？</p>
                    <p>· 如何持续增长？</p>
                  </div>
                </div>

                {/* 创新方向 */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    创新方向
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-relaxed">
                    产品升级 · 差异化 · 品牌认知
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-5 mt-5 border-t border-[#E5E5E5]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContactModal();
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-[#007BC7] hover:text-[#005F96] transition-colors group cursor-pointer"
                >
                  <span>匹配对应服务方案</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>

            {/* STAGE 03: 成熟期 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              onMouseEnter={() => setHoveredStage(2)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setHoveredStage(hoveredStage === 2 ? null : 2)}
              className={`flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                hoveredStage === 2 
                  ? 'border-[#007BC7] shadow-sm -translate-y-1 ring-1 ring-[#007BC7]/30' 
                  : hoveredStage !== null 
                    ? 'border-[#E5E5E5] opacity-60' 
                    : 'border-[#E5E5E5] hover:border-[#007BC7]/50'
              }`}
            >
              <div className="space-y-4">
                {/* Number & Stage Name */}
                <div className="flex items-baseline justify-between border-b border-[#E5E5E5] pb-3">
                  <span className={`text-3xl font-bold font-mono tracking-tight transition-colors duration-300 ${
                    hoveredStage === 2 ? 'text-[#007BC7]' : 'text-[#8C8C8C]'
                  }`}>
                    03
                  </span>
                  <span className="text-xl font-bold text-[#1A1A1A] font-display">
                    成熟期
                  </span>
                </div>

                {/* 市场状态 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    市场状态
                  </span>
                  <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                    竞争激烈 · 同质化 · 增长放缓
                  </p>
                </div>

                {/* 用户心智 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    用户心智
                  </span>
                  <p className="text-xs text-[#4D4D4D] leading-relaxed">
                    认知固化 · 选择成熟 · 价格敏感
                  </p>
                </div>

                {/* 核心问题 (High Priority Highlight) */}
                <div className={`p-3.5 rounded-xl border-l-2 transition-all duration-300 ${
                  hoveredStage === 2 
                    ? 'bg-[#007BC7]/[0.08] border-[#007BC7]' 
                    : 'bg-[#007BC7]/[0.03] border-[#007BC7]/70'
                }`}>
                  <span className="text-[10px] font-mono tracking-widest text-[#007BC7] uppercase font-bold block mb-1.5">
                    核心问题
                  </span>
                  <div className="space-y-1 text-xs text-[#1A1A1A] font-medium leading-normal">
                    <p>· 如何摆脱同质化？</p>
                    <p>· 如何重建价值？</p>
                    <p>· 新增长从哪里来？</p>
                  </div>
                </div>

                {/* 创新方向 */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    创新方向
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-relaxed">
                    价值重构 · 场景创新 · 品类分化
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-5 mt-5 border-t border-[#E5E5E5]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContactModal();
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-[#007BC7] hover:text-[#005F96] transition-colors group cursor-pointer"
                >
                  <span>匹配对应服务方案</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>

            {/* STAGE 04: 衰退期 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onMouseEnter={() => setHoveredStage(3)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setHoveredStage(hoveredStage === 3 ? null : 3)}
              className={`flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                hoveredStage === 3 
                  ? 'border-[#007BC7] shadow-sm -translate-y-1 ring-1 ring-[#007BC7]/30' 
                  : hoveredStage !== null 
                    ? 'border-[#E5E5E5] opacity-60' 
                    : 'border-[#E5E5E5] hover:border-[#007BC7]/50'
              }`}
            >
              <div className="space-y-4">
                {/* Number & Stage Name */}
                <div className="flex items-baseline justify-between border-b border-[#E5E5E5] pb-3">
                  <span className={`text-3xl font-bold font-mono tracking-tight transition-colors duration-300 ${
                    hoveredStage === 3 ? 'text-[#007BC7]' : 'text-[#8C8C8C]'
                  }`}>
                    04
                  </span>
                  <span className="text-xl font-bold text-[#1A1A1A] font-display">
                    衰退期
                  </span>
                </div>

                {/* 市场状态 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    市场状态
                  </span>
                  <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                    需求下降 · 心智迁移 · 旧增长失效
                  </p>
                </div>

                {/* 用户心智 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    用户心智
                  </span>
                  <p className="text-xs text-[#4D4D4D] leading-relaxed">
                    需求转移 · 品类弱化 · 认知迁移
                  </p>
                </div>

                {/* 核心问题 (High Priority Highlight) */}
                <div className={`p-3.5 rounded-xl border-l-2 transition-all duration-300 ${
                  hoveredStage === 3 
                    ? 'bg-[#007BC7]/[0.08] border-[#007BC7]' 
                    : 'bg-[#007BC7]/[0.03] border-[#007BC7]/70'
                }`}>
                  <span className="text-[10px] font-mono tracking-widest text-[#007BC7] uppercase font-bold block mb-1.5">
                    核心问题
                  </span>
                  <div className="space-y-1 text-xs text-[#1A1A1A] font-medium leading-normal">
                    <p>· 用户为什么离开？</p>
                    <p>· 旧价值还能做什么？</p>
                    <p>· 下一增长点在哪里？</p>
                  </div>
                </div>

                {/* 创新方向 */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C8C8C] uppercase font-bold block mb-1">
                    创新方向
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-relaxed">
                    价值再定义 · 品类拓展 · 新增长
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-5 mt-5 border-t border-[#E5E5E5]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContactModal();
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-[#007BC7] hover:text-[#005F96] transition-colors group cursor-pointer"
                >
                  <span>匹配对应服务方案</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 05: 全案是什么／服务定义 (SERVICE DEFINITION / 05) ================= */}
      <section id="section-three-in-one-service" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                SERVICE DEFINITION / 05
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                品类先行，产品与品牌协同
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              以品类战略确定新赛道，再同步完成产品 0–1 与品牌 0–1，让企业拥有可被市场识别、选择并持续增长的新品类。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: CTA & Overview Card */}
            <div className="lg:col-span-4 bg-[#F0F0F0] rounded-3xl p-6 lg:p-8 border border-[#E5E5E5] flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#007BC7] text-white text-xs font-mono font-bold px-3 py-1 rounded-full mb-4">
                  ONE SYSTEM
                </span>
                <h3 className="text-xl font-bold text-[#1A1A1A] font-display mb-3">
                  全案系统化突破
                </h3>
                <p className="text-sm text-[#4D4D4D] leading-relaxed">
                  不再做割裂的单点设计。品类战略指引方向，产品体验筑牢底座，品牌传播塑造感知，三者协同形成高爆发增长闭环。
                </p>
              </div>

              <div className="pt-6 border-t border-[#E5E5E5]">
                <button 
                  onClick={onOpenContactModal}
                  className="w-full bg-[#007BC7] hover:bg-[#005F96] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  预约三品合一专家咨询
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right System Structure Cards Column (Strictly Aligned Vertical Layout) */}
            <div className="lg:col-span-8">
              <div className="bg-[#F0F0F0] rounded-3xl p-6 lg:p-8 border border-[#E5E5E5] h-full flex flex-col justify-center relative">
                
                <div className="space-y-4 relative">
                  {THREE_SERVICES.map((srv, idx) => {
                    const isHovered = hoveredServiceCard === idx;
                    
                    return (
                      <div
                        key={srv.num}
                        onMouseEnter={() => setHoveredServiceCard(idx)}
                        onMouseLeave={() => setHoveredServiceCard(null)}
                        className={`p-6 rounded-2xl bg-white transition-all duration-300 border cursor-default relative w-full ${
                          isHovered ? 'border-[#007BC7] shadow-sm' : 'border-[#E5E5E5]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Left Number Badge: 01 / 02 / 03, Blue background & White text */}
                          <span className="w-8 h-8 rounded-lg bg-[#007BC7] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                            {srv.num}
                          </span>

                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-[#1A1A1A] font-display mb-1">
                              {srv.title}
                            </h3>
                            <p className="text-base text-[#4D4D4D] leading-relaxed">
                              {srv.desc}
                            </p>

                            {/* Hover Expanded Keywords */}
                            <div className={`flex flex-wrap gap-2 transition-all duration-300 overflow-hidden ${
                              isHovered ? 'max-h-20 opacity-100 mt-4 pt-3 border-t border-[#E5E5E5]' : 'max-h-0 opacity-0'
                            }`}>
                              {srv.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-xs bg-[#F0F0F0] text-[#1A1A1A] px-2.5 py-1 rounded font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Thin Connecting Line to next card */}
                        {idx < THREE_SERVICES.length - 1 && (
                          <div 
                            className={`hidden md:block absolute -bottom-4 w-[2px] h-4 z-10 transition-colors ${
                              isHovered ? 'bg-[#007BC7]' : 'bg-[#E5E5E5]'
                            }`}
                            style={{ left: '40px' }}
                          />
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

      {/* ================= SECTION 06: 服务交付 (DELIVERABLES / 06) ================= */}
      <section id="section-deliverables-matrix" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                DELIVERABLES / 06
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                从判断机会，到进入市场
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              每个阶段都有明确的工作动作、核心交付和预期结果，让品类创新从战略判断走向实际增长。
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

      {/* ================= SECTION 07: 9个案例横向滑动 / Carousel (CASE STUDIES / 07) ================= */}
      <section id="section-case-studies" className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Header with Navigation Arrows & Indicator */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                CASE STUDIES / 07
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                从策略到市场的真实结果
              </h2>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-6">
              <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal hidden sm:block">
                精选 9 个三品合一标杆全案，支持向右拖拽/滑动浏览下一组案例，支持触控与拖拽手势。
              </p>
              
              {/* Pagination Arrows & Group Counter */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-xs font-mono font-semibold text-[#8C8C8C] mr-1 hidden sm:block">
                  <span className="text-[#007BC7] font-bold">0{currentGroup + 1}</span>
                  <span className="mx-1 text-[#E5E5E5]">/</span>
                  <span>0{totalGroups}</span>
                </div>
                <button
                  onClick={handlePrevGroup}
                  disabled={!canPrev}
                  aria-label="Previous Case Group"
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
                  aria-label="Next Case Group"
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

          {/* Carousel Slide Track Container with Drag / Swipe Gesture */}
          <div 
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
            className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-2"
          >
            <div 
              className="flex w-full will-change-transform"
              style={{
                transform: `translateX(calc(-${currentGroup * 100}% - ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {CASE_GROUPS.map((group, groupIdx) => (
                <div 
                  key={groupIdx} 
                  className="w-full shrink-0 basis-full min-w-full box-border"
                  aria-hidden={currentGroup !== groupIdx}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {group.map((item) => (
                      <div 
                        key={item.id}
                        id={`case-card-${item.id}`}
                        onClick={() => {
                          if (!hasDragged && onNavigateDetail) {
                            onNavigateDetail(item.url);
                          }
                        }}
                        className="w-full min-w-0 box-border group relative rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#007BC7] hover:shadow-lg flex flex-col h-full"
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
                                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8C8C8C] mb-0.5">客户原有困境</div>
                                <p className="text-xs md:text-sm leading-relaxed text-neutral-200 line-clamp-2">{item.painPoint}</p>
                              </div>
                              <div>
                                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#007BC7] mb-0.5">洛可可关键动作</div>
                                <p className="text-xs md:text-sm leading-relaxed text-white line-clamp-2">{item.action}</p>
                              </div>
                              <div>
                                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 mb-0.5">项目结果</div>
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
                                全案案例
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

      {/* ================= SECTION 08: 常见问题 (FAQ / 08) ================= */}
      <section 
        id="section-faq" 
        className="py-20 lg:py-24 bg-[#FFFFFF] w-full overflow-hidden border-b border-[#E5E5E5]"
      >
        {/* Title Area - Left aligned */}
        <div className="max-w-[95%] w-full mx-auto relative z-10 mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
                FAQ / 08
              </span>
              <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
                合作前，先把问题说清
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 max-w-md leading-relaxed font-normal">
              围绕服务边界、项目周期和合作方式，提前回答常见决策问题。
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

