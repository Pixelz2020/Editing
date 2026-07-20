import { Language } from '../types';
import { Instagram, Youtube, Tv, Globe, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';
import { useSiteConfig } from '../context/SiteConfigContext';

interface FooterProps {
  lang: Language;
  onAdminTrigger: () => void;
}

export default function Footer({ lang, onAdminTrigger }: FooterProps) {
  const { siteData } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  // Social link icons map
  const socialIcons = [
    { key: 'youtube', icon: Youtube, label: 'YouTube' },
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'tiktok', icon: Tv, label: 'TikTok' },
    { key: 'behance', icon: Award, label: 'Behance' },
    { key: 'facebook', icon: Globe, label: 'Facebook' },
  ];

  // Footer Navigation columns
  const footerLinks = [
    { href: '#work', label: { ar: 'معرض الأعمال', en: 'Curated Showcase' } },
    { href: '#services', label: { ar: 'خدماتنا', en: 'Services' } },
    { href: '#cases', label: { ar: 'دراسات الحالة', en: 'Case Studies' } },
    { href: '#process', label: { ar: 'خطوات العمل', en: 'Workflow Blueprint' } },
    { href: '#packages', label: { ar: 'باقات التسعير', en: 'Packages' } },
    { href: '#contact', label: { ar: 'طلب استشارة', en: 'Initiate Brief' } },
  ];

  const brandNameWord = lang === 'ar' ? 'بيكسلزات' : 'PIXELZAT';

  return (
    <footer className="bg-transparent border-t border-[#1A0B2E]/10 dark:border-white/5 pt-16 pb-8 text-[#1A0B2E]/70 dark:text-gray-500 text-sm" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12" id="footer-main-grid">
          
          {/* Column A: Logo and Tagline */}
          <div className="md:col-span-5 space-y-6" id="footer-col-logo">
            <a href="#" className="flex items-center gap-3 animate-pulse-slow" id="footer-logo-link">
              <Logo size={42} className="transform hover:scale-110 hover:rotate-3 transition-transform duration-300" />
              <div className="flex flex-col">
                <div className="flex items-center font-display font-black text-lg tracking-wider leading-none" dir="ltr">
                  <span className="text-[#1A0B2E] dark:text-white">PIXEL</span>
                  <span className="bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] bg-clip-text text-transparent">Z</span>
                </div>
                <span className="text-[7px] font-mono tracking-[0.24em] font-extrabold uppercase mt-0.5 text-brand-accent">
                  DESIGN & EDITING
                </span>
              </div>
            </a>
            <p className="text-[#1A0B2E]/80 dark:text-gray-400 font-light leading-relaxed text-sm sm:text-base max-w-sm">
              {lang === 'ar' 
                ? "نحن لا نصنع فيديوهات؛ نحن نبني تحفاً سينمائية تدوم وتؤثر وتصنع هوية لا تنسى."
                : "We don't just edit; we forge cinematic assets that endure, inspire, and define brands."}
            </p>
          </div>

          {/* Column B: Fast Navigation Navigation */}
          <div className="md:col-span-4 space-y-4" id="footer-col-nav">
            <h4 className="text-xs font-mono tracking-widest text-[#1A0B2E] dark:text-white uppercase font-bold">
              {lang === 'ar' ? "التنقل السريع" : "NAVIGATE"}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#1A0B2E]/75 dark:text-gray-400 hover:text-[#1A0B2E] dark:hover:text-white font-semibold transition-colors duration-200 py-1"
                  id={`footer-link-${link.href.replace('#', '')}`}
                >
                  {link.label[lang]}
                </a>
              ))}
            </div>
          </div>

          {/* Column C: Social Proof & Networks */}
          <div className="md:col-span-3 space-y-4" id="footer-col-socials">
            <h4 className="text-xs font-mono tracking-widest text-[#1A0B2E] dark:text-white uppercase font-bold">
              {lang === 'ar' ? "شبكات التواصل الإبداعي" : "NETWORKS"}
            </h4>
            
            {/* Enhanced Social Icons with luxurious hover states */}
            <div className="flex flex-wrap gap-2.5">
              {socialIcons.map((soc) => {
                const IconComponent = soc.icon;
                const configItem = siteData.socialLinks[soc.key as keyof typeof siteData.socialLinks];
                
                // If the social handle is not enabled in admin panel, do not render it!
                if (configItem && configItem.visible === false) return null;

                const cleanLink = configItem?.url || '#';

                return (
                  <motion.a
                    key={soc.key}
                    href={cleanLink}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    whileHover={{ 
                      scale: 1.12, 
                      rotate: 3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/5 hover:bg-gradient-to-r hover:from-[#FF2D7A] hover:to-[#FF8A00] hover:border-transparent hover:text-white text-[#1A0B2E] dark:text-gray-300 rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm"
                    aria-label={soc.label}
                    id={`footer-social-${soc.key}`}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>
            
            <p className="text-xs text-[#1A0B2E]/60 dark:text-gray-600 font-mono italic">
              {lang === 'ar' ? "جاهزون للنشر والنمو العضوي السريع" : "Optimized for high organic retention"}
            </p>
          </div>
        </div>

        {/* Bottom Credits bar */}
        <div className="pt-8 border-t border-[#1A0B2E]/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#1A0B2E]/60 dark:text-gray-600" id="footer-bottom-bar">
          <p id="copyright-text-label" className="font-medium text-center md:text-start">
            {lang === 'ar' ? (
              <>
                جميع الحقوق محفوظة © {currentYear}{' '}
                <span 
                  onClick={onAdminTrigger} 
                  className="cursor-pointer hover:text-[#FF2D7A] transition-colors font-bold select-none"
                  title="Pixelz Studio Controls"
                >
                  {brandNameWord}
                </span>
                . صُنع لصناع المحتوى والرواد الباحثين عن جودة السينما.
              </>
            ) : (
              <>
                All Rights Reserved © {currentYear}{' '}
                <span 
                  onClick={onAdminTrigger} 
                  className="cursor-pointer hover:text-[#FF2D7A] transition-colors font-bold select-none"
                  title="Pixelz Studio Controls"
                >
                  {brandNameWord}
                </span>
                . Crafted for creators & pioneers seeking cinema-grade excellence.
              </>
            )}
          </p>
          
          <div className="flex items-center gap-1.5" id="designer-credit">
            <span>Built for creators who deliver cinema-quality work</span>
            <Heart size={10} className="fill-brand-secondary text-brand-secondary animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
