/**
 * Site Configuration File
 * Contains all content, translations, and customizable placeholders.
 * Edit this file to customize the portfolio's copy, contact details, and assets.
 */

export interface SiteConfig {
  // Brand Placeholders
  brandName: string; // {{BRAND_NAME}}
  ownerName: string; // {{OWNER_NAME}}
  whatsappNumber: string; // {{WHATSAPP}} - International format (e.g. "201000000000" for Egypt)
  email: string; // {{EMAIL}}
  city: { ar: string; en: string }; // {{CITY}}
  
  // Social Links
  socials: {
    instagram: string; // {{INSTAGRAM}}
    youtube: string;   // {{YOUTUBE}}
    tiktok: string;    // {{TIKTOK}}
    behance: string;   // {{BEHANCE}}
    facebook: string;  // {{FACEBOOK}}
  };

  // Video / Showreel Config
  showreelUrl: string; // {{SHOWREEL_URL}} - YouTube Embed, Vimeo, or direct MP4 link

  // Stats Table - {{PROJECTS_COUNT}} · {{CLIENTS_COUNT}} · {{PLATFORMS}} · {{AVG_DELIVERY}}
  stats: {
    projectsCount: number;
    clientsCount: number;
    platformsCount: number;
    avgDeliveryDays: number;
  };

  // Pricing Starting Prices
  packagesPricing: {
    starter: string; // {{PKG_STARTER}} (e.g. "250")
    pro: string;     // {{PKG_PRO}} (e.g. "500")
    brand: string;   // {{PKG_BRAND}} (e.g. "999")
    currency: { ar: string; en: string };
  };

  // Centralized Visual Identity Dossier (All Brand Project Assets Editable in One Single Place)
  brandIdentitySuite: {
    brandName: { ar: string; en: string };
    tagline: { ar: string; en: string };
    logoUrl: string;
    coverUrl: string;
    longVideoId: string; // YouTube video ID, e.g. "ScMzIvxBSi4"
    reelVideoId: string; // YouTube Shorts/Reels video ID, e.g. "vT1_g9Qo46M"
    thumbnails: Array<{
      title: { ar: string; en: string };
      ctr: string;
      imageUrl: string;
    }>;
  };

  // Multilingual copy for the entire application
  copy: {
    hero: {
      tagline: { ar: string; en: string }; // {{TAGLINE}}
      shortDesc: { ar: string; en: string }; // {{SHORT_DESC}}
      ctaPrimary: { ar: string; en: string };
      ctaSecondary: { ar: string; en: string };
    };
    services: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      items: Array<{
        id: string;
        title: { ar: string; en: string };
        desc: { ar: string; en: string };
        benefit: { ar: string; en: string };
        icon: string; // Lucide icon name
      }>;
    };
    portfolio: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      categories: Array<{
        id: string;
        name: { ar: string; en: string };
      }>;
      projects: Array<{
        id: string;
        title: { ar: string; en: string };
        category: string; // matches category id
        result: { ar: string; en: string }; // e.g. "+180% CTR"
        desc: { ar: string; en: string };
        mediaUrl: string; // Placeholder image/video
        tags: { ar: string[]; en: string[] };
      }>;
    };
    caseStudies: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      items: Array<{
        id: string;
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
      }>;
    };
    process: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      steps: Array<{
        stepNumber: string;
        title: { ar: string; en: string };
        desc: { ar: string; en: string };
      }>;
    };
    packages: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      ctaText: { ar: string; en: string };
      items: Array<{
        id: string;
        name: { ar: string; en: string };
        priceKey: 'starter' | 'pro' | 'brand';
        badge?: { ar: string; en: string };
        desc: { ar: string; en: string };
        features: { ar: string[]; en: string[] };
        whatsappPrefill: { ar: string; en: string };
      }>;
    };
    testimonials: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      items: Array<{
        name: { ar: string; en: string };
        role: { ar: string; en: string };
        channelName?: string;
        content: { ar: string; en: string };
        avatar: string;
        rating: number;
      }>;
    };
    team: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
    };
    faqs: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      items: Array<{
        question: { ar: string; en: string };
        answer: { ar: string; en: string };
      }>;
    };
    contact: {
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      form: {
        nameLabel: { ar: string; en: string };
        phoneLabel: { ar: string; en: string };
        platformLabel: { ar: string; en: string };
        projectTypeLabel: { ar: string; en: string };
        budgetLabel: { ar: string; en: string };
        messageLabel: { ar: string; en: string };
        submitBtn: { ar: string; en: string };
        successTitle: { ar: string; en: string };
        successMessage: { ar: string; en: string };
      };
    };
    footer: {
      tagline: { ar: string; en: string };
      copyright: { ar: string; en: string };
    };
  };
}

