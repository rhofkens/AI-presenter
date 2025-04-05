import { Project } from '../types/project';
import { TEMPLATE_TYPES } from '../constants/templates';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Q4 Sales Strategy Presentation',
    thumbnail: 'https://picsum.photos/seed/sales/800/600',
    duration: '15:30',
    tags: [
      { id: '1', name: 'business', color: 'business' },
      { id: '2', name: 'marketing', color: 'marketing' }
    ],
    author: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?u=sarah.j@example.com',
      email: 'sarah.j@example.com'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    template: {
      id: '1',
      type: TEMPLATE_TYPES.BUSINESS,
      slideCount: 12,
      description: 'Professional business template'
    },
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Introduction to Machine Learning',
    thumbnail: 'https://picsum.photos/seed/ml/800/600',
    duration: '45:20',
    tags: [
      { id: '3', name: 'technical', color: 'technical' },
      { id: '4', name: 'education', color: 'education' }
    ],
    author: {
      id: '2',
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?u=david.c@example.com',
      email: 'david.c@example.com'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    template: {
      id: '2',
      type: TEMPLATE_TYPES.EDUCATIONAL,
      slideCount: 24,
      description: 'Educational course template'
    },
    createdAt: '2024-03-28T15:30:00Z',
    updatedAt: '2024-03-29T09:15:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Product Launch Campaign',
    thumbnail: 'https://picsum.photos/seed/product/800/600',
    duration: '10:45',
    tags: [
      { id: '5', name: 'marketing', color: 'marketing' },
      { id: '6', name: 'streaming', color: 'streaming' }
    ],
    author: {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?u=emma.w@example.com',
      email: 'emma.w@example.com'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    template: {
      id: '3',
      type: TEMPLATE_TYPES.MARKETING,
      slideCount: 8,
      description: 'Product launch template'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'published'
  },
  {
    id: '4',
    title: 'API Documentation Overview',
    thumbnail: 'https://picsum.photos/seed/api/800/600',
    duration: '25:15',
    tags: [
      { id: '7', name: 'technical', color: 'technical' },
      { id: '8', name: 'streaming', color: 'streaming' }
    ],
    author: {
      id: '4',
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?u=michael.b@example.com',
      email: 'michael.b@example.com'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    template: {
      id: '4',
      type: TEMPLATE_TYPES.TECHNICAL,
      slideCount: 18,
      description: 'Technical documentation template'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: 'published'
  },
  {
    id: '5',
    title: 'Company Overview 2024',
    thumbnail: 'https://picsum.photos/seed/company/800/600',
    duration: '20:00',
    tags: [
      { id: '9', name: 'business', color: 'business' },
      { id: '10', name: 'marketing', color: 'marketing' }
    ],
    author: {
      id: '5',
      name: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?u=lisa.a@example.com',
      email: 'lisa.a@example.com'
    },
    postedTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    template: {
      id: '5',
      type: TEMPLATE_TYPES.BUSINESS,
      slideCount: 15,
      description: 'Corporate overview template'
    },
    createdAt: '2024-03-15T13:20:00Z',
    updatedAt: '2024-03-16T10:45:00Z',
    status: 'published'
  }
];