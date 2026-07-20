import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

// Default password
const DEFAULT_PASSWORD = 'admin123';

// Features interface
export interface FeatureItem {
  id: string;
  icon: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  visible: boolean;
}

// Portfolio project interface
export interface ProjectItem {
  id: string;
  title: { ar: string; en: string };
  category: 'reels' | 'youtube' | 'thumbnail' | string;
  result: { ar: string; en: string };
  desc: { ar: string; en: string };
  mediaUrl: string; // Video URL or image URL
  tags: { ar: string[]; en: string[] };
  visible: boolean;
}

// Case study interface
export interface CaseStudyItem {
  id: string;
  type: 'facebook' | 'youtube' | 'covers';
  title: { ar: string; en: string };
  clientName: { ar: string; en: string };
  metrics: { ar: string; en: string };
  challenge: { ar: string; en: string };
  approach: { ar: string; en: string };
  deliverables: { ar: string[]; en: string[] };
  tools: string[];
  results: { ar: string[]; en: string[] };
  accentColor: string;
  image: string;
  visible: boolean;
}

// Thumbnail wall item
export interface ThumbnailItem {
  id: string;
  title: { ar: string; en: string };
  ctr: string;
  imageUrl: string;
  visible: boolean;
}

// Service item
export interface ServiceItem {
  id: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  benefit: { ar: string; en: string };
  icon: string;
  visible: boolean;
}

// Timeline Step
export interface TimelineStepItem {
  id: string;
  stepNumber: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  visible: boolean;
}

// Testimonial Item
export interface TestimonialItem {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  channelName?: string;
  content: { ar: string; en: string };
  avatar: string;
  rating: number;
  visible: boolean;
  isClientSubmitted?: boolean;
}

// Team Member Item
export interface TeamMemberItem {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  imageUrl: string;
  visible: boolean;
}

// Site Data Schema
export interface SiteConfigState {
  adminPassword: string;
  defaultLanguage: Language;
  
  // Toggles
  showSplash: boolean;
  splashText: { ar: string; en: string };
  soundEnabled: boolean;
  
  // Sections visibility
  showHeroStats: boolean;
  showFeaturesSection: boolean;
  showPortfolioSection: boolean;
  showCaseStudiesSection: boolean;
  showThumbnailsWallSection: boolean;
  showServicesSection: boolean;
  showTimelineSection: boolean;
  showTestimonialsSection: boolean;
  showTeamSection: boolean;
  showContactSection: boolean;
  showContactCard: boolean; // hide/show actual brief form card

  // Hero & General
  showreelUrl: string;
  stats: {
    projectsCount: number;
    clientsCount: number;
    platformsCount: number;
    avgDeliveryDays: number;
  };
  
  // Lists
  featuresList: FeatureItem[];
  portfolioProjects: ProjectItem[];
  caseStudies: CaseStudyItem[];
  thumbnailsList: ThumbnailItem[];
  servicesList: ServiceItem[];
  timelineSteps: TimelineStepItem[];
  testimonialsList: TestimonialItem[];
  teamMembersList: TeamMemberItem[];
  
  // Contact details
  contactWhatsApp: string;
  contactEmail: string;
  
  // Socials
  socialLinks: {
    instagram: { url: string; visible: boolean };
    youtube: { url: string; visible: boolean };
    tiktok: { url: string; visible: boolean };
    facebook: { url: string; visible: boolean };
    behance: { url: string; visible: boolean };
  };
}

