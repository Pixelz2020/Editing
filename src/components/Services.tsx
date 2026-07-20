import React from 'react';
import { motion } from 'motion/react';
import { Film, Tv, Image, Sparkles, Briefcase, Share2, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { siteConfig } from '../config/site';

interface ServicesProps {
  lang: Language;
}

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Film: Film,
  Tv: Tv,
  Image: Image,
  Sparkles: Sparkles,
  Briefcase: Briefcase,
  Share2: Share2,
};

export default function Services({ lang }: ServicesProps) {
  const { siteData } = useSiteConfig();

  if (!siteData.showServicesSection) return null;

  // Load from dynamic SiteConfigContext state
  const servicesTitle = siteConfig.copy.services.title[lang];
  const servicesSubtitle = siteConfig.copy.services.subtitle[lang];
  const serviceItems = siteData.servicesList.filter(item => item.visible !== false);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="services">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full glow-spot-purple -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="services-header-label"
          >
            {lang === 'ar' ? "القدرات الإبداعية" : "CREATIVE CAPABILITIES"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white"
            id="services-header-title"
          >
            {servicesTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#1A0B2E]/80 dark:text-gray-400 font-light"
            id="services-header-desc"
          >
            {servicesSubtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="services-grid-container">
          {serviceItems.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative flex flex-col justify-between p-6 md:p-8 bg-black/5 dark:bg-white/[0.02] border border-[#1A0B2E]/10 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/[0.04] hover:border-[#1A0B2E]/20 dark:hover:border-white/10 rounded-2xl transition-all duration-300 group shadow-sm"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 flex items-center justify-center text-brand-purple dark:text-brand-secondary group-hover:bg-gradient-to-r group-hover:from-[#FF2D7A] group-hover:to-[#FF8A00] group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300" id={`service-icon-box-${service.id}`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Copy */}
                  <h3 className="text-xl font-display font-bold text-[#1A0B2E] dark:text-white mt-6 group-hover:text-brand-secondary transition-colors duration-200" id={`service-title-${service.id}`}>
                    {service.title[lang]}
                  </h3>

                  <p className="text-sm sm:text-base text-[#1A0B2E]/85 dark:text-gray-400 mt-3 font-light leading-relaxed" id={`service-desc-${service.id}`}>
                    {service.desc[lang]}
                  </p>
                </div>

                {/* Micro Benefit row */}
                <div className="mt-8 pt-4 border-t border-[#1A0B2E]/10 dark:border-white/5 flex items-center justify-between" id={`service-footer-${service.id}`}>
                  <span className="text-xs font-mono text-brand-purple dark:text-brand-accent font-extrabold tracking-wide">
                    {service.benefit[lang]}
                  </span>
                  <a 
                    href={`https://wa.me/${siteData.contactWhatsApp}?text=${encodeURIComponent(
                      lang === 'ar' 
                        ? `مرحباً، أود بدء العمل على خدمة: ${service.title.ar}` 
                        : `Hi! I want to start a project for: ${service.title.en}`
                    )}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white rounded-lg hover:bg-gradient-to-r hover:from-[#FF2D7A] hover:to-[#FF8A00] hover:text-white hover:border-transparent transition-all duration-200"
                    aria-label={`Order ${service.title[lang]}`}
                    id={`service-cta-${service.id}`}
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
