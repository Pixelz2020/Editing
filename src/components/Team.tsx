import React from 'react';
import { motion } from 'motion/react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { siteConfig } from '../config/site';
import { Language } from '../types';

interface TeamProps {
  lang: Language;
}

export default function Team({ lang }: TeamProps) {
  const { siteData } = useSiteConfig();

  if (!siteData.showTeamSection) return null;

  const title = siteConfig.copy.team.title[lang];
  const subtitle = siteConfig.copy.team.subtitle[lang];
  const members = siteData.teamMembersList.filter(member => member.visible !== false);

  const isRtl = lang === 'ar';

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="team" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest uppercase text-brand-purple dark:text-brand-secondary font-bold block mb-3"
          >
            {isRtl ? "فريق العمل" : "OUR TEAM"}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white mb-6 leading-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#1A0B2E]/75 dark:text-gray-400 font-light"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Members Grid: 2 columns on desktop, 1 column on mobile */}
        {members.length === 0 ? (
          <div className="text-center py-12 text-[#1A0B2E]/50 dark:text-gray-500">
            {isRtl ? "سيتم إضافة أعضاء الفريق قريباً." : "Team members will be added soon."}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-[#1A0B2E]/5 dark:bg-white/5 border border-[#1A0B2E]/10 dark:border-white/5 hover:border-brand-purple/30 dark:hover:border-brand-secondary/30 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-brand-purple/5"
              >
                {/* Horizontal Layout containing Image and Text side-by-side */}
                <div className="flex flex-row items-center gap-6">
                  {/* Image Container with elegant borders and group-hover scaling */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden border border-[#1A0B2E]/20 dark:border-white/10 group-hover:border-brand-purple dark:group-hover:border-brand-secondary transition-all duration-300 shadow-md">
                    <img
                      src={member.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                      alt={member.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Text Container: Name and Role next to the image */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#1A0B2E] dark:text-white leading-snug truncate group-hover:text-brand-purple dark:group-hover:text-brand-secondary transition-colors duration-300">
                      {member.name[lang]}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-purple dark:text-brand-secondary font-semibold mt-1">
                      {member.role[lang]}
                    </p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-brand-purple to-brand-secondary mt-3 rounded opacity-60 group-hover:w-20 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
