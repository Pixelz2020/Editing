# Cinematic Studio Portfolio

A world-class, premium, single-page marketing and portfolio website designed specifically for video editors, motion designers, and brand identity studios. Built using a **RTL-first Arabic and English** architectural setup, featuring high-contrast cinematic dark visuals, and powered entirely from a single site configuration file.

---

## 🎨 Design Rationale

1. **Vibe & Contrast (Cosmic Slate Theme):**
   - **Backgrounds:** Deep near-black values (`#050505` & `#0A0A0A`) that mimic cinema screens and allow visual video elements to glow dynamically.
   - **Accents:** Electric neon green/mint (`#00FF87`) representing high-speed rendering & timeline playheads, paired with warm accent gold (`#FFD700`) denoting luxury results.
   - **Film Grain Effect:** Integrated static SVG turbulence overlay generating high-end editorial depth.

2. **Typography Pairing:**
   - **Arabic Display Headings:** **Cairo** — bold, modern, geometric display font reminiscent of movie posters.
   - **Arabic Copy:** **IBM Plex Sans Arabic** — highly readable, professional sans-serif designed for modern interfaces.
   - **English/Latin display:** **Space Grotesk** paired with clean **Inter** body text.

3. **Smooth Motion & Micro-interactions:**
   - Glassmorphic navigation backdrops that blur as the user scrolls.
   - Custom modal triggers for YouTube showreel previews.
   - Staggered reveals, hover zooms on portfolio chips, and smooth accordion transitions.

---

## 🛠️ Folder & Component Structure

All items are modularized to prevent compilation lag and comply with standard React guidelines:
```
├── /src
│   ├── /components
│   │   ├── Navbar.tsx         # Responsive sticky header with toggles
│   │   ├── Hero.tsx           # Display tagline, dual CTAs, stats & showreel modal
│   │   ├── Marquee.tsx        # Seamless scrolling tool loops
│   │   ├── Services.tsx       # 6-card interactive service grid
│   │   ├── Portfolio.tsx      # Curated works with category filters & detail lightbox
│   │   ├── CaseStudies.tsx    # High-impact stories (Reels, YT Covers, RedGo Travel)
│   │   ├── ThumbnailsWall.tsx # Dense interactive bento grid for covers
│   │   ├── Timeline.tsx       # 5-step collaborative workflow blueprint
│   │   ├── Packages.tsx       # 3-tier pricing tiers with direct WhatsApp integration
│   │   ├── Testimonials.tsx   # Rotating star reviews slider with social anchors
│   │   ├── FAQ.tsx            # Fluid question accordion
│   │   ├── Contact.tsx        # Cinematic form and questionnaire handler
│   │   └── Footer.tsx         # Social networks and smart copyrights
│   ├── /config
│   │   └── site.ts            # SINGLE source of truth containing translations & copy
│   ├── types.ts               # Shared type definitions for the workspace
│   ├── App.tsx                # Context manager, state machine & orchestration flow
│   ├── index.css              # Font loads, custom scrollbars, and Tailwind v4 themes
│   └── main.tsx               # Main DOM client bootstrap
```

---

## 📝 How to Customize (The 1-File Workflow)

You do **NOT** need to edit components or source files. To customize the entire website, open `/src/config/site.ts` and replace the following bracketed placeholders:

### 1. Brand Identity Placeholders
* `brandName`: Set your studio's visible name (e.g. `"سينما فيجن | CinemaVision"`).
* `ownerName`: Set your personal display name (e.g. `"أحمد الشريف | Ahmed El-Sherif"`).
* `whatsappNumber`: Set your international format phone number **WITHOUT** spaces, lead zeros, or `+` signs (e.g. `"201012345678"` for Egypt).
* `email`: Set your business inbox (e.g. `"contact@cinemavision.com"`).
* `city`: Enter your city and country in both `ar` and `en`.

### 2. Social Links
* Replace `socials` properties (`instagram`, `youtube`, `tiktok`, `behance`, `facebook`) with your specific URLs.

### 3. Media & Video Links
* `showreelUrl`: Set your YouTube embed URL (e.g., `"https://www.youtube.com/embed/dQw4w9WgXcQ"`). This will stream instantly inside our high-contrast lightboxes.

### 4. Metrics & Performance
* Update the `stats` table inside `/src/config/site.ts` with your real statistics (`projectsCount`, `clientsCount`, `platformsCount`, `avgDeliveryDays`).

---

## 📦 Client Assets Checklist

When launching the site live, replace the generic stock URLs inside `/src/config/site.ts` with your custom high-quality references:
1. **Showreel Cover Video:** A 1-2 minute high-tempo edit compilation.
2. **Project 1-6 Posters:** Image dimensions of `1920x1080` (or direct MP4 files) showing your best long-form, Reels, or logo designs.
3. **App Case Study Media:** High-contrast screenshots of the RedGo travel application screens showing custom characters and App Store banners.
4. **Covers Wall Bento:** 6 distinct thumbnails (travel, business, mystery, podcasts) for close pixel inspection.
5. **Team Avatars:** 3 high-resolution profile photos for the rotating reviews slider.

---

## 🗄️ Optional: CMS JSON Schema

If you choose to hook this up to a headless CMS (like Sanity, Strapi, or Contentful) in the future, your dynamic payload should conform to the following schema definition:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CinematicStudioConfig",
  "type": "object",
  "properties": {
    "brandName": { "type": "string" },
    "ownerName": { "type": "string" },
    "whatsappNumber": { "type": "string", "pattern": "^[0-9]+$" },
    "email": { "type": "string", "format": "email" },
    "showreelUrl": { "type": "string", "format": "uri" },
    "stats": {
      "type": "object",
      "properties": {
        "projectsCount": { "type": "integer" },
        "clientsCount": { "type": "integer" },
        "platformsCount": { "type": "integer" },
        "avgDeliveryDays": { "type": "integer" }
      },
      "required": ["projectsCount", "clientsCount", "platformsCount", "avgDeliveryDays"]
    },
    "packagesPricing": {
      "type": "object",
      "properties": {
        "starter": { "type": "string" },
        "pro": { "type": "string" },
        "brand": { "type": "string" }
      }
    }
  },
  "required": ["brandName", "ownerName", "whatsappNumber", "email", "showreelUrl", "stats"]
}
```

---

## 🚀 Execution & Deployment

### Run Locally (Development)
```bash
npm run dev
```

### Build & Validate Compilation
```bash
npm run build
```

### Deploying to Vercel or Cloud Run
The repository is completely **deploy-ready**. 
1. Push this project to GitHub.
2. Connect the repository to **Vercel** or **Netlify**.
3. It will automatically detect **Vite** and deploy the static build from the `/dist` directory with zero further configurations needed.
