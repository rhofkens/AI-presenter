import React from 'react'
import { Project } from "../../types/project"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { TEMPLATE_TYPES } from "../../constants/templates"
import { Briefcase, BookOpen, TrendingUp, Code, Layout, PlayCircle, Edit2, Download, Languages, Trash2 } from "lucide-react"
import { TAG_COLORS } from "../../constants/tags"
import { Button } from "../ui/button"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card data-testid="project-card" className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      {/* Thumbnail Section */}
      <div data-testid="project-thumbnail" className="relative aspect-video bg-gray-100">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${TAG_COLORS[tag.color as keyof typeof TAG_COLORS]}`}
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
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-8 h-8 rounded-full ring-2 ring-white"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{project.author.name}</span>
            <span className="text-xs text-gray-500 capitalize">{project.status}</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Edit">
            <Edit2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Download">
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Translate">
            <Languages className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-100 text-red-500 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}