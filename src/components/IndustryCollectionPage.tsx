import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface IndustryItem {
  id: string;
  name: string;
  image: string;
  detailUrl: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'industrial-equipment',
    name: '工业装备',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/aisidun.jpg',
    detailUrl: '/industry/industrial-equipment'
  },
  {
    id: 'robotics',
    name: '机器人',
    image: '/src/assets/images/lkk_humanoid_robot_1783302961282.jpg',
    detailUrl: '/industry/robotics'
  },
  {
    id: 'new-energy',
    name: '新能源',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.39.png',
    detailUrl: '/industry/new-energy'
  },
  {
    id: 'home-appliances',
    name: '家居家电',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/xiaozhi.jpg',
    detailUrl: '/industry/home-appliances'
  },
  {
    id: 'smart-3c',
    name: '智能3C',
    image: '/src/assets/images/lkk_coffee_mockup_1783302972120.jpg',
    detailUrl: '/industry/smart-3c'
  },
  {
    id: 'healthcare',
    name: '医疗健康',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/sizherui.jpg',
    detailUrl: '/industry/healthcare'
  },
  {
    id: 'food-beverage',
    name: '食品酒饮',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif',
    detailUrl: '/industry/food-beverage'
  },
  {
    id: 'retail',
    name: '连锁零售',
    image: '/src/assets/images/case_jingkelong.jpg',
    detailUrl: '/industry/retail'
  },
  {
    id: 'beauty-personal-care',
    name: '美妆个护',
    image: '/src/assets/images/lkk_cosmetics_jars_1783302947995.jpg',
    detailUrl: '/industry/beauty-personal-care'
  },
  {
    id: 'cultural-creative',
    name: '文化创意',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg',
    detailUrl: '/industry/cultural-creative'
  },
  {
    id: 'pet-economy',
    name: '宠物经济',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png',
    detailUrl: '/industry/pet-economy'
  },
  {
    id: 'transportation',
    name: '交通工具',
    image: 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.37.png',
    detailUrl: '/industry/transportation'
  }
];

const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let start = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={elementRef}>{count}</span>;
};

interface IndustryCollectionPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (detailUrl: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

export default function IndustryCollectionPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent,
}: IndustryCollectionPageProps) {

  const ActiveCounter = CounterComponent || DefaultCounter;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    if (onNavigateDetail) {
      onNavigateDetail(url);
    }
  };

  return (
    <div className="w-full bg-white text-[#1a1a1a] transition-colors">
      
      {/* SCOPED STYLES FOR INDUSTRY CARDS GRID & CORNER BADGE HOVER ANIMATION */}
      <style>{`
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .industry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .industry-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        .industry-card {
          position: relative;
          display: block;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          background: #000000;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
        }

        @media (hover: hover) {
          .industry-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px -8px rgba(0, 123, 199, 0.25);
          }
        }

        .industry-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;
        }

        @media (hover: hover) {
          .industry-card:hover .industry-card-img {
            transform: scale(1.06);
            filter: brightness(0.9);
          }
        }

        /* 底部渐变暗影与文字标签 */
        .industry-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.15) 45%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        .industry-card-label {
          position: absolute;
          left: 18px;
          bottom: 18px;
          color: #FFFFFF;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          z-index: 2;
          font-family: var(--font-display, inherit);
        }

        /* 阶段二：右上角"撕角"/扇形蓝色色块 (#007BC7) */
        .industry-card-badge {
          position: absolute;
          top: 0;
          right: 0;
          width: 88px;
          height: 88px;
          background: #007BC7;
          border-bottom-left-radius: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 14px 14px 0 0;
          transform: scale(0);
          transform-origin: top right;
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
          z-index: 5;
          pointer-events: none;
        }

        @media (hover: hover) {
          .industry-card:hover .industry-card-badge {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* 阶段三：色块内部白色箭头，延迟0.15s淡入淡出 */
        .industry-card-badge svg {
          width: 30px;
          height: 30px;
          stroke: #FFFFFF;
          stroke-width: 2.8;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.2s ease 0.15s, transform 0.2s ease 0.15s;
        }

        @media (hover: hover) {
          .industry-card:hover .industry-card-badge svg {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* 1. HERO - QUANTITATIVE STATS SECTION (REUSED FROM CATEGORY CONSULTING HERO) */}
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

          <div className="mt-8 flex items-center justify-center gap-4">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer border-none"
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
                <ActiveCounter target={22} />
              </div>
              <div className="achievement-label">年行业经验积淀</div>
            </div>

            {/* Card 2: 600+ 专业奖项认证 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <ActiveCounter target={600} />+
              </div>
              <div className="achievement-label">专业奖项认证</div>
            </div>

            {/* Card 3: 1000+ 行业头部客户认可 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <ActiveCounter target={1000} />+
              </div>
              <div className="achievement-label">行业头部客户认可</div>
            </div>

            {/* Card 4: 10000+ 产品成功落地 */}
            <div className="achievement-card">
              <div className="achievement-number">
                <ActiveCounter target={10000} />+
              </div>
              <div className="achievement-label">产品成功落地</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 12 INDUSTRY CARDS GRID SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[95%] w-full mx-auto">
          
          <div className="mb-10 text-left">
            <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono block mb-2">
              INDUSTRY DOMAINS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] font-display">
              12大垂直行业赛道
            </h2>
          </div>

          <div className="industry-grid">
            {INDUSTRIES.map((ind) => (
              <a 
                key={ind.id}
                href={ind.detailUrl}
                onClick={(e) => handleCardClick(e, ind.detailUrl)}
                className="industry-card group cursor-pointer"
              >
                <img 
                  src={ind.image} 
                  alt={ind.name} 
                  className="industry-card-img"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                <div className="industry-card-overlay" />

                {/* 右上角蓝色"撕角"色块（第一阶段弹出）与白色箭头（第二阶段延迟淡入） */}
                <div className="industry-card-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.8" stroke="currentColor">
                    <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* 默认底栏文字标签 */}
                <span className="industry-card-label">{ind.name}</span>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
