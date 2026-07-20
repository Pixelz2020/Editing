import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Smartphone, Flame, Maximize2, X, Film, Youtube } from 'lucide-react';
import { Language } from '../types';
import { playAudio } from '../utils/audio';
import { useSiteConfig } from '../context/SiteConfigContext';

interface PortfolioProps {
  lang: Language;
}

// 3 High-quality short vertical videos (9:16 format)
const reelsList = [
  {
    id: "reel1",
    videoId: "vT1_g9Qo46M",
    title: {
      ar: "سيكولوجية تصميم الفيديوهات القصيرة",
      en: "Psychology of Short-Form Design"
    }
  },
  {
    id: "reel2",
    videoId: "kM9fK5MuxwY",
    title: {
      ar: "المونتاج الحركي وسرعة خطف الانتباه",
      en: "Kinetic Editing & Instant Hook Secrets"
    }
  },
  {
    id: "reel3",
    videoId: "L_LUpndgGPM",
    title: {
      ar: "صناعة الإنترو والهوية الصوتية",
      en: "Sonic Branding & Animated Intros"
    }
  }
];

// 4 High-quality long-form YouTube videos (16:9 format)
const youtubeList = [
  {
    id: "yt1",
    videoId: "ScMzIvxBSi4",
    title: {
      ar: "وثائقي صناعة العطور الفاخرة",
      en: "Luxury Perfume Craft Documentary"
    },
    desc: {
      ar: "مونتاج سينمائي احترافي يروي قصة العلامة التجارية مع تصحيح ألوان فاخر ومؤثرات صوتية محيطية.",
      en: "Professional cinematic editing narrating the brand history with high-end color grading and immersive sound design."
    },
    result: {
      ar: "مليون مشاهدة +85%",
      en: "+85% Retention Rate"
    }
  },
  {
    id: "yt2",
    videoId: "S_6L-G-gL_U",
    title: {
      ar: "مراجعة وحش الألعاب والتجميعة الخارقة",
      en: "Gaming PC Build & Ultimate Setup"
    },
    desc: {
      ar: "مونتاج سريع وحيوي يستهدف جمهور الجيمرز بأسلوب تقطيع سريع ومؤثرات بصرية جذابة.",
      en: "Fast-paced dynamic review targeting gamers with rapid edits, graphics overlays, and neon accents."
    },
    result: {
      ar: "250 ألف مشاهدة",
      en: "250K+ Views"
    }
  },
  {
    id: "yt3",
    videoId: "dQw4w9WgXcQ",
    title: {
      ar: "أسرار نمو القنوات التقنية وتصدر الخوارزميات",
      en: "Algorithm Mastery & Channel Growth Secrets"
    },
    desc: {
      ar: "فيديو طويل بأسلوب السرد القصصي التعليمي مع رسوم توضيحية لزيادة متوسط مدة المشاهدة.",
      en: "Educational storytelling with motion graphics overlays designed to maximize audience watch time."
    },
    result: {
      ar: "+210% زيادة تفاعل",
      en: "+210% Engagement Growth"
    }
  },
  {
    id: "yt4",
    videoId: "gH86W6Y5M1Y",
    title: {
      ar: "عينة المونتاج السينمائي والتحرير الإبداعي",
      en: "Cinema Editing & Visual FX Portfolio"
    },
    desc: {
      ar: "مجموعة منتقاة من لقطات المؤثرات البصرية وتنسيق المشاهد الدرامية لمشاهد تخطف الأنفاس.",
      en: "A compiled sequence showing seamless sound synchronization, match cuts, and visual effects workflows."
    },
    result: {
      ar: "جودة هوليوود 4K",
      en: "4K Hollywood Standard"
    }
  }
];

