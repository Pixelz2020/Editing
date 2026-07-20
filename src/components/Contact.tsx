import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, Mail, Send, CheckCircle, ArrowRight, 
  ShieldCheck, MapPin
} from 'lucide-react';
import { Language } from '../types';
import { playAudio } from '../utils/audio';
import { useSiteConfig } from '../context/SiteConfigContext';
import { siteConfig } from '../config/site';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const { siteData } = useSiteConfig();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    platform: 'youtube',
    service: 'long-form',
    budget: '300-700',
    message: '',
  });

  if (!siteData.showContactSection) return null;

  const title = siteConfig.copy.contact.title[lang];
  const subtitle = siteConfig.copy.contact.subtitle[lang];
  const formLabels = siteConfig.copy.contact.form;

  const getPlatformLabel = (p: string) => {
    const maps: Record<string, { ar: string; en: string }> = {
      youtube: { ar: 'يوتيوب (YouTube)', en: 'YouTube' },
      reels: { ar: 'تيك توك / ريلز (Shorts/TikTok)', en: 'Instagram/TikTok' },
      business: { ar: 'علامة تجارية (Brand/Business)', en: 'Brand / Business' },
      app: { ar: 'تطبيق ترويجي (App Promo)', en: 'App Promo' },
    };
    return maps[p]?.[lang] || p;
  };

  const getServiceLabel = (s: string) => {
    const maps: Record<string, { ar: string; en: string }> = {
      'long-form': { ar: 'مونتاج يوتيوب طويل', en: 'Long-Form Video' },
      shorts: { ar: 'ريلز وفيديوهات قصيرة', en: 'Shorts / Reels' },
      thumbnail: { ar: 'تصميم ثمبنيلز (أغلفة يوتيوب)', en: 'Thumbnails Cover' },
      identity: { ar: 'هوية بصرية كاملة', en: 'Full Identity' },
      custom: { ar: 'باقة مخصصة', en: 'Custom Bundle' },
    };
    return maps[s]?.[lang] || s;
  };

  const generateMessageText = (data: any) => {
    if (!data) return '';
    const platformStr = getPlatformLabel(data.platform);
    const serviceStr = getServiceLabel(data.service);
    
    if (lang === 'ar') {
      return `مرحباً ستوديو بيكسلز، لقد قمت بتقديم طلب استشارة عبر الموقع الإلكتروني، وإليك تفاصيل طلبي:

• الاسم: ${data.name}
• واتساب: ${data.whatsapp}
• المنصة المستهدفة: ${platformStr}
• نوع الخدمة المطلوبة: ${serviceStr}
• الميزانية المقترحة: ${data.budget}$
• تفاصيل المشروع:
${data.message || 'لا توجد تفاصيل إضافية'}

يرجى التواصل معي لبدء العمل والاتفاق!`;
    } else {
      return `Hello PIXELZ Studio, I have submitted a custom request via the website. Here are my project details:

• Name: ${data.name}
• WhatsApp/Phone: ${data.whatsapp}
• Target Platform: ${platformStr}
• Requested Service: ${serviceStr}
• Proposed Budget: $${data.budget}
• Additional Details:
${data.message || 'No additional details provided'}

Looking forward to your response to kick off production!`;
    }
  };

  // Form handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentSubmittedData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
    };

    setSubmittedData(currentSubmittedData);
    playAudio.playSuccess();

    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form but keep phone values or clear
      setFormData({
        name: '',
        whatsapp: '',
        platform: 'youtube',
        service: 'long-form',
        budget: '300-700',
        message: '',
      });
    }, 300);
  };

  // Dynamic WhatsApp Link based on submittedData or fallback
  const getWhatsAppSubmitUrl = (data: any) => {
    const number = siteData.contactWhatsApp || "201012345678";
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const text = generateMessageText(data || formData);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  // Dynamic Email link based on submittedData or fallback
  const getEmailSubmitUrl = (data: any) => {
    const emailAddr = siteData.contactEmail || "contact@cinemavision.com";
    const subject = lang === 'ar' ? `طلب مشروع جديد من العميل: ${data?.name || formData.name}` : `New Project Request from client: ${data?.name || formData.name}`;
    const body = generateMessageText(data || formData);
    return `mailto:${emailAddr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const cleanOwnerName = (siteData as any).contactOwnerName?.[lang] || siteConfig.ownerName || (lang === 'ar' ? 'أحمد الشريف' : 'Ahmed El-Sherif');
  const cleanCity = (siteData as any).contactCity?.[lang] || siteConfig.city?.[lang] || (lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt');

  const whatsappNumberClean = (siteData.contactWhatsApp || "201012345678").replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumberClean}?text=${encodeURIComponent(
    lang === 'ar' 
      ? `مرحباً، أود استشارة سريعة بشأن مشروع مونتاج وإنتاج جديد!` 
      : `Hi, I am looking to schedule an urgent cinematic production consult!`
  )}`;

  const emailUrl = `mailto:${siteData.contactEmail || "contact@cinemavision.com"}`;

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-[#1A0B2E]/10 dark:border-white/5" id="contact">
      {/* Glow backgrounds */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full glow-spot-secondary pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Information cards & direct WhatsApp */}
          <div className="lg:col-span-5 space-y-8" id="contact-info-column">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold">
                {lang === 'ar' ? "قنوات التواصل" : "CHANNELS"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A0B2E] dark:text-white">
                {title}
              </h2>
              <p className="text-base text-[#1A0B2E]/80 dark:text-gray-400 font-light leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Quick stats / contacts card */}
            <div className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-2xl p-6 space-y-6" id="contact-quick-box">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary/15 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#1A0B2E]/70 dark:text-gray-500 block font-semibold">{lang === 'ar' ? "مقر الستوديو والمدينة" : "Location / City"}</span>
                  <span className="text-sm font-bold text-[#1A0B2E] dark:text-white">{cleanCity}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="text-xs text-[#1A0B2E]/70 dark:text-gray-500 block font-semibold">{lang === 'ar' ? "مدير الستوديو التنفيذي" : "Owner / Director"}</span>
                  <span className="text-sm font-bold text-[#1A0B2E] dark:text-white">{cleanOwnerName}</span>
                </div>
              </div>
            </div>

            {/* Huge Direct Contact Buttons */}
            <div className="space-y-4" id="direct-contact-triggers">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playAudio.playClick()}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white font-extrabold shadow-lg hover:opacity-95 hover:scale-[1.01] transition-all"
                id="contact-whatsapp-direct"
              >
                <MessageCircle size={20} className="fill-white" />
                <span>{lang === 'ar' ? "محادثة فورية عبر واتساب" : "Direct WhatsApp Consultation"}</span>
              </a>

              <a
                href={emailUrl}
                onClick={() => playAudio.playClick()}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-black/5 border border-[#1A0B2E]/10 text-[#1A0B2E] font-bold hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 transition-all"
                id="contact-email-direct"
              >
                <Mail size={18} />
                <span>{siteData.contactEmail || "contact@cinemavision.com"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Questionnaire Form */}
          <div className="lg:col-span-7" id="contact-form-column">
            <div className="bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/[0.01] dark:border-white/5 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm relative" id="contact-form-card">
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                        {formLabels.nameLabel[lang]} <span className="text-brand-purple dark:text-brand-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors rounded-xl"
                        placeholder={lang === 'ar' ? "مثال: أحمد محمد" : "e.g. John Doe"}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                        {formLabels.phoneLabel[lang]} <span className="text-brand-purple dark:text-brand-secondary">*</span>
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors rounded-xl"
                        placeholder="e.g. +20 1012345678"
                      />
                    </div>

                    {/* Grid elements */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Platform */}
                      <div className="space-y-2">
                        <label htmlFor="platform" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                          {formLabels.platformLabel[lang]}
                        </label>
                        <select
                          id="platform"
                          value={formData.platform}
                          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                          className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors rounded-xl"
                        >
                          <option value="youtube" className="bg-[#120722] text-white">YouTube</option>
                          <option value="reels" className="bg-[#120722] text-white">Instagram/TikTok</option>
                          <option value="business" className="bg-[#120722] text-white">{lang === 'ar' ? "علامة تجارية" : "Brand / Business"}</option>
                          <option value="app" className="bg-[#120722] text-white">{lang === 'ar' ? "تطبيق ترويجي" : "App Promo"}</option>
                        </select>
                      </div>

                      {/* Requested Service */}
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                          {formLabels.projectTypeLabel[lang]}
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors rounded-xl"
                        >
                          <option value="long-form" className="bg-[#120722] text-white">{lang === 'ar' ? "مونتاج يوتيوب طويل" : "Long-Form Video"}</option>
                          <option value="shorts" className="bg-[#120722] text-white">{lang === 'ar' ? "ريلز وقصيرة" : "Shorts / Reels"}</option>
                          <option value="thumbnail" className="bg-[#120722] text-white">{lang === 'ar' ? "تصميم ثمبنيلز" : "Thumbnails Cover"}</option>
                          <option value="identity" className="bg-[#120722] text-white">{lang === 'ar' ? "هوية بصرية كاملة" : "Full Identity"}</option>
                          <option value="custom" className="bg-[#120722] text-white">{lang === 'ar' ? "باقة مخصصة" : "Custom Bundle"}</option>
                        </select>
                      </div>

                      {/* Estimated Budget */}
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                          {formLabels.budgetLabel[lang]}
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors rounded-xl"
                        >
                          <option value="under-300" className="bg-[#120722] text-white">{lang === 'ar' ? "أقل من 300 دولار" : "Under $300"}</option>
                          <option value="300-700" className="bg-[#120722] text-white">300$ - 700$</option>
                          <option value="700-1500" className="bg-[#120722] text-white">700$ - 1500$</option>
                          <option value="1500+" className="bg-[#120722] text-white">+1500$</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-[#1A0B2E] dark:text-gray-300 block">
                        {formLabels.messageLabel[lang]}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/10 text-[#1A0B2E] dark:text-white text-sm focus:border-brand-purple dark:focus:border-brand-secondary focus:outline-none transition-colors resize-none rounded-xl"
                        placeholder={lang === 'ar' ? "أخبرنا بإيجاز عن طبيعة الفيديوهات، والأسلوب المفضل..." : "Tell us briefly about the topic, references, target deadline..."}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      onClick={() => playAudio.playClick()}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white text-base font-extrabold shadow-md hover:opacity-95 transition-all duration-200 active:scale-95 cursor-pointer"
                      id="contact-submit-btn"
                    >
                      <Send size={16} />
                      <span>{formLabels.submitBtn[lang]}</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="py-6 text-center space-y-6 flex flex-col items-center"
                    id="contact-success-panel"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 animate-bounce">
                      <CheckCircle size={36} className="fill-emerald-500 text-[#120722]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-black text-[#1A0B2E] dark:text-white">
                        {lang === 'ar' ? "تم حفظ بياناتك بنجاح! 🚀" : "Details Saved Successfully! 🚀"}
                      </h3>
                      <p className="text-sm text-[#1A0B2E]/80 dark:text-gray-300 font-light max-w-md mx-auto leading-relaxed">
                        {lang === 'ar' 
                          ? "يرجى اختيار إحدى قنوات التواصل أدناه لإرسال رسالتك الجاهزة والمكتوبة تلقائياً لبدء العمل فوراً:"
                          : "Please select one of the communication channels below to dispatch your pre-filled inquiry directly to us:"}
                      </p>
                    </div>

                    {/* Pre-filled Message Summary Box */}
                    <div className="w-full text-left bg-black/10 dark:bg-white/[0.02] border border-[#1A0B2E]/10 dark:border-white/5 rounded-2xl p-4 space-y-2 text-xs font-mono max-w-lg mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                      <span className="text-[10px] text-brand-purple dark:text-brand-secondary font-bold block uppercase tracking-wider mb-2">
                        {lang === 'ar' ? "معاينة الرسالة الجاهزة للإرسال:" : "Prefilled Message Preview:"}
                      </span>
                      <div className="text-[#1A0B2E]/80 dark:text-gray-300 whitespace-pre-line leading-relaxed max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                        {generateMessageText(submittedData)}
                      </div>
                    </div>

                    {/* Dispatch Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto pt-2">
                      {/* Option 1: WhatsApp */}
                      <a
                        href={getWhatsAppSubmitUrl(submittedData)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playAudio.playClick()}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/25 group text-center"
                        id="dispatch-whatsapp"
                      >
                        <MessageCircle size={24} className="fill-white group-hover:scale-110 transition-transform duration-200" />
                        <div className="space-y-0.5">
                          <span className="text-sm block font-black">
                            {lang === 'ar' ? "التواصل عبر واتساب" : "Contact via WhatsApp"}
                          </span>
                          <span className="text-[10px] text-white/80 font-normal block">
                            {lang === 'ar' ? "توجيه فوري لدردشة الواتساب" : "Direct WhatsApp redirection"}
                          </span>
                        </div>
                      </a>

                      {/* Option 2: Email */}
                      <a
                        href={getEmailSubmitUrl(submittedData)}
                        onClick={() => playAudio.playClick()}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-[#FF2D7A] hover:bg-[#FF2D7A]/90 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FF2D7A]/10 hover:shadow-[#FF2D7A]/25 group text-center"
                        id="dispatch-email"
                      >
                        <Mail size={24} className="group-hover:scale-110 transition-transform duration-200" />
                        <div className="space-y-0.5">
                          <span className="text-sm block font-black">
                            {lang === 'ar' ? "التواصل عبر الإيميل" : "Contact via Email"}
                          </span>
                          <span className="text-[10px] text-white/80 font-normal block">
                            {lang === 'ar' ? "إرسال البيانات عبر تطبيق الإيميل" : "Direct Email client launch"}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Quick navigation anchor */}
                    <button
                      onClick={() => {
                        playAudio.playClick();
                        setFormSubmitted(false);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple dark:text-brand-secondary hover:underline mt-4 cursor-pointer"
                    >
                      <span>{lang === 'ar' ? "العودة لتعديل البيانات أو إرسال طلب آخر" : "Edit details or send another request"}</span>
                      <ArrowRight size={12} className="rtl:rotate-180" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
