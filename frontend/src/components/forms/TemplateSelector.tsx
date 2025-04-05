import React from 'react';
import { TEMPLATE_TYPES, TEMPLATE_ICONS, TemplateType } from '@/constants/templates';
import { Button } from '@/components/ui/button';

interface TemplateSelectorProps {
  value: TemplateType | null;
  onChange: (template: TemplateType) => void;
  error?: string;
  disabled?: boolean;
}

export function TemplateSelector({ value, onChange, error, disabled = false }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(TEMPLATE_TYPES).map(([key, templateName]) => (
          <Button
            key={key}
            type="button"
            variant={value === templateName ? 'default' : 'outline'}
            className={`h-24 flex flex-col items-center justify-center gap-2 ${
              value === templateName ? 'ring-2 ring-primary' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onChange(templateName)}
            disabled={disabled}
          >
            {TEMPLATE_ICONS[templateName]}
            <span className="text-sm font-medium">{templateName}</span>
          </Button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}