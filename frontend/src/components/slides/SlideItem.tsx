import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SlideItemProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  narrative?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SlideItem: React.FC<SlideItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  narrative,
  onEdit,
  onDelete
}) => {
  return (
    <article role="listitem">
      <Card className="p-4 hover:bg-slate-50 transition-colors">
        <div className="flex items-start gap-4">
          {/* Left Column: Slide Number and Actions */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            {/* Slide Number */}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600">{id}</span>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-slate-600 hover:text-slate-900"
                onClick={onEdit}
                title="Edit slide"
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onDelete}
                title="Delete slide"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>

            {/* Preview Image */}
            {imageUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={imageUrl}
                  alt={`Preview of slide ${id}`}
                  className={cn(
                    "object-cover",
                    "transition-opacity duration-300",
                    "hover:opacity-90"
                  )}
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="text-sm text-slate-400">No preview available</span>
              </div>
            )}

            {/* Narrative */}
            {narrative && (
              <div className="bg-slate-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-slate-700 mb-1">Narrative</h4>
                <p className="text-sm text-slate-600">{narrative}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </article>
  );
};