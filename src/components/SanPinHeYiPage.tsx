import React from 'react';
import { ArrowRight, Compass, Layers, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SanPinHeYiPageProps {
  onOpenContactModal: () => void;
  onNavigateDetail?: (url: string) => void;
  CounterComponent?: React.FC<{ target: number }>;
}

const DefaultCounter: React.FC<{ target: number }> = ({ target }) => {
  return <span>{target}</span>;
};

export default function SanPinHeYiPage({
  onOpenContactModal,
  onNavigateDetail,
  CounterComponent = DefaultCounter,
}: SanPinHeYiPageProps) {
  return (
    <div className="w-full bg-[#FFFFFF] text-[#4D4D4D] font-sans antialiased">
      
      {/* ================= 1. 首屏 HERO 区域 (调整为「携手洛可可，开启您的『三品合一』创新之旅」) ================= */}
      <section id="sanpinheyi-hero" className="py-16 md:py-24 text-center bg-[#FFFFFF] relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-[5%] relative z-10 flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#007BC7] font-mono uppercase">
              THREE-IN-ONE INNOVATION JOURNEY
            </span>
            <span className="h-[1.5px] w-8 bg-[#007BC7]"></span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-black tracking-tight text-[#1A1A1A] leading-[1.2] font-display whitespace-nowrap"
          >
            <span>携手洛可可，开启您的</span>
            <span className="text-[#007BC7]">「三品合一」</span>
            <span>创新之旅</span>
          </motion.h1>

          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#8C8C8C] uppercase mt-4 font-mono">
            LKK Consulting & Design Group
          </p>

          <p className="text-sm md:text-base text-[#4D4D4D] max-w-3xl mt-8 leading-[1.8] font-normal text-center text-balance">
            不论您处于开辟新品类、突破制造代工、还是寻求产品与品牌升级阶段，我们的资深品类专家与主笔设计团队随时为您提供全案诊断与咨询。
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button 
              onClick={onOpenContactModal}
              className="bg-[#007BC7] hover:bg-[#005F96] text-white font-bold px-9 py-4 rounded-full text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2.5 cursor-pointer group"
            >
              <span>预约资深专家咨询</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= 2. QUANTIFIED ACHIEVEMENTS SECTION ================= */}
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

      {/* ================= 3. 核心正文：三品合一方法论 动态信息图展示区域 ================= */}
      {/* 
        设计要求严格落实：
        - 纯净简洁视觉内容承载区，无卡片容器、无圆角边框、无阴影、无外框装饰、无悬浮窗口效果、无背景杂色
        - 大面积横向接近全宽展示，不设明显左右侧边距
        - 纯净自动循环播放 GIF 动态信息图，无播放按钮/控制条等播放器组件
        - 页面空间比例呼应品类创新咨询页节奏，留足舒适上下呼吸空间
      */}
      <section id="sanpinheyi-infographic" className="w-full bg-[#FFFFFF] py-12 md:py-20">
        <div className="w-full px-0 sm:px-2 md:px-4 mx-auto flex items-center justify-center">
          <div className="w-full aspect-[16/9] overflow-hidden">
            <video 
              src="https://github.com/minaxyue-ops/MINA/releases/download/1/2026-08-20.163819.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover block mx-auto select-none"
            />
          </div>
        </div>
      </section>

      {/* ================= 4. METHODOLOGY THREE PILLARS (三品合一核心内涵) ================= */}
      <section className="py-16 md:py-24 border-t border-[#E5E5E5] bg-white text-[#1A1A1A]">
        <div className="max-w-[95%] w-full mx-auto">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12 md:mb-16 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block bg-[#007BC7] text-white text-xs font-mono font-bold px-3 py-0.5 rounded-full shadow-xs">
                THREE PILLARS
              </span>
              <span className="text-xs font-mono font-semibold text-[#007BC7] uppercase tracking-wider">
                三大战略支柱
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display mb-4 text-[#1A1A1A]">
              三品协同：突破企业单点增长天花板
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#4D4D4D]">
              传统设计往往割裂战略、外观与品牌营销。“三品合一”将商业判断、硬件体验与用户心智融为一体，形成相互支撑的高爆发增长飞轮。
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Pillar 1: 品类战略 */}
            <div className="rounded-3xl p-6 sm:p-8 border border-[#E5E5E5] bg-[#F9F9F9] hover:border-[#007BC7]/50 shadow-xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#007BC7] uppercase mb-2">
                PILLAR 01 · 战略导航
              </div>
              <h4 className="text-xl font-bold font-display mb-3 text-[#1A1A1A]">
                品类战略：回答「做什么」
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#666666]">
                通过行业趋势扫描、用户痛点洞察与竞争地图分析，锁定值得全力以赴的细分赛道，制定商业定位与进入策略。
              </p>
              <ul className="space-y-2 text-xs font-medium border-t border-[#E5E5E5] pt-4 text-[#333333]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>品类机会与赛道价值判断</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>差异化商业定位与价值主张</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>产品路线图与定价梯队规划</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: 产品创新 */}
            <div className="rounded-3xl p-6 sm:p-8 border border-[#E5E5E5] bg-[#F9F9F9] hover:border-[#007BC7]/50 shadow-xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#007BC7] uppercase mb-2">
                PILLAR 02 · 体验底座
              </div>
              <h4 className="text-xl font-bold font-display mb-3 text-[#1A1A1A]">
                产品创新：回答「如何被体验」
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#666666]">
                以工业设计为核心牵引，深度融合结构工程、人机交互与供应链制造，把战略概念转化为可量产、高品质的实体产品。
              </p>
              <ul className="space-y-2 text-xs font-medium border-t border-[#E5E5E5] pt-4 text-[#333333]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>标志性工业外观与CMF质感定义</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>精密机械结构与开模可行性工程</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>试产良率攻坚与供应链协同落地</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: 品牌创新 */}
            <div className="rounded-3xl p-6 sm:p-8 border border-[#E5E5E5] bg-[#F9F9F9] hover:border-[#007BC7]/50 shadow-xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#007BC7]/10 text-[#007BC7] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#007BC7] uppercase mb-2">
                PILLAR 03 · 心智认同
              </div>
              <h4 className="text-xl font-bold font-display mb-3 text-[#1A1A1A]">
                品牌创新：回答「如何被选择」
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#666666]">
                建立超级品牌符号与心智表达，通过包装创新、品牌视觉识别体系与传播语言，让产品一上市即具备强烈辨识度与溢价力。
              </p>
              <ul className="space-y-2 text-xs font-medium border-t border-[#E5E5E5] pt-4 text-[#333333]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>品牌话语体系与超级记忆符号</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>爆款包装系统与货架陈列视觉冲击</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007BC7] shrink-0" />
                  <span>全触点视觉传播规范与品牌资产积淀</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
