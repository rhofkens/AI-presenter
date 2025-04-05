import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface DropZoneProps {
  onFileAccepted?: (file: File) => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

export function DropZone({
  onFileAccepted,
  onError,
  isLoading = false,
  className,
}: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return 'Only PowerPoint files (PPT/PPTX) are allowed';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 50MB';
    }
    return null;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);

      if (isLoading) return;

      const file = e.dataTransfer.files[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return;
      }

      setError(null);
      onFileAccepted?.(file);
    },
    [isLoading, onFileAccepted, onError]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-dashed p-8 transition-colors',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50',
        error && 'border-destructive hover:border-destructive',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      data-testid="dropzone"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isLoading
              ? 'Uploading...'
              : 'Drag and drop your PowerPoint presentation here'}
          </p>
          <p className="text-xs text-muted-foreground">
            PPT or PPTX files up to 50MB
          </p>
        </div>
        {error && (
          <p className="text-sm text-destructive" data-testid="error-message">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}