/**
 * Shared Type Definitions
 */

export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface ProjectFilters {
  category: string;
}

export interface ContactFormInput {
  name: string;
  whatsapp: string;
  platform: string;
  service: string;
  budget: string;
  message: string;
}
