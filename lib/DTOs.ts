export interface Note {
  id:      string;
  slug:    string;
  excerpt: string;
  date:    Date;
  tags?:   string[];
  title:   string;
  content?: RichText;
  coverImage?: Image;
}

export interface Image {
  url:     string;
  height?: number;
  width?:  number;
}

export interface RichText {
  html?:     string;
  text?:     string;
  markdown?: string;
}

export interface Project {
  tagline: string;
  title:   string;
  id:      string;
  description?: RichText;
  coverImage?: Image;
}

export interface Achievement {
  tagline: string;
  title:   string;
  id:      string;
  description?: RichText;
  coverImage?: Image;
}