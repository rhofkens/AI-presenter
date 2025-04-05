import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TagInput } from './TagInput';
import { TemplateSelector } from './TemplateSelector';
import { TemplateType, TEMPLATE_TYPES } from '@/constants/templates';
import { TagType } from '@/constants/tags';

interface MetadataFormData {
  title: string;
  description: string;
  template: TemplateType;
  tags: TagType[];
}

const schema: yup.ObjectSchema<MetadataFormData> = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: yup
    .string()
    .required()
    .default('')
    .max(500, 'Description must be less than 500 characters'),
  template: yup
    .mixed<TemplateType>()
    .oneOf(Object.values(TEMPLATE_TYPES), 'Please select a valid template')
    .required('Please select a template'),
  tags: yup
    .array()
    .of(yup.mixed<TagType>())
    .default([])
    .max(5, 'Maximum 5 tags allowed'),
}) as any; // Type assertion needed due to yup typing limitations

interface MetadataFormProps {
  onSubmit: (data: MetadataFormData) => void;
  disabled?: boolean;
}

export function MetadataForm({ onSubmit, disabled = false }: MetadataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MetadataFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  const selectedTemplate = watch('template');
  const selectedTags = watch('tags') || [];

  const handleTemplateChange = (template: TemplateType) => {
    setValue('template', template, { shouldValidate: true });
  };

  const handleTagsChange = (tags: TagType[]) => {
    setValue('tags', tags, { shouldValidate: true });
  };

  const onSubmitHandler = (data: MetadataFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Project Title
        </label>
        <Input
          id="title"
          {...register('title')}
          className={`${errors.title ? 'border-red-500' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-invalid={errors.title ? 'true' : 'false'}
          disabled={disabled}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          {...register('description')}
          className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-invalid={errors.description ? 'true' : 'false'}
          placeholder="Enter a description of your video project..."
          disabled={disabled}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Template
        </label>
        <TemplateSelector
          value={selectedTemplate}
          onChange={handleTemplateChange}
          error={errors.template?.message}
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <TagInput
          value={selectedTags}
          onChange={handleTagsChange}
          maxTags={5}
          disabled={disabled}
        />
        {errors.tags && (
          <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={disabled}
      >
        {disabled ? 'Upload a presentation first' : 'Continue'}
      </Button>
    </form>
  );
}