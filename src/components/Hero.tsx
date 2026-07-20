import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, Play, X, Award, Shield, Clock, Film, 
  Sliders, Activity, Sparkles, Cpu, Smartphone, Volume2, Send
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { Language } from '../types';
import { playAudio } from '../utils/audio';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeroProps {
  lang: Language;
  isStarted: boolean;
}

export default function Hero({ lang, isStarted }: HeroProps) {
  const { siteData } = useSiteConfig();
  const [showModal, setShowModal] = useState(false);
  const timecode = "01:24:42:09";

  // Slogan splitting and custom directional animations
  const sloganSegments = lang === 'ar' 
    ? ["رؤية سينمائية", "تصنع الصدارة", "لمحتواك"] 
    : ["Cinematic Vision.", "Absolute", "Command."];

  useEffect(() => {
    if (!isStarted) return;

    // Play electronic swipe sounds synchronized perfectly with each line's entering transition
    const timer1 = setTimeout(() => {
      playAudio.playSloganSwipe();
    }, 300);

    const timer2 = setTimeout(() => {
      playAudio.playSloganSwipe();
    }, 950);

    const timer3 = setTimeout(() => {
      playAudio.playSloganSwipe();
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [lang, isStarted]);

  const getDirectionVariant = (index: number) => {
    switch(index) {
      case 0:
        return {
          hidden: { opacity: 0, x: -100, y: -10, rotate: -2, filter: 'blur(15px)', scale: 0.95, textShadow: '0 0 20px rgba(255,255,255,0.8)' },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            rotate: 0, 
            filter: 'blur(0px)', 
            scale: 1,
            textShadow: '0 0 0px rgba(255,255,255,0)',
            transition: { type: 'spring', damping: 20, stiffness: 85, delay: 0.3 }
          }
        };
      case 1:
        return {
          hidden: { opacity: 0, x: 100, y: 10, rotate: 2, filter: 'blur(15px)', scale: 0.95, textShadow: '0 0 20px rgba(255,255,255,0.8)' },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            rotate: 0, 
            filter: 'blur(0px)', 
            scale: 1,
            textShadow: '0 0 0px rgba(255,255,255,0)',
            transition: { type: 'spring', damping: 20, stiffness: 85, delay: 0.95 }
          }
        };
      case 2:
      default:
        return {
          hidden: { opacity: 0, x: 0, y: 80, rotate: 0, filter: 'blur(20px)', scale: 0.9, textShadow: '0 0 30px rgba(255,255,255,0.9)' },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            rotate: 0, 
            filter: 'blur(0px)', 
            scale: 1,
            textShadow: '0 0 0px rgba(255,255,255,0)',
            transition: { type: 'spring', damping: 20, stiffness: 85, delay: 1.6 }
          }
        };
    }
  };

  // Fallback copy in case the placeholders aren't replaced
  const tagline = siteConfig.copy.hero.tagline[lang] === "{{TAGLINE}}"
    ? (lang === 'ar' 
        ? "رؤية سينمائية تصنع الصدارة لمحتواك" 
        : "Cinematic Vision. Absolute Command.")
    : siteConfig.copy.hero.tagline[lang];

  const shortDesc = siteConfig.copy.hero.shortDesc[lang] === "{{SHORT_DESC}}"
    ? (lang === 'ar'
        ? "ستوديو متخصص في المونتاج السينمائي، تصميم الحركة، وصناعة الهوية البصرية المتكاملة لمنشئي المحتوى والعلامات التجارية الطموحة."
        : "A specialized studio crafting cinematic video editing, custom motion design, and complete visual identities for ambitious creators and brands.")
    : siteConfig.copy.hero.shortDesc[lang];

  // Prefilled WhatsApp link
  const whatsappUrl = `https://wa.me/${siteData.contactWhatsApp}?text=${encodeURIComponent(
    lang === 'ar' ? "مرحباً، أود بدء مشروعي الإبداعي الجديد معكم!" : "Hi, I'd like to initiate my new creative project with you!"
  )}`;

  // Showreel embed URL loaded dynamically from site config state
  const showreelEmbed = siteData.showreelUrl || "https://www.youtube.com/embed/gH86W6Y5M1Y";

  const statsList = [
    { value: `+${siteData.stats.projectsCount}`, label: { ar: "مشروع مُكتمل", en: "Completed Projects" } },
    { value: `+${siteData.stats.clientsCount}`, label: { ar: "شريك نجاح", en: "Happy Clients" } },
    { value: `${siteData.stats.platformsCount}`, label: { ar: "منصات توزيع", en: "Target Platforms" } },
    { value: `${siteData.stats.avgDeliveryDays} ${lang === 'ar' ? 'أيام' : 'Days'}`, label: { ar: "متوسط التسليم", en: "Avg. Delivery" } },
  ];

  const handleOpenShowreel = () => {
    playAudio.playClick();
    setShowModal(true);
  };

  /**
   * LIGHTWEIGHT SHOWREEL INLINE PLAYER
   */
  const SimpleShowreel = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <div className="relative w-full py-4 flex justify-center" id="simple-showreel-wrapper">
        <div className="relative w-full max-w-[480px] aspect-video rounded-2xl bg-black border border-white/10 shadow-[0_0_30px_rgba(255,45,122,0.15)] overflow-hidden group">
          {isPlaying ? (
            <iframe
              src={`${showreelEmbed}&autoplay=1`}
              title="Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full absolute inset-0"
              id="showreel-iframe-inline"
            />
          ) : (
            <div 
              onClick={() => {
                playAudio.playClick();
                setIsPlaying(true);
              }}
              className="w-full h-full absolute inset-0 cursor-pointer flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600")' }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/55 transition-colors" />
              
              {/* Play button with click interaction */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play size={24} className="fill-white translate-x-0.5" />
              </div>

              {/* Text label */}
              <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                <p className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-secondary font-bold uppercase">
                  {lang === 'ar' ? "اضغط لتشغيل شو ريل الاستوديو" : "CLICK TO PLAY STUDIO SHOWREEL"}
                </p>
              </div>
            </div>
          )}

          {/* Direct Maximize Button (opens lightbox modal for cinematic theater style) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenShowreel();
            }}
            className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md border border-white/15 rounded-lg text-white hover:bg-white/10 hover:text-[#FF2D7A] transition-all z-20 cursor-pointer flex items-center gap-1 text-[10px] font-mono"
            title={lang === 'ar' ? "عرض بملء الشاشة" : "Maximize view"}
          >
            <span>{lang === 'ar' ? "تكبير" : "Maximize"}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-transparent min-h-screen flex flex-col justify-center" id="hero-section">
      {/* Dynamic ambient mesh highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full glow-spot-secondary -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full glow-spot-gold translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Layout Area */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-start flex flex-col justify-center">
            
            {/* Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-secondary text-sm font-semibold mx-auto lg:mx-0 w-fit"
              id="hero-intro-pill"
            >
              <Film size={14} />
              <span>{lang === 'ar' ? "ستوديو مونتاج وهوية سينمائية" : "Cinematic Video & Identity Studio"}</span>
            </motion.div>

            {/* Main Headline Tagline */}
            <h1
              className={`${
                lang === 'ar'
                  ? 'text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-slogan-ar'
                  : 'text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-slogan-en'
              } font-black tracking-tight text-white leading-[1.25] lg:leading-[1.15] flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-start gap-y-3 sm:gap-x-4 sm:gap-y-3 overflow-visible`}
              id="hero-main-title"
            >
              {sloganSegments.map((segment, idx) => {
                const variant = getDirectionVariant(idx);
                return (
                  <motion.span
                    key={idx}
                    variants={variant}
                    initial="hidden"
                    animate={isStarted ? "visible" : "hidden"}
                    className="inline-block origin-center whitespace-normal sm:whitespace-nowrap text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    {segment}
                  </motion.span>
                );
              })}
            </h1>

            {/* MOBILE ONLY: Simple showreel inline video frame */}
            <div className="block lg:hidden" id="hero-mobile-3d-deck">
              <SimpleShowreel />
            </div>

            {/* Studio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              id="hero-description"
            >
              {shortDesc}
            </motion.p>

            {/* CTAs with playAudio interaction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              id="hero-cta-group"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playAudio.playClick();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                onMouseEnter={() => playAudio.playHover()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white font-extrabold text-base shadow-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                id="hero-cta-whatsapp"
              >
                <Send size={18} />
                <span>{siteConfig.copy.hero.ctaPrimary[lang]}</span>
              </a>

              <a
                href="#work"
                onClick={() => playAudio.playClick()}
                onMouseEnter={() => playAudio.playHover()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
                id="hero-cta-portfolio"
              >
                <span>{siteConfig.copy.hero.ctaSecondary[lang]}</span>
              </a>
            </motion.div>

            {/* Micro assurances trust row */}
            {siteData.showFeaturesSection && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10"
                id="hero-trust-indicators"
              >
                {siteData.featuresList.filter(f => f.visible !== false).map((feat, idx) => {
                  const borderColors = ['hover:border-[#FF2D7A]/40 hover:bg-[#FF2D7A]/5', 'hover:border-[#FF8A00]/40 hover:bg-[#FF8A00]/5', 'hover:border-brand-purple/40 hover:bg-brand-purple/5'];
                  const iconColors = ['bg-[#FF2D7A]/15 text-[#FF2D7A]', 'bg-[#FF8A00]/15 text-[#FF8A00]', 'bg-brand-purple/20 text-[#D8B4FE]'];
                  const borderClass = borderColors[idx % borderColors.length];
                  const iconClass = iconColors[idx % iconColors.length];

                  return (
                    <motion.div 
                      key={feat.id}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 ${borderClass} transition-all duration-300 shadow-md`}
                    >
                      <div className={`p-2 rounded-xl ${iconClass} shrink-0`}>
                        {feat.icon === 'Shield' ? <Shield size={18} /> : feat.icon === 'Clock' ? <Clock size={18} /> : <Award size={18} />}
                      </div>
                      <div className="text-right sm:text-start">
                        <p className="text-xs font-bold text-white leading-tight">
                          {feat.title[lang]}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {feat.desc[lang]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* DESKTOP ONLY: Optimized Showreel (5 columns) */}
          <div className="hidden lg:block lg:col-span-5 relative" id="hero-desktop-3d-deck">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <SimpleShowreel />
            </motion.div>
          </div>

        </div>

        {/* Mini Stats Table */}
        {siteData.showHeroStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
            id="hero-stats-row"
          >
            {statsList.map((stat, idx) => (
              <div key={idx} className="text-center md:text-start" id={`stat-item-${idx}`}>
                <div className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1 font-semibold">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Showreel Lightbox Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setShowModal(false)}
            id="showreel-modal-backdrop"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full transition-all duration-200"
              aria-label="Close modal"
              id="close-showreel-modal"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              id="showreel-modal-content"
            >
              <iframe
                src={showreelEmbed}
                title="Cinematic Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                id="showreel-iframe"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
