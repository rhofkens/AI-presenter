import { Briefcase, BookOpen, TrendingUp, Code, Layout } from 'lucide-react';

export const TEMPLATE_TYPES = {
  BUSINESS: 'Business',
  EDUCATIONAL: 'Educational',
  MARKETING: 'Marketing',
  TECHNICAL: 'Technical',
  CUSTOM: 'Custom',
} as const;

export type TemplateType = typeof TEMPLATE_TYPES[keyof typeof TEMPLATE_TYPES];

export const TEMPLATE_ICONS = {
  [TEMPLATE_TYPES.BUSINESS]: <Briefcase className="w-4 h-4" />,
  [TEMPLATE_TYPES.EDUCATIONAL]: <BookOpen className="w-4 h-4" />,
  [TEMPLATE_TYPES.MARKETING]: <TrendingUp className="w-4 h-4" />,
  [TEMPLATE_TYPES.TECHNICAL]: <Code className="w-4 h-4" />,
  [TEMPLATE_TYPES.CUSTOM]: <Layout className="w-4 h-4" />,
} as const;