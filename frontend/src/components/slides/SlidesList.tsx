import React from 'react';
import { SlideItem, SlideItemProps } from './SlideItem';

// Mock data for initial development
const mockSlides: SlideItemProps[] = [
  {
    id: 1,
    title: 'Introduction to AI Presenter',
    description: 'Overview of the key features and benefits of our platform.',
  },
  {
    id: 2,
    title: 'Getting Started',
    description: 'Step-by-step guide on how to create your first AI-powered presentation.',
  },
  {
    id: 3,
    title: 'Advanced Features',
    description: 'Deep dive into advanced customization options and professional features.',
  },
  {
    id: 4,
    title: 'Best Practices',
    description: 'Tips and tricks for creating engaging and effective presentations.',
  },
  {
    id: 5,
    title: 'Case Studies',
    description: 'Real-world examples of successful presentations created with AI Presenter.',
  },
];

export interface SlidesListProps {
  slides?: SlideItemProps[];
  onEditSlide?: (id: number) => void;
  onDeleteSlide?: (id: number) => void;
}

export const SlidesList: React.FC<SlidesListProps> = ({
  slides = mockSlides,
  onEditSlide,
  onDeleteSlide
}) => {
  return (
    <div className="h-full overflow-y-auto pr-4 -mr-4">
      <div className="space-y-3" role="list">
        {slides.map((slide) => (
          <SlideItem
            key={slide.id}
            {...slide}
            onEdit={() => onEditSlide?.(slide.id)}
            onDelete={() => onDeleteSlide?.(slide.id)}
          />
        ))}
      </div>
    </div>
  );
};