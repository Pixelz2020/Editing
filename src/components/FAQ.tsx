import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Language } from '../types';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = siteConfig.copy.faqs.title[lang];
  const subtitle = siteConfig.copy.faqs.subtitle[lang];
  const items = siteConfig.copy.faqs.items;

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="faqs">
      {/* Accent glow details */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full glow-spot-gold translate-y-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="faqs-header-label"
          >
            {lang === 'ar' ? "إزالة الشكوك" : "RESOLVING FRICTION"}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A0B2E] dark:text-white" id="faqs-header-title">
            {title}
          </h2>

          <p className="text-base text-[#1A0B2E]/80 dark:text-gray-400 font-light" id="faqs-header-desc">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faqs-accordion-container">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-2xl overflow-hidden hover:bg-black/10 dark:hover:bg-white/[0.02] hover:border-brand-purple dark:hover:border-white/10 transition-all duration-300"
                id={`faq-item-${idx}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-start gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-brand-purple dark:text-brand-secondary flex-shrink-0" />
                    <h3 className="text-base sm:text-lg font-display font-bold text-[#1A0B2E] dark:text-white leading-snug">
                      {item.question[lang]}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#1A0B2E]/50 dark:text-gray-500"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      id={`faq-answer-wrapper-${idx}`}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#1A0B2E]/80 dark:text-gray-400 font-light leading-relaxed border-t border-[#1A0B2E]/10 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005]">
                        <p id={`faq-answer-${idx}`}>{item.answer[lang]}</p>
                        
                        {/* Micro Risk-reduction reassurance badge */}
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-purple dark:text-brand-secondary font-mono font-bold">
                          <CheckCircle size={12} />
                          <span>{lang === 'ar' ? "سياسة راحة بال وضمان 100%" : "Included in all partnership models"}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
