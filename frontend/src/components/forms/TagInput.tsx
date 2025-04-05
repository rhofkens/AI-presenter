import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TAG_COLORS, TagType } from '@/constants/tags';

interface TagInputProps {
  value: TagType[];
  onChange: (tags: TagType[]) => void;
  maxTags?: number;
  disabled?: boolean;
}

export function TagInput({ value = [], onChange, maxTags = 5, disabled = false }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const tag = inputValue.trim().toLowerCase() as TagType;
    
    if (!tag || value.includes(tag) || value.length >= maxTags || !(tag in TAG_COLORS)) {
      return;
    }

    onChange([...value, tag]);
    setInputValue('');
  };

  const removeTag = (tagToRemove: TagType) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className={`${TAG_COLORS[tag]} inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium`}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className={`ml-1 inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-label={`Remove ${tag} tag`}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      {value.length < maxTags && (
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a tag and press Enter"
            className={`flex-1 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            aria-label="Add tag"
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}