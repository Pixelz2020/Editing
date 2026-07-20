import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowRight, ArrowLeft, Plus, Check, X, Quote } from 'lucide-react';
import { Language } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { siteConfig } from '../config/site';

interface TestimonialsProps {
  lang: Language;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
];

export default function Testimonials({ lang }: TestimonialsProps) {
  const { siteData, updateSiteData, saveChanges } = useSiteConfig();
  const [activeIndex, setActiveIndex] = useState(0);

  // Form States
  const [showForm, setShowForm] = useState(false);
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [roleAr, setRoleAr] = useState('');
  const [roleEn, setRoleEn] = useState('');
  const [channelName, setChannelName] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!siteData.showTestimonialsSection) return null;

  const title = siteConfig.copy.testimonials.title[lang];
  const subtitle = siteConfig.copy.testimonials.subtitle[lang];
  const items = siteData.testimonialsList.filter(item => item.visible !== false);

  const handleNext = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation: We need at least the current language filled out
    const activeName = lang === 'ar' ? nameAr : nameEn;
    const activeRole = lang === 'ar' ? roleAr : roleEn;
    const activeContent = lang === 'ar' ? contentAr : contentEn;

    if (!activeName.trim() || !activeRole.trim() || !activeContent.trim()) {
      setErrorMsg(
        lang === 'ar' 
          ? 'يرجى ملء الاسم، المسمى الوظيفي، وتفاصيل رأيك بالكامل.' 
          : 'Please fill out your name, role, and testimonial content.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const finalAvatar = customAvatar.trim() || selectedAvatar;
      
      const newTestimonial = {
        id: `testimonial-client-${Date.now()}`,
        name: {
          ar: nameAr.trim() || nameEn.trim(),
          en: nameEn.trim() || nameAr.trim()
        },
        role: {
          ar: roleAr.trim() || roleEn.trim(),
          en: roleEn.trim() || roleAr.trim()
        },
        channelName: channelName.trim() || undefined,
        content: {
          ar: contentAr.trim() || contentEn.trim(),
          en: contentEn.trim() || contentAr.trim()
        },
        avatar: finalAvatar,
        rating,
        visible: true,
        isClientSubmitted: true
      };

      const updatedList = [...siteData.testimonialsList, newTestimonial];
      
      // Update global context state
      updateSiteData({ testimonialsList: updatedList });
      
      // Persist immediately to localStorage
      setTimeout(() => {
        saveChanges();
        setIsSubmitting(false);
        setSuccessMsg(true);
        
        // Reset form fields
        setNameAr('');
        setNameEn('');
        setRoleAr('');
        setRoleEn('');
        setChannelName('');
        setContentAr('');
        setContentEn('');
        setRating(5);
        setCustomAvatar('');
        
        // Switch to the newly added review to show immediate feedback!
        const visibleItemsCount = updatedList.filter(item => item.visible !== false).length;
        setActiveIndex(visibleItemsCount - 1);
      }, 800);

    } catch (e) {
      console.error(e);
      setErrorMsg(lang === 'ar' ? 'حدث خطأ أثناء حفظ التقييم.' : 'An error occurred while saving your review.');
      setIsSubmitting(false);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="testimonials">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full glow-spot-secondary -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold"
            id="testimonials-header-label"
          >
            {isRtl ? "آراء الشركاء" : "PARTNER VOICES"}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#1A0B2E] dark:text-white" id="testimonials-header-title">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#1A0B2E]/80 dark:text-gray-400 font-light" id="testimonials-header-desc">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12 mb-16 animate-fade-in" id="testimonials-carousel" dir={isRtl ? 'rtl' : 'ltr'}>
          {items.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-3xl p-8 sm:p-12 relative flex flex-col items-center text-center space-y-6 md:space-y-8 backdrop-blur-sm shadow-sm"
                  id={`testimonial-slide-${activeIndex}`}
                >
                  <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-purple/10 dark:text-white/5 pointer-events-none" />

                  {/* Star ratings */}
                  <div className="flex gap-1" id={`stars-rating-${activeIndex}`}>
                    {Array.from({ length: items[activeIndex]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-brand-accent text-brand-accent animate-pulse" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-lg sm:text-xl text-[#1A0B2E] dark:text-gray-200 leading-relaxed font-light italic max-w-2xl">
                    " {items[activeIndex]?.content?.[lang] || ''} "
                  </blockquote>

                  {/* Avatar and Credentials */}
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={items[activeIndex]?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                      alt={items[activeIndex]?.name?.[lang] || ''}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-purple dark:border-brand-secondary shadow-md"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-[#1A0B2E] dark:text-white text-base">
                        {items[activeIndex]?.name?.[lang] || ''}
                      </h4>
                      <p className="text-xs text-[#1A0B2E]/70 dark:text-gray-400 font-medium">
                        {items[activeIndex]?.role?.[lang] || ''}
                      </p>
                      {items[activeIndex]?.channelName && (
                        <span className="inline-block text-[10px] font-mono px-2 py-0.5 bg-black/5 border border-[#1A0B2E]/10 text-brand-purple dark:bg-white/5 dark:border-white/5 dark:text-brand-secondary rounded mt-1.5 font-bold">
                          {items[activeIndex]?.channelName}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider controls */}
              <div className="flex items-center justify-center gap-4 mt-8" id="testimonials-controls">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-black/5 border border-[#1A0B2E]/10 hover:bg-black/10 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 text-[#1A0B2E] dark:text-white rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                  id="testimonials-btn-prev"
                >
                  {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                </button>

                {/* Slider dot indicators */}
                <div className="flex gap-2">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx ? 'bg-brand-purple dark:bg-brand-secondary w-6' : 'bg-black/15 dark:bg-white/20'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      id={`testimonial-indicator-${idx}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 bg-black/5 border border-[#1A0B2E]/10 hover:bg-black/10 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 text-[#1A0B2E] dark:text-white rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Next testimonial"
                  id="testimonials-btn-next"
                >
                  {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500 text-xs font-mono">
              {isRtl ? 'لا توجد شهادات معروضة حالياً.' : 'No testimonials currently showcased.'}
            </div>
          )}
        </div>

        {/* Dynamic client-submission block */}
        <div className="max-w-2xl mx-auto text-center relative" dir={isRtl ? 'rtl' : 'ltr'}>
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="add-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={() => {
                    setShowForm(true);
                    setSuccessMsg(false);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-secondary text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <Plus size={16} />
                  {isRtl ? "شاركنا رأيك كشريك نجاح" : "Submit Your Testimonial"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="review-form"
                initial={{ opacity: 0, y: 30, height: 'auto' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="bg-black/10 dark:bg-white/[0.02] border border-[#1A0B2E]/15 dark:border-white/5 rounded-3xl p-6 sm:p-10 text-right backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A0B2E]/10 dark:border-white/5">
                  <h3 className="text-lg sm:text-xl font-display font-extrabold text-[#1A0B2E] dark:text-white flex items-center gap-2">
                    <Quote className="w-5 h-5 text-brand-purple dark:text-brand-secondary" />
                    {isRtl ? "إضافة رأي جديد" : "Write a Testimonial"}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 hover:text-[#1A0B2E] dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Close review form"
                  >
                    <X size={18} />
                  </button>
                </div>

                {successMsg ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full border border-emerald-500/20 shadow-md">
                      <Check size={28} className="animate-bounce" />
                    </div>
                    <h4 className="text-xl font-display font-black text-[#1A0B2E] dark:text-white">
                      {isRtl ? "تم استلام رأيك بنجاح! 🎉" : "Review Received Successfully! 🎉"}
                    </h4>
                    <p className="text-sm text-[#1A0B2E]/70 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                      {isRtl 
                        ? "شكراً جزيلاً لثقتك ودعمك الغالي. تم تحديث وعرض تقييمك بنجاح في الشريط الدائري بالصفحة الرئيسية."
                        : "Thank you so much for your feedback and trust. Your review has been updated and loaded in our active testimonials carousel."
                      }
                    </p>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setSuccessMsg(false);
                      }}
                      className="mt-6 px-6 py-2.5 bg-[#1A0B2E] dark:bg-white/10 hover:bg-[#1A0B2E]/90 dark:hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      {isRtl ? "إغلاق النافذة" : "Close Panel"}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-5 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
                    {/* Bilingual inputs based on language or general placeholders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-1.5">
                          {isRtl ? "الاسم الكريم *" : "Your Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={isRtl ? nameAr : nameEn}
                          onChange={(e) => isRtl ? setNameAr(e.target.value) : setNameEn(e.target.value)}
                          placeholder={isRtl ? "مثال: م. عبد الله الحربي" : "e.g. John Doe"}
                          className="w-full px-4 py-3 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-xl text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-[#1A0B2E] dark:text-white transition-all duration-200"
                        />
                      </div>

                      {/* Job Title / Role */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-1.5">
                          {isRtl ? "المسمى الوظيفي / جهة العمل *" : "Your Role / Position *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={isRtl ? roleAr : roleEn}
                          onChange={(e) => isRtl ? setRoleAr(e.target.value) : setRoleEn(e.target.value)}
                          placeholder={isRtl ? "مثال: صانع محتوى ألعاب، رئيس تسويق" : "e.g. Tech Content Creator, Marketing lead"}
                          className="w-full px-4 py-3 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-xl text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-[#1A0B2E] dark:text-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Optional Channel / Company username */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-1.5">
                          {isRtl ? "اسم القناة أو حساب التواصل (اختياري)" : "Channel / Handle Name (Optional)"}
                        </label>
                        <input
                          type="text"
                          value={channelName}
                          onChange={(e) => setChannelName(e.target.value)}
                          placeholder={isRtl ? "مثال: @AlJabriTech أو اسم شركتك" : "e.g. @MazenGaming"}
                          className="w-full px-4 py-3 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-xl text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-[#1A0B2E] dark:text-white transition-all duration-200"
                        />
                      </div>

                      {/* Rating selection */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-1.5">
                          {isRtl ? "التقييم بالنجوم" : "Star Rating"}
                        </label>
                        <div className="flex items-center gap-1.5 h-11 px-4 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-xl">
                          {[1, 2, 3, 4, 5].map((starVal) => (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setRating(starVal)}
                              className="p-0.5 hover:scale-125 transition-transform cursor-pointer"
                              aria-label={`Rate ${starVal} Stars`}
                            >
                              <Star
                                size={22}
                                className={`${
                                  rating >= starVal
                                    ? 'fill-brand-accent text-brand-accent'
                                    : 'text-gray-300 dark:text-white/10'
                                } transition-colors duration-200`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial text block */}
                    <div>
                      <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-1.5">
                        {isRtl ? "تفاصيل رأيك وتجربتك معنا *" : "Your Detailed Review *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={isRtl ? contentAr : contentEn}
                        onChange={(e) => isRtl ? setContentAr(e.target.value) : setContentEn(e.target.value)}
                        placeholder={isRtl ? "اكتب هنا تفاصيل تجربتك، مستوى الاحترافية، والنتائج التي حققتها معنا..." : "Write details about your experience, delivery speed, and metrics achieved..."}
                        className="w-full px-4 py-3 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-xl text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-[#1A0B2E] dark:text-white transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Elegant Avatar Selection */}
                    <div>
                      <label className="block text-xs font-bold text-[#1A0B2E] dark:text-gray-400 mb-2">
                        {isRtl ? "اختر الرمز الرمزي (الآفاتار) لتعريفك" : "Select Your Avatar"}
                      </label>
                      <div className="flex flex-wrap gap-4 items-center mb-3">
                        {PRESET_AVATARS.map((avUrl, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedAvatar(avUrl);
                              setCustomAvatar('');
                            }}
                            className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                              selectedAvatar === avUrl && !customAvatar
                                ? 'border-brand-purple scale-110 shadow-md ring-2 ring-brand-purple/20'
                                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                          >
                            <img src={avUrl} alt="Preset avatar" className="w-full h-full object-cover" />
                            {selectedAvatar === avUrl && !customAvatar && (
                              <div className="absolute inset-0 bg-brand-purple/20 flex items-center justify-center">
                                <Check size={14} className="text-white bg-brand-purple rounded-full p-0.5" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Custom Image URL Option */}
                      <input
                        type="url"
                        value={customAvatar}
                        onChange={(e) => setCustomAvatar(e.target.value)}
                        placeholder={isRtl ? "أو الصق رابط صورتك الشخصية هنا (اختياري)" : "Or paste your custom profile image URL (optional)"}
                        className="w-full px-4 py-2.5 bg-white dark:bg-black/40 border border-[#1A0B2E]/10 dark:border-white/10 rounded-lg text-xs focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none text-[#1A0B2E] dark:text-white transition-all duration-200"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-bold text-red-500 dark:text-red-400 bg-red-500/5 dark:bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                        {errorMsg}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                      >
                        {isRtl ? "إلغاء" : "Cancel"}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-secondary text-white font-bold text-xs rounded-xl shadow-md hover:shadow-brand-purple/20 hover:scale-102 active:scale-98 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting 
                          ? (isRtl ? "جاري الإرسال والمزامنة..." : "Submitting...") 
                          : (isRtl ? "تأكيد وإرسال التقييم" : "Confirm & Publish")
                        }
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
