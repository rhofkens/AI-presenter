import { TagType } from '../constants/tags';

export interface Tag {
  id: string;
  name: string;
  color: TagType;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Template {
  id: string;
  type: string;
  slideCount: number;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  tags: Tag[];
  author: Author;
  postedTime: string;
  template: Template;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}