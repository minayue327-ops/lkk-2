import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, 
  Search, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Check, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LKKLogo from './components/LKKLogo';
import CategoryConsultingPage from './components/CategoryConsultingPage';
import { 
  SERVICE_CATEGORIES, 
  NEWS_ARTICLES, 
  PROFESSIONAL_SERVICES, 
  CASE_STUDIES,
  CaseStudy
} from './types';

const CASE_STUDIES_V2: CaseStudy[] = [
  {
    id: 'case-v2-2',
    title: '良品铺子产品包装创新咨询设计',
    description: '从线下走到线上的零食新零售',
    logoType: 'jingkelong'
  },
  {
    id: 'case-v2-1',
    title: '悦鲜活年轻化产品包装创新咨询设计',
    description: '打造差异化视觉识别，助力新品牌抢占年轻消费市场',
    logoType: 'yuexianhuo'
  },
  {
    id: 'case-v2-3',
    title: '故宫博物院"故宫猫"IP形象打造&景区文创产品创新咨询设计',
    description: '幽幽宫殿，一猫当家',
    logoType: 'pophie'
  },
  {
    id: 'case-v2-4',
    title: '艾肯智能净饮机"小智"',
    description: '全新的操作方式，让小智具有强识别和全新品牌口碑！',
    logoType: 'cotti'
  },
  {
    id: 'case-v2-6',
    title: '埃斯顿ED3S系列伺服驱动器产品创新咨询设计',
    description: '全面赋能工业自动化运动控制领域升级',
    logoType: 'estun'
  },
  {
    id: 'case-v2-5',
    title: '思哲睿康多手术机器人产品创新咨询设计',
    description: '集工业设计美学、临床需求、卓越稳定性能于一体',
    logoType: 'sizherui'
  }
];

const AWARDS_LIST = [
  'RED DOT',
  'iF DESIGN AWARD',
  'IDEA',
  'G-MARK',
  '红星奖',
  '金点设计奖'
];
const REPEATED_AWARDS = [...AWARDS_LIST, ...AWARDS_LIST, ...AWARDS_LIST, ...AWARDS_LIST];

const CLIENTS_LIST = [
  '诺基亚 (Nokia)',
  '西门子 (Siemens)',
  '三星 (Samsung)',
  '壳牌 (Shell)',
  '松下 (Panasonic)',
  '奥迪 (Audi)',
  '戴尔 (Dell)',
  '联合利华 (Unilever)',
  '雀巢 (Nestlé)',
  '玛氏 (Mars)',
  '通用电气 (GE)',
  '大众 (Volkswagen)',
  '联想',
  '海尔',
  '美的',
  '茅台',
  '青岛啤酒',
  '万达集团',
  '汇源',
  '中储粮',
  '京东',
  '奇瑞汽车',
  '海底捞',
  '吉利',
  '库迪咖啡'
];
const REPEATED_CLIENTS = [...CLIENTS_LIST, ...CLIENTS_LIST];

const Counter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 1500;
            const startTime = performance.now();

            const update = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              setCount(Math.floor(progress * target));
              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(update);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return <span ref={elementRef}>{count}</span>;
};

