import { Project } from "../../types/project"
import { ProjectCard } from "./ProjectCard"

interface ProjectListProps {
  projects: Project[];
  isLoading?: boolean;
  error?: string;
  onEdit?: (project: Project) => Promise<void>;
  onDelete?: (project: Project) => Promise<void>;
  onDownload?: (project: Project) => Promise<void>;
  onTranslate?: (project: Project) => Promise<void>;
  onPlay?: (project: Project) => Promise<void>;
}

export function ProjectList({
  projects,
  isLoading,
  error,
  onEdit,
  onDelete,
  onDownload,
  onTranslate,
  onPlay
}: ProjectListProps) {
  // Show loading state with skeleton cards
  if (isLoading) {
    return (
      <div data-testid="project-list-loading" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Loading projects...</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ProjectCard key={i} project={null as any} isLoading={true} />
          ))}
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div data-testid="project-list-error" className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Error loading projects</h2>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  // Show empty state
  if (!projects?.length) {
    return (
      <div data-testid="project-list-empty" className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">No projects found</h2>
        <p className="text-gray-600">Create your first project to get started.</p>
      </div>
    )
  }

  return (
    <div data-testid="project-list" className="space-y-8">
      {/* Grid of project cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onDownload={onDownload}
            onTranslate={onTranslate}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  )
}