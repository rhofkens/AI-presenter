import { BreadcrumbNav } from "@/components/header/BreadcrumbNav"
import { CreateButton } from "@/components/header/CreateButton"
import { UserMenu } from "@/components/header/UserMenu"
import { SubHeader } from "@/components/header/SubHeader"
import { Sidebar } from "@/components/layout/Sidebar"
import { ProjectCard } from "@/components/projects/ProjectCard"
import type { Project } from "@/types/project"

export function HeaderTest() {
  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: "Marketing Campaign", href: "/projects/marketing" },
    { label: "Q2 Strategy", href: "/projects/marketing/q2" },
  ]

  const mockProject: Project = {
    id: '1',
    title: 'Marketing Campaign Video',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    duration: '5:30',
    tags: [
      {
        id: '1',
        name: 'Marketing',
        color: 'marketing'
      },
      {
        id: '2',
        name: 'Business',
        color: 'business'
      }
    ],
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      email: 'john@example.com'
    },
    postedTime: '2 hours ago',
    template: {
      id: '1',
      type: 'Marketing',
      slideCount: 10,
      description: 'A marketing presentation template'
    },
    createdAt: '2024-04-04T12:00:00Z',
    updatedAt: '2024-04-04T12:00:00Z',
    status: 'draft' as const
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="ml-64">
        {/* Main Header */}
        <header className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-10">
          <div className="px-6 h-16 flex items-center justify-between">
            <BreadcrumbNav items={breadcrumbItems} />
            <div className="flex items-center space-x-4">
              <CreateButton />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Sub Header */}
        <div className="fixed top-16 right-0 left-64 z-10">
          <SubHeader />
        </div>

        {/* Page Content */}
        <main className="pt-32 pb-8 px-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Header Test Page</h1>
            <p className="mt-2 text-gray-600">This page demonstrates the new header layout with sidebar.</p>
          </div>

          <div className="mt-8 max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Card Preview</h2>
            <ProjectCard project={mockProject} />
          </div>
        </main>
      </div>
    </div>
  )
}