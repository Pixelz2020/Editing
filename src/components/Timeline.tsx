import { motion } from 'motion/react';
import { Language } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { siteConfig } from '../config/site';

interface TimelineProps {
  lang: Language;
}

export default function Timeline({ lang }: TimelineProps) {
  const { siteData } = useSiteConfig();

  if (!siteData.showTimelineSection) return null;

  const title = siteConfig.copy.process.title[lang];
  const subtitle = siteConfig.copy.process.subtitle[lang];
  const steps = siteData.timelineSteps;

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="process">
      {/* Light glow effects */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full glow-spot-purple -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="process-header-label"
          >
            {lang === 'ar' ? "هيكل العمل" : "OUR BLUEPRINT"}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white" id="process-header-title">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#1A0B2E]/80 dark:text-gray-400 font-light" id="process-header-desc">
            {subtitle}
          </p>
        </div>

        {/* Process Steps List */}
        <div className="relative max-w-5xl mx-auto" id="process-timeline-container">
          {/* Vertical connection line on desktops */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#7B1FA2]/30 via-[#FF2D7A]/30 to-[#FF8A00]/30 -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col lg:flex-row items-center gap-8 relative ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                  id={`process-step-row-${idx}`}
                >
                  {/* Text Panel */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:rtl:justify-start" id={`process-step-content-${idx}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-md p-6 sm:p-8 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-2xl hover:bg-black/10 dark:hover:bg-white/[0.02] hover:border-brand-purple dark:hover:border-white/10 transition-all duration-300"
                    >
                      <span className="text-xs font-mono text-brand-purple dark:text-brand-accent font-bold uppercase tracking-widest">
                        {lang === 'ar' ? `المرحلة ${step.stepNumber}` : `STAGE ${step.stepNumber}`}
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#1A0B2E] dark:text-white mt-2">
                        {step.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1A0B2E]/80 dark:text-gray-400 mt-3 font-semibold leading-relaxed">
                        {step.desc[lang]}
                      </p>
                    </motion.div>
                  </div>

                  {/* Middle Central Circle with number */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 z-10 hidden lg:flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", damping: 15 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-extrabold bg-[#1A0B2E]/10 border-[#1A0B2E] text-[#1A0B2E] dark:bg-brand-dark transition-all duration-300 ${
                        idx % 3 === 2 
                          ? 'border-brand-accent text-brand-accent shadow-lg shadow-brand-accent/20' 
                          : 'dark:border-brand-secondary dark:text-brand-secondary'
                      }`}
                      id={`process-node-circle-${idx}`}
                    >
                      {step.stepNumber}
                    </motion.div>
                  </div>

                  {/* Empty balance column on desktop to offset items symmetrically */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
