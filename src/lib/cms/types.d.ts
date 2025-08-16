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
  links?: Array<string | [string, string]>;
}

export interface ImagePlaceholder {
  css: string;
  jsx: { background: string };
}

export interface Image {
  url: string;
  placeholder?: ImagePlaceholder;
  height: number;
  width: number;
  caption?: string;
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