export default function Portfolio({ lang }: PortfolioProps) {
  const { siteData } = useSiteConfig();

  if (!siteData.showPortfolioSection) return null;

  // Dynamically filter active items from configuration state
  const reelsList = siteData.portfolioProjects
    .filter(p => p.category === 'reels' && p.visible !== false)
    .map(p => ({
      ...p,
      videoId: p.mediaUrl
    }));
  const youtubeList = siteData.portfolioProjects
    .filter(p => p.category === 'youtube' && p.visible !== false)
    .map(p => ({
      ...p,
      videoId: p.mediaUrl
    }));

  const [activeTab, setActiveTab] = useState<'reels' | 'youtube'>('reels');
  
  // Reels mobile index tracker
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  
  // YouTube mobile index tracker
  const [activeYTIndex, setActiveYTIndex] = useState(0);

  // Fullscreen Cinema Lightbox
  const [lightboxVideoId, setLightboxVideoId] = useState<string | null>(null);

  const handleNextReel = () => {
    playAudio.playClick();
    setActiveReelIndex((prev) => (prev + 1) % reelsList.length);
  };

  const handlePrevReel = () => {
    playAudio.playClick();
    setActiveReelIndex((prev) => (prev - 1 + reelsList.length) % reelsList.length);
  };

  const handleNextYT = () => {
    playAudio.playClick();
    setActiveYTIndex((prev) => (prev + 1) % youtubeList.length);
  };

  const handlePrevYT = () => {
    playAudio.playClick();
    setActiveYTIndex((prev) => (prev - 1 + youtubeList.length) % youtubeList.length);
  };

  return (
    <section className="py-24 bg-transparent relative border-t border-white/5 overflow-hidden" id="work">
      {/* Accent glow background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full glow-spot-secondary opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full glow-spot-gold opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-secondary text-xs font-semibold font-mono tracking-wider"
          >
            <Film size={12} className="text-brand-secondary" />
            <span>{lang === 'ar' ? "معرض الروائع والأعمال" : "PORTFOLIO & WORK"}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-white"
          >
            {lang === 'ar' ? "صناعة تضمن الصدارة" : "Masterpieces Built to Dominate"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-light max-w-2xl mx-auto text-base sm:text-lg"
          >
            {lang === 'ar' 
              ? "استعرض عينات من مخرجات ستوديو بيكسلز الإبداعية مقسمة بين الفيديوهات الطويلة والقصيرة."
              : "Explore handpicked cinematic work across short vertical reels and long-form YouTube productions."}
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16" id="portfolio-tab-switcher">
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex items-center gap-1.5 backdrop-blur-md">
            <button
              onClick={() => {
                playAudio.playClick();
                setActiveTab('reels');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'reels'
                  ? 'bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white shadow-lg shadow-brand-secondary/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone size={16} />
              <span>{lang === 'ar' ? "ريلز وشورتس" : "Reels & Shorts"}</span>
            </button>

            <button
              onClick={() => {
                playAudio.playClick();
                setActiveTab('youtube');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white shadow-lg shadow-brand-secondary/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Youtube size={16} />
              <span>{lang === 'ar' ? "يوتيوب" : "YouTube Videos"}</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'reels' ? (
            <motion.div
              key="reels-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {reelsList.length > 0 ? (
                <>
                  {/* DESKTOP VIEW: 3 Phones Side-by-Side */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-8 justify-center items-center max-w-5xl mx-auto">
                    {reelsList.map((reel) => (
                      <PhoneFrame 
                        key={reel.id} 
                        videoId={reel.videoId} 
                        title={reel.title[lang]} 
                        lang={lang}
                        onMaximize={() => setLightboxVideoId(reel.videoId)}
                      />
                    ))}
                  </div>

                  {/* MOBILE VIEW: 1 Phone with Left/Right Arrows */}
                  <div className="lg:hidden flex items-center justify-between gap-4 max-w-[340px] mx-auto relative px-2">
                    <button
                      onClick={handlePrevReel}
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none shrink-0"
                      aria-label="Previous Reel"
                    >
                      <ArrowLeft size={20} className="rtl:rotate-180" />
                    </button>

                    <div className="flex-1 flex justify-center">
                      <PhoneFrame 
                        key={reelsList[activeReelIndex]?.id || 'fallback-reel'}
                        videoId={reelsList[activeReelIndex]?.videoId || ''}
                        title={reelsList[activeReelIndex]?.title?.[lang] || ''}
                        lang={lang}
                        onMaximize={() => setLightboxVideoId(reelsList[activeReelIndex]?.videoId || '')}
                      />
                    </div>

                    <button
                      onClick={handleNextReel}
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none shrink-0"
                      aria-label="Next Reel"
                    >
                      <ArrowRight size={20} className="rtl:rotate-180" />
                    </button>
                  </div>

                  {/* Mobile pagination indicators */}
                  <div className="lg:hidden flex justify-center gap-1.5 mt-6">
                    {reelsList.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeReelIndex === idx ? 'bg-brand-secondary w-4' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 text-xs font-mono">
                  {lang === 'ar' ? 'لا توجد فيديوهات ريلز معروضة حالياً.' : 'No reels currently showcased.'}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="youtube-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {youtubeList.length > 0 ? (
                <>
                  {/* DESKTOP VIEW: 2x2 Video Grid */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {youtubeList.map((video) => (
                      <YouTubeCard 
                        key={video.id}
                        videoId={video.videoId}
                        title={video.title[lang]}
                        desc={video.desc[lang]}
                        result={video.result[lang]}
                        lang={lang}
                        onMaximize={() => setLightboxVideoId(video.videoId)}
                      />
                    ))}
                  </div>

                  {/* MOBILE VIEW: Vertical flipping with Up/Down Arrows */}
                  <div className="lg:hidden flex flex-col items-center gap-4 max-w-[420px] mx-auto relative px-2">
                    {/* Up Arrow */}
                    <button
                      onClick={handlePrevYT}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none"
                      aria-label="Previous Video"
                    >
                      <ArrowUp size={18} />
                    </button>

                    <div className="w-full">
                      <YouTubeCard 
                        key={youtubeList[activeYTIndex]?.id || 'fallback-yt'}
                        videoId={youtubeList[activeYTIndex]?.videoId || ''}
                        title={youtubeList[activeYTIndex]?.title?.[lang] || ''}
                        desc={youtubeList[activeYTIndex]?.desc?.[lang] || ''}
                        result={youtubeList[activeYTIndex]?.result?.[lang] || ''}
                        lang={lang}
                        onMaximize={() => setLightboxVideoId(youtubeList[activeYTIndex]?.videoId || '')}
                      />
                    </div>

                    {/* Down Arrow */}
                    <button
                      onClick={handleNextYT}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer select-none"
                      aria-label="Next Video"
                    >
                      <ArrowDown size={18} />
                    </button>

                    {/* Mobile indicators */}
                    <div className="flex justify-center gap-1.5 mt-2">
                      {youtubeList.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            activeYTIndex === idx ? 'bg-brand-secondary w-3' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 text-xs font-mono">
                  {lang === 'ar' ? 'لا توجد فيديوهات يوتيوب معروضة حالياً.' : 'No YouTube videos currently showcased.'}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox / Cinema Modal */}
      <AnimatePresence>
        {lightboxVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setLightboxVideoId(null)}
            id="portfolio-lightbox-modal"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxVideoId(null)}
              className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full transition-all duration-200 z-[60]"
              aria-label="Close modal"
              id="close-portfolio-lightbox"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${lightboxVideoId}?autoplay=1&mute=0&controls=1`}
                title="Cinematic Project Playback"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                id="portfolio-lightbox-iframe"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --------------------------------------------------------
// PHONE FRAME COMPONENT
// --------------------------------------------------------
interface PhoneFrameProps {
  key?: any;
  videoId: string;
  title: string;
  lang: Language;
  onMaximize: () => void;
}

function PhoneFrame({ videoId, title, lang, onMaximize }: PhoneFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-[260px] mx-auto aspect-[9/18.5] rounded-[42px] bg-[#0c0517] border-[6px] border-[#1e0a35] shadow-[0_0_35px_rgba(255,45,122,0.12)] hover:shadow-[0_0_50px_rgba(255,45,122,0.22)] hover:border-brand-secondary/30 overflow-hidden group transition-all duration-500">
      
      {/* Speaker / Camera Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-900/30 mr-1.5" />
        <div className="w-10 h-0.5 bg-white/10 rounded-full" />
      </div>

      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute inset-0 z-10"
        />
      ) : (
        <div 
          onClick={() => {
            playAudio.playClick();
            setIsPlaying(true);
          }}
          className="w-full h-full absolute inset-0 cursor-pointer flex items-center justify-center bg-cover bg-center z-10"
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/0.jpg)` }}
        >
          {/* Dark overlay with hover transitions */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-colors duration-300" />
          
          {/* Glowing Play Icon with custom interactive ripple */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF2D7A] to-[#FF8A00] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative">
            <Play size={20} className="fill-white translate-x-0.5" />
          </div>

          {/* Title banner */}
          <div className="absolute bottom-8 left-4 right-4 text-center z-20">
            <p className="text-xs font-semibold text-white leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {title}
            </p>
          </div>
        </div>
      )}

      {/* Maximize Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        className="absolute bottom-4 right-4 p-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/15 hover:text-[#FF2D7A] transition-all z-20 cursor-pointer"
        title={lang === 'ar' ? "عرض ملء الشاشة" : "Cinema mode"}
      >
        <Maximize2 size={12} />
      </button>
    </div>
  );
}

// --------------------------------------------------------
// YOUTUBE VIDEO CARD COMPONENT
// --------------------------------------------------------
interface YouTubeCardProps {
  key?: any;
  videoId: string;
  title: string;
  desc: string;
  result: string;
  lang: Language;
  onMaximize: () => void;
}

function YouTubeCard({ videoId, title, desc, result, lang, onMaximize }: YouTubeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-[#FF2D7A]/20 transition-all duration-300 group flex flex-col h-full">
      
      {/* 16:9 Screen container */}
      <div className="relative aspect-video bg-black overflow-hidden shrink-0">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute inset-0 z-10"
          />
        ) : (
          <div 
            onClick={() => {
              playAudio.playClick();
              setIsPlaying(true);
            }}
            className="w-full h-full absolute inset-0 cursor-pointer flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/0.jpg)` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300" />
            
            {/* Glowing Play Button */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2D7A] to-[#FF8A00] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play size={24} className="fill-white translate-x-0.5" />
            </div>

            {/* Metric Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary text-xs font-mono font-bold rounded-full">
                <Flame size={12} className="fill-brand-secondary" />
                <span>{result}</span>
              </span>
            </div>
          </div>
        )}

        {/* Maximize Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/15 hover:text-[#FF2D7A] transition-all z-20 cursor-pointer"
          title={lang === 'ar' ? "عرض بملء الشاشة" : "Cinema Fullscreen"}
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Details info */}
      <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-secondary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-light line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
