import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Plus, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryConsultingPageProps {
  onOpenContactModal: () => void;
  onSelectCase: (cs: CaseStudy) => void;
  CounterComponent: React.FC<{ target: number }>;
}

export default function CategoryConsultingPage({
  onOpenContactModal,
  onSelectCase,
  CounterComponent,
}: CategoryConsultingPageProps) {
  // Accordion state
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. SCROLL-DRIVEN STACKING STATS CARDS TIMELINE
    const statsContainer = statsContainerRef.current;
    let statsCtx: gsap.Context | null = null;

    if (statsContainer) {
      statsCtx = gsap.context(() => {
        const cards = statsContainer.querySelectorAll('.stat-card');
        if (cards.length) {
          const collapsedHeight = 72;
          const overlap = 16;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: statsContainer,
              start: 'top 80px',
              end: `+=${cards.length * 350}`,
              scrub: true,
              pin: true,
              pinSpacing: true,
            }
          });

          cards.forEach((card, i) => {
            const eyebrow = card.querySelector('.stat-eyebrow');
            const label = card.querySelector('.stat-label');
            const details = card.querySelector('.card-details');
            const number = card.querySelector('.stat-number');

            tl.to(card, {
              height: collapsedHeight,
              marginTop: i === 0 ? 0 : -overlap,
              paddingTop: '1rem',
              paddingBottom: '1rem',
              borderRadius: '1rem',
              ease: 'none',
              duration: 1,
            }, i)
            .to([eyebrow, label, details], {
              opacity: 0,
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
              overflow: 'hidden',
              ease: 'none',
              duration: 0.6,
            }, i)
            .to(number, {
              fontSize: '1.75rem',
              ease: 'none',
              duration: 0.6,
            }, i);
          });
        }
      }, statsContainer);
    }

    // 2. PHOTO REVEAL HOOK FOR EXPERIENCE SHOWCASE SECTION
    const showcaseContainer = showcaseRef.current;
    let showcaseCtx: gsap.Context | null = null;

    if (showcaseContainer) {
      showcaseCtx = gsap.context(() => {
        const revealItems = gsap.utils.toArray('.photo-reveal-item');
        revealItems.forEach((item: any) => {
          gsap.fromTo(item,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              }
            }
          );
        });
      }, showcaseContainer);
    }

    return () => {
      if (statsCtx) statsCtx.revert();
      if (showcaseCtx) showcaseCtx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 13 FAQ items
  const faqItems = [
    {
      q: "什么是洛可可的“三品合一”方法论？",
      a: "“三品合一”是洛可可集团历时22年沉淀的核心创新方法论，指将“品类创新（战略定位）”、“产品创新（极致工业设计/结构/体验）”与“品牌创新（视觉IP/营销话语/核心价值）”高度整合。通过三者高度协同，确保企业的战略定位不跑偏，设计能真正落地，品牌有爆发声量，助力企业从品类机会切入，直达商业爆品，成就细分品类冠军。"
    },
    {
      q: "品类创新咨询与传统的管理咨询/品牌咨询相比，核心差异在哪里？",
      a: "传统管理咨询侧重于宏观的财务战略和组织规划，品牌咨询侧重于视觉升级或单纯的营销创意。而洛可可的品类创新咨询是“战略+产品设计+量产落地”的三位一体。我们不仅帮助企业挖掘高成长、红利巨大的细分赛道（定义品类），更凭借自身行业领先的工业设计与供应链闭环能力，直接研发打造出承载该定位的爆品（产品创新）和超级符号（品牌创新），实现“咨询即爆品，落地即增长”。"
    },
    {
      q: "洛可可如何帮助企业在红海或空白市场中寻找新的品类机会？",
      a: "我们通过独创的“品类扫描仪”研究模型，基于用户痛点深挖、竞争对手防御空隙、产业技术革新红利、及政策和消费趋势变化进行全景扫描。我们会深入一线进行海量定量数据分析和深度定性洞察，过滤低天花板赛道，最终定位出一个既具备爆发性增长空间、又符合企业基因与制造壁垒的最佳“黄金细分品类”。"
    },
    {
      q: "品类创新“七步法”具体包含哪些闭环步骤？",
      a: "洛可可品类创新完整闭环包括：1. 洞察并锚定细分品类机会；2. 科学定义核心品类内涵与溢价点；3. 打造标志性的核心爆品（拳头产品设计）；4. 提炼占领心智的品类核心营销话语；5. 构建具辨识度的超级品牌视觉IP系统；6. 整合全域商业渠道与新媒体营销场景；7. 行业咨询专家与主笔设计团队进行“长期战术陪跑”。"
    },
    {
      q: "中小企业或传统制造型企业是否适合启动品类创新咨询？",
      a: "非常适合。传统制造型企业往往面临“有极强制造与代工能力、但无自主高毛利品牌，陷入低价竞争”的瓶颈。中小企业则往往资源受限，无法与头部巨头正面对冲。品类创新正是中小企业和传统制造业“以小博大、破局逆袭”的最优路径。通过精确定位一个高辨识度、低防御力的细分品类，饱和攻击，能够快速成为这个全新赛道的领跑者。"
    },
    {
      q: "洛可可如何保证品类咨询方案能真正上市量产，而不仅仅是纸上谈兵？",
      a: "洛可可是中国首批“国家级工业设计示范企业”，集团内拥有实力雄厚的外观设计师、机械结构工程团队、材料学家及打样测试中心，并在全国拥有强大的柔性制造供应链网络。在进行品类咨询和爆品定义伊始，设计工程和供应链团队就会全程介入。我们在方案阶段就会进行结构可行性、材料工艺难度和目标BOM成本核算评估，确保每一款方案都具备高度的量产上市可行性。"
    },
    {
      q: "“产品创新”在“三品合一”体系中扮演了怎样的角色？",
      a: "产品是品类最本质的硬件载体。没有极致的产品力作为护城河，再惊艳的品类战略和品牌口号也只是无源之水。洛可可产品创新不仅打磨令人惊艳的外观美学，更深入打通人性化的交互体验、先进的结构堆叠、创新的降本材料与人机工程学，让消费者在使用产品的瞬间，直观感知到新品类的核心价值，彻底转化为品牌忠实用户。"
    },
    {
      q: "“品牌创新 0-1 全案咨询”具体包含哪些服务？",
      a: "这是洛可可专门为从0到1孵化的新品牌，或成熟集团开拓新业务线量身定制的无忧管家式服务。具体涵盖：品牌核心定位、品牌专属命名、全套话语表达体系、标志性的超级LOGO及辅助符号视觉系统、高颜值的核心产品线包装设计、品牌视觉规范白皮书以及商业空间体验终端的整体设计，帮助新品牌生来便具备无可争议的主角姿态。"
    },
    {
      q: "洛可可目前主要服务哪些类型的客户？",
      a: "我们的服务涵盖世界500强企业（如诺基亚、西门子、三星、奥迪等）、国内500强行业支柱（如海尔、美的、茅台、青岛啤酒、京东、海底捞等），以及大量在细分行业深耕的中坚腰部企业，和高爆发性成长的行业新星品牌（如小仙炖、悦鲜活、库迪咖啡等）。无论企业处于哪个发展阶段，我们都能量身定制高ROI的创新战略方案。"
    },
    {
      q: "一个典型的品类创新咨询项目合作周期大概有多久？",
      a: "典型的系统化全案合作周期通常在 3 到 6 个月。前期深度用户洞察与品类定位大约需要 4 到 6 周；中期进行标志性爆品的产品设计（外观与结构工程）及超级品牌视觉IP/包装设计大约需要 8 到 12 周；后期开模打样、试产验证与营销话语提炼约需要 4 到 6 周。我们也会提供 12 个月以上的长期专家顾问委员会陪跑，确保成果彻底落地生根。"
    },
    {
      q: "洛可可品类创新咨询的收费模式是怎样的？",
      a: "我们坚持“一案一议”的透明定制化收费标准。收费会依据企业所处的产业赛道复杂度、项目需要覆盖的市场调研深度与广度、工业产品设计的工程研发技术难度、以及所需的供应链配对精度等因素综合合理核算。我们会给出不同层级的方案配置供企业灵活选择，力保每一分创新投入都能创造显著的商业增长溢价。"
    },
    {
      q: "洛可可在品类创新领域累积获得了哪些重磅奖项认证？",
      a: "洛可可是全球公认的创意设计实力灯塔，已累积荣获红点设计奖（Red Dot）、德国iF设计奖、美国IDEA、日本G-Mark、中国工业设计红星奖、台湾金点设计奖等在内的国内外重磅奖项超过 600 项。我们不仅注重美学价值，更将这些设计标准转化为企业在终端市场降维打击的绝对竞争壁垒。"
    },
    {
      q: "如何启动与洛可可创新咨询团队的第一步合作？",
      a: "您只需在页面底部的咨询表单中提交您的联系方式，或直接拨打我们的官方服务专线：400-062-3130。我们的垂直行业总监将在 24 小时内与您直接取得联系，开展深度的一对一线上/线下商业痛点诊断，并在会后免费为您匹配并出具第一版极具针对性的《项目定制建议书框架》。"
    }
  ];

  // Cases list (6 cases)
  const categoryCases: CaseStudy[] = [
    {
      id: 'case-v2-1',
      title: '悦鲜活年轻化产品包装创新咨询设计',
      description: '打造差异化视觉识别，以超瞬时黄金杀菌技术视觉传达，助力新品牌抢占年轻消费乳品高端红利市场。',
      logoType: 'yuexianhuo'
    },
    {
      id: 'case-v2-2',
      title: '良品铺子产品包装创新咨询设计',
      description: '打造高品质健康零食视觉体系与全新品牌超级符号，实现线下连锁走到线上电商全域零食新零售的体验跨越。',
      logoType: 'jingkelong'
    },
    {
      id: 'case-category-3',
      title: '三泉冷面品牌包装创新咨询设计',
      description: '将地道朝鲜族传统冷面进行现代化品类定位重构，用国潮插画与锁鲜结构开启便捷速食消费新风尚。',
      logoType: 'pophie'
    },
    {
      id: 'case-category-4',
      title: '飞鹤茁然品牌&产品包装创新咨询设计',
      description: '锁定儿童配方奶粉全新高增量黄金蓝海赛道，通过森林IP形象设计与锁鲜科技包装，传递天然纯净的生命原力。',
      logoType: 'cotti'
    },
    {
      id: 'case-category-5',
      title: '庐阳城市品牌文创整案创新咨询设计',
      description: '深度解构合肥庐阳千年古城文脉，打造特色超级文创IP矩阵与全场景商业伴手礼，赋能现代都市文旅产业升级。',
      logoType: 'sizherui'
    },
    {
      id: 'case-category-6',
      title: '四川小平故里红色文创产品创新咨询设计',
      description: '开辟兼具时代温度与生活美学的新红色文创品类标杆。融合历史教育场景，研发高品质日常生活好物，传递伟人故里情怀。',
      logoType: 'estun'
    }
  ];

  // Placeholder backgrounds for cases to keep UI high contrast and stylish
  const getPlaceholderBg = (idx: number) => {
    const bgs = [
      'bg-gradient-to-br from-sky-50 to-blue-50/20',
      'bg-gradient-to-br from-red-50 to-orange-50/20',
      'bg-gradient-to-br from-emerald-50 to-teal-50/20',
      'bg-gradient-to-br from-purple-50 to-indigo-50/20',
      'bg-gradient-to-br from-amber-50 to-orange-50/20',
      'bg-gradient-to-br from-rose-50 to-red-50/20',
    ];
    return bgs[idx % bgs.length];
  };

  const getCaseV2Data = (cs: CaseStudy) => {
    switch (cs.id) {
      case 'case-v2-1':
        return { brand: '悦鲜活', title: cs.title, desc: cs.description };
      case 'case-v2-2':
        return { brand: '良品铺子', title: cs.title, desc: cs.description };
      case 'case-category-3':
        return { brand: '三泉冷面', title: cs.title, desc: cs.description };
      case 'case-category-4':
        return { brand: '飞鹤茁然', title: cs.title, desc: cs.description };
      case 'case-category-5':
        return { brand: '庐阳文创', title: cs.title, desc: cs.description };
      case 'case-category-6':
        return { brand: '小平故里', title: cs.title, desc: cs.description };
      default:
        return { brand: '洛可可咨询', title: cs.title, desc: cs.description };
    }
  };

  // Local images matching
  const getCaseImage = (cs: CaseStudy) => {
    if (cs.id === 'case-v2-1') return '/src/assets/images/case_yuexianhuo.jpg';
    if (cs.id === 'case-v2-2') return '/src/assets/images/case_jingkelong.jpg';
    return null;
  };

  return (
    <div className="w-full bg-white">
      
      {/* 1. HERO - QUANTITATIVE STATS SECTION */}
      <section id="category-hero" className="py-16 md:py-24 text-center bg-radial from-neutral-50/70 via-neutral-50/30 to-white relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono">CATEGORY INNOVATION STRATEGY</span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-[76px] font-black tracking-tight text-neutral-900 leading-[1.1] font-display"
          >
            <span className="text-[#007BC7]">三品合一</span>
            <span className="text-neutral-900"> · </span>
            <span className="text-[#1a1a1a]">品类冠军</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-neutral-400 uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-neutral-500 max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            洛可可独创“三品合一”系统化创新路径，高度整合品类、产品与品牌三重维度，从顶层商业战略到爆品落地研发。我们不仅帮助企业寻找并确立高增长的黄金细分品类赛道，更通过极致设计力、颠覆性技术整合与超级品牌IP化包装，重塑产品溢价与核心话语权，协助大中型制造企业与高成长新锐品牌跨越增长周期，致力于成为细分赛道的品类霸主。
          </p>

          <div className="mt-8">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
            >
              联系我们
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* 1.5 SCROLL-DRIVEN OVERLAPPING STATS CARDS */}
      <section id="category-stats-scroll" className="w-full bg-[#fafafa] py-16 lg:py-24">
        
        {/* Section header to give context when cards are stacking */}
        <div className="text-center mb-12 px-6">
          <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">LKK BRAND INTEGRITY</span>
          <h3 className="text-2xl md:text-3xl font-black text-neutral-900 mt-1 font-display">
            洛可可品牌创新实力数据
          </h3>
        </div>

        <div className="stat-cards-section flex flex-col gap-6" ref={statsContainerRef}>
          {/* Card 1 */}
          <div 
            className="stat-card stat-card-1 bg-sky-50 border border-sky-100 text-neutral-900"
            style={{ zIndex: 10 }}
          >
            <span className="stat-eyebrow text-[10px] uppercase font-bold text-sky-500 tracking-wider bg-white px-2.5 py-1 rounded-full border border-sky-100/50 font-mono">
              Since 2004
            </span>
            <div className="stat-card-header">
              <span className="stat-number font-black text-[#007BC7] font-display">
                <CounterComponent target={22} />
              </span>
              <span className="stat-label font-bold text-[#005F96]">年行业深耕</span>
            </div>
            <div className="card-details">
              <h4 className="text-sm lg:text-base font-bold text-neutral-800">中国工业设计与战略咨询拓荒者</h4>
              <p className="text-xs lg:text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-2xl">
                22年潜心探索，深度服务各领域龙头及创新品牌，沉淀出行业领先的“三品合一”战略咨询与爆品打造方法论，助力中国制造向中国品牌跃迁。
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="stat-card stat-card-2 bg-emerald-50 border border-emerald-100 text-neutral-900"
            style={{ zIndex: 20 }}
          >
            <span className="stat-eyebrow text-[10px] uppercase font-bold text-emerald-500 tracking-wider bg-white px-2.5 py-1 rounded-full border border-emerald-100/50 font-mono">
              Design Awards
            </span>
            <div className="stat-card-header">
              <span className="stat-number font-black text-emerald-600 font-display flex items-baseline">
                <CounterComponent target={600} /><span className="text-2xl font-light -translate-y-0.5 ml-0.5">+</span>
              </span>
              <span className="stat-label font-bold text-emerald-800">创意设计大奖</span>
            </div>
            <div className="card-details">
              <h4 className="text-sm lg:text-base font-bold text-neutral-800">荣获红点、iF、IDEA等国际顶尖大奖</h4>
              <p className="text-xs lg:text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-2xl">
                揽获德国红点奖、德国iF设计奖、美国IDEA、日本G-Mark等国内外重量级设计大奖超600项。我们用国际一流水准的创意美学，为每一个战略新品类构筑起坚实的心智护城河。
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="stat-card stat-card-3 bg-amber-50 border border-amber-100 text-neutral-900"
            style={{ zIndex: 30 }}
          >
            <span className="stat-eyebrow text-[10px] uppercase font-bold text-amber-500 tracking-wider bg-white px-2.5 py-1 rounded-full border border-amber-100/50 font-mono">
              Trusted Clients
            </span>
            <div className="stat-card-header">
              <span className="stat-number font-black text-amber-600 font-display flex items-baseline">
                <CounterComponent target={1000} /><span className="text-2xl font-light -translate-y-0.5 ml-0.5">+</span>
              </span>
              <span className="stat-label font-bold text-amber-800">品牌客户挚信</span>
            </div>
            <div className="card-details">
              <h4 className="text-sm lg:text-base font-bold text-neutral-800">500强与高增长新锐品牌的一致选择</h4>
              <p className="text-xs lg:text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-2xl">
                服务涵盖世界500强企业、国内头部大型企业（如海尔、美的、茅台、西门子、奥迪等），以及众多新锐爆品赛道开创者，共同见证品类爆品从0到1、从1到100的卓越跃升。
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            className="stat-card stat-card-4 bg-neutral-900 border border-neutral-800 text-white"
            style={{ zIndex: 40 }}
          >
            <span className="stat-eyebrow text-[10px] uppercase font-bold text-[#007BC7] tracking-wider bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700 font-mono">
              Market Success
            </span>
            <div className="stat-card-header">
              <span className="stat-number font-black text-[#007BC7] font-display flex items-baseline">
                <CounterComponent target={10000} /><span className="text-2xl font-light -translate-y-0.5 ml-0.5">+</span>
              </span>
              <span className="stat-label font-bold text-neutral-200">成功上市产品</span>
            </div>
            <div className="card-details">
              <h4 className="text-sm lg:text-base font-bold text-neutral-100">强大的供应链护航与极致的落地量产</h4>
              <p className="text-xs lg:text-[13px] text-neutral-400 mt-2 leading-relaxed max-w-2xl">
                我们不仅定位品类与设计产品，更能深度链接全球柔性制造供应链网络，打通打样、开模、材料测试到量产交货全闭环。真正做到“咨询战略即爆品，方案出炉即量产”。
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 2. SERVICES - THREE CARD SERVICE AREA */}
      <section id="category-services" className="py-20 bg-neutral-50 px-6 border-b border-neutral-100">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Expertise</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
                <span className="char char-black">专</span><span className="char char-black">业</span><span className="char char-black">服</span><span className="char char-black">务</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-md mt-4 md:mt-0 leading-relaxed">
              我们依托于核心的“战略定位+整合研发设计”闭环服务能力，提供从品类、产品、到品牌的高爆发全案咨询。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-150 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="h-64 relative overflow-hidden bg-neutral-100">
                <img 
                  src="/src/assets/images/lkk_cosmetics_jars_1783302947995.jpg" 
                  alt="品类咨询" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-neutral-800 px-3 py-1 rounded-full border border-neutral-200 uppercase tracking-wider font-mono">
                  Category Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#005F96] transition-colors mb-4">
                    品类咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['品类竞争咨询', '品类机会咨询', '品类定义咨询', '品类商业化咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-neutral-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-150 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="h-64 relative overflow-hidden bg-neutral-100">
                <img 
                  src="/src/assets/images/lkk_humanoid_robot_1783302961282.jpg" 
                  alt="产品咨询" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-neutral-800 px-3 py-1 rounded-full border border-neutral-200 uppercase tracking-wider font-mono">
                  Product Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#005F96] transition-colors mb-4">
                    产品咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['产品定义咨询', '产品线规划咨询', '产品家族化咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-neutral-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-150 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="h-64 relative overflow-hidden bg-neutral-100">
                <img 
                  src="/src/assets/images/lkk_coffee_mockup_1783302972120.jpg" 
                  alt="品牌咨询" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-neutral-800 px-3 py-1 rounded-full border border-neutral-200 uppercase tracking-wider font-mono">
                  Brand Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#005F96] transition-colors mb-4">
                    品牌咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['品牌定位咨询', '品牌话语咨询', '品牌营销咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-neutral-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 洛可可实战中不断总结的经验板块 - EXPERIENCE SHOWCASE */}
      {/* 洛可可实战中不断总结的经验板块 - EXPERIENCE SHOWCASE */}
      <section 
        id="experience-showcase" 
        ref={showcaseRef}
        className="py-24 bg-neutral-950 text-white border-b border-neutral-800"
      >
        <div className="max-w-[95%] w-full mx-auto px-6 mb-20 text-center">
          <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">LKK PRACTICE EXPERIENCE</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2 font-display">
            洛可可实战中不断总结的经验
          </h2>
          <p className="text-sm text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed">
            22年深耕品类创新，沉淀出系统化的战略咨询原理与方法论，帮助客户定义品类，直达爆品。
          </p>
        </div>

        <div className="photo-reveal-group max-w-[85%] w-full mx-auto flex flex-col gap-32">
          
          {/* Panel 1: 品类创新解决方案 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left Photo Reveal Item */}
            <div className="photo-reveal-item w-full md:w-1/2 aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-neutral-800 shrink-0">
              <img 
                src="/src/assets/images/lkk_cosmetics_jars_1783302947995.jpg" 
                alt="品类创新解决方案" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">PART 01</span>
                <h3 className="text-xl font-bold text-white mt-1">品类创新解决方案</h3>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-[#007BC7] text-xs font-bold uppercase tracking-[0.25em] mb-3 block font-mono">
                洛可可为客户提供的价值
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 font-display tracking-tight">
                品类创新解决方案
              </h3>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {/* Card 1 */}
                <div className="bg-neutral-900/60 border border-neutral-800/60 p-5 rounded-2xl flex items-center gap-4 hover:border-[#007BC7]/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center font-bold text-xs shrink-0">01</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">为中小企业</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">在竞争内卷中寻找创新增长机会</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-neutral-900/60 border border-neutral-800/60 p-5 rounded-2xl flex items-center gap-4 hover:border-[#007BC7]/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center font-bold text-xs shrink-0">02</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">为大型企业</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">探索第二增长曲线</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-neutral-900/60 border border-neutral-800/60 p-5 rounded-2xl flex items-center gap-4 hover:border-[#007BC7]/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center font-bold text-xs shrink-0">03</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">为技术型企业</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">提供新品类商品化解决方案</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: 三品合一原理 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            {/* Right Photo Reveal Item */}
            <div className="photo-reveal-item w-full md:w-1/2 aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-neutral-800 shrink-0">
              <img 
                src="/src/assets/images/lkk_humanoid_robot_1783302961282.jpg" 
                alt="三品合一原理" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">PART 02</span>
                <h3 className="text-xl font-bold text-white mt-1">三品合一原理</h3>
              </div>
            </div>

            {/* Left Content with SVG Diagram */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-[0.2em] font-mono mb-2">Core Theory</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display mb-3">
                三品合一
              </h3>
              <p className="text-md text-[#007BC7] font-semibold mb-4">
                是构建品类创新增长的原理
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                洛可可三品合一将品类定位（找准赛道）、产品创新（极致工业设计与结构堆叠）和品牌创新（打造心智超级符号）进行有机融合，从源头降低企业的战略决策和执行磨损成本。
              </p>

              {/* Triangle Diagram Container */}
              <div className="relative w-full max-w-[360px] aspect-[4/3] bg-neutral-900/50 p-4 rounded-3xl border border-neutral-800/60 select-none">
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                  {/* Outer lines */}
                  <line x1="200" y1="45" x2="65" y2="245" stroke="#007BC7" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="200" y1="45" x2="335" y2="245" stroke="#007BC7" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="65" y1="245" x2="335" y2="245" stroke="#007BC7" strokeWidth="2" strokeDasharray="5 5" />
                  
                  {/* Center lines */}
                  <line x1="200" y1="45" x2="200" y2="160" stroke="#007BC7" strokeWidth="1.5" />
                  <line x1="65" y1="245" x2="200" y2="160" stroke="#007BC7" strokeWidth="1.5" />
                  <line x1="335" y1="245" x2="200" y2="160" stroke="#007BC7" strokeWidth="1.5" />
                </svg>

                {/* Top Node */}
                <div className="absolute top-[45px] left-[200px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-neutral-900 border border-[#007BC7] rounded-full flex flex-col items-center justify-center shadow-md">
                  <span className="text-[#007BC7] font-black text-xs">品类</span>
                  <span className="text-[8px] text-neutral-400 font-mono tracking-wider">CATEGORY</span>
                </div>

                {/* Bottom Left Node */}
                <div className="absolute top-[245px] left-[65px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-neutral-900 border border-[#007BC7] rounded-full flex flex-col items-center justify-center shadow-md">
                  <span className="text-[#007BC7] font-black text-xs">产品</span>
                  <span className="text-[8px] text-neutral-400 font-mono tracking-wider">PRODUCT</span>
                </div>

                {/* Bottom Right Node */}
                <div className="absolute top-[245px] left-[335px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-neutral-900 border border-[#007BC7] rounded-full flex flex-col items-center justify-center shadow-md">
                  <span className="text-[#007BC7] font-black text-xs">品牌</span>
                  <span className="text-[8px] text-neutral-400 font-mono tracking-wider">BRAND</span>
                </div>

                {/* Center Node */}
                <div className="absolute top-[160px] left-[200px] -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-neutral-800 border border-[#007BC7] rounded-full flex flex-col items-center justify-center shadow-lg ring-4 ring-[#007BC7]/10">
                  <span className="text-white font-bold text-xs mb-0.5">用户欲求</span>
                  <span className="text-[8px] text-neutral-400 font-mono tracking-wider uppercase">DESIRE</span>
                </div>

                {/* Labels */}
                <div className="absolute top-[135px] left-[110px] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-neutral-300 px-1.5 py-0.5 rounded shadow-sm">
                  方案
                </div>
                <div className="absolute top-[135px] left-[290px] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-neutral-300 px-1.5 py-0.5 rounded shadow-sm">
                  价值
                </div>
                <div className="absolute top-[260px] left-[200px] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-neutral-300 px-2 py-0.5 rounded shadow-sm">
                  价值交易
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: 认知行价值框架 */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left Photo Reveal Item */}
            <div className="photo-reveal-item w-full md:w-1/2 aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-neutral-800 shrink-0">
              <img 
                src="/src/assets/images/lkk_coffee_mockup_1783302972120.jpg" 
                alt="认知行价值框架" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">PART 03</span>
                <h3 className="text-xl font-bold text-white mt-1">认知行价值框架</h3>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-[0.2em] font-mono mb-2">Methodology</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display mb-6">
                品类创新方法论——认知行价值框架
              </h3>

              {/* Process Flow */}
              <div className="flex items-center gap-3 mb-6 bg-neutral-900/40 p-4 rounded-2xl border border-neutral-800/50 w-full max-w-[400px]">
                <div className="flex flex-col items-center bg-[#007BC7]/20 border border-[#007BC7]/40 px-3 py-1 rounded-xl">
                  <span className="text-sm font-black text-[#007BC7]">认</span>
                  <span className="text-[8px] text-neutral-400 uppercase font-mono">Identify</span>
                </div>
                <span className="text-neutral-600">→</span>
                <div className="flex flex-col items-center bg-[#007BC7]/20 border border-[#007BC7]/40 px-3 py-1 rounded-xl">
                  <span className="text-sm font-black text-[#007BC7]">知</span>
                  <span className="text-[8px] text-neutral-400 uppercase font-mono">Know</span>
                </div>
                <span className="text-neutral-600">→</span>
                <div className="flex flex-col items-center bg-[#007BC7]/20 border border-[#007BC7]/40 px-3 py-1 rounded-xl">
                  <span className="text-sm font-black text-[#007BC7]">行</span>
                  <span className="text-[8px] text-neutral-400 uppercase font-mono">Action</span>
                </div>
                <span className="text-neutral-600">→</span>
                <div className="flex flex-col items-center bg-[#007BC7] px-4 py-1 rounded-xl shadow-md">
                  <span className="text-sm font-black text-white">价值</span>
                  <span className="text-[8px] text-white/80 uppercase font-mono">Value</span>
                </div>
              </div>

              {/* Diagrams Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-[440px]">
                <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800/60 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-neutral-400 mb-2">业务取舍：三圆维恩图</span>
                  <div className="relative w-40 h-36 scale-90 select-none">
                    <div className="absolute top-1 left-2 w-20 h-20 rounded-full bg-[#007BC7]/15 border border-[#007BC7]/30 flex flex-col items-center justify-center">
                      <span className="text-[#007BC7] font-black text-[10px]">想做</span>
                    </div>
                    <div className="absolute top-1 right-2 w-20 h-20 rounded-full bg-neutral-800 border border-neutral-700 flex flex-col items-center justify-center">
                      <span className="text-neutral-300 font-black text-[10px]">可做</span>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#007BC7]/5 border border-[#007BC7]/15 flex flex-col items-center justify-center">
                      <span className="text-neutral-400 font-black text-[10px]">能做</span>
                    </div>
                    <div className="absolute top-[45px] left-1/2 -translate-x-1/2 bg-white text-neutral-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md z-10">
                      该做
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800/60 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-neutral-400 mb-2">三品体系联动</span>
                  <div className="relative w-40 h-36 scale-[0.8] select-none">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 160">
                      <line x1="100" y1="20" x2="30" y2="130" stroke="#007BC7" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="100" y1="20" x2="170" y2="130" stroke="#007BC7" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="30" y1="130" x2="170" y2="130" stroke="#007BC7" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                    <div className="absolute top-[20px] left-[100px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 border border-[#007BC7] rounded-full flex items-center justify-center">
                      <span className="text-[#007BC7] font-bold text-[8px]">品类</span>
                    </div>
                    <div className="absolute top-[130px] left-[30px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 border border-[#007BC7] rounded-full flex items-center justify-center">
                      <span className="text-[#007BC7] font-bold text-[8px]">产品</span>
                    </div>
                    <div className="absolute top-[130px] left-[170px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 border border-[#007BC7] rounded-full flex items-center justify-center">
                      <span className="text-[#007BC7] font-bold text-[8px]">品牌</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 4: 爆品价值循环 + 品牌营销杠杆 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            {/* Right Photo Reveal Item */}
            <div className="photo-reveal-item w-full md:w-1/2 aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-neutral-800 shrink-0">
              <img 
                src="/src/assets/images/lkk_hero_banner_1783412912488.jpg" 
                alt="爆品价值循环" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                <span className="text-xs font-bold text-[#007BC7] uppercase tracking-wider font-mono">PART 04</span>
                <h3 className="text-xl font-bold text-white mt-1">爆品价值与营销杠杆</h3>
              </div>
            </div>

            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-[0.2em] font-mono mb-2">Growth Engine</span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display mb-6">
                爆品价值循环 + 品牌营销杠杆
              </h3>

              <div className="grid grid-cols-1 gap-4 w-full max-w-[440px]">
                {/* Value Cycle Diagram Card */}
                <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800/60">
                  <span className="text-[10px] font-bold text-neutral-400 mb-3 block uppercase tracking-wider">五维爆品价值循环</span>
                  <div className="flex flex-wrap gap-2">
                    {['废品', '作品', '制品', '商品', '用品'].map((lbl, idx) => (
                      <div key={idx} className="bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded-lg flex flex-col items-center">
                        <span className="text-[10px] font-bold text-white">{lbl}</span>
                        <span className="text-[7px] text-neutral-400 font-mono">VALUE</span>
                      </div>
                    ))}
                    <div className="bg-[#007BC7] px-2.5 py-1 rounded-lg flex flex-col items-center shadow-md">
                      <span className="text-[10px] font-bold text-white">爆品价值</span>
                      <span className="text-[7px] text-white/80 font-mono">CORE</span>
                    </div>
                  </div>
                </div>

                {/* Lever Diagram Card */}
                <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800/60">
                  <span className="text-[10px] font-bold text-neutral-400 mb-2 block uppercase tracking-wider">品牌营销杠杆示意</span>
                  <div className="flex items-center justify-between bg-neutral-800/80 p-3 rounded-xl border border-neutral-700/50">
                    <span className="text-xs font-bold text-white">品牌营销杠杆 (撬动心智距离)</span>
                    <span className="text-[10px] font-bold text-white bg-[#007BC7] px-2.5 py-0.5 rounded-full shadow-sm">极致定位</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CASES - GRID WORK REUSING HOMEPAGE DESIGN SYSTEM (3 COLUMNS x 2 ROWS) - RENAME TO 案例锦集 */}
      <section id="category-cases" className="py-20 bg-neutral-50 px-6 border-b border-neutral-100">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Portfolios</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
                <span className="char char-black">案</span><span className="char char-black">例</span><span className="char char-black">锦</span><span className="char char-black">集</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm mt-4 md:mt-0">
              洛可可战略咨询助力以下领军企业，成功实现颠覆性品类战略突围与超级爆品打造。
            </p>
          </div>

          <div className="case-grid-v2">
            {categoryCases.map((cs, idx) => {
              const v2Data = getCaseV2Data(cs);
              const imgSource = getCaseImage(cs);
              return (
                <button 
                  key={cs.id}
                  onClick={() => onSelectCase(cs)}
                  className="case-card-v2 block relative text-left w-full outline-none select-none overflow-hidden"
                >
                  {imgSource ? (
                    <img 
                      src={imgSource} 
                      alt={cs.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className={`w-full h-full flex items-center justify-center p-6 ${getPlaceholderBg(idx)}`}
                    >
                      <span className="text-xs font-extrabold text-[#007BC7] tracking-wider text-center uppercase font-mono">
                        {v2Data.brand} SPECIAL CASE
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay text detail block */}
                  <div className="case-summary-v2">
                    <div className="case-brand-label">{v2Data.brand}</div>
                    
                    <div className="case-detail-arrow">
                      <span>案例简介</span><span>↗</span>
                    </div>
                    
                    <div className="case-bottom-block">
                      <div className="case-divider">-</div>
                      <div className="case-title">{v2Data.title}</div>
                      <div className="case-desc">{v2Data.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FAQ - NEW CORE ACCORDION SECTION */}
      <section 
        id="category-faq" 
        className="py-20 bg-white w-full overflow-hidden"
      >
        {/* Title Area - Centered */}
        <div className="max-w-[85%] lg:max-w-[70%] w-full mx-auto px-6 relative z-10 mb-16">
          <div className="text-center">
            <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">FAQ</span>
            <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
              <span className="char char-black">成</span><span className="char char-black">功</span><span className="char char-black">路</span><span className="char char-black">径</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-3 max-w-xl mx-auto leading-relaxed">
              关于洛可可“三品合一”战略咨询与爆品落地全流程，解答您关心的一切核心诉求。
            </p>
          </div>
        </div>

        {/* Full-width List Container */}
        <div className="flex flex-col border-t border-neutral-150 w-full">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="w-full border-b border-[#E5E5E5] relative overflow-hidden group"
              >
                {/* Sliding background overlay from left to right */}
                <div 
                  className="absolute inset-0 bg-[#007bc7] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 pointer-events-none"
                  style={{
                    clipPath: isOpen 
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
                      : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
                  }}
                />

                {/* Centered item content */}
                <div className="max-w-[85%] lg:max-w-[70%] w-full mx-auto px-6 py-6 flex flex-col text-left relative z-10">
                  {/* Question header */}
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex items-center justify-between gap-6 text-left w-full group py-1 relative z-10 outline-none"
                  >
                    <span className={`text-[15px] font-bold font-sans transition-colors duration-500 ${isOpen ? 'text-white' : 'text-[#1A1A1A] group-hover:text-[#007BC7]'}`}>
                      {item.q}
                    </span>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-white/20 text-white rotate-45 shadow-sm' : 'bg-neutral-50 text-neutral-400 group-hover:bg-[#E5F2FA] group-hover:text-[#007BC7]'}`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Answer slide transitions */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className={`text-xs leading-relaxed pt-4 pb-1 text-left font-normal max-w-4xl text-balance transition-colors duration-500 ${isOpen ? 'text-neutral-100' : 'text-[#4D4D4D]'}`}>
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
