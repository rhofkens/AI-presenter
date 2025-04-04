import React from 'react'
import { Project } from "../../types/project"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { TEMPLATE_TYPES, TEMPLATE_ICONS } from "../../constants/templates"
import { TAG_COLORS } from "../../constants/tags"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card data-testid="project-card" className="overflow-hidden">
      {/* Thumbnail Section */}
      <div data-testid="project-thumbnail" className="relative aspect-video">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white rounded text-sm">
          {project.duration}
        </div>
      </div>

      {/* Content Section */}
      <CardHeader data-testid="project-content" className="space-y-2">
        <div className="flex items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.id}
              data-testid={`project-tag-${tag.id}`}
              className={`px-2 py-1 rounded-full text-xs ${TAG_COLORS[tag.color as keyof typeof TAG_COLORS]}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{project.postedTime}</span>
          <span>•</span>
          <span>{project.template.type}</span>
        </div>
      </CardHeader>

      {/* Actions Section */}
      <CardFooter data-testid="project-actions" className="border-t">
        <div className="flex items-center gap-2">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{project.author.name}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500">{project.status}</span>
        </div>
      </CardFooter>
    </Card>
  )
}