// Default initial state
const defaultState: SiteConfigState = {
  adminPassword: DEFAULT_PASSWORD,
  defaultLanguage: 'ar',
  showSplash: true,
  splashText: {
    ar: "جاري تحميل تجربة بيكسلز السينمائية...",
    en: "Loading Pixelz Cinematic Experience..."
  },
  soundEnabled: true,
  
  showHeroStats: true,
  showFeaturesSection: true,
  showPortfolioSection: true,
  showCaseStudiesSection: true,
  showThumbnailsWallSection: true,
  showServicesSection: true,
  showTimelineSection: true,
  showTestimonialsSection: true,
  showTeamSection: true,
  showContactSection: true,
  showContactCard: true,

  showreelUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  stats: {
    projectsCount: 150,
    clientsCount: 45,
    platformsCount: 5,
    avgDeliveryDays: 3,
  },

  featuresList: [
    {
      id: 'feat1',
      icon: 'Shield',
      title: { ar: "حقوق تجارية كاملة للمقاطع", en: "100% Commercial Rights" },
      desc: { ar: "أمان قانوني مطلق للمحتوى الخاص بك", en: "Complete copyright security" },
      visible: true
    },
    {
      id: 'feat2',
      icon: 'Clock',
      title: { ar: "تعديلات واضحة وسريعة", en: "Fast Precise Revisions" },
      desc: { ar: "تعديلات فورية ودقيقة حتى الرضا", en: "Direct & responsive adjustments" },
      visible: true
    },
    {
      id: 'feat3',
      icon: 'Award',
      title: { ar: "جودة تليق بقنوات المليون", en: "Million-Scale Quality" },
      desc: { ar: "معايير إنتاج عالمية فائقة الإتقان", en: "Industry-leading production standards" },
      visible: true
    }
  ],

  portfolioProjects: [
    {
      id: 'proj1',
      title: { ar: "وثائقي غامض لـ بودكاست شهير", en: "Mysterious Documentary - Famous Podcast" },
      category: 'youtube',
      result: { ar: "+180% معدل نقر CTR", en: "+180% CTR Increase" },
      desc: { ar: "مونتاج سينمائي مع حبكة موسيقية وتعديل ألوان يبعث بالغموض والعمق البصري.", en: "Cinematic storytelling editing paired with intense sound design and dark cinematic grading." },
      mediaUrl: "dQw4w9WgXcQ", // YouTube Video ID
      tags: { ar: ["مونتاج وثائقي", "تصحيح ألوان"], en: ["Documentary", "Color Grading"] },
      visible: true
    },
    {
      id: 'proj2',
      title: { ar: "سلسلة ريلز إنتاجية وتطوير الذات", en: "Productivity Reels Series - Creator" },
      category: 'reels',
      result: { ar: "3.2 مليون مشاهدة", en: "3.2M Combined Views" },
      desc: { ar: "إنتاج 15 فيديو ريلز بإيقاع متسارع وترجمات ملونة خطفت انتباه خوارزمية إنستجرام.", en: "Fast-paced editing of 15 reels with dynamic typography and transitions." },
      mediaUrl: "vT1_g9Qo46M", // Shorts YouTube Video ID
      tags: { ar: ["ريلز قصيرة", "ترجمات بصرية"], en: ["Shorts/Reels", "Subtitles"] },
      visible: true
    },
    {
      id: 'proj3',
      title: { ar: "تجميعة وحش الألعاب الخارق بـ 1000$!", en: "Building a Beast Gaming PC for only $1000!" },
      category: 'youtube',
      result: { ar: "14.2% نسبة النقر", en: "14.2% Click-Through-Rate" },
      desc: { ar: "دمج صور ثلاثي الأبعاد مع تعديل إضاءة فاقع يحفز المشاهد على النقر الفوري.", en: "Photocompositing and saturated visual styling to guarantee high-CTR recommendations." },
      mediaUrl: "ScMzIvxBSi4",
      tags: { ar: ["مونتاج ألعاب", "إضاءة نيون"], en: ["Gaming Edit", "Lighting FX"] },
      visible: true
    }
  ],

  caseStudies: [
    {
      id: 'case1',
      type: 'facebook',
      title: { ar: "من التخبط في المتابعين إلى الصدارة", en: "Dominating the Self-Development Space" },
      clientName: { ar: "منشئي محتوى تعليمي وترفيهي", en: "Educational & Creator Duos" },
      metrics: { ar: "+450% تفاعل و 2.5M مشاهدة", en: "+450% Engagement & 2.5M Views" },
      challenge: { ar: "صناع محتوى يمتلكون أفكاراً ممتازة لكن نسبة الاحتفاظ في أول 5 ثوانٍ كانت أقل من 20%.", en: "Outstanding content ideas but high early drops (under 20% in first 5s)." },
      approach: { ar: "صممنا خطافات بصرية وصوتية قوية (Visual Hooks) مع تفعيل ترجمات منسقة ديناميكياً.", en: "Engineered aggressive early hooks, customized word-by-word dynamic subtitle popups." },
      deliverables: { ar: ["تصميم حزمة السوشيال ميديا", "إنتاج 12 فيديو ريلز أسبوعياً"], en: ["Social kit package design", "12 High-impact Reels weekly"] },
      tools: ["Adobe Premiere Pro", "After Effects"],
      results: { ar: ["ارتفاع الاحتفاظ لـ 72%", "+45 ألف متابع جديد"], en: ["Audience retention peaked at 72%", "+45k new loyal followers"] },
      accentColor: "#FF2D7A",
      image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=800",
      visible: true
    },
    {
      id: 'case2',
      type: 'youtube',
      title: { ar: "إعادة بناء الهوية البصرية لقنوات المليون", en: "Rebuilding Visual Identity & CTR for Tech Giants" },
      clientName: { ar: "قناة يوتيوب تقنية وبودكاست كندي", en: "Canadian Tech Channel & Podcast" },
      metrics: { ar: "+14.2% معدل نقر مستقر", en: "+14.2% Stable Click-Through-Rate" },
      challenge: { ar: "محتوى مذهل لكن الأغلفة والإنتروهات باهتة ومكررة وتفشل في المنافسة.", en: "Amazing tech analysis but boring covers and generic template intros that couldn't compete." },
      approach: { ar: "استخدام تقنيات دمج إضاءة نيون سينمائية في الأغلفة (ثمبنيلز) مع خطوط مخصصة وبارزة.", en: "Applied neon-cinematic highlights with highly expressive typography on covers." },
      deliverables: { ar: ["نظام ثمبنيلز احترافي", "انترو ثلاثي الأبعاد فريد"], en: ["Design blueprint for high-CTR thumbnails", "3D animated intro sting"] },
      tools: ["Photoshop CC", "Cinema 4D", "DaVinci Resolve"],
      results: { ar: ["ارتفاع معدل النقرات لـ 14.2%", "زيادة متوسط زمن المشاهدة بدقيقة ونصف"], en: ["CTR soared from 4% to 14.2%", "Average watch duration increased by 1m 30s"] },
      accentColor: "#FF8A00",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      visible: true
    }
  ],

  thumbnailsList: [
    {
      id: 'thumb1',
      title: { ar: "سر الفوز الدائم في رماية الألعاب", en: "Secret to Always Dominating Shooter Games" },
      ctr: "15.8% CTR",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
      visible: true
    },
    {
      id: 'thumb2',
      title: { ar: "تجميعة وحش الألعاب الخارق بـ 1000$!", en: "Building a Beast Gaming PC for only $1000!" },
      ctr: "14.2% CTR",
      imageUrl: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=600",
      visible: true
    }
  ],

  servicesList: [
    {
      id: "long-form",
      title: { ar: "مونتاج الفيديوهات الطويلة", en: "Long-Form Video Editing" },
      desc: { ar: "مونتاج سينمائي لليوتيوب، والوثائقيات، والبودكاست. سرد قصصي مذهل يحافظ على انتباه المشاهد.", en: "Cinematic editing for YouTube, documentaries, and podcasts. Story-driven pacing." },
      benefit: { ar: "متوسط زيادة الاحتفاظ بالجمهور: +45%", en: "Average Audience Retention: +45%" },
      icon: "Film",
      visible: true
    },
    {
      id: "reels",
      title: { ar: "ريلز وفيديوهات قصيرة", en: "Reels & Shorts" },
      desc: { ar: "فيديوهات تيك توك، ريلز، وشورتس تخطف الأنفاس في أول 3 ثوانٍ مع ترجمات ديناميكية ومؤثرات بصرية سريعة.", en: "Captivating TikToks, Reels, and Shorts designed to hook viewers in the first 3 seconds." },
      benefit: { ar: "معاينة سريعة ونسب تفاعل قياسية", en: "Rapid delivery & industry-leading engagement rates" },
      icon: "Tv",
      visible: true
    },
    {
      id: "thumbnails",
      title: { ar: "تصميم غلاف يوتيوب (ثمبنيل)", en: "Thumbnails & YouTube Covers" },
      desc: { ar: "تصاميم ثمبنيل ثلاثية الأبعاد بتباين لوني مدروس يضمن تفوق الفيديو في المقترحات.", en: "High-contrast, 3D manipulated thumbnails with meticulous text styling." },
      benefit: { ar: "معدل نقر (CTR) يتجاوز الـ 12%", en: "Click-Through-Rate (CTR) exceeding 12%" },
      icon: "Image",
      visible: true
    },
    {
      id: "motion",
      title: { ar: "موشن جرافيك وانتروهات", en: "Motion Design & Intros" },
      desc: { ar: "تصميم حركي مخصص، شعارات متحركة، وإنتروهات احترافية تضفي لمسة فخامة على أعمالك.", en: "Custom motion graphics, animated logos, and professional intros." },
      benefit: { ar: "هوية بصرية متحركة ومميزة", en: "A custom kinetic style tailored to your vibe" },
      icon: "Sparkles",
      visible: true
    }
  ],

  timelineSteps: [
    {
      id: 'step1',
      stepNumber: "01",
      title: { ar: "الاجتماع والاتفاق المبدئي (Brief)", en: "Brief & Exploration" },
      desc: { ar: "نناقش طبيعة مشروعك، الجمهور المستهدف، المراجع البصرية، والهدف الرقمي الذي تسعى له.", en: "We dive into your goals, audience demographics, reference aesthetics, and measurable targets." },
      visible: true
    },
    {
      id: 'step2',
      stepNumber: "02",
      title: { ar: "تحديد المراجع والأسلوب البصري", en: "References & Styleframes" },
      desc: { ar: "نعرض عليك مجموعة من الخطوط، الإضاءة، وتجانس الألوان لنستقر على نمط يخصك بمفردك.", en: "We present visual moodboards, specific color grading samples, and typography styles for sign-off." },
      visible: true
    },
    {
      id: 'step3',
      stepNumber: "03",
      title: { ar: "عمليات التعديل والمونتاج (Edit)", en: "The Cinematic Cut" },
      desc: { ar: "نبدأ بالهيكل الأساسي للمقطع، تليها الهندسة الصوتية الدقيقة، تلوين المشاهد، وإضافة الحركة.", en: "We compile the primary storyline, execute meticulous sound design, color grade, and layer assets." },
      visible: true
    }
  ],

  testimonialsList: [
    {
      id: 'test1',
      name: { ar: "د. طارق الجابري", en: "Dr. Tarek Al-Jabri" },
      role: { ar: "صانع محتوى وثائقي وتقني", en: "Tech & Documentary Creator" },
      channelName: "@AlJabriTech",
      content: { ar: "العمل مع هذا الستوديو نقل فيديوهاتي إلى مستوى يضاهي نتفليكس! ارتفع زمن المشاهدة بنسبة خيالية.", en: "Partnering with this studio upgraded my channel to Netflix levels. Viewers are hooked and average watch duration skyrocketed." },
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      visible: true
    },
    {
      id: 'test2',
      name: { ar: "سارة عبد الرحمن", en: "Sarah Abdelrahman" },
      role: { ar: "مؤسسة منصة ريدجو للمغامرات", en: "Founder of RedGo App" },
      channelName: "RedGo App",
      content: { ar: "أشكرهم على الإتقان والالتزام الرهيب في إطلاق هوية تطبيقنا وتصميم صور المتجر والفيديو الترويجي.", en: "Unbelievable mastery and dedication during our app launch. The promo trailer generated immediate viral hype." },
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      visible: true
    }
  ],

  teamMembersList: [
    {
      id: 'member1',
      name: { ar: "أحمد الشريف", en: "Ahmed El-Sherif" },
      role: { ar: "شريك مؤسس / المخرج الإبداعي", en: "Co-founder / Creative Director" },
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      visible: true
    },
    {
      id: 'member2',
      name: { ar: "مازن علي", en: "Mazen Ali" },
      role: { ar: "رئيس قسم الموشن جرافيك", en: "Lead Motion Designer" },
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      visible: true
    }
  ],

  contactWhatsApp: "201012345678",
  contactEmail: "contact@pixelzstudio.com",

  socialLinks: {
    instagram: { url: "https://instagram.com/pixelz", visible: true },
    youtube: { url: "https://youtube.com/pixelz", visible: true },
    tiktok: { url: "https://tiktok.com/@pixelz", visible: true },
    facebook: { url: "https://facebook.com/pixelz", visible: true },
    behance: { url: "https://behance.net/pixelz", visible: true }
  }
};