export const siteConfig: SiteConfig = {
  // ════════════════════════════════════
  // BRAND & CONTACT PLACEHOLDERS (replace with real details)
  // ════════════════════════════════════
  brandName: "PIXELZ",         // Replace with e.g. "سينما فيجن | CinemaVision"
  ownerName: "طارق جادالحق",         // Replace with e.g. "طارق جادالحق | Ahmed El-Sherif"
  whatsappNumber: "201012345678",     // Replace with international number, e.g., "201012345678" (Egypt) without "+" or "00"
  email: "contact@pixelzstudio.com",                 // Replace with e.g. "contact@cinemavision.com"
  city: {
    ar: "القاهرة، مصر",                   // Replace with e.g. "القاهرة، مصر"
    en: "Cairo, Egypt"                 // Replace with e.g. "Cairo, Egypt"
  },

  // ════════════════════════════════════
  // SOCIAL LINKS
  // ════════════════════════════════════
  socials: {
    instagram: "https://instagram.com/pixelz",       // Replace with Instagram URL
    youtube: "https://youtube.com/pixelz",           // Replace with YouTube URL
    tiktok: "https://tiktok.com/@pixelz",             // Replace with TikTok URL
    behance: "https://behance.net/pixelz",           // Replace with Behance URL
    facebook: "https://facebook.com/pixelz"          // Replace with Facebook URL
  },

  // ════════════════════════════════════
  // VIDEO SHOWREEL
  // ════════════════════════════════════
  // Supports YouTube embed (e.g. "https://www.youtube.com/embed/dQw4w9WgXcQ"), MP4 path, or Vimeo embed
  showreelUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",    // Replace with YouTube/Vimeo embed link or a direct high-quality video link

  // ════════════════════════════════════
  // CORE STATISTICS
  // ════════════════════════════════════
  stats: {
    projectsCount: 150,               // {{PROJECTS_COUNT}}
    clientsCount: 45,                 // {{CLIENTS_COUNT}}
    platformsCount: 5,                 // {{PLATFORMS}} (YouTube, TikTok, Instagram, Reels, etc.)
    avgDeliveryDays: 3,               // {{AVG_DELIVERY}}
  },

  // ════════════════════════════════════
  // PACKAGES STARTING PRICES (e.g. "150", "400")
  // ════════════════════════════════════
  packagesPricing: {
    starter: "250",       // Starter Price, e.g. "150"
    pro: "450",               // Pro Price, e.g. "300"
    brand: "950",           // Full Brand Identity Price, e.g. "750"
    currency: {
      ar: "$",
      en: "$"
    }
  },

  // ════════════════════════════════════
  // CENTRALIZED VISUAL IDENTITY DOSSIER (All assets editable here)
  // ════════════════════════════════════
  brandIdentitySuite: {
    brandName: {
      ar: "قناة فورتكس التقنية | Vortex Apex",
      en: "Vortex Apex Gaming & Tech"
    },
    tagline: {
      ar: "هوية بصرية متكاملة: من اللوجو ثلاثي الأبعاد إلى الأغلفة والفيديوهات الحركية عالية الاحتفاظ بالجمهور.",
      en: "A comprehensive brand ecosystem: from 3D logos to high-retention covers and cinematic edits."
    },
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400", // Metallic fluid glassmorphic vector mark
    coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200", // Widescreen glowing premium station
    longVideoId: "ScMzIvxBSi4", // High fidelity widescreen cinematic project
    reelVideoId: "vT1_g9Qo46M", // High impact vertical mobile project
    thumbnails: [
      {
        title: { ar: "سر الفوز الدائم في رماية الألعاب", en: "Secret to Always Dominating Shooter Games" },
        ctr: "15.8% CTR",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: { ar: "تجميعة وحش الألعاب الخارق بـ 1000$!", en: "Building a Beast Gaming PC for only $1000!" },
        ctr: "14.2% CTR",
        imageUrl: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: { ar: "مراجعة كرت الشاشة الثوري لعام 2026", en: "The Revolutionary 2026 GPU Review" },
        ctr: "16.5% CTR",
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },

  // ════════════════════════════════════
  // TRANSLATED COPY (AR/EN)
  // ════════════════════════════════════
  copy: {
    hero: {
      tagline: {
        ar: "رؤية سينمائية تصنع الصدارة لمحتواك",            // e.g. "نحول لقطاتك الخام إلى تجربة سينمائية تأسر القلوب وتضاعف المشاهدات"
        en: "Cinematic Vision. Absolute Command."          // e.g. "We turn raw footage into a cinematic experience that captivates audiences and multiplies views"
      },
      shortDesc: {
        ar: "ستوديو بيكسلز (PIXELZ) المتخصص في المونتاج السينمائي، تصميم الحركة، وصناعة الهوية البصرية المتكاملة للمنصات الرقمية والعلامات التجارية الطموحة.",         // e.g. "ستوديو متخصص في المونتاج السينمائي، تصميم الحركة، وصناعة الهوية البصرية المتكاملة لمنشئي المحتوى والعلامات التجارية الطموحة."
        en: "PIXELZ is an elite creative studio specializing in cinematic video editing, motion design, and complete visual identities for ambitious creators and digital brands."       // e.g. "A specialized studio crafting cinematic video editing, custom motion design, and complete visual identities for ambitious creators and brands."
      },
      ctaPrimary: {
        ar: "ابدأ مشروعك الآن",
        en: "Start Your Project"
      },
      ctaSecondary: {
        ar: "شاهد معرض الأعمال",
        en: "View Portfolio"
      }
    },

    services: {
      title: {
        ar: "خدمات تحاكي دقة السينما",
        en: "Cinema-Grade Services"
      },
      subtitle: {
        ar: "نهتم بكل تفصيل فني: من المونتاج وسرد القصة إلى اختيار الألوان والمؤثرات الصوتية والموشن جرافيك.",
        en: "We craft every technical detail: from pacing and storytelling to color grading, sound design, and motion."
      },
      items: [
        {
          id: "long-form",
          title: { ar: "مونتاج الفيديوهات الطويلة", en: "Long-Form Video Editing" },
          desc: { 
            ar: "مونتاج سينمائي لليوتيوب، والوثائقيات، والبودكاست. سرد قصصي مذهل يحافظ على انتباه المشاهد لآخر ثانية.", 
            en: "Cinematic editing for YouTube, documentaries, and podcasts. Story-driven pacing that retains viewers until the last second." 
          },
          benefit: { ar: "متوسط زيادة الاحتفاظ بالجمهور: +45%", en: "Average Audience Retention: +45%" },
          icon: "Film"
        },
        {
          id: "reels",
          title: { ar: "ريلز وفيديوهات قصيرة", en: "Reels & Shorts" },
          desc: { 
            ar: "فيديوهات تيك توك، ريلز، وشورتس تخطف الأنفاس في أول 3 ثوانٍ مع ترجمات ديناميكية ومؤثرات بصرية سريعة.", 
            en: "Captivating TikToks, Reels, and Shorts designed to hook viewers in the first 3 seconds with dynamic text and sound FX." 
          },
          benefit: { ar: "معاينة سريعة ونسب تفاعل قياسية", en: "Rapid delivery & industry-leading engagement rates" },
          icon: "Tv"
        },
        {
          id: "thumbnails",
          title: { ar: "تصميم غلاف يوتيوب (ثمبنيل)", en: "Thumbnails & YouTube Covers" },
          desc: { 
            ar: "تصاميم ثمبنيل ثلاثية الأبعاد بتباين لوني مدروس يضمن تفوق الفيديو الخاص بك في قائمة المقترحات.", 
            en: "High-contrast, 3D manipulated thumbnails with meticulous text styling that stand out in feed recommendations." 
          },
          benefit: { ar: "معدل نقر (CTR) يتجاوز الـ 12%", en: "Click-Through-Rate (CTR) exceeding 12%" },
          icon: "Image"
        },
        {
          id: "motion",
          title: { ar: "موشن جرافيك وانتروهات", en: "Motion Design & Intros" },
          desc: { 
            ar: "تصميم حركي مخصص، شعارات متحركة، وإنتروهات احترافية تضفي لمسة ثقة وفخامة على أعمالك.", 
            en: "Custom motion graphics, animated logos, and professional intros that inject authority and premium branding." 
          },
          benefit: { ar: "هوية بصرية متحركة ومميزة", en: "A custom kinetic style tailored to your vibe" },
          icon: "Sparkles"
        },
        {
          id: "brand-identity",
          title: { ar: "هوية بصرية كاملة وقنوات", en: "Full Visual Identity" },
          desc: { 
            ar: "بناء الهوية البصرية المتكاملة للمصممين والمنشئين: الخطوط، دراسات الألوان، نماذج النشر، والـ UI الخاص بالتطبيقات.", 
            en: "Complete visual identity system for creators & brands: typography, color palettes, social kit grids, and custom app-promo styling." 
          },
          benefit: { ar: "تناغم بصري مطلق على جميع المنصات", en: "Flawless consistency across all platforms" },
          icon: "Briefcase"
        },
        {
          id: "social-kits",
          title: { ar: "حقائب ترويجية للسوشيال", en: "Promo Kits & Distribution" },
          desc: { 
            ar: "تحويل الفيديو الطويل الواحد لـ 10 قطع محتوى قصيرة جاهزة للنشر الفوري على مختلف المنصات.", 
            en: "Repurposing a single long video into 10+ bite-sized social promotional assets configured for immediate publishing." 
          },
          benefit: { ar: "توفير 80% من جهد وصناعة المحتوى", en: "Save 80% of your production and distribution time" },
          icon: "Share2"
        }
      ]
    },

    portfolio: {
      title: {
        ar: "معرض الأعمال الفنية",
        en: "Featured Masterpieces"
      },
      subtitle: {
        ar: "كل فيديو ننتجه هو لوحة سينمائية تهدف إلى تحقيق نتائج فعلية وملموسة للعميل.",
        en: "Every asset we deliver is a cinematic asset crafted to achieve tangible business results."
      },
      categories: [
        { id: "all", name: { ar: "الكل", en: "All" } },
        { id: "reels", name: { ar: "ريلز / قصيرة", en: "Reels & Shorts" } },
        { id: "youtube", name: { ar: "يوتيوب", en: "YouTube Longs" } },
        { id: "thumbnail", name: { ar: "ثمبنيل", en: "Thumbnails" } }
      ],
      projects: [
        {
          id: "proj1",
          title: { ar: "وثائقي غامض لـ بودكاست شهير", en: "Mysterious Documentary - Famous Podcast" },
          category: "youtube",
          result: { ar: "+180% معدل نقر على الثمبنيل", en: "+180% CTR Thumbnail Increase" },
          desc: { 
            ar: "مونتاج سينمائي مع حبكة موسيقية وتعديل ألوان يبعث بالغموض والعمق البصري.", 
            en: "Cinematic storytelling editing paired with intense sound design and dark cinematic grading." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["مونتاج وثائقي", "تصحيح ألوان", "هندسة صوتية"],
            en: ["Documentary Edit", "Color Grading", "Sound Engineering"]
          }
        },
        {
          id: "proj2",
          title: { ar: "سلسلة ريلز إنتاجية وتطوير الذات", en: "Productivity Reels Series - Creator Platform" },
          category: "reels",
          result: { ar: "3.2 مليون مشاهدة مجتمعة", en: "3.2M Combined Views" },
          desc: { 
            ar: "إنتاج 15 فيديو ريلز بإيقاع متسارع وترجمات ملونة خطفت انتباه خوارزمية إنستجرام.", 
            en: "Fast-paced editing of 15 reels with dynamic typography and transitions that trigger viral sharing." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["ريلز قصيرة", "ترجمات بصرية", "مؤثرات صوتية"],
            en: ["Shorts/Reels", "Dynamic Subtitles", "Sound FX"]
          }
        },
        {
          id: "proj3",
          title: { ar: "تصميم أغلفة لرحالة يوتيوب عالمي", en: "YouTube Cover System - Global Traveler" },
          category: "thumbnail",
          result: { ar: "تجاوز معدل النقر (CTR) الـ 14.5%", en: "CTR Exceeded 14.5%" },
          desc: { 
            ar: "دمج صور ثلاثي الأبعاد مع تعديل إضاءة فاقع يحفز المشاهد على النقر الفوري وسط كومة المقترحات.", 
            en: "Expert 3D photocompositing and saturated visual styling to guarantee high-CTR recommendations." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["تصميم ثمبنيل", "دمج صور", "إضاءة نيون"],
            en: ["Thumbnail Design", "Photo Compositing", "Lighting FX"]
          }
        },
        {
          id: "proj4",
          title: { ar: "الهوية الحركية والبصرية لقناة تيك توك تقنية", en: "Visual & Motion Identity - Tech TikTok Channel" },
          category: "brand",
          result: { ar: "بناء ثقة و 120 ألف متابع جديد", en: "Establised trust & 120k new followers" },
          desc: { 
            ar: "شعار متحرك، لوحات معلومات مبسطة، ونماذج نشر بالهوية السينمائية الفاخرة.", 
            en: "Animated logo, futuristic data visualizers, and signature overlays for a luxury tech brand." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["موشن جرافيك", "انترو متحرك", "دليل ألوان"],
            en: ["Motion Graphics", "Logo Animation", "Brand Guide"]
          }
        },
        {
          id: "proj5",
          title: { ar: "فيديو ترويجي سينمائي لتطبيق مالي", en: "Cinematic App Promo - Fintech Application" },
          category: "brand",
          result: { ar: "+35% زيادة في التحميلات المباشرة", en: "+35% App Store Conversion" },
          desc: { 
            ar: "تجسيد الهوية البصرية للتطبيق بداخل واجهات تفاعلية مذهلة ومؤثرات موشن حماسية.", 
            en: "Stunning kinetic typography and UI mockups presented with high-energy edit sequences." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["فيديو ترويجي", "تصميم واجهة حركي", "سينمائي"],
            en: ["Promo Video", "UI Animation", "Cinematic Cut"]
          }
        },
        {
          id: "proj6",
          title: { ar: "ريلز ترويجية لعلامة عطور فاخرة", en: "Social Reels - Luxury Perfume Brand" },
          category: "reels",
          result: { ar: "معدل تفاعل مرتفع ومبيعات قياسية", en: "High interactions & record sales" },
          desc: { 
            ar: "إيقاع حسي متناغم مع الموسيقى وتعديل لوني كلاسيكي يوحي بالفخامة والجاذبية المطلقة.", 
            en: "Harmonious sensory pacing matched with classic high-contrast grading, creating absolute appeal." 
          },
          mediaUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
          tags: {
            ar: ["عطور", "إيقاع حركي", "تعديل ألوان"],
            en: ["Perfume Ads", "Beat Syncing", "Color Grading"]
          }
        }
      ]
    },

    caseStudies: {
      title: {
        ar: "دراسات حالة متعمقة",
        en: "In-Depth Case Studies"
      },
      subtitle: {
        ar: "لا نكتفي بالتعديل السطحي؛ نحن نحلل التحدي، ونرسم الاستراتيجية البصرية المناسبة لتحقيق الأرقام.",
        en: "We don't just edit; we analyze, build visual strategies, and deliver high performance metrics."
      },
      items: [
        {
          id: "case-a",
          clientName: { ar: "منشئي محتوى تعليمي وترفيهي", en: "Educational & Creator Duos" },
          title: { ar: "من التخبط في جلب المتابعين إلى ريادة فئة ريليز وتطوير الذات", en: "Dominating the Self-Development Reels Category" },
          metrics: { ar: "+450% تفاعل و 2.5 مليون مشاهدة", en: "+450% Engagement & 2.5M Views" },
          challenge: { 
            ar: "صناع محتوى يمتلكون أفكاراً ممتازة لكن نسبة الاحتفاظ في أول 5 ثوانٍ كانت أقل من 20%، مما يقيد الخوارزمية ويمنع الانتشار.", 
            en: "Outstanding content ideas but high early drops (under 20% in first 5s), locking the algorithm from triggering virality." 
          },
          approach: { 
            ar: "صممنا خطافات بصرية وصوتية قوية (Visual Hooks) مع تفعيل ترجمات منسقة ديناميكياً تظهر كلمة بكلمة، متبوعة بقطع سريع ومؤثرات صوتية محفزة للانتباه.", 
            en: "Engineered aggressive early hooks, customized word-by-word dynamic subtitle popups, and added high-tempo custom sound cues." 
          },
          deliverables: {
            ar: ["تصميم حزمة السوشيال ميديا", "إنتاج 12 فيديو ريلز أسبوعياً", "هندسة الهوية الصوتية المخصصة"],
            en: ["Social kit package design", "12 High-impact Reels weekly", "Sound identity engineering"]
          },
          tools: ["Adobe Premiere Pro", "After Effects", "FL Studio (Sound FX)"],
          results: {
            ar: ["ارتفاع الاحتفاظ بالجمهور لـ 72%", "2.5 مليون مشاهدة عضوية دون إعلانات", "زيادة في أعداد المتابعين بمقدار 45 ألفاً"],
            en: ["Audience retention peaked at 72%", "2.5M fully organic reach", "+45k new loyal followers"]
          },
          accentColor: "#00FF87",
          image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "case-b",
          clientName: { ar: "قناة يوتيوب تقنية وبودكاست كندي", en: "Canadian Tech Channel & Podcast" },
          title: { ar: "إعادة بناء الهوية البصرية وأغلفة الفيديوهات لزيادة النقرات", en: "Rebuilding Visual Identity & CTR for Tech Giants" },
          metrics: { ar: "+14.2% معدل نقر (CTR) مستقر", en: "+14.2% Stable Click-Through-Rate" },
          challenge: { 
            ar: "محتوى تقني وبودكاست مذهل لكن الأغلفة والإنتروهات كانت باهتة ومكررة وتفشل في المنافسة في الشاشات الرئيسية للجمهور.", 
            en: "Amazing tech analysis but boring covers and generic template intros that couldn't compete on users' homepages." 
          },
          approach: { 
            ar: "استخدام تقنيات دمج إضاءة نيون سينمائية في الأغلفة (ثمبنيلز) مع خطوط مخصصة وبارزة جداً، إلى جانب إنتاج فيديو مقدمة (Intro) ثلاثي الأبعاد يعكس الاحترافية.", 
            en: "Applied neon-cinematic highlights with highly expressive typography on covers, complemented by a gorgeous 3D animated intro." 
          },
          deliverables: {
            ar: ["نظام ثمبنيلز احترافي ومتكرر", "انترو ثلاثي الأبعاد فريد", "دليل ألوان الفيديوهات وهيكل الصوت"],
            en: ["Design blueprint for high-CTR thumbnails", "3D animated intro sting", "Video grading & sound kit guidelines"]
          },
          tools: ["Photoshop CC", "Cinema 4D", "DaVinci Resolve Studio"],
          results: {
            ar: ["ارتفاع معدل النقرات من 4% إلى 14.2%", "زيادة في متوسط زمن المشاهدة بمقدار دقيقة ونصف", "توقيع شراكات رعاية ممتازة بفضل الاحترافية البصرية الجديدة"],
            en: ["CTR soared from 4% to 14.2%", "Average watch duration increased by 1m 30s", "Secured high-ticket brand sponsors with the clean aesthetic"]
          },
          accentColor: "#FFD700",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "case-c",
          clientName: { ar: "تطبيق السفر والمغامرات (ريدجو)", en: "RedGo App" },
          title: { ar: "إطلاق الهوية السينمائية الكاملة لتطبيق السفر والمغامرات", en: "Flagship Visual Identity Launch for Adventure App" },
          metrics: { ar: "الوصول لقمة تريند التطبيقات الجديدة", en: "Topped App Store Trending Charts" },
          challenge: { 
            ar: "تطبيق جوال مبتكر للسفر والمغامرات يحتاج لهوية بصرية فريدة وصور متجر مبدعة وفيديوهات ترويجية تثير الأدرينالين والفضول الفوري.", 
            en: "An adventure mobile app needing character, colors, dynamic landing assets, store screenshots, and promotional trailers that induce adrenaline." 
          },
          approach: { 
            ar: "هذا مشروعنا الأكبر: صممنا لوحات ألوان حيوية، رسمنا شخصيات متحركة للمتجر بداخل لغة واجهات عصرية (Arabic / English In-App UI styling)، وأنتجنا سلسلة من الفيديوهات الترويجية السريعة والملحمية للمنصات الرقمية.", 
            en: "Our flagship project: Designed a vibrant palette, animated characters for app UI screens, dynamic store graphics, and composed cinematic app-reveal action trailers." 
          },
          deliverables: {
            ar: ["دليل الهوية الكامل والخطوط والواجهات حركياً", "فيديو ترويجي سينمائي للمتاجر", "مجموعة صور المتجر التسويقية المذهلة"],
            en: ["Identity system, typography, & UI motion assets", "Cinematic trailer for App/Google Play Stores", "Highly narrative store marketing banners"]
          },
          tools: ["Figma", "After Effects", "Adobe Premiere", "Audition"],
          results: {
            ar: ["تصدر قائمة التطبيقات الرائجة في الأسبوع الأول", "تجاوز المليون مشاهدة للفيديو الترويجي الرئيسي", "تقييم 4.9 في المتجر بفضل الوعي البصري المبهر للعلامة"],
            en: ["Ranked #1 trending app in first week", "Main launch trailer surpassed 1M views", "Aesthetic confidence drove 4.9 average app rating"]
          },
          accentColor: "#00E1FF",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },

    process: {
      title: {
        ar: "رحلة العمل: 5 خطوات للسينما",
        en: "Our 5-Step Crafting Journey"
      },
      subtitle: {
        ar: "عملية منظمة تبسط عليك الأمور وتضمن تلبية توقعاتك وتطلعاتك بأعلى دقة.",
        en: "An organized workflow that simplifies collaboration and guarantees high precision."
      },
      steps: [
        {
          stepNumber: "01",
          title: { ar: "الاجتماع والاتفاق المبدئي (Brief)", en: "Brief & Exploration" },
          desc: { 
            ar: "نناقش طبيعة مشروعك، الجمهور المستهدف، المراجع البصرية، والهدف الرقمي الذي تسعى له.", 
            en: "We dive into your goals, audience demographics, reference aesthetics, and measurable targets." 
          }
        },
        {
          stepNumber: "02",
          title: { ar: "تحديد المراجع والأسلوب البصري", en: "References & Styleframes" },
          desc: { 
            ar: "نعرض عليك مجموعة من الخطوط، الإضاءة، وتجانس الألوان لنستقر على نمط يخصك بمفردك.", 
            en: "We present visual moodboards, specific color grading samples, and typography styles for sign-off." 
          }
        },
        {
          stepNumber: "03",
          title: { ar: "عمليات التعديل والمونتاج (Edit)", en: "The Cinematic Cut" },
          desc: { 
            ar: "نبدأ بالهيكل الأساسي للمقطع، تليها الهندسة الصوتية الدقيقة، تلوين المشاهد، وإضافة الحركة والمؤثرات.", 
            en: "We compile the primary storyline, execute meticulous sound design, color grade, and layer custom motion assets." 
          }
        },
        {
          stepNumber: "04",
          title: { ar: "مراجعة وتعديلات ذكية", en: "Smart Revisions" },
          desc: { 
            ar: "نعرض عليك النسخة الأولى في لوحة تفاعلية لإبداء ملاحظاتك بدقة، لنقوم بتعديلها على الفور.", 
            en: "We share a interactive video link for frame-by-frame annotations to implement requested edits rapidly." 
          }
        },
        {
          stepNumber: "05",
          title: { ar: "التسليم وملفات جاهزة للنشر", en: "Delivery & Master Files" },
          desc: { 
            ar: "نسلمك النسخة النهائية بأعلى جودة مع صيغ مخصصة لكل منصة (يوتيوب، ريلز، تيك توك) بملفات مرتبة.", 
            en: "We hand over the cinematic master files tailored to custom target platforms, clean and publication-ready." 
          }
        }
      ]
    },

    packages: {
      title: {
        ar: "باقات تسعير واضحة وقيمة حقيقية",
        en: "Transparent Packages & Maximum Value"
      },
      subtitle: {
        ar: "باقات مرنة ومصممة خصيصاً لتغطي كافة الاحتياجات وتوفر راحة بال مطلقة مع دقة استثنائية.",
        en: "Flexible, structured packages built to cover all tier requirements with zero risk and maximum quality."
      },
      ctaText: {
        ar: "اطلب عرض مخصص",
        en: "Request Custom Proposal"
      },
      items: [
        {
          id: "pkg-starter",
          name: { ar: "باقة البداية (Starter)", en: "Starter Package" },
          priceKey: "starter",
          desc: { 
            ar: "مثالية للمبتدئين ومنشئي المحتوى الباحثين عن بصمة مميزة في فيديوهاتهم السريعة.", 
            en: "Ideal for growing creators wanting premium branding and high retention short-form assets." 
          },
          features: {
            ar: [
              "مونتاج 8 فيديوهات ريلز/شورتس شهرياً",
              "ترجمات متحركة ومؤثرات صوتية متناغمة",
              "تعديلات ألوان أساسية (Color Correction)",
              "معاينة تفاعلية وسرعة استجابة هائلة",
              "مراجعتان مجانيتان لكل فيديو"
            ],
            en: [
              "8 Premium Reels/Shorts edited per month",
              "Dynamic styled captions & rhythmic sound FX",
              "Basic cinematic color correction",
              "Interactive review board & rapid response",
              "2 Revision rounds per project"
            ]
          },
          whatsappPrefill: {
            ar: "مرحباً، أود الاستفسار عن باقة البداية (Starter)",
            en: "Hi! I am interested in your Starter Package."
          }
        },
        {
          id: "pkg-pro",
          name: { ar: "الباقة الاحترافية (Pro Edit)", en: "Pro Edit Package" },
          priceKey: "pro",
          badge: { ar: "الأكثر طلباً", en: "Most Popular" },
          desc: { 
            ar: "الخيار الذهبي للقنوات الطموحة والشركات التي تبحث عن جودة وثائقية وقصصية لا تقارن.", 
            en: "The gold standard for high-caliber YouTube channels and brands demanding elite documentary pacing." 
          },
          features: {
            ar: [
              "مونتاج 4 فيديوهات يوتيوب طويلة شهرياً",
              "تصميم 4 أغلفة (ثمبنيلز) عالية النقر CTR",
              "تلوين سينمائي متقدم (Cinematic Grading)",
              "موشن جرافيكس مخصص وشعار متحرك مجاني",
              "حقيبة سوشيال ميديا ترويجية (2 ريلز مجاناً)",
              "تعديلات غير محدودة في إطار المعاينة"
            ],
            en: [
              "4 cinematic long-form YouTube videos monthly",
              "4 custom high-CTR thumbnails included",
              "Advanced cinematic color grading & styling",
              "Custom motion graphic sequences & animated intro",
              "SMM Promo Kit (2 custom reels free of charge)",
              "Unlimited revisions during review draft"
            ]
          },
          whatsappPrefill: {
            ar: "مرحباً، أود طلب الباقة الاحترافية (Pro Edit)",
            en: "Hi! I want to secure the Pro Edit Package."
          }
        },
        {
          id: "pkg-brand",
          name: { ar: "الهوية الإبداعية الكاملة", en: "Flagship Creator Identity" },
          priceKey: "brand",
          desc: { 
            ar: "الحل الشامل للأعمال والمنشئين الساعيين لبناء هوية بصرية كاملة وتناغم سينمائي مطلق في السوق.", 
            en: "An ultimate full-service offering for creators & tech-apps demanding absolute visual dominance." 
          },
          features: {
            ar: [
              "تصميم شعار وهوية حركية كاملة (Brand Guidelines)",
              "تصميم واجهات تطبيقات مخصصة حركياً (UI Motion)",
              "إنتاج فيديو إعلاني ترويجي سينمائي (Promo App Trailer)",
              "تصميم جميع أغلفة وتخطيط قنوات السوشيال ميديا",
              "مونتاج 12 ريلز + 2 فيديو يوتيوب بالأسلوب البصري الجديد",
              "استشارات استراتيجية أسبوعية وحق النشر التجاري الكامل"
            ],
            en: [
              "Complete visual & motion identity blueprint",
              "Custom App/Product UI motion sequences",
              "Cinematic App promo/launch trailer",
              "Design layout system for all channels & stores",
              "12 Reels + 2 YouTube edits under the new brand language",
              "Weekly creative strategy calls & commercial rights"
            ]
          },
          whatsappPrefill: {
            ar: "مرحباً، أريد حجز باقة الهوية الإبداعية الكاملة والتعاون معكم",
            en: "Hi! I am looking to secure your Flagship Creator Identity package."
          }
        }
      ]
    },

    testimonials: {
      title: {
        ar: "آراء من شركاء النجاح",
        en: "Success Stories"
      },
      subtitle: {
        ar: "ثقة نعتز بها من كبار صناع المحتوى ورواد الأعمال في مختلف المجالات.",
        en: "Earning absolute trust from high-performance creators and industry leaders."
      },
      items: [
        {
          name: { ar: "د. طارق الجابري", en: "Dr. Tarek Al-Jabri" },
          role: { ar: "صانع محتوى وثائقي وتقني", en: "Tech & Documentary Creator" },
          channelName: "@AlJabriTech",
          content: {
            ar: "العمل مع هذا الستوديو نقل فيديوهاتي إلى مستوى يضاهي نتفليكس! ارتفع زمن المشاهدة ومعدل الاحتفاظ بالجمهور بنسبة خيالية من أول فيديو سلموني إياه.",
            en: "Partnering with this studio upgraded my channel to Netflix levels. Viewers are hooked and average watch duration skyrocketed from the first release."
          },
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
          rating: 5
        },
        {
          name: { ar: "سارة عبد الرحمن", en: "Sarah Abdelrahman" },
          role: { ar: "مؤسسة منصة ريدجو للمغامرات", en: "Founder of RedGo App" },
          channelName: "RedGo App",
          content: {
            ar: "أشكرهم على الإتقان والالتزام الرهيب في إطلاق هوية تطبيقنا وتصميم صور المتجر والفيديو الترويجي. الفيديو حرك الجماهير وحققنا صدارة التريند فوراً!",
            en: "Unbelievable mastery and dedication during our fintech & travel app launch. The promo trailer generated immediate viral hype and pushed us to trend #1!"
          },
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
          rating: 5
        },
        {
          name: { ar: "عمر الخالدي", en: "Omar Al-Khalidi" },
          role: { ar: "خبير ريادة أعمال وتطوير الذات", en: "Business & Productivity Mentor" },
          channelName: "@OmarMindset",
          content: {
            ar: "باقة الريلز غيرت قواعد اللعبة بالنسبة لي. الترجمات والمؤثرات الصوتية والقطع السريع جعل الفيديوهات تنتشر بشكل فيروسي، وحصلت على مئات العملاء الجدد.",
            en: "The Reels package changed everything. Meticulous pacing and kinetic typography made my videos go viral, bringing in hundreds of premium leads organically."
          },
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
          rating: 5
        }
      ]
    },

    team: {
      title: {
        ar: "صناع التميز البصري",
        en: "Meet the Team"
      },
      subtitle: {
        ar: "نخبة من المخرجين الإبداعيين ومصممي الحركة الملتزمين بتحويل رؤيتك إلى تحفة بصرية.",
        en: "An elite force of creative directors and motion editors dedicated to forging your next masterpiece."
      }
    },

    faqs: {
      title: {
        ar: "الأسئلة الشائعة والمخاطر",
        en: "Frequently Asked Questions"
      },
      subtitle: {
        ar: "إجابات شفافة ومباشرة تضمن راحتك وتزيل أي غموض قبل البدء.",
        en: "Direct, transparent answers ensuring absolute peace of mind before we align."
      },
      items: [
        {
          question: { ar: "كيف يتم تنظيم عملية التعديلات والمراجعات؟", en: "How is the revision process handled?" },
          answer: { 
            ar: "نستخدم منصة تفاعلية مذهلة تتيح لك الضغط على أي ثانية من المقطع وكتابة ملاحظاتك لتظهر لنا فوراً، مما يمنع سوء الفهم ويوفر وقتاً هائلاً.", 
            en: "We use an interactive video collaboration board where you annotate frame-by-frame. This completely avoids communication errors and saves massive review time." 
          }
        },
        {
          question: { ar: "ماذا لو لم يعجبني التعديل الأول؟ هل هناك ضمان؟", en: "What if I don't like the initial cut?" },
          answer: { 
            ar: "في كل باقة، نوفر جولات مراجعة محددة، وفي الباقات الاحترافية نعدل حتى الرضا التام. هدفنا هو بناء علاقة طويلة الأمد تخدم مصلحتك أولاً.", 
            en: "We include dedicated revision rounds in all packages, and with our Pro/Flagship offers, we edit until absolute alignment. Our primary target is your long-term creative satisfaction." 
          }
        },
        {
          question: { ar: "هل أحصل على حقوق الملكية الفكرية والملفات الخام؟", en: "Do I get full commercial rights & project files?" },
          answer: { 
            ar: "نعم، بمجرد إتمام المشروع، تحصل على حقوق النشر التجاري الكاملة للمقاطع. الملفات المفتوحة (مشروع بريمير/أفتر افكتس) يمكن تسليمها بطلب مسبق.", 
            en: "Yes, once final delivery is confirmed, you own 100% of the commercial distribution rights. Raw/Open projects can be acquired upon request with a custom license." 
          }
        },
        {
          question: { ar: "ما هو الوقت المستغرق لتسليم المقاطع عادةً؟", en: "What is your typical turnaround time?" },
          answer: { 
            ar: "تتراوح مدة التسليم بين يومين إلى 4 أيام عمل للمقاطع الفردية، وحسب جدول الباقات المتفق عليه شهرياً لضمان النشر المستقر والمتناغم.", 
            en: "Turnaround is usually 2 to 4 business days for individual assets, and strictly scheduled on a monthly calendar for retainer packages." 
          }
        },
        {
          question: { ar: "هل تقدمون خدمات تسليم مستعجل (Rush Jobs)؟", en: "Do you offer super-rush deliveries?" },
          answer: { 
            ar: "نعم، نقدم خدمة المونتاج المستعجل (خلال 24 ساعة) مقابل تكلفة إضافية طفيفة حسب حجم وتعقيد المادة المصورة.", 
            en: "Yes, we accommodate high-priority, 24-hour express cuts for an additional rush fee, subject to footage length and motion complexity." 
          }
        }
      ]
    },

    contact: {
      title: {
        ar: "صمم خطوتك السينمائية القادمة",
        en: "Build Your Next Cinematic Asset"
      },
      subtitle: {
        ar: "املأ البيانات أدناه، أو راسلنا مباشرة عبر واتساب للبدء في غضون دقائق معدودة.",
        en: "Fill out the questionnaire or tap WhatsApp to initiate a dialogue in minutes."
      },
      form: {
        nameLabel: { ar: "اسمك الكريم", en: "Your Full Name" },
        phoneLabel: { ar: "رقم الهاتف / واتساب (برمز الدولة)", en: "WhatsApp (with country code)" },
        platformLabel: { ar: "المنصة الرئيسية", en: "Primary Platform" },
        projectTypeLabel: { ar: "نوع الخدمة المطلوبة", en: "Requested Service" },
        budgetLabel: { ar: "ميزانية المشروع المتوقعة", en: "Estimated Budget" },
        messageLabel: { ar: "تفاصيل مشروعك ورؤيتك", en: "Your Vision & Project Brief" },
        submitBtn: { ar: "إرسال البيانات والبدء", en: "Send Brief & Initiate" },
        successTitle: { ar: "تم استلام رؤيتك بنجاح! 🎉", en: "Brief Received Successfully! 🎉" },
        successMessage: { 
          ar: "شكراً لاهتمامك. سنقوم بالتواصل معك في غضون ساعتين كحد أقصى لمناقشة التفاصيل وتنسيق الخطوة القادمة.", 
          en: "Thank you! We will review your vision and contact you within 2 hours to align on our next steps." 
        }
      }
    },

    footer: {
      tagline: {
        ar: "نحن لا نصنع فيديوهات؛ نحن نبني تحفاً سينمائية تدوم وتؤثر وتصنع هوية لا تنسى.",
        en: "We don't just edit; we forge cinematic assets that endure, inspire, and define brands."
      },
      copyright: {
        ar: "جميع الحقوق محفوظة © {year} {brandName}. صُنع لصناع المحتوى والرواد الباحثين عن جودة السينما.",
        en: "All Rights Reserved © {year} {brandName}. Crafted for creators & pioneers seeking cinema-grade excellence."
      }
    }
  }
};
