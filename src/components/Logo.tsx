import { ImgHTMLAttributes } from 'react';
// @ts-ignore
import logoImg from '../assets/images/logo.png';

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

/**
 * 💡 دليل استبدال اللوجو يدوياً (Manual Logo Replacement Guide)
 * 
 * لاستبدال اللوجو الخاص بالموقع بالكامل في جميع الأماكن (البار العلوي، الفوتر، والواجهة المؤقتة):
 * 1. قم برفع صورة اللوجو الجديد الخاص بك بصيغة PNG أو JPG.
 * 2. تأكد من تسمية الملف باسم: logo.png
 * 3. ضع الملف في المجلد التالي: src/assets/images/ (قم باستبدال الملف الموجود حالياً بنفس الاسم).
 * 4. سيتم تحديث اللوجو تلقائياً وبشكل احترافي ومتوافق مع جميع الشاشات والأحجام في المواضع الثلاثة.
 */
export default function Logo({ size = 40, className, ...props }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="Studio Logo"
      width={size}
      height={size}
      className={`object-contain select-none transition-all duration-300 ${className || ''}`}
      referrerPolicy="no-referrer"
      style={{ width: size, height: size }}
      {...props}
    />
  );
}