// Context interface
interface SiteConfigContextType {
  siteData: SiteConfigState;
  updateSiteData: (newData: Partial<SiteConfigState>) => void;
  isAdminLoggedIn: boolean;
  setAdminLoggedIn: (loggedIn: boolean) => void;
  hasUnsavedChanges: boolean;
  saveChanges: () => void;
  resetChanges: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteConfigState>(defaultState);
  const [tempSiteData, setTempSiteData] = useState<SiteConfigState>(defaultState);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pixelz_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge with defaultState to guarantee no missing fields
        const merged = { ...defaultState, ...parsed };
        setSiteData(merged);
        setTempSiteData(merged);
      } catch (e) {
        console.error("Error parsing saved config", e);
      }
    }
  }, []);

  const updateSiteData = (newData: Partial<SiteConfigState>) => {
    setTempSiteData(prev => {
      const updated = { ...prev, ...newData };
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  const saveChanges = () => {
    setSiteData(tempSiteData);
    localStorage.setItem('pixelz_site_config', JSON.stringify(tempSiteData));
    setHasUnsavedChanges(false);
  };

  const resetChanges = () => {
    setTempSiteData(siteData);
    setHasUnsavedChanges(false);
  };

  return (
    <SiteConfigContext.Provider value={{
      siteData: tempSiteData, // Use the scratchpad / preview data as active so they see updates in real-time
      updateSiteData,
      isAdminLoggedIn,
      setAdminLoggedIn,
      hasUnsavedChanges,
      saveChanges,
      resetChanges
    }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
