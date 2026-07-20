import { motion } from 'motion/react';
import { Check, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Language } from '../types';

interface PackagesProps {
  lang: Language;
}

export default function Packages({ lang }: PackagesProps) {
  const title = siteConfig.copy.packages.title[lang];
  const subtitle = siteConfig.copy.packages.subtitle[lang];
  const items = siteConfig.copy.packages.items;
  const pricing = siteConfig.packagesPricing;

  // Pricing helper
  const getPrice = (key: 'starter' | 'pro' | 'brand') => {
    const rawVal = pricing[key];
    if (rawVal === `{{PKG_${key.toUpperCase()}}}`) {
      // Return beautiful default fallback starter/pro/brand prices
      if (key === 'starter') return "250";
      if (key === 'pro') return "500";
      return "999";
    }
    return rawVal;
  };

  const currencySymbol = pricing.currency[lang];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="packages">
      {/* Mesh glowing details */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full glow-spot-gold -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="packages-header-label"
          >
            {lang === 'ar' ? "التسعير والاستثمار" : "PRICING PLANS"}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white" id="packages-header-title">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#1A0B2E]/80 dark:text-gray-400 font-light" id="packages-header-desc">
            {subtitle}
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16" id="packages-grid">
          {items.map((pkg, index) => {
            const isFeatured = pkg.badge !== undefined;
            const price = getPrice(pkg.priceKey);

            // WhatsApp link prefilled based on selected package details
            const messageText = pkg.whatsappPrefill[lang];
            const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber === "{{WHATSAPP}}" ? "201012345678" : siteConfig.whatsappNumber}?text=${encodeURIComponent(messageText)}`;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                  isFeatured
                    ? 'bg-black/5 border-brand-purple/40 shadow-xl dark:bg-white/[0.03] dark:border-brand-secondary/40 shadow-brand-purple/5 lg:scale-[1.03] z-10'
                    : 'bg-black/5 border-[#1A0B2E]/10 hover:border-brand-purple/30 dark:bg-white/[0.01] dark:border-white/5 dark:hover:border-white/10'
                }`}
                id={`package-card-${pkg.id}`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2" id={`package-badge-wrapper-${pkg.id}`}>
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white shadow-md tracking-wider">
                      {pkg.badge?.[lang]}
                    </span>
                  </div>
                )}

                {/* Info & Price */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-[#1A0B2E] dark:text-white" id={`package-title-${pkg.id}`}>
                      {pkg.name[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1A0B2E]/70 dark:text-gray-500 font-light" id={`package-desc-${pkg.id}`}>
                      {pkg.desc[lang]}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 py-2 border-y border-[#1A0B2E]/10 dark:border-white/5" id={`package-price-box-${pkg.id}`}>
                    <span className="text-3xl font-display font-extrabold text-[#1A0B2E] dark:text-white">{currencySymbol}</span>
                    <span className="text-4xl sm:text-5xl font-display font-black text-[#1A0B2E] dark:text-white tracking-tight">{price}</span>
                    <span className="text-xs text-[#1A0B2E]/60 dark:text-gray-500 font-semibold ml-1">/ {lang === 'ar' ? 'مشروع شهرياً' : 'monthly'}</span>
                  </div>

                  {/* Feature Lists */}
                  <div className="space-y-3 pt-2" id={`package-features-${pkg.id}`}>
                    <p className="text-xs font-mono text-[#1A0B2E]/70 dark:text-gray-500 tracking-wider uppercase font-bold">
                      {lang === 'ar' ? "تتضمن الباقة الإبداعية:" : "INCLUSIONS & GUARANTEES"}
                    </p>
                    <ul className="space-y-3">
                      {pkg.features[lang].map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#1A0B2E]/85 dark:text-gray-400 font-semibold">
                          <Check size={16} className="text-brand-purple dark:text-brand-secondary flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-8" id={`package-cta-box-${pkg.id}`}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white hover:opacity-95'
                        : 'bg-black/5 border border-[#1A0B2E]/10 text-[#1A0B2E] hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10'
                    }`}
                    id={`package-btn-${pkg.id}`}
                  >
                    <MessageCircle size={16} />
                    <span>{lang === 'ar' ? "احجز الباقة الآن" : "Secure Plan"}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Pricing Callout button */}
        <div className="text-center" id="custom-pricing-callout">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-2xl max-w-2xl mx-auto"
          >
            <span className="text-xs sm:text-sm text-[#1A0B2E]/70 dark:text-gray-400 font-semibold">
              {lang === 'ar' 
                ? "لديك احتياجات محددة خارج نطاق هذه الباقات؟" 
                : "Looking for something else or high-volume enterprise production?"}
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-purple dark:text-brand-secondary hover:underline transition-all"
              id="cta-custom-proposal"
            >
              <span>{siteConfig.copy.packages.ctaText[lang]}</span>
              {lang === 'ar' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
