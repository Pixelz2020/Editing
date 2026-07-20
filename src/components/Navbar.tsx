import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, MessageCircle, Send } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Language } from '../types';
import { playAudio } from '../utils/audio';
import Logo from './Logo';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    playAudio.playClick();
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  // Replace placeholder in brand name if default
  const cleanBrandName = siteConfig.brandName === "{{BRAND_NAME}}" 
    ? (lang === 'ar' ? 'سينما فيجن' : 'CinemaVision') 
    : siteConfig.brandName;

  const navLinks = [
    { href: '#cases', label: { ar: 'هوية بصرية', en: 'Visual Identity' } },
    { href: '#work', label: { ar: 'أعمالنا', en: 'Work' } },
    { href: '#services', label: { ar: 'خدماتنا', en: 'Services' } },
    { href: '#process', label: { ar: 'خطوات العمل', en: 'Process' } },
    { href: '#faqs', label: { ar: 'أسئلة شائعة', en: 'FAQs' } },
    { href: '#contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
  ];

  // Prefilled WhatsApp link
  const isDark = true;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber === "{{WHATSAPP}}" ? "201012345678" : siteConfig.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ar' 
      ? `مرحباً، أود الاستفسار عن باقات المونتاج والمحتوى!` 
      : `Hi! I want to inquire about video editing and visual design packages!`
  )}`;

  // Explicit smooth scroll with micro-delay for mobile anchors to resolve the navigation bug
  const handleMobileClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playAudio.playClick();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  const navBg = isScrolled
    ? 'bg-[#1A0B2E]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/25'
    : 'bg-transparent py-5';

  const linkClass = (isActive: boolean) => {
    return `px-1.5 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-semibold transition-colors duration-200 ${
      isActive ? 'text-brand-secondary bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`;
  };

  const textClass = 'text-white';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Recreated Vector Logo "PIXELZ" */}
          <div className="flex-shrink-0">
            <a href="#" onClick={() => playAudio.playClick()} className="flex items-center gap-3" id="nav-logo-link">
              <Logo size={38} className="transform hover:scale-110 hover:rotate-3 transition-transform duration-300 cursor-pointer" />

              <div className="flex flex-col">
                <div className="flex items-center font-display font-black text-xl tracking-wider leading-none" dir="ltr">
                  <span className={textClass}>PIXEL</span>
                  <span className="bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] bg-clip-text text-transparent">Z</span>
                </div>
                <span className="text-[7.5px] font-mono tracking-[0.24em] font-extrabold uppercase mt-0.5 text-brand-accent">
                  DESIGN & EDITING
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => playAudio.playClick()}
                className={linkClass(false)}
                id={`nav-link-${link.href.replace('#', '')}`}
              >
                {link.label[lang]}
              </a>
            ))}
          </div>

          {/* Desktop Utility & CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-1.5 lg:p-2 rounded-full hover:bg-white/5 transition-colors duration-200 flex items-center gap-1 text-gray-400 hover:text-brand-secondary"
              aria-label="Toggle language"
              id="lang-toggle-btn"
            >
              <Globe size={18} />
              <span className="text-xs font-semibold">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Primary CTA (Using Logo Palette) */}
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
              className="inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white text-xs lg:text-sm font-extrabold shadow-md hover:opacity-95 hover:scale-[1.02] transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              id="nav-cta-whatsapp"
            >
              <Send size={14} className="flex-shrink-0" />
              <span className="hidden lg:inline">{siteConfig.copy.hero.ctaPrimary[lang]}</span>
              <span className="inline lg:hidden">{lang === 'ar' ? 'ابدأ الآن' : 'Start Now'}</span>
            </a>
          </div>

          {/* Mobile Menu Action Toggles */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-full text-gray-400 hover:text-brand-secondary"
              aria-label="Toggle language"
              id="lang-toggle-mobile"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => {
                playAudio.playClick();
                setIsOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/5 focus:outline-none text-gray-400 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Fills correctly with absolute anchors) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b bg-[#1A0B2E]/95 border-white/10"
            id="mobile-menu-panel"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileClick(e, link.href)}
                  className="block px-3 py-3 rounded-xl text-base font-bold transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/5"
                  id={`mobile-nav-link-${link.href.replace('#', '')}`}
                >
                  {link.label[lang]}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 120);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white text-base font-black shadow-lg hover:opacity-95 transition-all duration-200 cursor-pointer"
                  id="mobile-nav-cta-whatsapp"
                >
                  <Send size={18} />
                  <span>{siteConfig.copy.hero.ctaPrimary[lang]}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
