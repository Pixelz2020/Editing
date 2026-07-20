import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Smartphone, Check, 
  Layers, ThumbsUp, MessageSquare, Share2, Award
} from 'lucide-react';
import { Language } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface CaseStudiesProps {
  lang: Language;
}

export default function CaseStudies({ lang }: CaseStudiesProps) {
  const { siteData } = useSiteConfig();

  if (!siteData.showCaseStudiesSection) return null;

  const activeItems = siteData.caseStudies?.filter(cs => cs.visible) || [];

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const currentActiveId = activeItemId || (activeItems[0]?.id || null);
  const activeItem = activeItems.find(item => item.id === currentActiveId);

  // Handler to scroll to contact section
  const handleStartProject = (e: MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (activeItems.length === 0) {
    return (
      <section className="py-24 bg-transparent relative overflow-hidden" id="cases">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-light">
            {lang === 'ar' ? "لا توجد عناصر هوية بصرية نشطة حالياً." : "No brand identity items active at the moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="cases">
      {/* Absolute glow highlights */}
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[140px] -translate-x-1/2 bg-gradient-to-r from-brand-secondary to-brand-purple" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="brand-identity-label"
          >
            {lang === 'ar' ? "هندسة الهوية البصرية" : "BRAND VISUAL SYSTEM"}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white" id="brand-identity-title">
            {lang === 'ar' ? "هوية بصرية متكاملة وديناميكية" : "Dynamic Integrated Visual Identity"}
          </h2>

          <p className="text-base sm:text-lg text-[#1A0B2E]/85 dark:text-gray-400 font-light leading-relaxed" id="brand-identity-desc">
            {lang === 'ar' 
              ? "نصمم للعلامات التجارية وقنوات السوشيال ميديا حضوراً طاغياً لا يمر مرور الكرام. استكشف النماذج التفاعلية الحقيقية لهوياتنا المصممة." 
              : "We engineer absolute footprints for channels and pages that capture attention instantly. Discover how our active identities look in real scenarios."}
          </p>
        </div>

        {/* Visual Showcase Tab Switcher - Completely Dynamic */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 p-1.5 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.02] dark:border-white/5 rounded-2xl max-w-4xl mx-auto" id="brand-showcase-tabs">
          {activeItems.map((item) => {
            const isActive = currentActiveId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItemId(item.id)}
                className={`flex-1 min-w-[140px] px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white shadow-md'
                    : 'text-[#1A0B2E]/70 dark:text-gray-400 hover:text-[#1A0B2E] dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.01]'
                }`}
                id={`tab-btn-${item.id}`}
              >
                {item.type === 'facebook' ? <Smartphone size={16} /> : <Laptop size={16} />}
                <span>{item.title[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel Area */}
        <div className="relative min-h-[500px]" id="brand-showcase-display">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
              >
                {/* Simulated Web browser header */}
                <div className="bg-black/10 dark:bg-black/40 px-4 py-3 flex items-center gap-2 border-b border-[#1A0B2E]/10 dark:border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="mx-auto w-1/2 md:w-1/3 bg-black/10 dark:bg-white/5 rounded-full text-[10px] md:text-xs text-center text-[#1A0B2E]/60 dark:text-gray-500 py-1 font-mono truncate">
                    {activeItem.type === 'facebook' 
                      ? `facebook.com/${activeItem.title[lang].toLowerCase().replace(/[^a-z0-9]/g, '') || 'page'}`
                      : `youtube.com/c/${activeItem.title[lang].toLowerCase().replace(/[^a-z0-9]/g, '') || 'channel'}`
                    }
                  </div>
                </div>

                {/* Cover Banner with hover preview */}
                <div className="relative aspect-[31/10] md:aspect-[3/1] bg-brand-dark overflow-hidden group">
                  <img
                    src={activeItem.coverUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                    alt="Cover Banner"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Widescreen visual tag */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1 text-[10px] font-mono text-brand-secondary flex items-center gap-1.5 font-bold shadow-md">
                    <Layers size={10} />
                    <span>{lang === 'ar' ? "غلاف بانورامي بدقة 4K" : "4K Panoramic Banner"}</span>
                  </div>
                </div>

                {/* Dynamic Facebook Layout */}
                {activeItem.type === 'facebook' && (
                  <div className="px-6 md:px-10 pb-8 pt-4 relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 md:-mt-24 mb-6 gap-4 border-b border-[#1A0B2E]/10 dark:border-white/5 pb-6">
                      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-start">
                        
                        {/* Avatar Profile */}
                        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-brand-dark p-1 bg-gradient-to-tr from-[#FF2D7A] to-[#FF8A00] shadow-2xl relative z-20 overflow-hidden">
                          <img
                            src={activeItem.logoUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"}
                            alt="Logo Profile"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full border-2 border-[#1A0B2E] dark:border-brand-dark"
                          />
                        </div>

                        {/* Name & verification */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <h3 className="text-xl md:text-2xl font-display font-black text-[#1A0B2E] dark:text-white">
                              {activeItem.title[lang]}
                            </h3>
                            <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                              <Check size={12} className="stroke-[3.5]" />
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-brand-purple dark:text-brand-secondary font-semibold font-mono">
                            {lang === 'ar' ? "@الهوية_الاحترافية" : "@PremiumVisualIdentity"}
                          </p>
                          <div className="flex items-center gap-2 justify-center md:justify-start text-xs text-gray-400 font-medium">
                            <span>{activeItem.metrics[lang] || "+450% Engagement"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Meta Action Triggers */}
                      <div className="flex items-center justify-center gap-3">
                        <a
                          href="#contact"
                          onClick={handleStartProject}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white text-xs font-extrabold hover:opacity-95 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                        >
                          {lang === 'ar' ? "ابدأ مشروعك" : "Start Project"}
                        </a>
                        <button className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[#1A0B2E]/10 dark:border-white/10 text-[#1A0B2E] dark:text-white hover:bg-white/10 transition-colors">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Post showcase container */}
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                      <div className="w-full">
                        <div className="bg-black/5 dark:bg-white/[0.01] border border-[#1A0B2E]/10 dark:border-white/5 p-6 rounded-2xl space-y-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={activeItem.logoUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"}
                              alt="Avatar mini"
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-xs md:text-sm text-[#1A0B2E] dark:text-white block">{activeItem.title[lang]}</span>
                              <span className="text-[10px] text-gray-500 font-mono">Just Now • Public</span>
                            </div>
                          </div>
                          
                          <p className="text-xs md:text-sm text-[#1A0B2E]/90 dark:text-gray-300 font-light leading-relaxed">
                            {activeItem.postText?.[lang] || (lang === 'ar' 
                              ? "متحمسون لمشاركة تصميم الغلاف الجديد معكم! قمنا بدمج درجات النيون الفاخرة مع الأيقونات ثلاثية الأبعاد لخلق انطباع بصري استثنائي ⚡️" 
                              : "Excited to share our brand-new page design! Combining high-intensity neon gradients with 3D fluid glass textures to lock viewer engagement.")
                            }
                          </p>

                          <div className="rounded-xl overflow-hidden aspect-video relative group border border-white/5 bg-black/40">
                            <img
                              src={activeItem.mediaUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                              alt="Post Media"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Social interactions */}
                          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-[#1A0B2E]/5 dark:border-white/5 pt-3">
                            <button className="flex items-center gap-1.5 hover:text-brand-purple dark:hover:text-brand-secondary font-bold">
                              <ThumbsUp size={14} />
                              <span>1.2K</span>
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-brand-purple dark:hover:text-brand-secondary font-bold">
                              <MessageSquare size={14} />
                              <span>48 Comments</span>
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-brand-purple dark:hover:text-brand-secondary font-bold">
                              <Share2 size={14} />
                              <span>150 Shares</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic YouTube Layout */}
                {activeItem.type === 'youtube' && (
                  <div className="px-6 md:px-10 pb-8 pt-6">
                    {/* Channel info block */}
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-start border-b border-[#1A0B2E]/10 dark:border-white/5 pb-8 mb-8">
                      <img
                        src={activeItem.logoUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"}
                        alt="Channel Avatar"
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/10 shadow-xl"
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <h3 className="text-xl md:text-2xl font-display font-black text-[#1A0B2E] dark:text-white">
                            {activeItem.title[lang]}
                          </h3>
                          <span className="w-4.5 h-4.5 rounded-full bg-gray-500/30 flex items-center justify-center text-white">
                            <Check size={10} className="stroke-[3.5]" />
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs text-gray-400 font-mono font-medium">
                          <span>@PremiumYouTubeChannel</span>
                          <span>•</span>
                          <span>{activeItem.metrics[lang] || "+14.2% CTR"}</span>
                        </div>
                        <p className="text-xs text-gray-500 max-w-xl font-light">
                          {activeItem.postText?.[lang] || (lang === 'ar'
                            ? "هوية بصرية متكاملة: من اللوجو ثلاثي الأبعاد إلى الأغلفة والفيديوهات الحركية عالية الاحتفاظ بالجمهور."
                            : "A comprehensive brand ecosystem: from 3D logos to high-retention covers and cinematic edits.")
                          }
                        </p>
                      </div>
                      <div>
                        <button className="px-6 py-2.5 rounded-full bg-white text-black font-black text-xs hover:bg-white/90 shadow-md">
                          {lang === 'ar' ? "اشترك الآن" : "Subscribe"}
                        </button>
                      </div>
                    </div>

                    {/* Featured Video Embed and Metadata */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8 space-y-4">
                        <h4 className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary font-bold">
                          {lang === 'ar' ? "العرض السينمائي المميز" : "FEATURED CONTENT TRAILER"}
                        </h4>
                        
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeItem.mediaUrl || 'ScMzIvxBSi4'}?autoplay=0&mute=0`}
                            title="Featured YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      {/* Design specs sidebar */}
                      <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                        <div className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 p-6 rounded-2xl space-y-4">
                          <h4 className="text-sm font-bold text-[#1A0B2E] dark:text-white flex items-center gap-2 border-b border-[#1A0B2E]/5 dark:border-white/5 pb-2">
                            <Award size={16} className="text-brand-secondary" />
                            <span>{lang === 'ar' ? "معايير تصميم الهوية" : "Brand Identity Specs"}</span>
                          </h4>
                          <div className="space-y-3 text-xs text-[#1A0B2E]/90 dark:text-gray-300 leading-relaxed">
                            <p>
                              <strong>{lang === 'ar' ? "التناغم اللوني:" : "Color harmony:"}</strong>{' '}
                              {activeItem.accentColor ? (
                                <span className="px-2 py-0.5 rounded text-[10px]" style={{ backgroundColor: `${activeItem.accentColor}20`, color: activeItem.accentColor }}>
                                  {activeItem.accentColor}
                                </span>
                              ) : "Hex Accent"}
                            </p>
                            <p>
                              <strong>{lang === 'ar' ? "الخطوط والعناصر:" : "Branding Guidelines:"}</strong>{' '}
                              {activeItem.tools?.join(', ') || 'Photoshop, After Effects'}
                            </p>
                            <p>
                              <strong>{lang === 'ar' ? "النتائج المحققة:" : "Deliverables & Results:"}</strong>{' '}
                              {activeItem.results?.[lang]?.join(' • ') || 'CTR Increase'}
                            </p>
                          </div>
                        </div>

                        {/* Order package box */}
                        <div className="p-5 bg-gradient-to-tr from-[#FF2D7A]/10 to-[#FF8A00]/10 border border-[#FF2D7A]/20 rounded-2xl">
                          <h4 className="text-xs font-black text-[#1A0B2E] dark:text-white uppercase mb-2">
                            {lang === 'ar' ? "طلب باقة هوية كاملة" : "Order Complete Brand Suite"}
                          </h4>
                          <a
                            href="#contact"
                            onClick={handleStartProject}
                            className="w-full text-center block px-4 py-2 rounded-xl bg-white text-black font-black text-[11px] shadow hover:bg-white/90 transition-all cursor-pointer"
                          >
                            {lang === 'ar' ? "تواصل معنا" : "Secure Package"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
