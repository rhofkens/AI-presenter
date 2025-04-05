import { useState } from 'react'
import { ProjectList } from '../projects/ProjectList'
import { MOCK_PROJECTS } from '../../mock/projects'
import { Button } from '../ui/button'

export function ProjectListTest() {
  const [state, setState] = useState<'normal' | 'loading' | 'error' | 'empty'>('normal')

  const handleStateChange = (newState: 'normal' | 'loading' | 'error' | 'empty') => {
    setState(newState)
  }

  const mockHandlers = {
    onEdit: async () => console.log('Edit clicked'),
    onDelete: async () => console.log('Delete clicked'),
    onDownload: async () => console.log('Download clicked'),
    onTranslate: async () => console.log('Translate clicked'),
    onPlay: async () => console.log('Play clicked')
  }

  const getProjectListProps = () => {
    switch (state) {
      case 'loading':
        return { projects: [], isLoading: true }
      case 'error':
        return { projects: [], error: 'Failed to load projects. Please try again.' }
      case 'empty':
        return { projects: [] }
      default:
        return { projects: MOCK_PROJECTS }
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">ProjectList Component Demo</h1>
        
        <div className="flex gap-4">
          <Button
            onClick={() => handleStateChange('normal')}
            variant={state === 'normal' ? 'default' : 'outline'}
          >
            Normal State
          </Button>
          <Button
            onClick={() => handleStateChange('loading')}
            variant={state === 'loading' ? 'default' : 'outline'}
          >
            Loading State
          </Button>
          <Button
            onClick={() => handleStateChange('error')}
            variant={state === 'error' ? 'default' : 'outline'}
          >
            Error State
          </Button>
          <Button
            onClick={() => handleStateChange('empty')}
            variant={state === 'empty' ? 'default' : 'outline'}
          >
            Empty State
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Current State: <span className="font-medium">{state}</span>
        </div>
      </div>

      <ProjectList {...getProjectListProps()} {...mockHandlers} />
    </div>
  )
}