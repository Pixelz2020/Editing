import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import siteDataJson from '../config/siteData.json';

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
  coverUrl?: string; // Optional cover image URL
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

// Default initial state from central configuration file
const defaultState: SiteConfigState = siteDataJson as SiteConfigState;

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
