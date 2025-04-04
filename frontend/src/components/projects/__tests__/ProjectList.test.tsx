import { test, expect } from '@playwright/experimental-ct-react'
import { ProjectList } from '../ProjectList'
import { Project } from '../../../types/project'

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  thumbnail: 'test.jpg',
  duration: '5:00',
  tags: [
    { id: '1', name: 'business', color: 'business' },
    { id: '2', name: 'technical', color: 'technical' }
  ],
  author: {
    id: '1',
    name: 'Test User',
    avatar: 'avatar.jpg',
    email: 'test@example.com'
  },
  template: {
    id: '1',
    type: 'BUSINESS',
    slideCount: 5,
    description: 'Test template'
  },
  postedTime: '2024-04-04T12:00:00Z',
  createdAt: '2024-04-04T12:00:00Z',
  updatedAt: '2024-04-04T12:00:00Z',
  status: 'draft'
}

test.describe('ProjectList', () => {
  test('renders loading state correctly', async ({ mount }) => {
    const component = await mount(
      <ProjectList projects={[]} isLoading={true} />
    )
    
    await expect(component.getByTestId('project-list-loading')).toBeVisible()
    await expect(component.getByText('Loading projects...')).toBeVisible()
  })

  test('renders error state correctly', async ({ mount }) => {
    const errorMessage = 'Failed to load projects'
    const component = await mount(
      <ProjectList projects={[]} error={errorMessage} />
    )
    
    await expect(component.getByTestId('project-list-error')).toBeVisible()
    await expect(component.getByText(errorMessage)).toBeVisible()
  })

  test('renders empty state correctly', async ({ mount }) => {
    const component = await mount(
      <ProjectList projects={[]} />
    )
    
    await expect(component.getByTestId('project-list-empty')).toBeVisible()
    await expect(component.getByText('No projects found')).toBeVisible()
    await expect(component.getByText('Create your first project to get started.')).toBeVisible()
  })

  test('renders list of projects correctly', async ({ mount }) => {
    const projects = [mockProject]
    const component = await mount(
      <ProjectList projects={projects} />
    )
    
    await expect(component.getByTestId('project-list')).toBeVisible()
    await expect(component.getByText('Total 1 video')).toBeVisible()
    await expect(component.getByText(mockProject.title)).toBeVisible()
  })

  test('renders correct plural form for multiple projects', async ({ mount }) => {
    const projects = [mockProject, { ...mockProject, id: '2' }]
    const component = await mount(
      <ProjectList projects={projects} />
    )
    
    await expect(component.getByText('Total 2 videos')).toBeVisible()
  })

  test('passes correct props to ProjectCard', async ({ mount }) => {
    const mockHandlers = {
      onEdit: async () => {},
      onDelete: async () => {},
      onDownload: async () => {},
      onTranslate: async () => {},
      onPlay: async () => {}
    }

    const projects = [mockProject]
    const component = await mount(
      <ProjectList projects={projects} {...mockHandlers} />
    )
    
    await expect(component.getByText(mockProject.title)).toBeVisible()
    await expect(component.getByText(mockProject.author.name)).toBeVisible()
    await expect(component.getByText(mockProject.template.type)).toBeVisible()
  })
})