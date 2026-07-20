import { motion } from 'motion/react';
import { Film, Video, Play, Sparkles, Award, Star } from 'lucide-react';
import { Language } from '../types';

interface MarqueeProps {
  lang: Language;
}

export default function Marquee({ lang }: MarqueeProps) {
  const items = [
    { name: "YouTube", icon: Play },
    { name: "Adobe Premiere", icon: Film },
    { name: "After Effects", icon: Sparkles },
    { name: "DaVinci Resolve", icon: Video },
    { name: "TikTok", icon: Star },
    { name: "Cinema 4D", icon: Award },
    { name: "Instagram Reels", icon: Play },
    { name: "Photoshop CC", icon: Sparkles },
  ];

  return (
    <section className="bg-black/10 dark:bg-black/40 py-8 border-y border-[#1A0B2E]/10 dark:border-white/5 overflow-hidden" id="marquee-section">
      <div className="max-w-7xl mx-auto px-4 mb-3">
        <p className="text-center text-xs font-mono tracking-widest text-[#1A0B2E]/70 dark:text-gray-500 uppercase font-bold">
          {lang === 'ar' ? "المنصات والأدوات المستخدمة في الصناعة" : "TRUSTED PLATFORMS & PRODUCTION TOOLS"}
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full">
        {/* Left and Right blur gradients for cinema focus */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FFD166] dark:from-[#1A0B2E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FFD166] dark:from-[#1A0B2E] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max" id="marquee-scroll-container">
          {/* First loop track */}
          <motion.div
            animate={{ x: lang === 'ar' ? ['0%', '-100%'] : ['-100%', '0%'] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap gap-8 items-center py-4 px-4 flex-shrink-0"
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`track1-${idx}`}
                  className="flex items-center gap-3 px-6 py-2.5 bg-black/5 border border-[#1A0B2E]/5 dark:bg-white/[0.02] dark:border-white/5 rounded-full"
                >
                  <Icon size={16} className="text-brand-secondary" />
                  <span className="font-mono text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 tracking-wide">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Second identical loop track to cover the gap for seamless looping */}
          <motion.div
            animate={{ x: lang === 'ar' ? ['0%', '-100%'] : ['-100%', '0%'] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap gap-8 items-center py-4 px-4 flex-shrink-0"
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`track2-${idx}`}
                  className="flex items-center gap-3 px-6 py-2.5 bg-black/5 border border-[#1A0B2E]/5 dark:bg-white/[0.02] dark:border-white/5 rounded-full"
                >
                  <Icon size={16} className="text-brand-secondary" />
                  <span className="font-mono text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 tracking-wide">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
