export interface Note {
  id: string;
  slug: string;
  excerpt?: string;
  date: string;
  richContent: {
    json: any[];
    references: any[];
  };
  tags?: string[];
  title: string;
  targetURL: string;
  coverImage: Image;
}

export interface Image {
  url: string;
  placeholder?: string;
  height?: number;
  width?: number;
}

export type Action = {
  text: string;
  url: string;
  icon: string;
};

export interface RichText {
  html?: string;
  text?: string;
  markdown?: string;
}

export interface Project {
  tagline: string;
  title: string;
  id: string;
  isMinor: boolean;
  action?: Action;
  description?: RichText;
  coverImage?: Image;
}

export interface Achievement {
  tagline: string;
  title: string;
  id: string;
  isMinor: boolean;
  action?: Action;
  description?: RichText;
  coverImage?: Image;
}
