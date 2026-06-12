export interface SanityTeamMember {
  _id: string;
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  bioExtended?: string;
  education?: string[];
  specializations?: string[];
  linkedIn?: string;
  imageUrl?: string;
  order?: number;
}

export interface SanityConsultingArea {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  fullDescription?: string;
  activities?: string[];
  benefits?: string[];
  targetClients?: string;
  faq?: { question: string; answer: string }[];
  order?: number;
}

export interface SanityTaxDeadline {
  _id: string;
  title: string;
  description?: string;
  date: string;
  month?: string;
  category?: string;
  priority?: "alta" | "media" | "bassa";
  audience?: string;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  date: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  excerpt?: string;
  imageUrl?: string;
  tags?: string[];
  body?: unknown[];
  faq?: { question: string; answer: string }[];
}

export interface SanitySettings {
  studioName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  piva?: string;
  recruitingEmail?: string;
  logoUrl?: string;
}
