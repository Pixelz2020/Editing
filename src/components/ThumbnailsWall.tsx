import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Search, X, Flame } from 'lucide-react';
import { Language } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface ThumbnailsWallProps {
  lang: Language;
}

export default function ThumbnailsWall({ lang }: ThumbnailsWallProps) {
  const { siteData } = useSiteConfig();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!siteData.showThumbnailsWallSection) return null;

  const activeThumbnails = siteData.thumbnailsList?.filter(thumb => thumb.visible) || [];

  const getGridSpan = (index: number) => {
    const mod = index % 6;
    if (mod === 0) return "md:col-span-2 md:row-span-2";
    if (mod === 3) return "md:col-span-1 md:row-span-2";
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <section className="py-20 bg-transparent relative border-t border-[#1A0B2E]/10 dark:border-white/5" id="thumbnails-wall">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest text-brand-purple dark:text-brand-secondary uppercase font-bold">
            <Image size={12} />
            <span>{lang === 'ar' ? "أعمال الأغلفة والبوسترات الفنية" : "HIGH-CTR COVERS & ARTWORK"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A0B2E] dark:text-white">
            {lang === 'ar' ? "أغلفة يوتيوب، بوسترات، وتصاميم ثنائية وثلاثية الأبعاد" : "Masterful 3D Photo Composites, Covers & Posters"}
          </h2>
          <p className="text-sm text-[#1A0B2E]/80 dark:text-gray-400 font-light">
            {lang === 'ar' ? "انقر على أي تصميم لتشاهده بوضوح الدقة الكاملة للتفاصيل الإبداعية الدقيقة." : "Click on any cover template to review cinematic composites, details, and lighting precision."}
          </p>
        </div>

        {/* Dynamic Bento Grid */}
        {activeThumbnails.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-light">
            {lang === 'ar' ? "سيتم عرض الأغلفة والبوسترات المضافة هنا قريباً." : "Added covers and designs will appear here."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]" id="thumbnails-bento-grid">
            {activeThumbnails.map((item, index) => {
              const gridSpan = getGridSpan(index);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.015 }}
                  onClick={() => setSelectedImage(item.imageUrl)}
                  className={`relative rounded-xl overflow-hidden cursor-zoom-in bg-black/5 border border-[#1A0B2E]/10 dark:bg-white/5 dark:border-white/5 group shadow-lg ${gridSpan}`}
                  id={`thumb-item-${item.id}`}
                >
                  {/* Cover image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.4] group-hover:scale-102 transition-all duration-500"
                    id={`thumb-img-${item.id}`}
                  />

                  {/* Cover ambient gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />

                  {/* Float CTR result badge */}
                  {item.ctr && (
                    <div className="absolute top-4 left-4" id={`thumb-badge-${item.id}`}>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary text-[10px] font-mono font-bold rounded-full">
                        <Flame size={10} className="fill-brand-secondary" />
                        <span>{item.ctr}</span>
                      </span>
                    </div>
                  )}

                  {/* Lens overlay trigger */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                      <Search size={16} />
                    </div>
                  </div>

                  {/* Headline info */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none" id={`thumb-details-${item.id}`}>
                    <p className="text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">
                      {lang === 'ar' ? "عمل احترافي" : "PROFESSIONAL WORK"}
                    </p>
                    <h4 className="text-sm md:text-base font-display font-bold text-white mt-1 group-hover:text-brand-secondary transition-colors duration-200 line-clamp-1">
                      {item.title[lang]}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox zoom modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
            id="thumb-lightbox-backdrop"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full transition-all duration-200 z-10 cursor-pointer"
              aria-label="Close modal"
              id="thumb-lightbox-close"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              id="thumb-lightbox-card"
            >
              <img
                src={selectedImage}
                alt="Enlarged Thumbnail Preview"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain"
                id="thumb-lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
