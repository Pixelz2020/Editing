import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CaseStudies from './components/CaseStudies';
import ThumbnailsWall from './components/ThumbnailsWall';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Language } from './types';
import { ArrowUp } from 'lucide-react';
import { playAudio } from './utils/audio';
import Logo from './components/Logo';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isMobile, setIsMobile] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Scroll lock for welcome overlay
  useEffect(() => {
    if (!isStarted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isStarted]);

  // Motion values for magnetic fluid mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a luxury lag-effect tracking
  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Keep track of normalized cursor coordinates (-0.5 to 0.5) for 3D Parallax shapes
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Touch touchpoints tracking for mobile
  const [touchActive, setTouchActive] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document language, direction, and class attributes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, [lang]);

  // Monitor screen size and track cursor/touch coordinates
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Normalize coordinates
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      setParallax({ x: normX, y: normY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        setTouchPos({ x: touch.clientX, y: touch.clientY });
        
        // Update parallax with touch position
        const normX = (touch.clientX / window.innerWidth) - 0.5;
        const normY = (touch.clientY / window.innerHeight) - 0.5;
        setParallax({ x: normX, y: normY });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchActive(true);
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        setTouchPos({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = () => {
      setTouchActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden bg-brand-dark text-white" id="app-root-container">
      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain" id="cinematic-film-grain" />

      {/* Interactive Cursor Glow Follower (Only on desktop mouse move) */}
      {!isMobile && (
        <motion.div
          className="cursor-glow"
          style={{
            left: smoothX,
            top: smoothY,
          }}
          id="cursor-ambient-glow"
        />
      )}

      {/* Interactive Touch Glow Follower (Only on mobile touch) */}
      {isMobile && touchActive && (
        <div
          className="cursor-glow-touch"
          style={{
            left: touchPos.x,
            top: touchPos.y + window.scrollY, // match viewport scroll
          }}
          id="mobile-touch-glow"
        />
      )}

      {/* 3D Kinetic Floating Background Particles & Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="parallax-shapes-container">
        {/* Dynamic Shape 1: Cinematic Play Triangle (Graduated) */}
        <motion.div
          className="absolute w-24 h-24 text-brand-secondary/15 dark:text-brand-secondary/10"
          style={{
            top: '15%',
            left: '10%',
            x: parallax.x * -40,
            y: parallax.y * -40,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          id="kinetic-shape-1"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,45,122,0.3)]">
            <polygon points="25,20 85,50 25,80" />
          </svg>
        </motion.div>

        {/* Dynamic Shape 2: Neon Glassmorphic Square */}
        <motion.div
          className="absolute w-16 h-16 border-2 border-brand-accent/20 dark:border-brand-accent/15 rounded-xl bg-brand-accent/5 backdrop-blur-[1px]"
          style={{
            top: '45%',
            right: '8%',
            x: parallax.x * 60,
            y: parallax.y * 60,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          id="kinetic-shape-2"
        />

        {/* Dynamic Shape 3: Concentric Purple Circle Ring */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border border-dashed border-brand-purple/30 dark:border-brand-purple/20 flex items-center justify-center"
          style={{
            top: '70%',
            left: '5%',
            x: parallax.x * -20,
            y: parallax.y * -20,
          }}
          id="kinetic-shape-3"
        >
          <div className="w-16 h-16 rounded-full border border-brand-secondary/20 dark:border-brand-secondary/15 animate-pulse" />
        </motion.div>

        {/* Dynamic Shape 4: Cross Pixel Grid Accent */}
        <motion.div
          className="absolute text-brand-secondary/15 dark:text-brand-purple/20 flex flex-col gap-2"
          style={{
            top: '30%',
            right: '20%',
            x: parallax.x * -30,
            y: parallax.y * -30,
          }}
          id="kinetic-shape-4"
        >
          <div className="flex gap-2"><span>+</span><span>+</span><span>+</span></div>
          <div className="flex gap-2"><span>+</span><span className="text-brand-accent">+</span><span>+</span></div>
          <div className="flex gap-2"><span>+</span><span>+</span><span>+</span></div>
        </motion.div>

        {/* Dynamic Shape 5: Floating Diamond Polygon */}
        <motion.div
          className="absolute w-12 h-12 text-brand-accent/20 dark:text-brand-accent/10"
          style={{
            top: '85%',
            right: '15%',
            x: parallax.x * 50,
            y: parallax.y * 50,
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [45, 135, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          id="kinetic-shape-5"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <polygon points="50,5 95,50 50,95 5,50" />
          </svg>
        </motion.div>
      </div>

      {/* Navigation Bar */}
      <Navbar lang={lang} setLang={setLang} />

      {/* Main content body */}
      <main id="main-content-flow" className="relative z-10">
        {/* Hero Section */}
        <Hero lang={lang} isStarted={isStarted} />

        {/* Curated Portfolio (معرض أعمالنا) */}
        <Portfolio lang={lang} />

        {/* Flagship Case Studies (الهوية البصرية) */}
        <CaseStudies lang={lang} />

        {/* Thumbnails bento grid (أغلفة اليوتيوب) */}
        <ThumbnailsWall lang={lang} />

        {/* Services Grid (خدماتنا) */}
        <Services lang={lang} />

        {/* Process workflow timeline (رحلة العمل أو خطوات العمل) */}
        <Timeline lang={lang} />

        {/* Testimonials Carousel (آراء شركاء النجاح) */}
        <Testimonials lang={lang} />

        {/* Team Members Section (أعضاء الشركة) */}
        <Team lang={lang} />

        {/* Interactive Brief questionnaire (تواصل معنا) */}
        <Contact lang={lang} />
      </main>

      {/* Global Footer */}
      <Footer lang={lang} onAdminTrigger={() => setShowAdmin(true)} />

      {/* Admin Panel overlay */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel lang={lang} onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#140624]/90 border border-[#FF2D7A]/30 text-white shadow-[0_0_20px_rgba(255,45,122,0.3)] backdrop-blur-md cursor-pointer hover:border-[#FF2D7A] hover:text-[#FF2D7A] transition-all duration-200"
            id="back-to-top-btn"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="animate-bounce" style={{ animationDuration: '2s' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Welcome Splash Overlay */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07020d] text-white select-none px-4"
            id="welcome-splash-overlay"
          >
            {/* Top Language Switcher */}
            <div className={`absolute top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-[110]`}>
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>

            {/* Ambient glows inside overlay */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#FF2D7A]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            
            {/* Cinematic grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <div className="max-w-md w-full text-center space-y-8 relative z-10 flex flex-col items-center">
              {/* Animated Studio Logo/Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF2D7A] to-[#FF8A00] flex items-center justify-center p-0.5 shadow-[0_0_50px_rgba(255,45,122,0.45)]"
              >
                <div className="w-full h-full rounded-full bg-[#0c0517]/95 flex items-center justify-center">
                  <Logo size={68} className="animate-pulse-slow" />
                </div>
              </motion.div>

              {/* Title & Slogans */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-4xl sm:text-5xl font-display font-black tracking-widest text-white"
                >
                  PIXELZ
                </motion.h1>
                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-gray-400 text-sm sm:text-base font-medium max-w-xs mx-auto leading-relaxed"
                >
                  {lang === 'ar' 
                    ? "ستوديو المونتاج والهوية السينمائية الفاخرة" 
                    : "Elite Cinematic Video & Visual Identity Studio"}
                </motion.p>
              </div>

              {/* Interactive Start Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    playAudio.playClick();
                    setIsStarted(true);
                  }}
                  className="relative group px-12 py-5 rounded-full bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white font-black text-lg tracking-wider shadow-[0_0_30px_rgba(255,45,122,0.4)] hover:shadow-[0_0_50px_rgba(255,45,122,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center gap-3 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 animate-pulse" />
                  <span className="relative z-10 flex items-center gap-2">
                    {lang === 'ar' ? "ابدأ التجربة" : "ENTER EXPERIENCE"}
                  </span>
                </button>
              </motion.div>

              {/* Headphones/sound hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8 }}
                className="text-[10px] font-mono tracking-widest text-gray-500 uppercase flex items-center gap-1.5"
              >
                <span>🎧</span>
                <span>{lang === 'ar' ? "يرجى تشغيل الصوت للحصول على أفضل تجربة سينمائية" : "Turn up sound for the full cinematic experience"}</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

