import React, { useState } from 'react'
import { Project } from "../../types/project"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { TEMPLATE_TYPES } from "../../constants/templates"
import { Briefcase, BookOpen, TrendingUp, Code, Layout, PlayCircle, Edit2, Download, Languages, Trash2, ImageOff } from "lucide-react"
import { TAG_COLORS } from "../../constants/tags"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => Promise<void>;
  onDelete?: (project: Project) => Promise<void>;
  onDownload?: (project: Project) => Promise<void>;
  onTranslate?: (project: Project) => Promise<void>;
  onPlay?: (project: Project) => Promise<void>;
  isLoading?: boolean;
}

interface ActionState {
  isEditing: boolean;
  isDeleting: boolean;
  isDownloading: boolean;
  isTranslating: boolean;
  isPlaying: boolean;
}

export function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onDownload, 
  onTranslate, 
  onPlay,
  isLoading 
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [actionState, setActionState] = useState<ActionState>({
    isEditing: false,
    isDeleting: false,
    isDownloading: false,
    isTranslating: false,
    isPlaying: false
  });

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAction = async (
    action: keyof ActionState,
    handler?: (project: Project) => Promise<void>
  ) => {
    if (!handler) return;

    try {
      setActionState(prev => ({ ...prev, [action]: true }));
      await handler(project);
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    } finally {
      setActionState(prev => ({ ...prev, [action]: false }));
    }
  };

  if (isLoading) {
    return (
      <Card data-testid="project-card-loading" className="overflow-hidden">
        <div className="aspect-video">
          <Skeleton className="w-full h-full" />
        </div>
        <CardHeader className="space-y-3 p-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardFooter className="border-t p-4">
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="w-8 h-8" />
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card data-testid="project-card" className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      {/* Thumbnail Section */}
      <div data-testid="project-thumbnail" className="relative aspect-video bg-gray-100">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
            onError={handleImageError}
          />
        )}
        {/* Play Button Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          onClick={() => handleAction('isPlaying', onPlay)}
          data-testid="play-button"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <PlayCircle className="w-full h-full text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200" strokeWidth={1.5} />
          </div>
        </div>
        {/* Duration Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs font-medium rounded backdrop-blur-sm">
          {project.duration}
        </div>
      </div>

      {/* Content Section */}
      <CardHeader data-testid="project-content" className="space-y-3 p-4">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag.id}
              data-testid={`project-tag-${tag.id}`}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${TAG_COLORS[tag.color]}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>
        {/* Template Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {/* Template Icon */}
          {(() => {
            switch (project.template.type) {
              case TEMPLATE_TYPES.BUSINESS:
                return <Briefcase className="w-4 h-4" />;
              case TEMPLATE_TYPES.EDUCATIONAL:
                return <BookOpen className="w-4 h-4" />;
              case TEMPLATE_TYPES.MARKETING:
                return <TrendingUp className="w-4 h-4" />;
              case TEMPLATE_TYPES.TECHNICAL:
                return <Code className="w-4 h-4" />;
              case TEMPLATE_TYPES.CUSTOM:
                return <Layout className="w-4 h-4" />;
              default:
                return null;
            }
          })()}
          <span>{project.template.type}</span>
          <span>•</span>
          <span>{project.postedTime}</span>
        </div>
      </CardHeader>

      {/* Actions Section */}
      <CardFooter data-testid="project-actions" className="border-t p-4 flex items-center justify-between">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          {imageError ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <ImageOff className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            <img
              src={project.author.avatar}
              alt={project.author.name}
              className="w-8 h-8 rounded-full ring-2 ring-white"
              onError={handleImageError}
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{project.author.name}</span>
            <span className="text-xs text-gray-500 capitalize">{project.status}</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            title="Edit"
            onClick={() => handleAction('isEditing', onEdit)}
            disabled={actionState.isEditing}
            data-testid="edit-button"
          >
            <Edit2 className={`w-5 h-5 ${actionState.isEditing ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            title="Download"
            onClick={() => handleAction('isDownloading', onDownload)}
            disabled={actionState.isDownloading}
            data-testid="download-button"
          >
            <Download className={`w-5 h-5 ${actionState.isDownloading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            title="Translate"
            onClick={() => handleAction('isTranslating', onTranslate)}
            disabled={actionState.isTranslating}
            data-testid="translate-button"
          >
            <Languages className={`w-5 h-5 ${actionState.isTranslating ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-100 text-red-500 hover:text-red-600"
            title="Delete"
            onClick={() => handleAction('isDeleting', onDelete)}
            disabled={actionState.isDeleting}
            data-testid="delete-button"
          >
            <Trash2 className={`w-5 h-5 ${actionState.isDeleting ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}