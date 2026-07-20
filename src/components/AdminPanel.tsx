import React, { useState } from 'react';
import { useSiteConfig, FeatureItem, ProjectItem, CaseStudyItem, ThumbnailItem, ServiceItem, TimelineStepItem, TestimonialItem, TeamMemberItem } from '../context/SiteConfigContext';
import { 
  X, Save, Lock, Shield, Clock, Award, Plus, Trash2, ArrowUp, ArrowDown, 
  Settings, Film, Image, Tv, Info, MessageSquare, Phone, Share2, Eye, EyeOff, Check, AlertCircle, Volume2, VolumeX, RefreshCw, Users, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface AdminPanelProps {
  lang: 'ar' | 'en';
  onClose: () => void;
}

export default function AdminPanel({ lang, onClose }: AdminPanelProps) {
  const { 
    siteData, 
    updateSiteData, 
    isAdminLoggedIn, 
    setAdminLoggedIn, 
    hasUnsavedChanges, 
    saveChanges, 
    resetChanges 
  } = useSiteConfig();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Change Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ text: string; error: boolean } | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'portfolio' | 'cases' | 'thumbnails' | 'services' | 'timeline' | 'testimonials' | 'team' | 'contact'>('general');

  // Pulsing Save Action
  const [isSaving, setIsSaving] = useState(false);

  // Handle Admin login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === siteData.adminPassword) {
      setAdminLoggedIn(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Change password logic
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPassword !== siteData.adminPassword) {
      setPwdMessage({ text: lang === 'ar' ? 'كلمة المرور القديمة غير صحيحة' : 'Old password is incorrect', error: true });
      return;
    }
    if (newPassword.length < 4) {
      setPwdMessage({ text: lang === 'ar' ? 'كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل' : 'New password must be at least 4 characters', error: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMessage({ text: lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match', error: true });
      return;
    }

    updateSiteData({ adminPassword: newPassword });
    setPwdMessage({ text: lang === 'ar' ? 'تم تغيير كلمة المرور بنجاح! تذكر حفظ التغييرات' : 'Password changed successfully! Remember to save changes', error: false });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Pulse Save action
  const handleSaveAll = () => {
    setIsSaving(true);
    saveChanges();
    setTimeout(() => {
      setIsSaving(false);
    }, 1200);
  };

  // Export siteData.json action
  const handleExportConfig = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'siteData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Render Login view if not logged in
  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050209]/95 backdrop-blur-xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md p-8 rounded-3xl bg-[#0d071c]/90 border border-white/10 shadow-[0_0_50px_rgba(255,45,122,0.15)] space-y-6"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2D7A] to-[#FF8A00] p-0.5 mx-auto flex items-center justify-center shadow-lg">
              <div className="w-full h-full rounded-full bg-[#050209] flex items-center justify-center">
                <Lock size={24} className="text-[#FF2D7A]" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-black text-white">
              {lang === 'ar' ? 'لوحة التحكم السحرية' : 'Magic Control Panel'}
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D7A]/50 transition-all font-mono"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle size={14} />
                <span>{lang === 'ar' ? 'كلمة المرور غير صحيحة!' : 'Incorrect password!'}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white font-extrabold text-sm shadow-lg hover:opacity-95 transition-all"
            >
              {lang === 'ar' ? 'دخول اللوحة' : 'Enter Panel'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050209] flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Admin Panel Header */}
      <header className="px-6 py-4 bg-[#0d071c] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF2D7A]/15 flex items-center justify-center text-[#FF2D7A]">
            <Settings size={20} className="animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-display font-black text-white">
              {lang === 'ar' ? 'لوحة التحكم بالإعدادات' : 'System Configuration Panel'}
            </h1>
            <p className="text-[10px] text-gray-500 font-mono">
              PIXELZ STUDIO ENGINE v1.2
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={resetChanges}
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-bold transition-all"
            >
              {lang === 'ar' ? 'تراجع' : 'Discard'}
            </motion.button>
          )}

          <button
            onClick={handleSaveAll}
            disabled={!hasUnsavedChanges && !isSaving}
            className={`relative px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 overflow-hidden shadow-md ${
              hasUnsavedChanges 
                ? 'bg-gradient-to-r from-[#FF2D7A] to-[#FF8A00] text-white animate-pulse' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>{lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportConfig}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            title={lang === 'ar' ? 'تصدير الإعدادات كملف JSON' : 'Export settings as JSON'}
          >
            <Download size={14} />
            <span>{lang === 'ar' ? 'تصدير الإعدادات (Export Config)' : 'Export Config'}</span>
          </button>

          <button 
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
            title={lang === 'ar' ? 'إغلاق والعودة للموقع' : 'Close and return'}
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Rail */}
        <aside className="w-64 bg-[#080410] border-r border-white/5 flex flex-col justify-between py-6 overflow-y-auto shrink-0">
          <nav className="space-y-1.5 px-3">
            {[
              { id: 'general', label: lang === 'ar' ? 'الإعدادات العامة والأمان' : 'General & Security', icon: Shield },
              { id: 'hero', label: lang === 'ar' ? 'الواجهة الرئيسية والفيديو' : 'Hero & Showreel', icon: Film },
              { id: 'portfolio', label: lang === 'ar' ? 'معرض الأعمال والشورتس' : 'Curated Portfolio', icon: Tv },
              { id: 'cases', label: lang === 'ar' ? 'الهوية البصرية والحالة' : 'Visual Identity Suite', icon: Image },
              { id: 'thumbnails', label: lang === 'ar' ? 'أعمال الأغلفة والبوسترات' : 'Covers & Artworks', icon: Plus },
              { id: 'services', label: lang === 'ar' ? 'الخدمات وباقات العمل' : 'Services & Offers', icon: Info },
              { id: 'timeline', label: lang === 'ar' ? 'خطوات ورحلة العمل' : 'Work Process Steps', icon: Clock },
              { id: 'testimonials', label: lang === 'ar' ? 'آراء شركاء النجاح' : 'Success Stories', icon: MessageSquare },
              { id: 'team', label: lang === 'ar' ? 'أعضاء الفريق والشركة' : 'Team Members', icon: Users },
              { id: 'contact', label: lang === 'ar' ? 'بيانات الاتصال والسوشيال' : 'Contact & Platforms', icon: Phone },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#FF2D7A]/15 to-[#FF8A00]/15 border border-[#FF2D7A]/30 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <TabIcon size={16} className={isActive ? 'text-[#FF2D7A]' : 'text-gray-500'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-6 text-[10px] text-gray-600 font-mono space-y-1">
            <p>Environment: Production</p>
            <p>Database: Client-Local Storage</p>
            <p className="text-brand-secondary">Click 'Save Changes' to apply</p>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#050209] space-y-8">
          
          {/* TAB 1: GENERAL & SECURITY */}
          {activeTab === 'general' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'الأمان والإعدادات الافتراضية للموقع' : 'Security & Landing Preferences'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تحكم في إمكانية تغيير الباسورد، سلوك واجهة التحميل المبدئية واللغة والتحكم بالصوت.' : 'Manage security credentials, loading screens, and audio interactions.'}
                </p>
              </div>

              {/* Password Change Form */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-secondary font-bold flex items-center gap-2">
                  <Lock size={12} />
                  <span>{lang === 'ar' ? 'تغيير كلمة مرور لوحة التحكم' : 'Change Admin Access Password'}</span>
                </h4>

                <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">{lang === 'ar' ? 'كلمة المرور الحالية' : 'Old Password'}</label>
                    <input 
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-[#FF2D7A]/50"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">{lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-[#FF2D7A]/50"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">{lang === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}</label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-[#FF2D7A]/50"
                      required
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#FF2D7A] hover:bg-[#FF2D7A]/90 text-white text-[11px] font-black transition-all"
                    >
                      {lang === 'ar' ? 'تعديل كلمة المرور' : 'Update Password'}
                    </button>
                  </div>
                </form>

                {pwdMessage && (
                  <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${pwdMessage.error ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                    {pwdMessage.error ? <AlertCircle size={14} /> : <Check size={14} />}
                    <span>{pwdMessage.text}</span>
                  </div>
                )}
              </div>

              {/* General Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Loader Screen Control */}
                <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                  <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold flex items-center justify-between">
                    <span>{lang === 'ar' ? 'شاشة الترحيب المبدئية' : 'Splash Loader Screen'}</span>
                    <button 
                      onClick={() => updateSiteData({ showSplash: !siteData.showSplash })}
                      className={`p-1.5 rounded-lg transition-all ${siteData.showSplash ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'}`}
                    >
                      {siteData.showSplash ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-gray-400">{lang === 'ar' ? 'جملة التحميل المبدئية (العربية)' : 'Arabic Slogan'}</label>
                      <input 
                        type="text"
                        value={siteData.splashText.ar}
                        onChange={(e) => updateSiteData({ splashText: { ...siteData.splashText, ar: e.target.value } })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-gray-400">{lang === 'ar' ? 'جملة التحميل المبدئية (الإنجليزية)' : 'English Slogan'}</label>
                      <input 
                        type="text"
                        value={siteData.splashText.en}
                        onChange={(e) => updateSiteData({ splashText: { ...siteData.splashText, en: e.target.value } })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Sound & Default Language preferences */}
                <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold mb-4">
                      {lang === 'ar' ? 'تفضيلات النظام' : 'System Preferences'}
                    </h4>

                    <div className="space-y-4">
                      {/* Audio Effects Toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{lang === 'ar' ? 'المؤثرات الصوتية والموسيقى' : 'Audio & Hover SFX'}</p>
                          <p className="text-[10px] text-gray-500">{lang === 'ar' ? 'تشغيل أو إيقاف أصوات الأزرار والحركة' : 'Toggle micro audio cues on user clicks/hovers'}</p>
                        </div>
                        <button
                          onClick={() => updateSiteData({ soundEnabled: !siteData.soundEnabled })}
                          className={`p-2 rounded-xl border transition-all ${
                            siteData.soundEnabled 
                              ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                              : 'bg-white/5 border-white/10 text-gray-500'
                          }`}
                        >
                          {siteData.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </button>
                      </div>

                      {/* Default Lang preference */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-xs font-bold text-white">{lang === 'ar' ? 'اللغة الافتراضية عند أول زيارة' : 'Default Visit Language'}</p>
                          <p className="text-[10px] text-gray-500">{lang === 'ar' ? 'تحديد لغة عرض الموقع الافتراضية للمستخدمين' : 'Language initialized upon first visit'}</p>
                        </div>
                        <select
                          value={siteData.defaultLanguage}
                          onChange={(e) => updateSiteData({ defaultLanguage: e.target.value as Language })}
                          className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF2D7A]/50"
                        >
                          <option value="ar">العربية</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: HERO & SHOWREEL */}
          {activeTab === 'hero' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'القسم الرئيسي والفيديو التعريفي' : 'Hero Section & Showreel Link'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تعديل رابط شو ريل الفيديو التعريفي ومؤشرات الثقة الثلاثة.' : 'Configure showcase showreel, custom branding metrics and tagline headings.'}
                </p>
              </div>

              {/* Showreel Config */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                  {lang === 'ar' ? 'رابط الفيديو التعريفي (Showreel Embed)' : 'Cinematic Video Embed Link'}
                </h4>
                <div className="space-y-2">
                  <input 
                    type="text"
                    value={siteData.showreelUrl}
                    onChange={(e) => updateSiteData({ showreelUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="w-full px-3 py-2.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                  />
                  <p className="text-[10px] text-gray-500">
                    {lang === 'ar' ? 'يدعم روابط التضمين لليوتيوب، فيميو، أو روابط جوجل درايف المباشرة.' : 'Paste custom embedding link from YouTube, Vimeo, or Google Drive.'}
                  </p>
                </div>
              </div>

              {/* Hero Stats (Numerical Counters) */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                    {lang === 'ar' ? 'قسم الإحصائيات والأرقام' : 'Numerical Trust Counters'}
                  </h4>
                  <button 
                    onClick={() => updateSiteData({ showHeroStats: !siteData.showHeroStats })}
                    className={`p-1.5 rounded-lg transition-all ${siteData.showHeroStats ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'}`}
                  >
                    {siteData.showHeroStats ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'المشاريع المكتملة' : 'Projects Count'}</label>
                    <input 
                      type="number"
                      value={siteData.stats.projectsCount}
                      onChange={(e) => updateSiteData({ stats: { ...siteData.stats, projectsCount: Number(e.target.value) } })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'شركاء النجاح' : 'Clients Count'}</label>
                    <input 
                      type="number"
                      value={siteData.stats.clientsCount}
                      onChange={(e) => updateSiteData({ stats: { ...siteData.stats, clientsCount: Number(e.target.value) } })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'منصات التوزيع' : 'Platforms Count'}</label>
                    <input 
                      type="number"
                      value={siteData.stats.platformsCount}
                      onChange={(e) => updateSiteData({ stats: { ...siteData.stats, platformsCount: Number(e.target.value) } })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'متوسط أيام التسليم' : 'Avg Delivery Days'}</label>
                    <input 
                      type="number"
                      value={siteData.stats.avgDeliveryDays}
                      onChange={(e) => updateSiteData({ stats: { ...siteData.stats, avgDeliveryDays: Number(e.target.value) } })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Feature highlights management (The 3 original cards or up to 6!) */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                    {lang === 'ar' ? 'كروت الضمان والميزات التنافسية (3 كروت أساسية وتصل إلى 6)' : 'Competitive Assurance Badges (Up to 6)'}
                  </h4>
                  <button 
                    onClick={() => updateSiteData({ showFeaturesSection: !siteData.showFeaturesSection })}
                    className={`p-1.5 rounded-lg transition-all ${siteData.showFeaturesSection ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'}`}
                  >
                    {siteData.showFeaturesSection ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>

                <div className="space-y-4">
                  {siteData.featuresList.map((feat, idx) => (
                    <div key={feat.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500">{lang === 'ar' ? `اسم الميزة ${idx+1} (عربي)` : `Assurance Name ${idx+1} (Ar)`}</label>
                          <input 
                            type="text"
                            value={feat.title.ar}
                            onChange={(e) => {
                              const updated = [...siteData.featuresList];
                              updated[idx].title.ar = e.target.value;
                              updateSiteData({ featuresList: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500">{lang === 'ar' ? `اسم الميزة ${idx+1} (إنجليزي)` : `Assurance Name ${idx+1} (En)`}</label>
                          <input 
                            type="text"
                            value={feat.title.en}
                            onChange={(e) => {
                              const updated = [...siteData.featuresList];
                              updated[idx].title.en = e.target.value;
                              updateSiteData({ featuresList: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500">{lang === 'ar' ? 'الوصف الفرعي (عربي)' : 'Subdesc (Ar)'}</label>
                          <input 
                            type="text"
                            value={feat.desc.ar}
                            onChange={(e) => {
                              const updated = [...siteData.featuresList];
                              updated[idx].desc.ar = e.target.value;
                              updateSiteData({ featuresList: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-500">{lang === 'ar' ? 'الوصف الفرعي (إنجليزي)' : 'Subdesc (En)'}</label>
                          <input 
                            type="text"
                            value={feat.desc.en}
                            onChange={(e) => {
                              const updated = [...siteData.featuresList];
                              updated[idx].desc.en = e.target.value;
                              updateSiteData({ featuresList: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          onClick={() => {
                            const updated = [...siteData.featuresList];
                            updated[idx].visible = !updated[idx].visible;
                            updateSiteData({ featuresList: updated });
                          }}
                          className={`p-2 rounded-lg transition-all ${feat.visible ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}
                          title={feat.visible ? 'Hide feature' : 'Show feature'}
                        >
                          {feat.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        
                        {siteData.featuresList.length > 1 && (
                          <button
                            onClick={() => {
                              const updated = siteData.featuresList.filter(f => f.id !== feat.id);
                              updateSiteData({ featuresList: updated });
                            }}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete feature"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add feature trigger */}
                  {siteData.featuresList.length < 6 && (
                    <button
                      onClick={() => {
                        const newId = `feat_${Date.now()}`;
                        const newFeat: FeatureItem = {
                          id: newId,
                          icon: 'Shield',
                          title: { ar: 'ميزة جديدة', en: 'New Feature' },
                          desc: { ar: 'وصف مقتضب مكمل للميزة', en: 'A brief description of this feature' },
                          visible: true
                        };
                        updateSiteData({ featuresList: [...siteData.featuresList, newFeat] });
                      }}
                      className="w-full py-3 rounded-xl border border-dashed border-white/15 hover:border-[#FF2D7A]/50 hover:bg-[#FF2D7A]/5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus size={14} />
                      <span>{lang === 'ar' ? 'إضافة ميزة جديدة للقسم' : 'Add New Feature Badging'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'معرض الأعمال الإبداعية والشورتس' : 'Curated Masterpieces & Short Videos'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'إضافة وتعديل روابط فيديوهات اليوتيوب والشورتس/الريلز وتثبيت نسب النقر والأغلفة.' : 'Add, edit or delete long videos or high-impact YouTube Shorts/Reels.'}
                </p>
              </div>

              {/* Portfolio Section Toggle */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'إظهار قسم معرض الأعمال بالكامل' : 'Show Curated Masterpieces Section'}</p>
                  <p className="text-[10px] text-gray-500">{lang === 'ar' ? 'إخفاء أو إظهار القسم الرئيسي لمعرض الأعمال من الصفحة الرئيسية' : 'Toggle entire masterpieces grid on landing page'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showPortfolioSection: !siteData.showPortfolioSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showPortfolioSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showPortfolioSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Portfolio Grid List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                    {lang === 'ar' ? 'قائمة الفيديوهات والأعمال' : 'Interactive Project Portfolio'}
                  </h4>
                </div>

                {siteData.portfolioProjects.map((proj, idx) => (
                  <div key={proj.id} className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Name (Arabic) */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان العمل (عربي)' : 'Project Name (Ar)'}</label>
                        <input 
                          type="text"
                          value={proj.title.ar}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].title.ar = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Name (English) */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان العمل (إنجليزي)' : 'Project Name (En)'}</label>
                        <input 
                          type="text"
                          value={proj.title.en}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].title.en = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Category selection */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'التصنيف الرئيسي' : 'Project Category'}</label>
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].category = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
                        >
                          <option value="youtube">{lang === 'ar' ? 'يوتيوب طويل' : 'YouTube Longs'}</option>
                          <option value="reels">{lang === 'ar' ? 'ريلز وشورتس' : 'Shorts / Reels'}</option>
                          <option value="thumbnail">{lang === 'ar' ? 'ثمبنيل وغلاف' : 'Thumbnail design'}</option>
                        </select>
                      </div>

                      {/* Project Highlight Result metric */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'النتيجة المحققة (مثال: +180% مشاهدة)' : 'Result/Performance Highlight (Ar/En)'}</label>
                        <input 
                          type="text"
                          value={proj.result.ar}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].result.ar = e.target.value;
                            updated[idx].result.en = e.target.value; // sync simple values
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Direct YouTube Video ID or high-quality direct link */}
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'معرف فيديو يوتيوب أو رابط الفيديو (ID / URL)' : 'YouTube Video ID or direct link URL'}</label>
                        <input 
                          type="text"
                          value={proj.mediaUrl}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].mediaUrl = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          placeholder="vT1_g9Qo46M"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      {/* Description (Arabic) */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'الوصف / التعريف (عربي)' : 'Description / Definition (Ar)'}</label>
                        <textarea 
                          value={proj.desc?.ar || ''}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            if (!updated[idx].desc) updated[idx].desc = { ar: '', en: '' };
                            updated[idx].desc.ar = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF2D7A]/40"
                        />
                      </div>

                      {/* Description (English) */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'الوصف / التعريف (إنجليزي)' : 'Description / Definition (En)'}</label>
                        <textarea 
                          value={proj.desc?.en || ''}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            if (!updated[idx].desc) updated[idx].desc = { ar: '', en: '' };
                            updated[idx].desc.en = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF2D7A]/40"
                        />
                      </div>

                      {/* Cover URL */}
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">
                          {lang === 'ar' 
                            ? 'رابط صورة الغلاف (اختياري - يظهر كواجهة فيديو ريلز قبل التشغيل)' 
                            : 'Cover Image URL (Optional - visible for reels as thumbnail before play)'}
                        </label>
                        <input 
                          type="text"
                          value={proj.coverUrl || ''}
                          onChange={(e) => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].coverUrl = e.target.value;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          placeholder={lang === 'ar' ? '/src/assets/images/cover.jpg' : '/src/assets/images/cover.jpg'}
                          className="w-full px-3 py-2.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-[#FF2D7A]/40"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="text-[10px] text-gray-500 font-mono">
                        ID: {proj.id}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = [...siteData.portfolioProjects];
                            updated[idx].visible = !updated[idx].visible;
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            proj.visible 
                              ? 'bg-green-500/10 text-green-400' 
                              : 'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {proj.visible ? (
                            <>
                              <Eye size={12} />
                              <span>{lang === 'ar' ? 'نشط' : 'Active'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} />
                              <span>{lang === 'ar' ? 'مخفي' : 'Hidden'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            const updated = siteData.portfolioProjects.filter(p => p.id !== proj.id);
                            updateSiteData({ portfolioProjects: updated });
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-1 text-xs"
                        >
                          <Trash2 size={12} />
                          <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newId = `proj_${Date.now()}`;
                    const newProj: ProjectItem = {
                      id: newId,
                      title: { ar: 'عمل جديد غير معنون', en: 'Untitled New Masterpiece' },
                      category: 'youtube',
                      result: { ar: 'تأثير سينمائي مميز', en: 'Stunning cinematic performance' },
                      desc: { ar: 'تحرير كامل وإيقاع متناغم يعزز النقر والتفاعل الفوري للجمهور.', en: 'Full custom editing aligned with audience attention maps.' },
                      mediaUrl: 'dQw4w9WgXcQ',
                      tags: { ar: ['مونتاج', 'تصميم حركة'], en: ['Editor', 'Visuals'] },
                      visible: true
                    };
                    updateSiteData({ portfolioProjects: [...siteData.portfolioProjects, newProj] });
                  }}
                  className="w-full py-4 border border-dashed border-white/10 hover:border-[#FF2D7A]/50 hover:bg-[#FF2D7A]/5 rounded-2xl flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-all"
                >
                  <Plus size={14} />
                  <span>{lang === 'ar' ? 'إضافة عمل فني جديد للمعرض' : 'Add New Portfolio Project'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CASE STUDIES & DOSSIER */}
          {activeTab === 'cases' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'الهوية البصرية ودراسات الحالة العميقة' : 'Visual Identity & Case Studies'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تحكم في ملف دراسات الحالة المتكاملة. يمكنك إضافة قسم جديد للاغلفة أو صفحات السوشيال أو يوتيوب.' : 'Manage full visual dossiers and platform conversions.'}
                </p>
              </div>

              {/* Case Studies Toggle */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'تفعيل قسم الهوية البصرية بالكامل' : 'Enable Visual Identity Dossier'}</p>
                  <p className="text-[10px] text-gray-500">{lang === 'ar' ? 'إخفاء أو إظهار هذا الملف بالكامل من الشاشة الرئيسية للموقع' : 'Toggle entire dossier section on landing'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showCaseStudiesSection: !siteData.showCaseStudiesSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showCaseStudiesSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showCaseStudiesSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Case Studies Loop */}
              <div className="space-y-6">
                {siteData.caseStudies.map((cs, idx) => (
                  <div key={cs.id} className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-brand-secondary/20 text-brand-secondary font-bold uppercase font-mono">
                          {cs.type}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {cs.title[lang]}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          const updated = siteData.caseStudies.filter(c => c.id !== cs.id);
                          updateSiteData({ caseStudies: updated });
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete Case Study"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">{lang === 'ar' ? 'اسم الصفحة / القناة (عربي)' : 'Name / Title (Ar)'}</label>
                        <input 
                          type="text"
                          value={cs.title.ar}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].title.ar = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">{lang === 'ar' ? 'اسم الصفحة / القناة (إنجليزي)' : 'Name / Title (En)'}</label>
                        <input 
                          type="text"
                          value={cs.title.en}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].title.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'العميل المستهدف (عربي)' : 'Client Domain (Ar)'}</label>
                        <input 
                          type="text"
                          value={cs.clientName.ar}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].clientName.ar = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'العميل المستهدف (إنجليزي)' : 'Client Domain (En)'}</label>
                        <input 
                          type="text"
                          value={cs.clientName.en}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].clientName.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'الأرقام المحققة والنتائج' : 'Metrics Result (Ar)'}</label>
                        <input 
                          type="text"
                          value={cs.metrics.ar}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].metrics.ar = e.target.value;
                            updated[idx].metrics.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'رابط صورة المعاينة الفنية' : 'Fallback Preview Image Link'}</label>
                        <input 
                          type="text"
                          value={cs.image}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].image = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      {/* Brand Identity Custom Fields */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">
                          {cs.type === 'facebook' 
                            ? (lang === 'ar' ? 'رابط لوجو الصفحة' : 'Page Logo Link')
                            : (lang === 'ar' ? 'رابط لوجو القناة' : 'Channel Logo Link')}
                        </label>
                        <input 
                          type="text"
                          value={cs.logoUrl || ''}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].logoUrl = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          placeholder="https://..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">
                          {cs.type === 'facebook' 
                            ? (lang === 'ar' ? 'رابط صورة غلاف الصفحة' : 'Page Cover Link')
                            : (lang === 'ar' ? 'رابط صورة غلاف القناة' : 'Channel Cover Link')}
                        </label>
                        <input 
                          type="text"
                          value={cs.coverUrl || ''}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].coverUrl = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          placeholder="https://..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">
                          {cs.type === 'facebook' 
                            ? (lang === 'ar' ? 'رابط صورة بوستر المنشور' : 'Page Poster Image Link')
                            : (lang === 'ar' ? 'رابط فيديو يوتيوب (ID أو الرابط الكامل)' : 'YouTube Video Link/ID')}
                        </label>
                        <input 
                          type="text"
                          value={cs.mediaUrl || ''}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].mediaUrl = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          placeholder={cs.type === 'facebook' ? 'https://...' : 'ScMzIvxBSi4'}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">
                          {cs.type === 'facebook' 
                            ? (lang === 'ar' ? 'نص المنشور (عربي)' : 'Post Text (Arabic)')
                            : (lang === 'ar' ? 'وصف القناة (عربي)' : 'Channel Description (Arabic)')}
                        </label>
                        <textarea 
                          value={cs.postText?.ar || ''}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            if (!updated[idx].postText) updated[idx].postText = { ar: '', en: '' };
                            updated[idx].postText!.ar = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-brand-secondary font-bold font-mono">
                          {cs.type === 'facebook' 
                            ? (lang === 'ar' ? 'نص المنشور (إنجليزي)' : 'Post Text (English)')
                            : (lang === 'ar' ? 'وصف القناة (إنجليزي)' : 'Channel Description (English)')}
                        </label>
                        <textarea 
                          value={cs.postText?.en || ''}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            if (!updated[idx].postText) updated[idx].postText = { ar: '', en: '' };
                            updated[idx].postText!.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'التحدي الرئيسي للمشروع' : 'Primary Challenge Statement'}</label>
                        <textarea 
                          value={cs.challenge.ar}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].challenge.ar = e.target.value;
                            updated[idx].challenge.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'النهج والاستراتيجية البصرية' : 'Approach & Creative Action Plan'}</label>
                        <textarea 
                          value={cs.approach.ar}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].approach.ar = e.target.value;
                            updated[idx].approach.en = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'اللون المميز' : 'Theme Accent'}</label>
                        <input 
                          type="color"
                          value={cs.accentColor}
                          onChange={(e) => {
                            const updated = [...siteData.caseStudies];
                            updated[idx].accentColor = e.target.value;
                            updateSiteData({ caseStudies: updated });
                          }}
                          className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const updated = [...siteData.caseStudies];
                          updated[idx].visible = !updated[idx].visible;
                          updateSiteData({ caseStudies: updated });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${cs.visible ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}
                      >
                        {cs.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{cs.visible ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'مخفي' : 'Hidden')}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Modular Addition Options (Ar asks to choose type: Facebook, YouTube, covers) */}
                <div className="p-6 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
                  <p className="text-xs text-gray-400">
                    {lang === 'ar' ? 'اضغط لإضافة قسم دراسة حالة جديد للهوية البصرية (اختر نوع الهوية):' : 'Add custom dossier case study (Choose targeted branch type):'}
                  </p>
                  <div className="flex gap-3">
                    {[
                      { key: 'facebook', label: lang === 'ar' ? 'صفحة فيسبوك' : 'Facebook Page', color: 'from-[#00c6ff] to-[#0072ff]' },
                      { key: 'youtube', label: lang === 'ar' ? 'قناة يوتيوب' : 'YouTube Channel', color: 'from-[#FF2D7A] to-[#FF8A00]' }
                    ].map((type) => (
                      <button
                        key={type.key}
                        onClick={() => {
                          const newId = `case_${Date.now()}`;
                          const newCS: CaseStudyItem = {
                            id: newId,
                            type: type.key as any,
                            title: { ar: `هوية بصرية لـ ${type.label}`, en: `Complete Visual Ecosystem for ${type.key}` },
                            clientName: { ar: 'مشروع وهوية متكاملة', en: 'Partner Milestone' },
                            metrics: { ar: '+120% نمو عضوي مذهل', en: '+120% Peak performance metric' },
                            challenge: { ar: 'بناء حضور رقمي وثبات للمحتوى بأسلوب فريد.', en: 'Establishing a cohesive presence and consistent conversions.' },
                            approach: { ar: 'ألوان حركية جريئة وصور فنية للأغلفة.', en: 'Futuristic color grading and high-contrast composition.' },
                            deliverables: { ar: ['دليل الخطوط والألوان', 'مجموعة صور النشر'], en: ['Font & Color guides', 'Launch assets grid'] },
                            tools: ['Photoshop', 'Illustrator'],
                            results: { ar: ['تفاعل لافت للأنظار', 'صدارة مميزة'], en: ['Incredible viral traction', 'Cohesive authority style'] },
                            accentColor: '#FF2D7A',
                            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
                            visible: true,
                            logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
                            coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
                            mediaUrl: type.key === 'youtube' ? "ScMzIvxBSi4" : "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
                            postText: {
                              ar: type.key === 'youtube' ? "هوية بصرية متكاملة: من اللوجو ثلاثي الأبعاد إلى الأغلفة والفيديوهات الحركية عالية الاحتفاظ بالجمهور." : "متحمسون لمشاركة تصميم الغلاف الجديد معكم! قمنا بدمج درجات النيون الفاخرة مع الأيقونات ثلاثية الأبعاد لخلق انطباع بصري استثنائي ⚡️",
                              en: type.key === 'youtube' ? "A comprehensive brand ecosystem: from 3D logos to high-retention covers and cinematic edits." : "Excited to share our brand-new page design! Combining high-intensity neon gradients with 3D fluid glass textures to lock viewer engagement."
                            }
                          };
                          updateSiteData({ caseStudies: [...siteData.caseStudies, newCS] });
                        }}
                        className={`px-4 py-2 text-xs rounded-xl bg-gradient-to-r ${type.color} text-white font-extrabold shadow-md hover:scale-105 transition-all`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4.5: COVERS & ARTWORKS WALL (THUMBNAILS) */}
          {activeTab === 'thumbnails' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'أعمال الأغلفة والبوسترات الفنية' : 'Covers & Artworks Wall'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'أضف واحذف وعدل صور الأغلفة والبوسترات ثلاثية الأبعاد التي تظهر في الجدار الفني.' : 'Manage cinematic thumbnails, 3D artwork composites, and CTR metrics.'}
                </p>
              </div>

              {/* Toggle entire section */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'تفعيل قسم الجدار الفني بالكامل' : 'Enable Artworks Wall Section'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showThumbnailsWallSection: !siteData.showThumbnailsWallSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showThumbnailsWallSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showThumbnailsWallSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Thumbnails list editor */}
              <div className="space-y-4">
                {siteData.thumbnailsList?.map((thumb, idx) => (
                  <div key={thumb.id} className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        {thumb.imageUrl && (
                          <img 
                            src={thumb.imageUrl} 
                            alt="thumbnail" 
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded object-cover border border-white/10" 
                          />
                        )}
                        <h4 className="text-sm font-bold text-white">
                          {thumb.title[lang]}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          const updated = siteData.thumbnailsList.filter(t => t.id !== thumb.id);
                          updateSiteData({ thumbnailsList: updated });
                        }}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete Artwork"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'العنوان الفني (عربي)' : 'Artwork Title (Ar)'}</label>
                        <input 
                          type="text"
                          value={thumb.title.ar}
                          onChange={(e) => {
                            const updated = [...siteData.thumbnailsList];
                            updated[idx].title.ar = e.target.value;
                            updateSiteData({ thumbnailsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'العنوان الفني (إنجليزي)' : 'Artwork Title (En)'}</label>
                        <input 
                          type="text"
                          value={thumb.title.en}
                          onChange={(e) => {
                            const updated = [...siteData.thumbnailsList];
                            updated[idx].title.en = e.target.value;
                            updateSiteData({ thumbnailsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'معدل النقر CTR أو علامة مميزة' : 'CTR Badge Label'}</label>
                        <input 
                          type="text"
                          value={thumb.ctr || ''}
                          onChange={(e) => {
                            const updated = [...siteData.thumbnailsList];
                            updated[idx].ctr = e.target.value;
                            updateSiteData({ thumbnailsList: updated });
                          }}
                          placeholder="e.g. CTR: 14.2%"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'رابط صورة الغلاف أو البوستر' : 'Image URL'}</label>
                        <input 
                          type="text"
                          value={thumb.imageUrl}
                          onChange={(e) => {
                            const updated = [...siteData.thumbnailsList];
                            updated[idx].imageUrl = e.target.value;
                            updateSiteData({ thumbnailsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end border-t border-white/5 pt-3">
                      <button
                        onClick={() => {
                          const updated = [...siteData.thumbnailsList];
                          updated[idx].visible = !updated[idx].visible;
                          updateSiteData({ thumbnailsList: updated });
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${thumb.visible ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}
                      >
                        {thumb.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{thumb.visible ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'مخفي' : 'Hidden')}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add new thumbnail item button */}
                <button
                  onClick={() => {
                    const newId = `thumb_${Date.now()}`;
                    const newThumb: ThumbnailItem = {
                      id: newId,
                      title: { ar: 'تصميم غلاف سينمائي جديد', en: 'New Cinematic Cover Art' },
                      ctr: 'CTR: 15.1%',
                      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
                      visible: true
                    };
                    updateSiteData({ thumbnailsList: [...siteData.thumbnailsList, newThumb] });
                  }}
                  className="w-full py-4 rounded-2xl border border-dashed border-white/10 hover:border-brand-secondary/40 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  <span>{lang === 'ar' ? 'إضافة تصميم فني جديد للجدار' : 'Add New Art to Wall'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES & PACKAGES */}
          {activeTab === 'services' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'الخدمات وباقات العمل الفنية' : 'Cinema Services & Starting Prices'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تحرير تفاصيل الكروت الستة للخدمات، وتعديل الجملة الصفراء التنبيهية في الأسفل.' : 'Configure pricing scales, package details, icons, and services card indices.'}
                </p>
              </div>

              {/* Toggle entire section */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'تفعيل قسم الخدمات بالكامل' : 'Enable Services Section'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showServicesSection: !siteData.showServicesSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showServicesSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showServicesSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Services List loop */}
              <div className="space-y-4">
                {siteData.servicesList.map((service, idx) => (
                  <div key={service.id} className="p-5 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                        {lang === 'ar' ? `بطاقة الخدمة: ${service.title.ar}` : `Service: ${service.title.en}`}
                      </h4>

                      <button
                        onClick={() => {
                          const updated = [...siteData.servicesList];
                          updated[idx].visible = !updated[idx].visible;
                          updateSiteData({ servicesList: updated });
                        }}
                        className={`p-1.5 rounded-lg transition-all ${service.visible ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}
                      >
                        {service.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان الخدمة (عربي)' : 'Service Title (Ar)'}</label>
                        <input 
                          type="text"
                          value={service.title.ar}
                          onChange={(e) => {
                            const updated = [...siteData.servicesList];
                            updated[idx].title.ar = e.target.value;
                            updateSiteData({ servicesList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان الخدمة (إنجليزي)' : 'Service Title (En)'}</label>
                        <input 
                          type="text"
                          value={service.title.en}
                          onChange={(e) => {
                            const updated = [...siteData.servicesList];
                            updated[idx].title.en = e.target.value;
                            updateSiteData({ servicesList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'وصف تفاصيل الخدمة والفوائد' : 'Description'}</label>
                        <textarea 
                          value={service.desc.ar}
                          onChange={(e) => {
                            const updated = [...siteData.servicesList];
                            updated[idx].desc.ar = e.target.value;
                            updated[idx].desc.en = e.target.value; // sync simple desc
                            updateSiteData({ servicesList: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'السطر الأصفر المميز (الأثر التنافسي)' : 'Yellow Impact Highlight sentence'}</label>
                        <input 
                          type="text"
                          value={service.benefit.ar}
                          onChange={(e) => {
                            const updated = [...siteData.servicesList];
                            updated[idx].benefit.ar = e.target.value;
                            updated[idx].benefit.en = e.target.value;
                            updateSiteData({ servicesList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TIMELINE & WORKFLOW */}
          {activeTab === 'timeline' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'خطوات ورحلة العمل المنظمة' : 'Timeline Workflow Steps'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'أعد ترتيب خطوات العمل صعوداً وهبوطاً، عدّل مسمياتها وأضف/احذف خطوات عمل جديدة.' : 'Add, edit, delete, or change order of process steps.'}
                </p>
              </div>

              {/* Timeline toggle */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'إظهار قسم خطوات العمل' : 'Show Timeline workflow'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showTimelineSection: !siteData.showTimelineSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showTimelineSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showTimelineSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Timeline steps list */}
              <div className="space-y-4">
                {siteData.timelineSteps.map((step, idx) => (
                  <div key={step.id} className="p-5 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs font-mono font-black text-[#FF8A00]">
                        {lang === 'ar' ? `الخطوة ${step.stepNumber}` : `Step ${step.stepNumber}`}
                      </span>

                      {/* Reorder and management controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const updated = [...siteData.timelineSteps];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            // adjust serial numbers
                            updated.forEach((s, i) => s.stepNumber = String(i + 1).padStart(2, '0'));
                            updateSiteData({ timelineSteps: updated });
                          }}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 disabled:pointer-events-none"
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        
                        <button
                          onClick={() => {
                            if (idx === siteData.timelineSteps.length - 1) return;
                            const updated = [...siteData.timelineSteps];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            updated.forEach((s, i) => s.stepNumber = String(i + 1).padStart(2, '0'));
                            updateSiteData({ timelineSteps: updated });
                          }}
                          disabled={idx === siteData.timelineSteps.length - 1}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 disabled:pointer-events-none"
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        <button
                          onClick={() => {
                            const updated = siteData.timelineSteps.filter(s => s.id !== step.id);
                            updated.forEach((s, i) => s.stepNumber = String(i + 1).padStart(2, '0'));
                            updateSiteData({ timelineSteps: updated });
                          }}
                          className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete Step"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان الخطوة (عربي)' : 'Title (Ar)'}</label>
                        <input 
                          type="text"
                          value={step.title.ar}
                          onChange={(e) => {
                            const updated = [...siteData.timelineSteps];
                            updated[idx].title.ar = e.target.value;
                            updateSiteData({ timelineSteps: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عنوان الخطوة (إنجليزي)' : 'Title (En)'}</label>
                        <input 
                          type="text"
                          value={step.title.en}
                          onChange={(e) => {
                            const updated = [...siteData.timelineSteps];
                            updated[idx].title.en = e.target.value;
                            updateSiteData({ timelineSteps: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'التفاصيل والوصف' : 'Detailed Description'}</label>
                        <textarea 
                          value={step.desc.ar}
                          onChange={(e) => {
                            const updated = [...siteData.timelineSteps];
                            updated[idx].desc.ar = e.target.value;
                            updated[idx].desc.en = e.target.value;
                            updateSiteData({ timelineSteps: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newId = `step_${Date.now()}`;
                    const nextNum = String(siteData.timelineSteps.length + 1).padStart(2, '0');
                    const newStep: TimelineStepItem = {
                      id: newId,
                      stepNumber: nextNum,
                      title: { ar: 'خطوة عمل إضافية', en: 'New Production Step' },
                      desc: { ar: 'شرح موجز لآلية هندسة الفكرة وتحقيق الرؤية.', en: 'Meticulous design validation steps.' },
                      visible: true
                    };
                    updateSiteData({ timelineSteps: [...siteData.timelineSteps, newStep] });
                  }}
                  className="w-full py-3.5 border border-dashed border-white/10 hover:border-[#FF2D7A]/50 hover:bg-[#FF2D7A]/5 rounded-xl flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-all"
                >
                  <Plus size={14} />
                  <span>{lang === 'ar' ? 'إضافة خطوة عمل جديدة للرحلة' : 'Add New Process Phase'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'آراء شركاء النجاح والتقييمات' : 'Success Stories & Client Testimonials'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تعديل وحذف آراء العملاء، والموافقة على الآراء المرسلة ذاتياً من العملاء مباشرة.' : 'Approve, edit, or remove success reviews and customer feedbacks.'}
                </p>
              </div>

              {/* Toggle testimonials section */}
              <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{lang === 'ar' ? 'إظهار قسم آراء شركاء النجاح' : 'Show Success Stories'}</p>
                </div>
                <button 
                  onClick={() => updateSiteData({ showTestimonialsSection: !siteData.showTestimonialsSection })}
                  className={`p-2 rounded-xl border transition-all ${
                    siteData.showTestimonialsSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                >
                  {siteData.showTestimonialsSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Review items loop */}
              <div className="space-y-4">
                {siteData.testimonialsList.map((test, idx) => (
                  <div key={test.id} className="p-5 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={test.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{test.name.ar}</h4>
                          <p className="text-[10px] text-gray-500">{test.role.ar}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {test.isClientSubmitted && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/30 animate-pulse">
                            {lang === 'ar' ? 'مرسل من العميل' : 'Client Submission'}
                          </span>
                        )}

                        <button
                          onClick={() => {
                            const updated = siteData.testimonialsList.filter(t => t.id !== test.id);
                            updateSiteData({ testimonialsList: updated });
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/15 transition-all"
                          title="Delete testimonial"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'اسم العميل' : 'Client Name'}</label>
                        <input 
                          type="text"
                          value={test.name.ar}
                          onChange={(e) => {
                            const updated = [...siteData.testimonialsList];
                            updated[idx].name.ar = e.target.value;
                            updated[idx].name.en = e.target.value;
                            updateSiteData({ testimonialsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'توصيف العمل / المنصة' : 'Job / Platform'}</label>
                        <input 
                          type="text"
                          value={test.role.ar}
                          onChange={(e) => {
                            const updated = [...siteData.testimonialsList];
                            updated[idx].role.ar = e.target.value;
                            updated[idx].role.en = e.target.value;
                            updateSiteData({ testimonialsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'محتوى الرسالة والتقييم' : 'Review Message'}</label>
                        <textarea 
                          value={test.content.ar}
                          onChange={(e) => {
                            const updated = [...siteData.testimonialsList];
                            updated[idx].content.ar = e.target.value;
                            updated[idx].content.en = e.target.value;
                            updateSiteData({ testimonialsList: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'رابط الصورة الشخصية' : 'Avatar URL'}</label>
                        <input 
                          type="text"
                          value={test.avatar}
                          onChange={(e) => {
                            const updated = [...siteData.testimonialsList];
                            updated[idx].avatar = e.target.value;
                            updateSiteData({ testimonialsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'عدد النجوم (1-5)' : 'Stars Rating (1-5)'}</label>
                        <input 
                          type="number"
                          min={1}
                          max={5}
                          value={test.rating}
                          onChange={(e) => {
                            const updated = [...siteData.testimonialsList];
                            updated[idx].rating = Number(e.target.value);
                            updateSiteData({ testimonialsList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newId = `test_${Date.now()}`;
                    const newTest: TestimonialItem = {
                      id: newId,
                      name: { ar: 'شريك نجاح مجهول', en: 'Honorable Success Partner' },
                      role: { ar: 'منشئ محتوى رقمي', en: 'Creator / Founder' },
                      content: { ar: 'العمل الفني دقيق، إخراج سينمائي مبهر أحدث تأثيراً مباشراً من أول ساعات النشر!', en: 'Meticulous execution, highly cinematic delivery.' },
                      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
                      rating: 5,
                      visible: true
                    };
                    updateSiteData({ testimonialsList: [...siteData.testimonialsList, newTest] });
                  }}
                  className="w-full py-4 border border-dashed border-white/10 hover:border-[#FF2D7A]/50 hover:bg-[#FF2D7A]/5 rounded-2xl flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-all"
                >
                  <Plus size={14} />
                  <span>{lang === 'ar' ? 'إضافة رأي عميل جديد' : 'Add Custom Client Testimonial'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="space-y-8 max-w-3xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-bold text-white">
                    {lang === 'ar' ? 'إدارة أعضاء الفريق والشركة' : 'Manage Team & Company Members'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {lang === 'ar' ? 'إضافة موظفين جدد، وتعديل المسميات الوظيفية، وصورهم الشخصية، أو إخفائهم مؤقتاً.' : 'Add new colleagues, modify job descriptions, update profile links, or hide them.'}
                  </p>
                </div>

                <button
                  onClick={() => updateSiteData({ showTeamSection: !siteData.showTeamSection })}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                    siteData.showTeamSection 
                      ? 'bg-[#FF2D7A]/15 border-[#FF2D7A]/40 text-[#FF2D7A]' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}
                  title={siteData.showTeamSection ? (lang === 'ar' ? 'القسم مرئي حالياً' : 'Section is visible') : (lang === 'ar' ? 'القسم مخفي حالياً' : 'Section is hidden')}
                >
                  {siteData.showTeamSection ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {/* Team items loop */}
              <div className="space-y-4">
                {(siteData.teamMembersList || []).map((member, idx) => (
                  <div key={member.id} className="p-5 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={member.imageUrl} alt="member" className="w-8 h-8 rounded-full border border-white/10 object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{member.name.ar || member.name.en}</h4>
                          <p className="text-[10px] text-gray-500">{member.role.ar || member.role.en}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility individual toggle */}
                        <button
                          onClick={() => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].visible = updated[idx].visible === false ? true : false;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            member.visible !== false
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                          }`}
                          title={member.visible !== false ? (lang === 'ar' ? 'عضو مرئي' : 'Visible member') : (lang === 'ar' ? 'عضو مخفي' : 'Hidden member')}
                        >
                          {member.visible !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>

                        {/* Delete member */}
                        <button
                          onClick={() => {
                            const updated = siteData.teamMembersList.filter(m => m.id !== member.id);
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/15 transition-all cursor-pointer"
                          title="Delete member"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Arabic */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'الاسم بالكامل (عربي)' : 'Full Name (Arabic)'}</label>
                        <input 
                          type="text"
                          value={member.name.ar}
                          onChange={(e) => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].name.ar = e.target.value;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Name English */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'الاسم بالكامل (إنجليزي)' : 'Full Name (English)'}</label>
                        <input 
                          type="text"
                          value={member.name.en}
                          onChange={(e) => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].name.en = e.target.value;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Role Arabic */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'المسمى الوظيفي (عربي)' : 'Job Title (Arabic)'}</label>
                        <input 
                          type="text"
                          value={member.role.ar}
                          onChange={(e) => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].role.ar = e.target.value;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Role English */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'المسمى الوظيفي (إنجليزي)' : 'Job Title (English)'}</label>
                        <input 
                          type="text"
                          value={member.role.en}
                          onChange={(e) => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].role.en = e.target.value;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                        />
                      </div>

                      {/* Image URL */}
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'رابط الصورة الشخصية' : 'Profile Image URL'}</label>
                        <input 
                          type="text"
                          value={member.imageUrl}
                          onChange={(e) => {
                            const updated = [...siteData.teamMembersList];
                            updated[idx].imageUrl = e.target.value;
                            updateSiteData({ teamMembersList: updated });
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newId = `member_${Date.now()}`;
                    const newMember: TeamMemberItem = {
                      id: newId,
                      name: { ar: 'عضو فريق جديد', en: 'New Team Colleague' },
                      role: { ar: 'محرر فيديو / مصمم حركة', en: 'Video Editor / Lead Motion Designer' },
                      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                      visible: true
                    };
                    updateSiteData({ teamMembersList: [...(siteData.teamMembersList || []), newMember] });
                  }}
                  className="w-full py-4 border border-dashed border-white/10 hover:border-[#FF2D7A]/50 hover:bg-[#FF2D7A]/5 rounded-2xl flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>{lang === 'ar' ? 'إضافة موظف/عضو جديد' : 'Add New Colleague / Team Member'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: CONTACT & PLATFORMS */}
          {activeTab === 'contact' && (
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-white">
                  {lang === 'ar' ? 'بيانات التواصل وقنوات التواصل الاجتماعي' : 'Contact Credentials & Social Channels'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'ar' ? 'تعديل روابط التواصل، ورقم الواتساب، وإخفاء أو إظهار استمارة تعبئة الاستبيان.' : 'Configure instant WhatsApp keys, secure social handles, and toggle form cards.'}
                </p>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{lang === 'ar' ? 'إظهار قسم التواصل بالكامل' : 'Show Contact Section'}</p>
                  </div>
                  <button 
                    onClick={() => updateSiteData({ showContactSection: !siteData.showContactSection })}
                    className={`p-1.5 rounded-lg transition-all ${siteData.showContactSection ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'}`}
                  >
                    {siteData.showContactSection ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#0d071c]/30 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{lang === 'ar' ? 'إظهار استمارة الاستبيان' : 'Show Questionnaire Form'}</p>
                    <p className="text-[10px] text-gray-500">{lang === 'ar' ? 'إخفاء الاستمارة والاكتفاء بأزرار التواصل المباشرة' : 'Hide custom brief form to display socials only'}</p>
                  </div>
                  <button 
                    onClick={() => updateSiteData({ showContactCard: !siteData.showContactCard })}
                    className={`p-1.5 rounded-lg transition-all ${siteData.showContactCard ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'}`}
                  >
                    {siteData.showContactCard ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              </div>

              {/* Direct links */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                  {lang === 'ar' ? 'روابط التواصل الفوري' : 'Direct Communication Keys'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'رقم الواتساب الدولي (بدون + أو 00)' : 'WhatsApp (Country code format, no +)'}</label>
                    <input 
                      type="text"
                      value={siteData.contactWhatsApp}
                      onChange={(e) => updateSiteData({ contactWhatsApp: e.target.value })}
                      placeholder="201012345678"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400">{lang === 'ar' ? 'البريد الإلكتروني' : 'Contact Email'}</label>
                    <input 
                      type="email"
                      value={siteData.contactEmail}
                      onChange={(e) => updateSiteData({ contactEmail: e.target.value })}
                      placeholder="contact@pixelzstudio.com"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels URLs & Toggles */}
              <div className="p-6 rounded-2xl bg-[#0d071c]/50 border border-white/5 space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-secondary font-bold">
                  {lang === 'ar' ? 'أزرار شبكات السوشيال ميديا في الفوتر' : 'Footer Social Platform Handles'}
                </h4>

                <div className="space-y-3">
                  {(Object.keys(siteData.socialLinks) as Array<keyof typeof siteData.socialLinks>).map((platform) => (
                    <div key={platform} className="flex gap-4 items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                        <span className="text-xs font-mono font-bold uppercase text-white col-span-1">
                          {platform}
                        </span>
                        <input 
                          type="text"
                          value={siteData.socialLinks[platform].url}
                          onChange={(e) => {
                            const updated = { ...siteData.socialLinks };
                            updated[platform].url = e.target.value;
                            updateSiteData({ socialLinks: updated });
                          }}
                          className="col-span-2 px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const updated = { ...siteData.socialLinks };
                          updated[platform].visible = !updated[platform].visible;
                          updateSiteData({ socialLinks: updated });
                        }}
                        className={`p-1.5 rounded-lg transition-all ${siteData.socialLinks[platform].visible ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}
                      >
                        {siteData.socialLinks[platform].visible ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