export default function App() {
  // Current page state
  const [currentPage, setCurrentPage] = useState<'home' | 'category'>('home');

  // Navigation active state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Carousel state for news
  const [newsIndex, setNewsIndex] = useState(0);

  // Active state for Banner Carousel
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);



  // Auto-scroll banner carousel (8 seconds interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Form submission states
  const [footerForm, setFooterForm] = useState({ name: '', phone: '' });
  const [footerFormSuccess, setFooterFormSuccess] = useState(false);
  
  const [modalForm, setModalForm] = useState({ name: '', phone: '', industry: '智能制造', desc: '' });
  const [modalFormSuccess, setModalFormSuccess] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Selected case for details modal
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Active state for Case Studies Style 2 on touch devices
  const [activeV2Card, setActiveV2Card] = useState<string | null>(null);

  // Click outside listener for touch devices to reset active state
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.case-card-v2')) {
        setActiveV2Card(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleV2CardClick = (e: React.MouseEvent, id: string, cs: CaseStudy) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      e.stopPropagation();
      const wasActive = activeV2Card === id;
      if (wasActive) {
        setActiveV2Card(null);
      } else {
        setActiveV2Card(id);
      }
    } else {
      setSelectedCase(cs);
    }
  };

  const getCaseLocalImage = (logoType?: string): string | null => {
    switch (logoType) {
      case 'xiaoxiandun':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.33.png';
      case 'haidilao':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.35.png';
      case 'sizherui':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.36.png';
      case 'estun':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.39.png';
      case 'hit':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/image.37.png';
      case 'yuexianhuo':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif';
      case 'pophie':
        return '/src/assets/images/case_pophie.jpg';
      case 'jingkelong':
        return '/src/assets/images/case_jingkelong.jpg';
      case 'cotti':
        return '/src/assets/images/lkk_coffee_mockup_1783302972120.jpg';
      default:
        return null;
    }
  };

  const getCaseV2LocalImage = (id: string): string | null => {
    switch (id) {
      case 'case-v2-1':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/7.15.1.3.gif';
      case 'case-v2-2':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/liangpin.jpg';
      case 'case-v2-3':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/gugong.jpg';
      case 'case-v2-4':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/xiaozhi.jpg';
      case 'case-v2-5':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/sizherui.jpg';
      case 'case-v2-6':
        return 'https://github.com/minaxyue-ops/MINA/releases/download/1/aisidun.jpg';
      default:
        return null;
    }
  };

  const getCasePlaceholderColor = (logoType?: string): string => {
    if (['jingkelong', 'cotti', 'haidilao', 'pophie'].includes(logoType || '')) {
      return '#E5F2FA';
    }
    return '#F5F5F5';
  };

  const getCaseV2PlaceholderColor = (id: string): string => {
    if (['case-v2-2', 'case-v2-3'].includes(id)) {
      return '#E5F2FA';
    }
    return '#F5F5F5';
  };

  const getCaseImage = (logoType: string | undefined): string => {
    return getCaseLocalImage(logoType) || '';
  };

  const getCaseV2Image = (id: string): string => {
    return getCaseV2LocalImage(id) || '';
  };

  const getCaseShortTitle = (id: string, fullTitle: string): string => {
    switch (id) {
      case 'case-1': return '糯宝 Pophie';
      case 'case-2': return '京客隆';
      case 'case-3': return '库迪咖啡';
      case 'case-4': return '小仙炖';
      case 'case-5': return '海底捞';
      case 'case-6': return '思哲睿康多多';
      case 'case-7': return '埃斯顿卓丰';
      case 'case-8': return '哈工大机器人';
      case 'case-9': return '悦鲜活鲜牛奶';
      default: return fullTitle;
    }
  };

  const getBrandGradient = (logoType: string): string => {
    switch (logoType) {
      case 'pophie':
        return 'bg-gradient-to-br from-amber-50 to-teal-50/20';
      case 'jingkelong':
        return 'bg-gradient-to-br from-red-50 to-orange-50/20';
      case 'cotti':
        return 'bg-gradient-to-br from-orange-50 to-red-50/20';
      case 'haidilao':
        return 'bg-gradient-to-br from-red-50 to-rose-50/30';
      case 'sizherui':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50/20';
      case 'hit':
        return 'bg-gradient-to-br from-slate-100 to-neutral-50/20';
      case 'yuexianhuo':
        return 'bg-gradient-to-br from-sky-50 to-blue-50/10';
      default:
        return 'bg-transparent';
    }
  };

  const getCaseV2Data = (cs: CaseStudy) => {
    switch (cs.id) {
      case 'case-v2-1':
        return {
          brand: '悦鲜活',
          title: '悦鲜活年轻化产品包装创新咨询设计',
          desc: '打造差异化视觉识别，助力新品牌抢占年轻消费市场'
        };
      case 'case-v2-2':
        return {
          brand: '良品铺子',
          title: '良品铺子产品包装创新咨询设计',
          desc: '从线下走到线上的零食新零售'
        };
      case 'case-v2-3':
        return {
          brand: '故宫博物院',
          title: '故宫博物院"故宫猫"IP形象打造&景区文创产品创新咨询设计',
          desc: '幽幽宫殿，一猫当家'
        };
      case 'case-v2-4':
        return {
          brand: '艾肯',
          title: '艾肯智能净饮机"小智"',
          desc: '全新的操作方式，让小智具有强识别和全新品牌口碑！'
        };
      case 'case-v2-5':
        return {
          brand: '思哲睿',
          title: '思哲睿康多手术机器人产品创新咨询设计',
          desc: '集工业设计美学、临床需求、卓越稳定性能于一体'
        };
      case 'case-v2-6':
        return {
          brand: '埃斯顿',
          title: '埃斯顿ED3S系列伺服驱动器产品创新咨询设计',
          desc: '全面赋能工业自动化运动控制领域升级'
        };
      default:
        return {
          brand: cs.title,
          title: cs.title,
          desc: cs.description
        };
    }
  };

  const getCaseDetailInfo = (id: string) => {
    switch (id) {
      case 'case-1':
        return {
          industry: '机器人',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计、交互设计'
        };
      case 'case-2':
        return {
          industry: '食品酒饮',
          consulting: '三品合一品类创新咨询',
          design: '品牌全案设计、商业空间设计'
        };
      case 'case-3':
        return {
          industry: '食品酒饮',
          consulting: '品牌创新0-1全案咨询',
          design: '品牌全案设计、包装设计'
        };
      case 'case-4':
        return {
          industry: '食品酒饮',
          consulting: '三品合一品类创新咨询',
          design: '包装设计、结构设计'
        };
      case 'case-5':
        return {
          industry: '食品酒饮',
          consulting: '产品创新0-1全案咨询',
          design: '包装设计、IP设计'
        };
      case 'case-6':
        return {
          industry: '医疗健康',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计、生产落地'
        };
      case 'case-7':
        return {
          industry: '机器人',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计'
        };
      case 'case-8':
        return {
          industry: '机器人',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计、交互设计'
        };
      case 'case-9':
        return {
          industry: '食品酒饮',
          consulting: '品牌创新0-1全案咨询',
          design: '包装设计、品牌全案设计'
        };
      case 'case-v2-1':
        return {
          industry: '食品酒饮',
          consulting: '品牌创新0-1全案咨询',
          design: '包装设计、品牌全案设计'
        };
      case 'case-v2-2':
        return {
          industry: '食品酒饮',
          consulting: '产品创新0-1全案咨询',
          design: '包装设计、IP设计'
        };
      case 'case-v2-3':
        return {
          industry: '文化创意',
          consulting: '品牌创新0-1全案咨询',
          design: 'IP设计、包装设计'
        };
      case 'case-v2-4':
        return {
          industry: '家居家电',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计、生产落地'
        };
      case 'case-v2-5':
        return {
          industry: '医疗健康',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计'
        };
      case 'case-v2-6':
        return {
          industry: '工业装备',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计、生产落地'
        };
      default:
        return {
          industry: '智能制造',
          consulting: '产品创新0-1全案咨询',
          design: '工业设计、结构设计'
        };
    }
  };

  // Auto-scroll news carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % NEWS_ARTICLES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);



  // Section Title Scroll Reveal (Bidirectional Follow, 500px range)
  useEffect(() => {
    const groups = document.querySelectorAll('.section-title.scroll-reveal-heading');
    if (groups.length === 0) return;

    const computeProgress = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const startPoint = viewportH * 0.85; // Reveal begins when header enters bottom 85% of viewport
      const triggerRange = 500;            // Slower progress over 500px range
      const scrolled = Math.min(Math.max(startPoint - rect.top, 0), triggerRange);
      return scrolled / triggerRange;
    };

    const updateAll = () => {
      groups.forEach((group) => {
        const chars = group.querySelectorAll('.char');
        if (chars.length === 0) return;
        const progress = computeProgress(group);
        const revealCount = Math.floor(progress * chars.length);
        
        chars.forEach((char, i) => {
          if (i < revealCount) {
            char.classList.add('is-revealed');
          } else {
            char.classList.remove('is-revealed');
          }
        });
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateAll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateAll();

    // Small delay to ensure any dynamic/layout shifts are accounted for
    const timer = setTimeout(updateAll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [currentPage]);

  // Hero Slogan Page-Load cascading animation delay setting
  useEffect(() => {
    const chars = document.querySelectorAll('.hero-title .char');
    chars.forEach((char, i) => {
      (char as HTMLElement).style.animationDelay = `${i * 0.05}s`;
    });
  }, []);

  // Site Header Scroll Behavior (Hide on Scroll Down, Show on Scroll Up, Glassmorphism)
  useEffect(() => {
    const header = document.querySelector('.site-header') as HTMLElement;
    if (!header) return;

    const updateHeight = () => {
      document.body.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);

    let lastScrollY = window.scrollY;
    const glassThreshold = 20;

    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;

      header.classList.toggle('is-glass', currentScrollY > glassThreshold);

      if (currentScrollY > lastScrollY && currentScrollY > header.offsetHeight) {
        header.classList.add('is-hidden'); // Scroll down, hide
      } else {
        header.classList.remove('is-hidden'); // Scroll up, show
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerForm.name || !footerForm.phone) return;
    setFooterFormSuccess(true);
    setTimeout(() => {
      setFooterFormSuccess(false);
      setFooterForm({ name: '', phone: '' });
    }, 4000);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.phone) return;
    setModalFormSuccess(true);
    setTimeout(() => {
      setModalFormSuccess(false);
      setIsContactModalOpen(false);
      setModalForm({ name: '', phone: '', industry: '智能制造', desc: '' });
    }, 3000);
  };

  // Filter case studies if search query is present
  const filteredCases = searchQuery 
    ? CASE_STUDIES.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CASE_STUDIES;

  const filteredCasesV2 = searchQuery 
    ? CASE_STUDIES_V2.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CASE_STUDIES_V2;

  return (
    <div className="relative min-h-screen bg-white text-neutral-800 selection:bg-[#007BC7] selection:text-white font-sans overflow-x-hidden">
      
      {/* SITE HEADER WRAPPER */}
      <div className="site-header">
        {/* 1. TOP NAV BAR */}
      <div className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-500 py-2.5 px-[0.8px] md:px-[1.6px]">
        <div className="max-w-[95%] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left Links */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1 text-neutral-600 hover:text-[#005F96] cursor-pointer transition-colors">
              <Globe className="w-3.5 h-3.5" />
              China (简体中文)
            </span>
            <span className="h-3 w-px bg-neutral-200"></span>
            <span className="hover:text-[#005F96] cursor-pointer transition-colors">全国办事处</span>
            <span className="h-3 w-px bg-neutral-200"></span>
            <span className="hover:text-[#005F96] cursor-pointer transition-colors">新闻中心</span>
            <span className="h-3 w-px bg-neutral-200"></span>
            <span className="hover:text-[#005F96] cursor-pointer transition-colors">加入我们</span>
          </div>
          {/* Right Phone number */}
          <div className="flex items-center gap-1.5 font-medium tracking-wider text-neutral-700">
            <Phone className="w-[18.2px] h-[18.2px] text-[#007BC7] animate-pulse" />
            <span className="text-[15.6px]">咨询热线：</span>
            <span className="text-[18.2px] font-semibold text-neutral-900 font-display">400-062-3130</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="border-b border-neutral-100 px-[0.8px] md:px-[1.6px] py-4 transition-all bg-transparent">
        <div className="max-w-[95%] w-full mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex-shrink-0" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <LKKLogo />
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('品类创新咨询')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => setCurrentPage('category')}
                className="flex items-center gap-1 text-[15px] font-medium text-neutral-700 hover:text-[#005F96] transition-colors py-2"
              >
                品类创新咨询
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === '品类创新咨询' ? 'rotate-180 text-[#007BC7]' : 'text-neutral-400'}`} />
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeMenu === '品类创新咨询' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[720px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-5 grid gap-4 z-50"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 border-b border-neutral-100 pb-2">品类服务专区</div>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        onClick={() => { setCurrentPage('category'); setActiveMenu(null); }} 
                        className="group/item text-left flex flex-col justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer w-full"
                      >
                        <div>
                          <div className="font-semibold text-sm text-neutral-800 group-hover/item:text-[#007BC7] transition-colors">三品合一品类创新咨询</div>
                          <div className="text-xs text-neutral-500 mt-1">重构战略定位与市场品类</div>
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <ArrowRight className="w-4 h-4 text-neutral-300 group-hover/item:text-[#007BC7] group-hover/item:translate-x-1 transition-all" />
                        </div>
                      </button>
                      <button 
                        onClick={() => { setCurrentPage('category'); setActiveMenu(null); }} 
                        className="group/item text-left flex flex-col justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer w-full"
                      >
                        <div>
                          <div className="font-semibold text-sm text-neutral-800 group-hover/item:text-[#007BC7] transition-colors">产品创新0-1全案咨询</div>
                          <div className="text-xs text-neutral-500 mt-1">从用户洞察到爆品定义</div>
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <ArrowRight className="w-4 h-4 text-neutral-300 group-hover/item:text-[#007BC7] group-hover/item:translate-x-1 transition-all" />
                        </div>
                      </button>
                      <button 
                        onClick={() => { setCurrentPage('category'); setActiveMenu(null); }} 
                        className="group/item text-left flex flex-col justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer w-full"
                      >
                        <div>
                          <div className="font-semibold text-sm text-neutral-800 group-hover/item:text-[#007BC7] transition-colors">品牌创新0-1全案咨询</div>
                          <div className="text-xs text-neutral-500 mt-1">构建差异化战略与视觉IP</div>
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <ArrowRight className="w-4 h-4 text-neutral-300 group-hover/item:text-[#007BC7] group-hover/item:translate-x-1 transition-all" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('品牌与产品设计')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-neutral-700 hover:text-[#005F96] transition-colors py-2">
                品牌&产品设计
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === '品牌与产品设计' ? 'rotate-180 text-[#007BC7]' : 'text-neutral-400'}`} />
              </button>

              <AnimatePresence>
                {activeMenu === '品牌与产品设计' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[480px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-6 z-50"
                  >
                    {/* Left Column: 产品创新 */}
                    <div className="flex flex-col">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#007BC7] border-b border-neutral-100 pb-2 mb-3">产品创新</div>
                      <div className="flex flex-col divide-y divide-neutral-100">
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">工业设计</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">结构设计</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">生产落地</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">交互设计</a>
                      </div>
                    </div>

                    {/* Right Column: 品牌创新 */}
                    <div className="flex flex-col">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#007BC7] border-b border-neutral-100 pb-2 mb-3">品牌创新</div>
                      <div className="flex flex-col divide-y divide-neutral-100">
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">品牌全案设计</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">包装设计</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">IP设计</a>
                        <a href="#professional-services" onClick={() => setCurrentPage('home')} className="py-2.5 hover:text-[#005F96] text-sm text-neutral-700 transition-colors font-medium">商业空间设计</a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('行业')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-neutral-700 hover:text-[#005F96] transition-colors py-2">
                行业
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === '行业' ? 'rotate-180 text-[#007BC7]' : 'text-neutral-400'}`} />
              </button>

              <AnimatePresence>
                {activeMenu === '行业' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[560px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-6 grid gap-4 z-50"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 border-b border-neutral-100 pb-2">垂直行业赛道</div>
                    <div className="grid grid-cols-4 gap-4">
                      {/* Column 1 */}
                      <div className="flex flex-col gap-2">
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">工业装备</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">智能3C</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">美妆个护</div>
                        </a>
                      </div>
                      {/* Column 2 */}
                      <div className="flex flex-col gap-2">
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">机器人</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">医疗健康</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">文化创意</div>
                        </a>
                      </div>
                      {/* Column 3 */}
                      <div className="flex flex-col gap-2">
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">新能源</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">食品酒饮</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">宠物经济</div>
                        </a>
                      </div>
                      {/* Column 4 */}
                      <div className="flex flex-col gap-2">
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">家居家电</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">连锁零售</div>
                        </a>
                        <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2 rounded-xl hover:bg-neutral-50 text-left transition-all block">
                          <div className="font-medium text-neutral-800 hover:text-[#005F96] text-sm whitespace-nowrap">交通工具</div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#case-studies" onClick={() => setCurrentPage('home')} className="text-[15px] font-medium text-neutral-700 hover:text-[#005F96] transition-colors">
              案例
            </a>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu('我们')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-neutral-700 hover:text-[#005F96] transition-colors py-2">
                我们
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === '我们' ? 'rotate-180 text-[#007BC7]' : 'text-neutral-400'}`} />
              </button>

              <AnimatePresence>
                {activeMenu === '我们' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-1 w-[480px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-4 grid grid-cols-4 gap-2 z-50"
                  >
                    <a href="#about-lkk" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2.5 hover:bg-neutral-50 rounded-xl block text-center text-sm font-medium text-neutral-800 hover:text-[#005F96] transition-colors">关于我们</a>
                    <button onClick={() => { setIsContactModalOpen(true); setActiveMenu(null); }} className="p-2.5 hover:bg-neutral-50 rounded-xl block text-center text-sm font-medium text-neutral-800 hover:text-[#005F96] transition-colors w-full cursor-pointer">联系我们</button>
                    <a href="#news-center" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2.5 hover:bg-neutral-50 rounded-xl block text-center text-sm font-medium text-neutral-800 hover:text-[#005F96] transition-colors">新闻中心</a>
                    <a href="#case-studies" onClick={() => { setCurrentPage('home'); setActiveMenu(null); }} className="p-2.5 hover:bg-neutral-50 rounded-xl block text-center text-sm font-medium text-neutral-800 hover:text-[#005F96] transition-colors">成功路径</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Search Box & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className={`relative hidden md:flex items-center rounded-full border px-3.5 py-1.5 transition-all duration-300 ${isSearchFocused ? 'border-[#007BC7] ring-2 ring-blue-100 w-64' : 'border-neutral-200 w-48'}`}>
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" aria-hidden="true" />
              <input 
                type="text" 
                placeholder="搜一搜" 
                aria-label="搜索案例"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent text-sm w-full outline-none text-neutral-800 placeholder-neutral-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 rounded-full hover:bg-neutral-100 shrink-0"
                >
                  <X className="w-3 h-3 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-neutral-200 lg:hidden text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
      </div>

      {/* MOBILE MENU NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-neutral-100 bg-white px-4 py-6 grid gap-4 z-30 relative"
          >
            {/* Mobile Search */}
            <div className="flex items-center rounded-xl border border-neutral-200 px-3 py-2">
              <Search className="w-4 h-4 text-neutral-400 mr-2" aria-hidden="true" />
              <input 
                type="text" 
                placeholder="搜一搜" 
                aria-label="手机端搜索案例"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-neutral-800 placeholder-neutral-400"
              />
            </div>
            
            <nav aria-label="手机端导航" className="grid gap-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">业务专区</span>
              <button onClick={() => { setCurrentPage('category'); setMobileMenuOpen(false); }} className="py-2 px-3 hover:bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800 text-left cursor-pointer">品类创新咨询</button>
              <a href="#professional-services" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="py-2 px-3 hover:bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800">品牌&产品设计</a>
              <a href="#case-studies" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="py-2 px-3 hover:bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800">经典案例锦集</a>
              <a href="#about-lkk" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="py-2 px-3 hover:bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800">公司简介</a>
            </nav>
            
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }} 
              className="w-full bg-[#1a1a1a] text-white font-medium py-2.5 rounded-xl text-center shadow-lg hover:bg-[#007BC7] transition-all text-sm"
            >
              即刻获取创新设计方案
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {currentPage === 'home' ? (
        <>
          {/* 3. HERO / BIG TITLE SECTION */}
          <section id="hero-section" className="hero-section px-[0.8px] md:px-[1.6px] py-12 md:py-20 text-center bg-radial from-neutral-50 to-white relative">
        <div className="hero-slogan-block max-w-4xl mx-auto hero-inner">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono">22 YEARS OF DESIGN EXCELLENCE</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-neutral-900 leading-[1.05] font-display"
          >
            <span className="char char-blue">三</span>
            <span className="char char-blue">品</span>
            <span className="char char-blue">合</span>
            <span className="char char-blue">一</span>
            <span className="char char-black">助</span>
            <span className="char char-black">力</span>
            <span className="char char-black">企</span>
            <span className="char char-black">业</span>
            <span className="char char-black">成</span>
            <span className="char char-black">为</span>
            <span className="char char-black">品</span>
            <span className="char char-black">类</span>
            <span className="char char-black">冠</span>
            <span className="char char-black">军</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm font-semibold tracking-[0.35em] text-neutral-400 uppercase mt-4 font-mono"
          >
            LKK Consulting & Design Group
          </motion.p>
        </div>

        {/* HERO GRID WORK */}
        <div className="max-w-[95%] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 md:mt-16 text-left items-stretch">
          
          {/* Left Large Banner Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-lg border border-neutral-100 bg-white flex flex-col justify-center w-full aspect-[16/9]"
          >
            <div className="absolute inset-0 w-full h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeBannerIndex * 100}%)` }}>
              
              {/* SLIDE 1: Achievements Slide (Five stats + Logo loop with image background) */}
              <div className="w-full h-full shrink-0 relative bg-neutral-900 text-white flex flex-col justify-between overflow-hidden select-none">
                {/* Background Image that covers the full screen */}
                <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/banner1.jpg" 
                    alt="LKK Achievement Background" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle vignette/shading overlay to guarantee text readability while fully retaining image colors */}
                  <div className="absolute inset-0 bg-neutral-950/25"></div>
                </div>

                {/* Top and middle content wrap with proper paddings, keeping bottom marquee section outside so it fits perfectly flush */}
                <div className="flex flex-col flex-1 justify-between p-4 pb-0 md:pt-6 md:px-8 z-10 w-full">
                  {/* 1. Header */}
                  <div className="flex items-center justify-between">
                    <div className="hero-badge">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white font-mono uppercase">
                        DESIGN EXCELLENCE DISPLAY • PAGE 1 OF 3
                      </span>
                    </div>
                    <div className="text-[10px] md:text-xs font-bold text-neutral-300 font-mono tracking-wider">
                      EST. 2004
                    </div>
                  </div>

                  {/* 2. Four Quantitative Stats with Larger, Bolder Numbers, evenly distributed inside a CSS Grid */}
                  <div className="stats-section my-auto py-2 w-full px-2 md:px-8">
                    <div className="stat-item">
                      <div className="stat-number stat-number-large">
                        <Counter target={600} /><span className="text-white font-light ml-0.5">+</span>
                      </div>
                      <div className="stat-label">
                        国内外设计大奖
                      </div>
                    </div>

                    <div className="stat-item">
                      <div className="stat-number">
                        <Counter target={200} /><span className="text-white font-light ml-0.5">+</span>
                      </div>
                      <div className="stat-label">
                        国际500强客户
                      </div>
                    </div>

                    <div className="stat-item">
                      <div className="stat-number">
                        <Counter target={300} /><span className="text-white font-light ml-0.5">+</span>
                      </div>
                      <div className="stat-label">
                        国内500强客户
                      </div>
                    </div>

                    <div className="stat-item">
                      <div className="stat-number">
                        <Counter target={100} /><span className="text-white font-light ml-0.5">+</span>
                      </div>
                      <div className="stat-label">
                        打造品类冠军
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Double-Row Logo Marquees (Compact and responsive, styled with capsule glass pills) */}
                <div className="hero-logo-marquee-wrapper mt-auto z-10">
                  {/* Row 1: Leftwards Marquee (Awards with custom grey-scaled images - scaled up 30%, gap 64px, pure CSS) */}
                  <div className="logo-marquee-row awards-row">
                    <div className="logo-marquee-track awards-track">
                      <div className="logo-marquee-group awards-group">
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/jpred.png" alt="德国红点设计奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/if.png" alt="iF设计奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/idsa.png" alt="美国IDEA奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/good.png" alt="日本G-Mark奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/redstar.png" alt="中国红星奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/jindian.png" alt="金点设计奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/k-desgan.png" alt="韩国K-Design奖" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/Adesgan.png" alt="意大利A'设计奖" width="90" height="40" />
                      </div>
                      <div className="logo-marquee-group awards-group" aria-hidden="true">
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/jpred.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/if.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/idsa.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/good.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/redstar.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/jindian.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/k-desgan.png" alt="" width="90" height="40" />
                        <img className="logo-item" src="https://github.com/minaxyue-ops/MINA/releases/download/1/Adesgan.png" alt="" width="90" height="40" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Rightwards Marquee (Clients text in glass pills) */}
                  <div className="logo-marquee-row brands-row h-12 md:h-14 flex items-center">
                    <div className="logo-marquee-track brands">
                      <div className="logo-marquee-group brands-group">
                        {CLIENTS_LIST.map((client, i) => (
                          <div 
                            key={`client-1-${i}`} 
                            className="marquee-chip flex items-center justify-center text-[9px] md:text-[10px] font-bold shrink-0" 
                          >
                            {client}
                          </div>
                        ))}
                      </div>
                      <div className="logo-marquee-group brands-group" aria-hidden="true">
                        {CLIENTS_LIST.map((client, i) => (
                          <div 
                            key={`client-2-${i}`} 
                            className="marquee-chip flex items-center justify-center text-[9px] md:text-[10px] font-bold shrink-0" 
                          >
                            {client}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 2: Clean Image-Only Banner Slide */}
              <div className="w-full h-full shrink-0 relative overflow-hidden select-none">
                <img 
                  src="https://github.com/minaxyue-ops/MINA/releases/download/1/banner2.png" 
                  alt="LKK Design Strategy Banner" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* SLIDE 3: Clean Image-Only Banner Slide */}
              <div className="w-full h-full shrink-0 relative overflow-hidden select-none">
                <img 
                  src="https://github.com/minaxyue-ops/MINA/releases/download/1/banner3.png" 
                  alt="LKK Category Innovation Banner" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* Prev/Next arrows on hover */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveBannerIndex((prev) => (prev - 1 + 3) % 3); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 slide-arrow"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveBannerIndex((prev) => (prev + 1) % 3); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 slide-arrow"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveBannerIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeBannerIndex === idx 
                      ? 'bg-[#007BC7] w-6' 
                      : 'bg-neutral-300/60 hover:bg-neutral-400/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Service Grid (8 categories) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-category-grid lg:col-span-5 flex flex-col justify-between rounded-3xl p-5 md:p-6 lg:p-7 border border-neutral-100 h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 lg:gap-y-2 flex-1">
              {SERVICE_CATEGORIES.map((cat, index) => (
                <motion.div 
                  key={cat.id}
                  whileHover={{ x: 4 }}
                  className="group flex flex-col justify-center py-2 border-b border-neutral-200/70 hover:border-[#005F96] transition-colors text-left"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-neutral-800 group-hover:text-[#005F96] transition-colors">
                        {cat.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#005F96] group-hover:translate-x-1.5 transition-all" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed pr-2">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-xs text-neutral-400">
                洛可可聚焦行业细分，致力于通过产品创新为企业突破增长壁垒。
              </span>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="shrink-0 flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#007BC7] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all"
              >
                立即对接垂直专家
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. 专业服务 SECTION */}
      <section id="professional-services" className="py-20 bg-neutral-50 px-[0.8px] md:px-[1.6px] border-y border-neutral-100">
        <div className="max-w-[95%] w-full mx-auto services-inner">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Expertise</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
                <span className="char char-black">专</span><span className="char char-black">业</span><span className="char char-black">服</span><span className="char char-black">务</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-md mt-4 md:mt-0 leading-relaxed">
              我们依托于独树一帜的“战略咨询 + 整合设计”体系，面向未来进行多维度商业创新设计服务。
            </p>
          </div>

          {/* Three column Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFESSIONAL_SERVICES.map((service, idx) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-150 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="h-64 relative overflow-hidden bg-neutral-100">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[10px] font-bold text-neutral-800 px-3 py-1 rounded-full border border-neutral-200 uppercase tracking-wider font-mono">
                    {service.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#005F96] transition-colors mb-4">
                      {service.title}
                    </h3>
                    <ul className="grid gap-2.5">
                      {service.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-neutral-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#007BC7]"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider group-hover:text-[#005F96] transition-colors">
                      查看详情
                    </span>
                    <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-[#005F96] flex items-center justify-center text-neutral-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 案例锦集 SECTION */}
      <section id="case-studies" className="py-20 bg-neutral-50 px-[0.8px] md:px-[1.6px] border-t border-neutral-150">
        <div className="max-w-[95%] w-full mx-auto cases-inner">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Portfolios</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
                <span className="char char-black">案</span><span className="char char-black">例</span><span className="char char-black">锦</span><span className="char char-black">集</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm mt-4 md:mt-0">
              洛可可已服务超过数千个品牌客户，荣获多项国际工业设计大奖。
            </p>
          </div>

          {/* Cases grid V2 */}
          <div className="case-grid-v2">
            {filteredCasesV2.map((cs) => {
              const v2Data = getCaseV2Data(cs);
              return (
                <a 
                  key={cs.id}
                  href={`/cases/${cs.id}`}
                  onClick={(e) => {
                    const isTouch = window.matchMedia('(hover: none)').matches;
                    if (isTouch) {
                      e.preventDefault(); // Stop navigation on touch devices to allow hover effect
                      const wasActive = activeV2Card === cs.id;
                      if (wasActive) {
                        setActiveV2Card(null);
                      } else {
                        setActiveV2Card(cs.id);
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.location.href = `/cases/${cs.id}`;
                    }
                  }}
                  tabIndex={0}
                  aria-label={`${cs.title} 案例详情`}
                  className={`case-card-v2 ${activeV2Card === cs.id ? 'is-active' : ''} block`}
                >
                  {getCaseV2LocalImage(cs.id) ? (
                    <img 
                      src={getCaseV2LocalImage(cs.id) || ''} 
                      alt={cs.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      style={{ backgroundColor: getCaseV2PlaceholderColor(cs.id) }}
                      className="w-full h-full flex items-center justify-center p-4"
                    >
                      <span className="text-xs font-bold text-neutral-400 select-none text-center">
                        {v2Data.brand}（待替换）
                      </span>
                    </div>
                  )}
                  <div className="case-summary-v2">
                    <div className="case-brand-label">{v2Data.brand}</div>
                    <button 
                      type="button"
                      className="case-detail-arrow" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedCase(cs);
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

            {filteredCasesV2.length === 0 && (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-neutral-200 rounded-3xl">
                <p className="text-neutral-400">无匹配案例，请尝试搜索其他关键字</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. 新闻中心 SECTION */}
      <section id="news-center" className="py-20 bg-neutral-50 px-[0.8px] md:px-[1.6px] border-y border-neutral-100">
        <div className="max-w-[95%] w-full mx-auto news-inner">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#007BC7] uppercase tracking-widest font-mono">Company News</span>
              <h2 className="section-title scroll-reveal-heading text-3xl font-extrabold tracking-tight text-neutral-900 mt-2 font-display">
                <span className="char char-black">新</span><span className="char char-black">闻</span><span className="char char-black">中</span><span className="char char-black">心</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-2 max-w-lg leading-relaxed">
                了解我们的成长足迹，掌握行业新鲜资讯，一站式解锁公司最新动态，读懂我们的价值理念。
              </p>
            </div>
            
            {/* Slide Arrows */}
            <div className="flex items-center gap-2 mt-6 md:mt-0">
              <button 
                onClick={() => setNewsIndex((prev) => (prev - 1 + NEWS_ARTICLES.length) % NEWS_ARTICLES.length)}
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-all shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setNewsIndex((prev) => (prev + 1) % NEWS_ARTICLES.length)}
                className="w-11 h-11 rounded-full bg-[#1a1a1a] hover:bg-[#007BC7] flex items-center justify-center text-white transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Showcase of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.map((article, index) => {
              const isActive = index === newsIndex;
              return (
                <motion.div 
                  key={article.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${isActive ? 'border-[#007BC7] ring-2 ring-blue-50/50 shadow-xl' : 'border-neutral-200/60 shadow-sm opacity-90'}`}
                >
                  <div className="h-48 relative overflow-hidden bg-neutral-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-semibold text-white tracking-wider">
                      LKK NEWS
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-400 font-mono">
                        {article.date}
                      </span>
                      <h3 className="text-base font-bold text-neutral-800 mt-2 line-clamp-2 leading-snug group-hover:text-[#005F96]">
                        {article.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-3 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold">
                      <span className={isActive ? 'text-[#007BC7]' : 'text-neutral-400'}>
                        阅读资讯全文
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-[#007BC7] translate-x-1' : 'text-neutral-300'}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-start">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#007BC7] hover:text-[#005F96]/80 hover:underline">
              更多详情
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>
        </>
      ) : (
        <CategoryConsultingPage 
          onOpenContactModal={() => setIsContactModalOpen(true)}
          onSelectCase={(cs) => setSelectedCase(cs)}
          CounterComponent={Counter}
        />
      )}

      {/* 8. FOOTER WITH ACCORDION & FORMS */}
      <footer id="about-lkk" className="bg-neutral-900 text-neutral-400 pt-16 pb-8 px-[0.8px] md:px-[1.6px] relative z-10">
        <div className="max-w-[95%] w-full mx-auto footer-inner">
          
          {/* Merged Consultation Area */}
          <div className="bg-[#007BC7] rounded-3xl shadow-xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
            {/* Radial visual decor overlay */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column (Logo, Title, Text, Contact details) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 w-fit text-xs font-semibold tracking-wider text-white">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  洛可可官方品质保障 · 一对一专家咨询
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold leading-snug text-white text-left">
                  让设计助力你的品类突围
                </h2>

                <p className="text-xs md:text-sm text-blue-100 leading-relaxed max-w-2xl text-left">
                  洛可可是一家用咨询设计的能力，为垂直行业客户，提供产品创新价值的公司。我们坚持以用户体验为核心，致力于为企业提供行业整体创新解决方案。如需创新设计咨询，请联系专家团队。
                </p>

                {/* Footer Logo and Hotline info in the same column/row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-white/15 mt-2">
                  <LKKLogo isLight={true} />
                  <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
                  <div className="text-left">
                    <p className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">Consultation Hotline</p>
                    <p className="text-2xl font-black text-white tracking-tight mt-0.5 font-display">400-062-3130</p>
                  </div>
                </div>
              </div>

              {/* Right Column (Form) */}
              <div className="lg:col-span-5 w-full">
                {footerFormSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 shrink-0 bg-white text-[#007BC7] rounded-full p-0.5" />
                      <span className="font-bold text-white text-sm">预约提交成功！</span>
                    </div>
                    <p className="text-xs mt-2 text-blue-100 leading-relaxed text-left">
                      洛可可品类专家将在 1 小时内给您致电，为您提供免费的商业创新评估。
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFooterSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        required
                        placeholder="姓名" 
                        aria-label="您的姓名"
                        value={footerForm.name}
                        onChange={(e) => setFooterForm({ ...footerForm, name: e.target.value })}
                        className="w-full bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white focus:ring-1 focus:ring-white"
                      />
                      <input 
                        type="tel" 
                        required
                        placeholder="电话" 
                        aria-label="您的电话"
                        value={footerForm.phone}
                        onChange={(e) => setFooterForm({ ...footerForm, phone: e.target.value })}
                        className="w-full bg-white/15 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white focus:ring-1 focus:ring-white"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-white hover:bg-[#F0F0F0] text-[#007BC7] font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
                    >
                      咨询我们
                      <ArrowRight className="w-4 h-4 text-[#007BC7]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Directory links */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-16">
            
            {/* Left QR details */}
            <div className="col-span-full md:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 bg-white rounded-2xl p-3 flex items-center justify-center shadow-lg relative shrink-0 overflow-hidden">
                  <img 
                    src="https://github.com/minaxyue-ops/MINA/releases/download/1/3.png" 
                    alt="洛可可官方企业微信二维码" 
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm">添加洛可可官方企业微信</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                    微信扫码添加，掌握行业爆品打造逻辑、最前沿设计趋势及精选案例拆解。
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm text-left">
                作为国家级工业设计示范企业，洛可可坚持探索数字化设计与品类定位的高效整合，驱动中国制造迈向中国创造。
              </p>
            </div>

            {/* Cases columns */}
            <div className="col-span-1 md:col-span-3 text-left">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#007BC7] pl-2">案例</h5>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <li><a href="#case-studies" className="hover:text-white transition-colors">工业装备</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">机器人</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">新能源</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">家居家电</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">智能3C</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">医疗健康</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">食品酒饮</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">连锁零售</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">美妆个护</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">文化创意</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">宠物经济</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">交通工具</a></li>
              </ul>
            </div>

            {/* Services columns */}
            <div className="col-span-1 md:col-span-2 text-left">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#007BC7] pl-2">服务</h5>
              <ul className="grid gap-2 text-xs">
                <li><a href="#professional-services" className="hover:text-white transition-colors">工业设计</a></li>
                <li><a href="#professional-services" className="hover:text-white transition-colors">结构设计</a></li>
                <li><a href="#professional-services" className="hover:text-white transition-colors">生产落地</a></li>
                <li><a href="#professional-services" className="hover:text-white transition-colors">品牌全案设计</a></li>
                <li><a href="#professional-services" className="hover:text-white transition-colors">IP设计</a></li>
                <li><a href="#professional-services" className="hover:text-white transition-colors">包装设计</a></li>
              </ul>
            </div>

            {/* Contact Columns */}
            <div className="col-span-1 md:col-span-1.5 text-left">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#007BC7] pl-2">联系</h5>
              <ul className="grid gap-2 text-xs text-neutral-400">
                <li className="hover:text-white cursor-pointer">北京·总部</li>
                <li className="hover:text-white cursor-pointer">深圳</li>
                <li className="hover:text-white cursor-pointer">上海</li>
                <li className="hover:text-white cursor-pointer">苏州</li>
                <li className="hover:text-white cursor-pointer">杭州</li>
                <li className="hover:text-white cursor-pointer">南京</li>
                <li className="hover:text-white cursor-pointer">成都</li>
                <li className="hover:text-white cursor-pointer">佛山</li>
                <li className="hover:text-white cursor-pointer">南昌</li>
              </ul>
            </div>

            {/* About us columns */}
            <div className="col-span-1 md:col-span-1.5 text-left">
              <h5 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#007BC7] pl-2">我们</h5>
              <ul className="grid gap-2 text-xs">
                <li><a href="#about-lkk" className="hover:text-white transition-colors">公司简介</a></li>
                <li><a href="#news-center" className="hover:text-white transition-colors">新闻中心</a></li>
                <li><button onClick={() => setIsContactModalOpen(true)} className="hover:text-white cursor-pointer text-left focus:outline-none">联系我们</button></li>
                <li className="hover:text-white cursor-pointer">常见问题</li>
              </ul>
            </div>

          </div>

          {/* Legal bottom row */}
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <div>
              <p>Copyright © 北京洛可可科技有限公司 All Rights Reserved.</p>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="hover:text-neutral-400 cursor-pointer">京ICP备13015144号</span>
              <span className="hover:text-neutral-400 cursor-pointer">京公网安备11010502042139</span>
            </div>

            {/* Social SVGs */}
            <div className="flex items-center gap-3">
              {/* Douyin */}
              <div className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer" title="抖音">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.01 1.62 4.2 1.01.85 2.29 1.32 3.61 1.4v3.52c-1.18-.02-2.34-.35-3.37-1-.38-.24-.73-.52-1.04-.85v6.52c.06 1.8-.52 3.58-1.64 4.96-1.54 2-4.14 2.92-6.57 2.3-2.48-.52-4.41-2.54-4.85-5.04-.6-3.04 1.15-6.13 4.14-6.94.75-.22 1.54-.29 2.32-.2v3.63c-.4-.08-.82-.08-1.22-.02-1.34.22-2.39 1.34-2.47 2.7-.13 1.56 1.04 2.96 2.6 3.09 1.64.2 3.19-.85 3.42-2.49.07-.32.08-.66.08-.99V0l.4-.02z"/>
                </svg>
              </div>

              {/* Weibo */}
              <div className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-rose-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer" title="微博">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M9.73 14.77c-2.47.16-4.57-.75-4.68-2.03-.12-1.28 1.8-2.43 4.27-2.58 2.47-.16 4.58.74 4.69 2.03.11 1.28-1.81 2.42-4.28 2.58zm6.54-7.23c-.45-.48-1.11-.74-1.74-.69-.21.02-.37.2-.35.41.02.21.2.37.41.35.39-.03.79.13 1.07.42.27.29.37.7.27 1.08-.05.19.06.39.25.44.2.05.41-.06.46-.25.17-.61.02-1.28-.41-1.76zm2.46-2.55c-.94-1.04-2.38-1.61-3.78-1.51-.21.01-.37.2-.35.41.02.21.2.37.41.35 1.13-.08 2.3.38 3.06 1.22.76.84 1.07 1.99.85 3.1-.04.2.09.4.29.44.21.04.41-.09.45-.29.28-1.4-.11-2.88-1.08-3.93zM21.27 12.4c-.05-.88-.51-1.68-1.24-2.18-.72-.49-1.61-.63-2.43-.37-1.42-1.22-3.38-1.92-5.45-1.92-5.07 0-9.15 3.32-9.15 7.42 0 4.1 4.08 7.41 9.15 7.41s9.15-3.31 9.15-7.41c0-.44-.05-.88-.13-1.31.54-.42.87-.99.9-1.64zm-11.54 5c-3.74.24-6.91-1.14-7.07-3.08-.16-1.94 2.74-3.71 6.48-3.95 3.74-.24 6.91 1.14 7.07 3.08.16 1.94-2.74 3.71-6.48 3.95zm7.39-4.88c-.1-.13-.29-.16-.42-.06l-.08.06c-.13.1-.16.29-.06.42.06.08.15.11.24.11.06 0 .13-.02.18-.06.13-.1.16-.29.06-.42z"/>
                </svg>
              </div>

              {/* WeChat with hover popup */}
              <div className="relative group/social cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M8.53 2.1c-4.43 0-8.02 3.14-8.02 7.01 0 2.18 1.14 4.13 2.92 5.41l-.76 2.27c-.07.21.14.39.32.28l2.67-1.51c.91.31 1.89.47 2.87.47.45 0 .9-.04 1.34-.11-.32-.82-.49-1.7-.49-2.61 0-3.9 3.51-7.07 7.82-7.07.45 0 .9.04 1.34.11C25.4 4.3 20.31 2.1 15.03 2.1H8.53zm9.18 7.07c-3.77 0-6.82 2.71-6.82 6.06 0 1.88.97 3.56 2.49 4.67l-.65 1.94c-.06.18.12.33.27.24l2.27-1.29c.77.27 1.61.41 2.44.41 3.77 0 6.82-2.71 6.82-6.06.01-3.36-3.04-6.07-6.82-6.07zM5.38 6.55c.57 0 1.03.46 1.03 1.03s-.46 1.03-1.03 1.03-1.03-.46-1.03-1.03.46-1.03 1.03-1.03zm6.3 0c.57 0 1.03.46 1.03 1.03s-.46 1.03-1.03 1.03-1.03-.46-1.03-1.03.46-1.03 1.03-1.03zm3.72 10.14c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87zm5.24 0c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87z"/>
                  </svg>
                </div>
                {/* WeChat QR Popup tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover/social:scale-100 transition-all duration-200 origin-bottom bg-neutral-850 p-2 rounded-lg border border-neutral-700 shadow-2xl z-20 w-28">
                  <div className="w-24 h-24 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://github.com/minaxyue-ops/MINA/releases/download/1/3.png" 
                      alt="洛可可官方企业微信" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[8px] text-center text-neutral-400 mt-1.5">洛可可官方企业微信</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* 9. CONTACT POPUP MODAL */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/65 backdrop-blur-sm"
            />

            {/* Card Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 z-10 p-6 md:p-8"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-150 text-neutral-400 hover:text-neutral-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#007BC7] text-xs font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4" />
                  Design & Consulting Proposal
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mt-1">洛可可创新咨询与设计预约</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  提供包括品类定位、工业外观、机械堆叠结构设计、品牌包装设计、开模试产在内的一站式爆品孵化服务。
                </p>
              </div>

              {modalFormSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">恭喜，创新方案需求提交成功！</h4>
                  <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
                    我们已收到您的项目概况。负责该垂直行业的品类总监与资深主笔设计师将在下一个工作日前与您取得联系，并为您量身打造第一版“品类策略初稿”。
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleModalSubmit} className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-bold text-neutral-500 mb-1">您的姓名 *</label>
                      <input 
                        id="modal-name"
                        type="text" 
                        required
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        placeholder="例如：陈经理" 
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-[#007BC7]"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-phone" className="block text-xs font-bold text-neutral-500 mb-1">您的电话 *</label>
                      <input 
                        id="modal-phone"
                        type="tel" 
                        required
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                        placeholder="您的联系电话" 
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-[#007BC7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-industry" className="block text-xs font-bold text-neutral-500 mb-1">主营垂直行业赛道</label>
                    <select 
                      id="modal-industry"
                      value={modalForm.industry}
                      onChange={(e) => setModalForm({ ...modalForm, industry: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-[#007BC7]"
                    >
                      <option value="智能制造">智能机器人 / 机械臂 / 高端制造</option>
                      <option value="医疗健康">医疗保健 / 医疗器械 / 创新药盒</option>
                      <option value="食品酒饮">食品包装 / 滋补品 / 饮料</option>
                      <option value="智能3C">智能穿戴 / 消费数码 / 手机配件</option>
                      <option value="家居家电">智能家电 / 智能家居 / 绿色灯具</option>
                      <option value="宠物经济">宠物智趣用品 / 包装包装</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="modal-desc" className="block text-xs font-bold text-neutral-500 mb-1">您的具体创新需求</label>
                    <textarea 
                      id="modal-desc"
                      rows={3}
                      value={modalForm.desc}
                      onChange={(e) => setModalForm({ ...modalForm, desc: e.target.value })}
                      placeholder="例如：我们想打造一款针对家庭端的情感陪伴机器人，需要产品0-1外观设计与结构开模评估。" 
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-[#007BC7] resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 bg-neutral-50 px-3 py-2 rounded-lg mt-2 border border-neutral-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    安全隐私保护：您提交的所有商业概况、技术机密、姓名及电话将受高标NDA保密条款保护。
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1a1a1a] hover:bg-[#007BC7] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4 flex items-center justify-center gap-2 text-sm"
                  >
                    立即预约品类总监咨询
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. CASE DETAIL POPUP MODAL */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-neutral-950/65 backdrop-blur-sm"
            />

            {/* Card Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 z-10 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-neutral-150 text-neutral-400 hover:text-neutral-700 transition-all z-20 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphical illustration for Case */}
              <div className="w-full md:w-1/2 bg-neutral-50 flex items-center justify-center p-6 relative min-h-[240px] md:min-h-auto">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-radial from-neutral-950 to-transparent pointer-events-none"></div>

                {selectedCase.id.startsWith('case-v2-') ? (
                  getCaseV2LocalImage(selectedCase.id) ? (
                    <img 
                      src={getCaseV2LocalImage(selectedCase.id) || ''} 
                      alt={selectedCase.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      style={{ backgroundColor: getCaseV2PlaceholderColor(selectedCase.id) }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-4"
                    >
                      <span className="text-sm font-bold text-neutral-400 select-none">
                        {getCaseV2Data(selectedCase).brand}（待替换）
                      </span>
                    </div>
                  )
                ) : ['xiaoxiandun', 'estun', 'haidilao', 'sizherui', 'hit', 'yuexianhuo'].includes(selectedCase.logoType || '') ? (
                  getCaseLocalImage(selectedCase.logoType) ? (
                    <img 
                      src={getCaseLocalImage(selectedCase.logoType) || ''} 
                      alt={selectedCase.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      style={{ backgroundColor: getCasePlaceholderColor(selectedCase.logoType) }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-4"
                    >
                      <span className="text-sm font-bold text-neutral-400 select-none">
                        {getCaseShortTitle(selectedCase.id, selectedCase.title)}（待替换）
                      </span>
                    </div>
                  )
                ) : (
                  <div className="scale-125">
                    {selectedCase.logoType === 'pophie' && (
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1">
                          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center font-bold text-white text-[9px]">P</div>
                          <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center font-bold text-white text-[9px]">O</div>
                          <div className="w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center font-bold text-white text-[9px]">P</div>
                        </div>
                        <span className="text-[8px] font-bold text-neutral-400 tracking-widest mt-2 uppercase">Companion AI</span>
                      </div>
                    )}
                    {selectedCase.logoType === 'jingkelong' && (
                      <div className="relative w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm mt-3 flex items-center justify-center"><span className="text-red-600 text-[8px] font-bold">京</span></div>
                      </div>
                    )}
                    {selectedCase.logoType === 'cotti' && (
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg">@</div>
                    )}
                  </div>
                )}
              </div>

              {/* Details of Case study */}
              <div className="w-full md:w-1/2 p-6 md:p-8 text-left flex flex-col justify-between">
                <div>
                  <div className="bg-blue-50 text-[#007BC7] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit">
                    品类爆品创新案例 · Class Case
                  </div>
                  
                  <h4 className="text-xl font-bold text-neutral-900 mt-3 leading-snug">
                    {selectedCase.title}
                  </h4>
                  
                  <p className="text-xs text-neutral-500 leading-relaxed mt-4">
                    {selectedCase.description}
                  </p>
                  
                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <span className="font-bold text-neutral-700">所属行业：</span>
                      <span>{getCaseDetailInfo(selectedCase.id).industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <span className="font-bold text-neutral-700">咨询服务：</span>
                      <span>{getCaseDetailInfo(selectedCase.id).consulting}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <span className="font-bold text-neutral-700">设计服务：</span>
                      <span>{getCaseDetailInfo(selectedCase.id).design}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 flex gap-3">
                  <button 
                    onClick={() => {
                      setSelectedCase(null);
                      setIsContactModalOpen(true);
                    }}
                    className="flex-grow bg-[#007BC7] hover:bg-[#005F96] text-white font-bold py-2.5 rounded-xl text-center text-xs transition-all"
                  >
                    获取同款爆品孵化方案
                  </button>
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="bg-white hover:bg-[#E5F2FA] text-[#007BC7] border border-[#007BC7] font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
