import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryConsultingPageProps {
  onOpenContactModal: () => void;
  onSelectCase: (cs: CaseStudy) => void;
  CounterComponent: React.FC<{ target: number }>;
}

interface ExperienceCardProps {
  title: string;
  imgSrc: string;
}

function ExperienceCard({ title, imgSrc }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: hover)').matches === false) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 3; // 倾斜幅度减弱70%，倾斜更克制细腻

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    card.style.transition = 'transform 0.15s ease-out';
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.006)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="experience-card relative w-full aspect-[16/9.2] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-pointer"
        style={{
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.025), 0 6px 16px rgba(0, 0, 0, 0.038)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function CategoryConsultingPage({
  onOpenContactModal,
  onSelectCase,
  CounterComponent,
}: CategoryConsultingPageProps) {
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. SCROLL-DRIVEN STACKING STATS CARDS TIMELINE
    const statsContainer = statsContainerRef.current;
    let statsCtx: gsap.Context | null = null;

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    if (statsContainer) {
      statsCtx = gsap.context(() => {
        const cards = statsContainer.querySelectorAll('.stat-card');
        if (cards.length) {
          const collapsedHeight = 108;
          const overlap = 52;

          const tl = gsap.timeline({ paused: true });

          cards.forEach((card, i) => {
            const eyebrow = card.querySelector('.stat-eyebrow');
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
            .to([eyebrow, details], {
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
              fontSize: '32px',
              ease: 'none',
              duration: 0.6,
            }, i);
          });

          const totalDuration = tl.duration();

          const pullSpacer = statsContainer.parentElement?.querySelector('.stats-bottom-pull-spacer');
          if (pullSpacer) {
            tl.to(pullSpacer, {
              marginTop: () => {
                const currentInitialHeight = statsContainer.offsetHeight;
                const currentFoldedHeight = 348;
                const heightDiff = Math.max(0, currentInitialHeight - currentFoldedHeight);
                return -heightDiff;
              },
              ease: 'none',
              duration: totalDuration,
            }, 0);
          }

          const pxPerSecond = 300;
          const scrollDistance = totalDuration * pxPerSecond;

          ScrollTrigger.create({
            trigger: statsContainer,
            start: 'top 80px',
            end: `+=${scrollDistance}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            animation: tl,
          });

          ScrollTrigger.refresh();
        }
      }, statsContainer);
    }

    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };
    const loadedImages = document.querySelectorAll('img');
    loadedImages.forEach((img) => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    return () => {
      if (statsCtx) statsCtx.revert();
      window.removeEventListener('load', handleWindowLoad);
      loadedImages.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
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
        <div className="max-w-4xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
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

      {/* 1.5 QUANTIFIED ACHIEVEMENTS - GLASSMORPHISM CARDS SECTION */}
      <section className="achievement-section">
        <div className="max-w-[95%] w-full mx-auto">
          <div className="achievement-grid">
            {/* Card 1: 22 年行业经验积淀 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={22} />
              </div>
              <div className="achievement-label">年行业经验积淀</div>
            </div>

            {/* Card 2: 600+ 专业奖项认证 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={600} />+
              </div>
              <div className="achievement-label">专业奖项认证</div>
            </div>

            {/* Card 3: 1000+ 行业头部客户认可 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={1000} />+
              </div>
              <div className="achievement-label">行业头部客户认可</div>
            </div>

            {/* Card 4: 10000+ 产品成功落地 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <CounterComponent target={10000} />+
              </div>
              <div className="achievement-label">产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES - THREE CARD SERVICE AREA */}
      <section id="category-services" className="py-20 bg-[#F0F0F0]/50 border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Expertise</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-[#1a1a1a] mt-2 font-display">
                <span className="char char-black">专</span><span className="char char-black">业</span><span className="char char-black">服</span><span className="char char-black">务</span>
              </h2>
            </div>
            <p className="text-sm text-[#4D4D4D] max-w-md mt-4 md:mt-0 leading-relaxed">
              我们依托于核心的“战略定位+整合研发设计”闭环服务能力，提供从品类、产品、到品牌的高爆发全案咨询。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
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
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1a1a1a] px-3 py-1 rounded-full border border-[#E5E5E5] uppercase tracking-wider font-mono">
                  Category Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-[#005F96] transition-colors mb-4 font-display">
                    品类咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['品类竞争咨询', '品类机会咨询', '品类定义咨询', '品类商业化咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#4D4D4D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs text-[#8C8C8C] font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-[#8C8C8C] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
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
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1a1a1a] px-3 py-1 rounded-full border border-[#E5E5E5] uppercase tracking-wider font-mono">
                  Product Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-[#005F96] transition-colors mb-4 font-display">
                    产品咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['产品定义咨询', '产品线规划咨询', '产品家族化咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#4D4D4D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs text-[#8C8C8C] font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-[#8C8C8C] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
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
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#1a1a1a] px-3 py-1 rounded-full border border-[#E5E5E5] uppercase tracking-wider font-mono">
                  Brand Consulting
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-[#005F96] transition-colors mb-4 font-display">
                    品牌咨询
                  </h3>
                  <ul className="grid gap-2.5">
                    {['品牌定位咨询', '品牌话语咨询', '品牌营销咨询'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#4D4D4D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs text-[#8C8C8C] font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                    立即对接
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-[#8C8C8C] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>



      {/* 3.5 EXPERIENCE SHOWCASE - VERTICAL STACK WITH 3D TILT */}
      <section id="category-insights" className="py-20 bg-[#F0F0F0]/40 w-full border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
              LKK PRACTICAL INSIGHTS
            </span>
            <h2 className="section-title scroll-reveal-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1a1a1a] font-display">
              洛可可实战中不断总结的经验
            </h2>
          </div>

          {/* Vertical Stack of Experience Cards */}
          <div className="flex flex-col gap-10 md:gap-12">
            <ExperienceCard
              title="品类创新解决方案"
              imgSrc="https://github.com/minaxyue-ops/MINA/releases/download/1/6a2b8143e8473.png"
            />
            <ExperienceCard
              title="三品合一价值金三角"
              imgSrc="https://github.com/minaxyue-ops/MINA/releases/download/1/6a2b814def24e.png"
            />
            <ExperienceCard
              title="认知行商业落地方法"
              imgSrc="https://github.com/minaxyue-ops/MINA/releases/download/1/6a38f79e8d827.png"
            />
            <ExperienceCard
              title="爆品价值与营销杠杆"
              imgSrc="https://github.com/minaxyue-ops/MINA/releases/download/1/6a38f7a93ef1d.png"
            />
          </div>
        </div>
      </section>

      {/* 3. CASES - GRID WORK REUSING HOMEPAGE DESIGN SYSTEM (3 COLUMNS x 2 ROWS) - RENAME TO 案例锦集 */}
      <section id="category-cases" className="py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Portfolios</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-[#1a1a1a] mt-2 font-display">
                <span className="char char-black">案</span><span className="char char-black">例</span><span className="char char-black">锦</span><span className="char char-black">集</span>
              </h2>
            </div>
            <p className="text-sm text-[#4D4D4D] max-w-sm mt-4 md:mt-0">
              洛可可战略咨询助力以下领军企业，成功实现颠覆性品类战略突围与超级爆品打造。
            </p>
          </div>

          <div className="case-grid-v2">
            {categoryCases.map((cs, idx) => {
              const v2Data = getCaseV2Data(cs);
              const imgSource = getCaseImage(cs);
              return (
                <a 
                  key={cs.id}
                  href={`/cases/${cs.id}`}
                  className="case-card-v2 block relative text-left w-full outline-none select-none overflow-hidden text-decoration-none"
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
                    
                    <button 
                      type="button"
                      className="case-detail-arrow cursor-pointer border-none"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelectCase(cs);
                      }}
                      aria-label="查看案例简介"
                    >
                      <span>案例简介</span><span>↗</span>
                    </button>
                    
                    <div className="case-bottom-block">
                      <div className="case-divider">-</div>
                      <div className="case-title">{v2Data.title}</div>
                      <div className="case-desc">{v2Data.desc}</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FAQ - SUCCESS PATH SECTION */}
      <section 
        id="category-faq" 
        className="py-20 bg-white w-full overflow-hidden border-b border-[#E5E5E5]"
      >
        {/* Title Area - Centered */}
        <div className="max-w-[85%] lg:max-w-[70%] w-full mx-auto px-6 relative z-10 mb-12">
          <div className="text-center">
            <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">FAQ</span>
            <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-[#1a1a1a] mt-2 font-display">
              <span className="char char-black">成</span><span className="char char-black">功</span><span className="char char-black">路</span><span className="char char-black">径</span>
            </h2>
            <p className="text-sm text-[#8C8C8C] mt-3 max-w-xl mx-auto leading-relaxed">
              关于洛可可“三品合一”战略咨询与爆品落地全流程，解答您关心的一切核心诉求。
            </p>
          </div>
        </div>

        {/* Full-width List Container */}
        <div className="flex flex-col border-t border-[#E5E5E5] w-full">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="w-full border-b border-[#E5E5E5]"
            >
              {/* Centered item content */}
              <div className="max-w-[85%] lg:max-w-[70%] w-full mx-auto px-6 py-6 flex flex-col text-left group">
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

      {/* 5. CLIENTS - SERVICE CLIENTS SECTION */}
      <section id="category-clients" className="py-20 md:py-24 bg-white w-full border-b border-[#E5E5E5]">
        <div className="max-w-[95%] w-full mx-auto relative z-10 text-center">
          <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
            OUR CLIENTS
          </span>
          <h2 className="section-title scroll-reveal-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1a1a] mb-12 font-display">
            服务客户
          </h2>
          <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-[#E5E5E5] bg-[#F0F0F0]">
            <img 
              src="https://github.com/minaxyue-ops/MINA/releases/download/1/fuwukehu1.jpg" 
              alt="服务客户" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
